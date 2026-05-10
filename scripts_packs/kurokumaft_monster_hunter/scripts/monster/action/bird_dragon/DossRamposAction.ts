import { Entity, EntityDamageCause, ItemStack, TicksPerSecond, system } from "@minecraft/server";
import { MHMonsterActionBase } from "../MHMonsterActionBase";
import { randomAngle, weightChoice } from "../../../common/MHCommonUtil";
import { hitMHMonsterDamage, targetDistance } from "../../MHMonsterFunction";
import { MHMonsterAilmentTypes, MHMonsterElementTypes } from "../../../common/types/MHMonsterTypes";

// 属性系統
const MHRamposElementTypes: MHMonsterElementTypes = {
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
const MHRamposAilmentTypes: MHMonsterAilmentTypes = {
  attack: ["none"],
  weakness: [
    {type: "poison", endurance: 2, duration: 30*TicksPerSecond, damage: 1},
    {type: "paralysis", endurance: 2, duration: 5*TicksPerSecond, damage:0},
    {type: "sleep", endurance: 2, duration: 15*TicksPerSecond, damage:0},
    {type: "dizziness", endurance: 2, duration: 15*TicksPerSecond, damage:0}
  ]
}

// 平静時行動アクション
const MHRamposPeaceTimeAction = weightChoice([
  {weight: 0.4, choice: "walk"},
  {weight: 0.6, choice: "wait"}
]);

// 剥ぎ取りアイテム
const MHRamposPeelingItems = weightChoice([
  {weight: 0.29, choice: "kurokumaft:rampos_scale"},
  {weight: 0.23, choice: "kurokumaft:rampos_fang"},
  {weight: 0.4, choice: "kurokumaft:rampos_skin"},
  {weight: 0.18, choice: "kurokumaft:small_keel"}
]);

/**
 * ドスランポスの行動制御クラス
 */
export class DossRamposAction extends MHMonsterActionBase {
  constructor(entity: Entity) {
    super(entity);
    this.attack = 3;
    this.speed = 0.16;
    this.hostileSpeed = 0.16
    this.hostileTimeBorder = 300*TicksPerSecond;
  }

  individualPeaceTimeAction(): void {
    const attackTgergets = this.searchPlayer(this.entity.location, 16);

    if (attackTgergets.length > 0) {
      this.hateEntitys.set(attackTgergets[0].id, 1);
      this.intimidationAction();
      return;
    }

    // 平静時の行動をランダムで取得
    const action = MHRamposPeaceTimeAction.pick();
    if ("walk" === action) {
      this.lastMoveTime = system.currentTick + 3*TicksPerSecond;
      this.entity.setRotation(randomAngle());
    } else if ("wait" === action) {
      this.lastMoveTime = system.currentTick + 1*TicksPerSecond;
    }
    this.entity.setProperty("kurokumaft:mh_action", action);
  }

  individualHostileAction(): void {

    const attackTgergets = this.searchPlayer(this.entity.location, 16);

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

    // ターゲットがいない場合はランダム
    if (hateEntity === undefined) {
      this.lastMoveTime = system.currentTick + 1*TicksPerSecond;
      // 平静時の行動をランダムで取得
      const action = MHRamposPeaceTimeAction.pick();
      if ("walk" === action) {
        this.lastMoveTime = system.currentTick + 3*TicksPerSecond;
        this.entity.setRotation(randomAngle());
      } else if ("wait" === action) {
        this.lastMoveTime = system.currentTick + 1*TicksPerSecond;
      }
      this.entity.setProperty("kurokumaft:mh_action", action);
    } else {
      if (this.entity.getProperty("kurokumaft:mh_action") === "wait") {
        this.lastMoveTime = system.currentTick + 2*TicksPerSecond;
        if (targetDistance(this.entity.location, hateEntity.location) < 5) {
          // 近接攻撃
          this.entity.setProperty("kurokumaft:mh_action", "attack");
          hateEntity.applyDamage(this.attack, {
            cause: EntityDamageCause.entityAttack,
            damagingEntity: this.entity
          });
        } else {
          // ジャンプ攻撃
          this.moveTowards(hateEntity.location, 0.1, 2);
          this.entity.setProperty("kurokumaft:mh_action", "jump_attack");
          this.entity.applyKnockback({
            x: this.entity.getViewDirection().x * 2.5,
            z: this.entity.getViewDirection().z * 2.5
          }, 0.35);
          system.waitTicks(0.5*TicksPerSecond).then(() => {
            const jumpAttackTgergets = this.entity.dimension.getEntities({
              families: ["player"],
              location: this.entity.location,
              maxDistance: 2
            });
            jumpAttackTgergets.forEach(en => {
              en.applyDamage(this.attack, {
                cause: EntityDamageCause.entityAttack,
                damagingEntity: this.entity
              });
            });
          });
        }
      } else if (this.entity.getProperty("kurokumaft:mh_action") === "attack"
        || this.entity.getProperty("kurokumaft:mh_action") === "jump_attack") {
        // 威嚇行動のアニメーション表示
        this.entity.setProperty("kurokumaft:mh_action", "intimidation");
        // 最終行動時間を設定
        this.lastMoveTime = system.currentTick + 1.5*TicksPerSecond;
      } else {
        if (this.moveTowards(hateEntity.location, 0.32, 4)) {
          // 一度止まる
          this.entity.setProperty("kurokumaft:mh_action", "wait");
          this.lastMoveTime = system.currentTick + 1*TicksPerSecond;
        } else {
          // 近づくまで移動
          this.lastMoveTime = system.currentTick + 0.1*TicksPerSecond;
          this.entity.setProperty("kurokumaft:mh_action", "walk");
        }
      }
    }

  }

  intimidationAction(): void {
    // 死亡済み
    if (this.checkDaiState()) {
      return;
    }

    if (this.lastdamageTime === 0) {
      // 威嚇行動のアニメーション表示
      this.entity.setProperty("kurokumaft:mh_action", "intimidation");
      // 最終行動時間を設定
      this.lastMoveTime = system.currentTick + 1*TicksPerSecond;
      // 通常行動スレッドを停止
      if (this.peaceTimeNumber !== 0) {
        // 最終敵対時間を敵対行動制限時間後に設定
        this.lastdamageTime = system.currentTick + this.hostileTimeBorder;
        // 敵対に設定
        this.entity.setProperty("kurokumaft:mh_action_status", "hostile");
        system.clearRun(this.peaceTimeNumber);
        this.peaceTimeNumber = 0;
        // 敵対行動スレッドを開始
        super.startHostileActionControl();
      }
    }
  }

  individualDamageCalculation(damagingEntity: Entity): number {
    // ダメージ計算
    return hitMHMonsterDamage(damagingEntity, MHRamposElementTypes.weakness);
  }

  individualAilment(damagingEntity: Entity): void {
    // 状態異常ダメージ判定
    this.setAilmentDamage(damagingEntity, MHRamposAilmentTypes.weakness);
    // めまい判定
    this.setDizziness(damagingEntity, MHRamposAilmentTypes.weakness[3]);
  }

  individualDaiAction(): void {
    // 死亡時は吹き飛ぶ
    this.entity.applyKnockback({
      x: -this.entity.getViewDirection().x * 2.5,
      z: -this.entity.getViewDirection().z * 2.5
    }, 0.35);
  }

  choicePeelingItem(): ItemStack {
    const choice = MHRamposPeelingItems.pick();
    return new ItemStack(choice, 1);
  }

}
