import { Entity, ItemStack, system, TicksPerSecond, Vector3 } from "@minecraft/server";
import { MHInsectManager } from "../MHInsectManager";
import { MHInsectActionInterface } from "./MHInsectActionInterface";
import { randomAngle } from "../../common/MHCommonUtil";

/**
 * 虫の行動制御ベースクラス
 */
export abstract class MHInsectActionBase implements MHInsectActionInterface {

  // モブ
  entity: Entity;
  // 平常時スレッド番号
  peaceTimeNumber: number = 0;
  // 最終行動時間
  lastMoveTime: number = 0;
  // ローテート時間
  lastRotaionTime: number = 0;
  // 行動変更有無
  changeActionflg:boolean = false;
  // 変更後アクション
  changeAction:string = "";
  // 現在の高さ
  moveLotationY: number = 0;

  constructor(entity: Entity) {
    this.entity = entity;
  }

  startPeaceTimeActionControl() {
    if(this.entity.getProperty("kurokumaft:mh_action") === "dai") {
      system.waitTicks(30*TicksPerSecond).then(() => {
        if(this.entity.isValid) {
          this.entity.remove();
        }
        MHInsectManager.removeInsect(this.entity.id);
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

  peaceTimeAction(): void {
    // スポーン時には移動を行う
    if (this.lastMoveTime === 0) {
      this.lastMoveTime = system.currentTick;
      this.entity.setProperty("kurokumaft:mh_action", "wait");
    }

    // 死亡済み
    if (this.checkDaiState()) {
      return;
    }

    // 平常時
    const mh_action_status = this.entity.getProperty("kurokumaft:mh_action_status") as string;
    if (mh_action_status === "peacetime") {
      const action = this.entity.getProperty("kurokumaft:mh_action");
      // 最後の行動から特定時間を過ぎた時
      if (this.lastMoveTime - 20 < system.currentTick) {
        this.individualPeaceTimeAction();
      } else {
        if ("move" === action) {
          if (this.lastRotaionTime < system.currentTick) {
            this.entity.setRotation(randomAngle());
            this.lastRotaionTime = system.currentTick + 4*TicksPerSecond;;
          }
          // 向いてる方向に移動する
          this.entity.applyImpulse({
            x: this.entity.getViewDirection().x*0.02,
            y: 0,
            z: this.entity.getViewDirection().z*0.02,
          });
        }
      }
    }
  }

  damageAction(): void {

    // 死亡済み
    if (this.checkDaiState()) {
      return;
    }

    // 死亡処理
    this.setDaiAction();
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
      system.waitTicks(1*TicksPerSecond).then(() => {
        if(this.entity.isValid) {
          this.entity.remove();
        }
        MHInsectManager.removeInsect(this.entity.id);
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

  huntingDrop(): void {
    try {
      if (this.entity.isValid) {
        const pickItem = this.huntingItem();
        this.entity.dimension.spawnItem(pickItem, {
          x: this.entity.location.x,
          y: this.entity.location.y + 1.5,
          z: this.entity.location.z
        });
        // 行動を停止
        this.entity.setProperty("kurokumaft:mh_action_status", "none");
        // 残留スレッドを停止
        if (this.peaceTimeNumber !== 0) {
          system.clearRun(this.peaceTimeNumber);
          this.peaceTimeNumber = 0;
        }
        if(this.entity.isValid) {
          this.entity.remove();
        }
        MHInsectManager.removeInsect(this.entity.id);
      }
    } catch (error) {
      console.error(error);
    }
  }

  abstract huntingItem(): ItemStack;
  abstract individualPeaceTimeAction(): void;

}