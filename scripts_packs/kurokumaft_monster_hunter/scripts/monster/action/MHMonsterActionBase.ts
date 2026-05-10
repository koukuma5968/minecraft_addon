import { Entity, GameMode, ItemStack, system, TicksPerSecond, Vector3 } from "@minecraft/server";
import { MHMonsterActionInterface } from "./MHMonsterActionInterface";
import { MHAilmentWeaknessTypes } from "../../common/types/MHMonsterTypes";
import { getMHMonsterAilmentDamage, getMHMonsterDizziness } from "../MHMonsterFunction";
import { MHMonsterManager } from "../MHMonsterManager";

/**
 * モンスターの行動制御ベースクラス
 */
export abstract class MHMonsterActionBase implements MHMonsterActionInterface {

  // モブ
  entity: Entity;
  // ヘイト量
  hateEntitys: Map<string, number> = new Map();
  // 攻撃力
  attack: number = 0;
  // スピード
  speed: number = 0;
  // 敵対時スピード
  hostileSpeed: number = 0;
  // 平常時スレッド番号
  peaceTimeNumber: number = 0;
  // 敵対時スレッド番号
  hostileNumber: number = 0;
  // 状態異常スレッド
  ailmentTick: number = 0;
  // めまいスレッド
  dizzinessTick: number = 0;
  // 最終行動時間
  lastMoveTime: number = 0;
  // 最終ダメージ時間
  lastdamageTime: number = 0;
  // 敵対リセット最大時間
  hostileTimeBorder: number = 0;

  constructor(entity: Entity) {
    this.entity = entity;
  }

  startPeaceTimeActionControl() {
    if(this.entity.getProperty("kurokumaft:mh_action") === "dai") {
      system.waitTicks(30*TicksPerSecond).then(() => {
        if(this.entity.isValid) {
          this.entity.remove();
        }
        MHMonsterManager.removeMonster(this.entity.id);
      });
      return;
    }

    this.entity.setProperty("kurokumaft:mh_action_status", "peacetime");
    this.peaceTimeNumber = system.runInterval(() => {
      try {
        if (this.entity.isValid) {
          if(this.entity.getProperty("kurokumaft:mh_action") === "dai") {
            system.clearRun(this.peaceTimeNumber);
          } else {
            this.peaceTimeAction();
          }
        } else {
          system.clearRun(this.peaceTimeNumber);
        }
      } catch(error) {
        system.clearRun(this.peaceTimeNumber);
        console.error(error);
      }
    }, 0.1 * TicksPerSecond)
  }

  startHostileActionControl(): void {
    this.hostileNumber = system.runInterval(() => {
      try {
        if (this.entity.isValid) {
          if(this.entity.getProperty("kurokumaft:mh_action") === "dai") {
            system.clearRun(this.hostileNumber);
          } else {
            this.hostileAction();
          }
        } else {
          system.clearRun(this.hostileNumber);
        }
      } catch(error) {
        system.clearRun(this.hostileNumber);
        console.error(error);
      }
    }, 0.1 * TicksPerSecond)
  }

  peaceTimeAction(): void {
    // スポーン時には移動を行う
    if (this.lastMoveTime === 0) {
      this.lastMoveTime = system.currentTick;
      this.entity.setProperty("kurokumaft:mh_action", "walk");
    }

    // 死亡済み
    if (this.checkDaiState()) {
      return;
    }

    // 平常時
    const mh_action_status = this.entity.getProperty("kurokumaft:mh_action_status") as string;
    if (mh_action_status === "peacetime") {
      // 最後の行動から特定時間を過ぎた時
      if (this.lastMoveTime < system.currentTick) {
        this.individualPeaceTimeAction();
      } else {
        const action = this.entity.getProperty("kurokumaft:mh_action");
        if ("walk" === action) {
          // 向いてる方向に移動する
          this.entity.applyImpulse({
            x: this.entity.getViewDirection().x*this.speed,
            y: 0,
            z: this.entity.getViewDirection().z*this.speed,
          });
        }
      }
    }
  }

  hostileAction(): void {
    // 死亡済み
    if (this.checkDaiState()) {
      return;
    }

    // 敵対行動時
    const mh_action_status = this.entity.getProperty("kurokumaft:mh_action_status") as string;
    if (mh_action_status === "hostile") {
      // 最終敵対時間を過ぎた時
      if (this.lastdamageTime < system.currentTick) {
        // 最終敵対時間をクリア
        this.lastdamageTime = 0;
        // 最終行動時間を0.5秒後に設定
        this.lastMoveTime = system.currentTick + 0.5*TicksPerSecond;
        // 敵対行動スレッドを停止
        system.clearRun(this.hostileNumber);
        this.hostileNumber = 0;
        this.entity.setProperty("kurokumaft:mh_action_status", "peacetime");
        // 平常時コントロールを開始
        this.startPeaceTimeActionControl();
      // 最終行動時間を過ぎた場合
      } else if (this.lastMoveTime < system.currentTick) {
        this.individualHostileAction();
      } else {
        const action = this.entity.getProperty("kurokumaft:mh_action");
        if ("walk" === action) {
          // 向いてる方向に移動する
          this.entity.applyImpulse({
            x: this.entity.getViewDirection().x*this.hostileSpeed,
            y: 0,
            z: this.entity.getViewDirection().z*this.hostileSpeed,
          });
        }
      }
    } else if (mh_action_status === "inactive") {
      if (this.dizzinessTick !== 0) {
        const action = this.entity.getProperty("kurokumaft:mh_action");
        if (action !== "dizziness") {
          this.entity.setProperty("kurokumaft:mh_action", "dizziness");
        }
      } else {
        const action = this.entity.getProperty("kurokumaft:mh_action");
        if (action !== "dizziness") {
          this.entity.setProperty("kurokumaft:mh_action", "dizziness");
        }
      }
    }
  }

  damageAction(damagingEntity: Entity): void {

    // 死亡済み
    if (this.checkDaiState()) {
      return;
    }

    // ダメージ計算
    const damage = this.individualDamageCalculation(damagingEntity);

    // 残体力がダメージを上回っているか
    const health = this.entity.getProperty("kurokumaft:health") as number;
    if (health > damage) {

      const targetHate = this.hateEntitys.get(damagingEntity.id);
      // ターゲットとヘイト量を設定
      if (targetHate === undefined) {
        this.hateEntitys.set(damagingEntity.id, damage);
      } else {
        this.hateEntitys.set(damagingEntity.id, targetHate + damage);
      }

      // 最終行動時間を0.5秒後に設定
      this.lastMoveTime = system.currentTick + 1*TicksPerSecond;

      // 体力からダメージを引いた値を設定
      this.entity.setProperty("kurokumaft:health", health - damage);

      // 状態異常判定
      this.individualAilment(damagingEntity);

      // ダメージ行動のアニメーション表示
      const dizziness_gauge = this.entity.getProperty("kurokumaft:dizziness_gauge") as number;
      if (dizziness_gauge < 100) {
        this.entity.setProperty("kurokumaft:mh_action", "damage");
      }
      // 通常行動スレッドを停止
      if (this.peaceTimeNumber !== 0) {
        // 最終敵対時間を敵対行動制限時間後に設定
        this.lastdamageTime = system.currentTick + this.hostileTimeBorder;
        // 敵対に設定
        this.entity.setProperty("kurokumaft:mh_action_status", "hostile");
        system.clearRun(this.peaceTimeNumber);
        this.peaceTimeNumber = 0;
        // 敵対行動スレッドを開始
        this.startHostileActionControl();
      }
    } else {
      this.individualDaiAction();
      // 死亡処理
      this.setDaiAction();
    }
  }

  peelingDrop() {
    if (this.entity.getProperty("kurokumaft:mh_action") === "dai") {
      try {
        if (this.entity.isValid) {
          const peeling_count = this.entity.getProperty("kurokumaft:peeling_count") as number;
          if (peeling_count !== 0) {
            const pickItem = this.choicePeelingItem();
            this.entity.dimension.spawnItem(pickItem, {
              x: this.entity.location.x,
              y: this.entity.location.y + 1.5,
              z: this.entity.location.z
            });

            if (peeling_count-1 !== 0) {
              this.entity.setProperty("kurokumaft:peeling_count", peeling_count-1);
            } else {
              this.entity.remove();
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    }

  }

  setAilmentDamage(damagingEntity: Entity, weakness: MHAilmentWeaknessTypes[]) {
    const ailment_state = this.entity.getProperty("kurokumaft:ailment_state") as boolean;
    // 状態異常にかかってないかつ状態異常ダメージがある場合
    if (!ailment_state) {
      // 状態異常判定
      const ailmentDamage = getMHMonsterAilmentDamage(damagingEntity, weakness);
      if (ailmentDamage === undefined) {
        return;
      }
      let ailment_stateflg = false;
      switch (ailmentDamage.type) {
        case "poison":
          const poison_gauge = this.entity.getProperty("kurokumaft:poison_gauge") as number;
          if (poison_gauge + ailmentDamage.endurance >= 100) {
            this.entity.setProperty("kurokumaft:poison_gauge", 100);
            this.entity.setProperty("kurokumaft:ailment_state", true);
            ailment_stateflg = true;
          } else {
            this.entity.setProperty("kurokumaft:poison_gauge", poison_gauge+ailmentDamage.endurance);
          }
          break;
        case "paralysis":
          const paralysis_gauge = this.entity.getProperty("kurokumaft:paralysis_gauge") as number;
          if (paralysis_gauge + ailmentDamage.endurance >= 100) {
            this.entity.setProperty("kurokumaft:paralysis_gauge", 100);
            this.entity.setProperty("kurokumaft:ailment_state", true);
            this.entity.setProperty("kurokumaft:mh_action_status", "inactive");
            ailment_stateflg = true;
          } else {
            this.entity.setProperty("kurokumaft:poison_gauge", paralysis_gauge+ailmentDamage.endurance);
          }
          break;
        case "sleep":
          const sleep_gauge = this.entity.getProperty("kurokumaft:sleep_gauge") as number;
          if (sleep_gauge + ailmentDamage.endurance >= 100) {
            this.entity.setProperty("kurokumaft:sleep_gauge", 100);
            this.entity.setProperty("kurokumaft:ailment_state", true);
            this.entity.setProperty("kurokumaft:mh_action_status", "inactive");
            ailment_stateflg = true;
          } else {
            this.entity.setProperty("kurokumaft:poison_gauge", sleep_gauge+ailmentDamage.endurance);
          }
          break;
      }
      if (ailment_stateflg) {
        const lastAlimentTime = system.currentTick+ailmentDamage.duration;
        this.ailmentTick = system.runInterval(() => {
          // 死亡済みまたは最終付与時間を超えたら停止する
          const health = this.entity.getProperty("kurokumaft:health") as number;
          if (health === 0 || system.currentTick > lastAlimentTime) {
            ailment_stateflg = false;
            switch (ailmentDamage.type) {
              case "poison":
                this.entity.setProperty("kurokumaft:poison_gauge", 0);
                break;
              case "paralysis":
                this.entity.setProperty("kurokumaft:paralysis_gauge", 0);
                break;
              case "sleep":
                this.entity.setProperty("kurokumaft:sleep_gauge", 0);
                break;
            }
            system.clearRun(this.ailmentTick);
            this.ailmentTick = 0;
            return;
          }
          // 体力からダメージを引いた値を設定
          if ((health - ailmentDamage.damage) <= 0) {
            // 死亡処理
            this.setDaiAction();
          }
        }, TicksPerSecond);
      }
    }
  }

  setDizziness(damagingEntity: Entity, weakDizziness: MHAilmentWeaknessTypes): void {
    const dizziness_gauge = this.entity.getProperty("kurokumaft:dizziness_gauge") as number;
    // めまい状態でない場合
    if (dizziness_gauge < 100) {
      // 状態異常判定
      const dizzinessDamage = getMHMonsterDizziness(damagingEntity, weakDizziness);
      if (dizzinessDamage === undefined) {
        return;
      }
      if (dizziness_gauge + dizzinessDamage.endurance >= 100) {
        this.entity.setProperty("kurokumaft:dizziness_gauge", 100);
        this.entity.setProperty("kurokumaft:mh_action", "dizziness");
        this.entity.setProperty("kurokumaft:mh_action_status", "inactive");
        const lastAlimentTime = system.currentTick+dizzinessDamage.duration;
        this.dizzinessTick = system.runInterval(() => {
          // 死亡済みまたは最終付与時間を超えたら停止する
          if (this.checkDaiState() || system.currentTick > lastAlimentTime) {
            if (this.entity.isValid) {
              this.entity.setProperty("kurokumaft:dizziness_gauge", 0);
              this.entity.setProperty("kurokumaft:mh_action_status", "hostile");
            }
            system.clearRun(this.dizzinessTick);
            this.dizzinessTick = 0;
            return;
          }
        }, TicksPerSecond);
      } else {
        this.entity.setProperty("kurokumaft:dizziness_gauge", dizziness_gauge+dizzinessDamage.endurance)
      }
    }
  }

  setDaiAction(): void {
    try {
      // 体力を0に設定
      this.entity.setProperty("kurokumaft:health", 0);
      // 死亡時の行動を実行
      this.entity.triggerEvent("kurokumaft:dai");
      // 死亡時アニメーション表示
      this.entity.setProperty("kurokumaft:mh_action", "dai");
      // 行動を停止
      this.entity.setProperty("kurokumaft:mh_action_status", "none");
      // 残留スレッドを停止
      if (this.peaceTimeNumber !== 0) {
        system.clearRun(this.peaceTimeNumber);
        this.peaceTimeNumber = 0;
      }
      if (this.hostileNumber !== 0) {
        system.clearRun(this.hostileNumber);
        this.hostileNumber = 0;
      }
      if (this.ailmentTick !== 0) {
        this.entity.setProperty("kurokumaft:ailment_state", false);
        system.clearRun(this.ailmentTick);
        this.ailmentTick = 0;
      }
      if (this.dizzinessTick !== 0) {
        system.clearRun(this.dizzinessTick);
        this.dizzinessTick = 0;
      }
      system.waitTicks(30*TicksPerSecond).then(() => {
        if(this.entity.isValid) {
          this.entity.remove();
        }
        MHMonsterManager.removeMonster(this.entity.id);
      });
    } catch (error) {
      console.error(error);
    }
  }

  checkDaiState(): boolean {
    if (this.entity.isValid) {
      const health = this.entity.getProperty("kurokumaft:health") as number;
      if (health === 0) {
        return true;
      }
    } else {
      return true;
    }
    return false;
  }

  moveToescape(targetLoc: Vector3, speed: number): void {
    const thisLoc = this.entity.location;

    const dx = targetLoc.x - thisLoc.x;
    const dz = targetLoc.z - thisLoc.z;

    const dist = Math.sqrt(dx * dx + dz * dz);

    const move = Math.min(speed, dist);

    const rad = Math.atan2(-dx, dz);
    const deg = rad * (180 / Math.PI) - 180;

    this.entity.setRotation({x:this.entity.getRotation().x, y:deg});
    this.entity.applyImpulse({
      x: -(dx / dist) * move,
      y: 0,
      z: -(dz / dist) * move
    });
  }

  moveTowards(targetLoc: Vector3, speed: number, stopDistance: number): boolean {
    const thisLoc = this.entity.location;

    const dx = targetLoc.x - thisLoc.x;
    const dz = targetLoc.z - thisLoc.z;

    const dist = Math.sqrt(dx * dx + dz * dz);

    // 指定位置まで到達している場合
    if (dist <= stopDistance || dist === 0) {
      return true;
    }

    const move = Math.min(speed, dist - stopDistance);

    const rad = Math.atan2(-dx, dz);
    const deg = rad * (180 / Math.PI);

    this.entity.setRotation({x:this.entity.getRotation().x, y:deg});
    this.entity.applyImpulse({
      x: (dx / dist) * move,
      y: 0,
      z: (dz / dist) * move
    });
    return false;
  }

  searchPlayer(location: Vector3, maxDistance: number): Entity[] {
    return this.entity.dimension.getEntities({
      families: ["player"],
      location: location,
      maxDistance: maxDistance,
      excludeGameModes: [GameMode.Creative, GameMode.Spectator]
    });

  }

  abstract individualPeaceTimeAction(): void;
  abstract intimidationAction(): void;
  abstract choicePeelingItem(): ItemStack;
  abstract individualHostileAction(): void;
  abstract individualDamageCalculation(damagingEntity: Entity): number;
  abstract individualAilment(damagingEntity: Entity): void
  abstract individualDaiAction(): void

}