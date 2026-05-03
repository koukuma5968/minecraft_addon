import { Entity, ItemStack, TicksPerSecond, system } from "@minecraft/server";
import { MHMonsterActionBase } from "../MHMonsterActionBase";
import { randomAngle, weightChoice } from "../../../common/MHCommonUtil";
import { hitMHMonsterDamage } from "../../MHMonsterFunction";
import { MHMonsterAilmentTypes, MHMonsterElementTypes } from "../../../common/types/MHMonsterTypes";

// 属性系統
const MHAptonosElementTypes: MHMonsterElementTypes = {
  attack: ["none"],
  weakness: [
    {type: "fire", endurance: 0.5},
    {type: "water", endurance: 0.5},
    {type: "thunder", endurance: 0.5},
    {type: "ice", endurance: 0.5},
    {type: "dragon", endurance: 0.1}
  ]
}

// 状態異常系統
const MHAptonosAilmentTypes: MHMonsterAilmentTypes = {
  attack: ["none"],
  weakness: [
    {type: "poison", endurance: 2, duration: 30*TicksPerSecond, damage:2},
    {type: "paralysis", endurance: 2, duration: 5*TicksPerSecond, damage:0},
    {type: "sleep", endurance: 2, duration: 15*TicksPerSecond, damage:0},
    {type: "dizziness", endurance: 2, duration: 5*TicksPerSecond, damage:0}
  ]
}

// 平静時行動アクション
const MHAptonosPeaceTimeAction = weightChoice([
  {weight: 0.4, choice: "walk"},
  {weight: 0.2, choice: "wait"},
  {weight: 0.4, choice: "eat"}
]);

// 剥ぎ取りアイテム
const MHAptonosPeelingItems = weightChoice([
  {weight: 0.8, choice: "kurokumaft:mh_meat"},
  {weight: 0.2, choice: "kurokumaft:small_keel"}
]);

/**
 * アプトノスの行動制御クラス
 */
export class AptonosAction extends MHMonsterActionBase {
  intimidationAction(): void {
    throw new Error("Method not implemented.");
  }

  constructor(entity: Entity) {
    super(entity);
    this.hostileTimeBorder = 30*TicksPerSecond;
    this.speed = 0.06;
    this.hostileSpeed = 0.1
  }

  individualPeaceTimeAction(): void {
    // 平静時の行動をランダムで取得
    const action = MHAptonosPeaceTimeAction.pick();
    if ("walk" === action) {
      this.lastMoveTime = system.currentTick + 5*TicksPerSecond;
      this.entity.setRotation(randomAngle());
    } else if ("wait" === action) {
      this.lastMoveTime = system.currentTick + 1*TicksPerSecond;
    } else if ("eat" === action) {
      this.lastMoveTime = system.currentTick + 2*TicksPerSecond;
    }
    this.entity.setProperty("kurokumaft:mh_action", action);
  }

  individualDamageCalculation(damagingEntity: Entity): number {
    // ダメージ計算
    return hitMHMonsterDamage(damagingEntity, MHAptonosElementTypes.weakness);
  }

  individualAilment(damagingEntity: Entity): void {
    // 状態異常ダメージ判定
    this.setAilmentDamage(damagingEntity, MHAptonosAilmentTypes.weakness);
    // めまい判定
    this.setDizziness(damagingEntity, MHAptonosAilmentTypes.weakness[3]);
  }

  individualDaiAction(): void {
  }

  individualHostileAction(): void {
    const attackTgergets = this.entity.dimension.getEntities({
      families: ["player"],
      location: this.entity.location,
      maxDistance: 16
    });

    let hateEntity: Entity | undefined = undefined;
    let maxValue = -Infinity;
    for (const [number, target] of attackTgergets.entries()) {
      const targetHate = this.hateEntitys.get(target.id);
      if (targetHate !== undefined) {
        if (target.isValid && targetHate > maxValue) {
          maxValue = targetHate;
          hateEntity = target;
        }
      }
    }

    // ターゲットがいない場合は移動
    if (hateEntity === undefined) {
      this.lastMoveTime = system.currentTick + 1*TicksPerSecond;
      this.entity.setRotation(randomAngle());
      this.entity.setProperty("kurokumaft:mh_action", "walk");
      // 向いてる方向に移動する
      this.entity.applyImpulse({
        x: this.entity.getViewDirection().x*0.06,
        y: 0,
        z: this.entity.getViewDirection().z*0.06,
      });
    } else {
      this.moveToescape(hateEntity.location, 0.25)
      this.lastMoveTime = system.currentTick + 0.1*TicksPerSecond;
      this.entity.setProperty("kurokumaft:mh_action", "escape");
    }
  }

  choicePeelingItem(): ItemStack {
    const choice = MHAptonosPeelingItems.pick();
    return new ItemStack(choice, 1);
  }

}
