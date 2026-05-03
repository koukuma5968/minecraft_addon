import { Entity, ItemStack, TicksPerSecond, system } from "@minecraft/server";
import { MHInsectActionBase } from "./MHInsectActionBase";
import { weightChoice } from "../../common/MHCommonUtil";

// 平静時行動アクション
const MHImmortalInsectTimeAction = weightChoice([
  {weight: 0.6, choice: "move"},
  {weight: 0.4, choice: "wait"}
]);

// 剥ぎ取りアイテム
const MHImmortalInsectHuntingItem = "kurokumaft:bitter_bug_item";

/**
 * にが虫の行動制御クラス
 */
export class BitterBugAction extends MHInsectActionBase {

  constructor(entity: Entity) {
    super(entity);
  }

  individualPeaceTimeAction(): void {

    // 現アクション
    const action = this.entity.getProperty("kurokumaft:mh_action");
    if (!this.changeActionflg) {
      // 変更後アクション
      this.changeAction = MHImmortalInsectTimeAction.pick();
      this.changeActionflg = true;
    }
    if (this.lastMoveTime < system.currentTick) {
      this.changeActionflg = false;
      if ("move" === this.changeAction) {
        this.lastMoveTime = system.currentTick + 10*TicksPerSecond;
      } else if ("wait" === action) {
        this.moveLotationY = this.entity.location.y;
        this.lastMoveTime = system.currentTick + 8*TicksPerSecond;
      }
      this.entity.setProperty("kurokumaft:mh_action", this.changeAction);
    }
    if (this.changeActionflg && "move" === action && "wait" === this.changeAction) {
      // 地面に着地する
      const blockRay = this.entity.dimension.getBlockFromRay(
        this.entity.location,
        { x: 0, y: -1, z: 0 },
        {includeLiquidBlocks: false, includePassableBlocks: true}
      )
      if (blockRay !== undefined) {
        const blockLoc = blockRay.block.location;
        const enLoc = this.entity.location;
        if (blockLoc.y + 0.5 < enLoc.y) {
          this.entity.applyImpulse({
            x: 0,
            y: -0.1,
            z: 0,
          });
        }
      }
    } else if (this.changeActionflg && "wait" === action && "move" === this.changeAction) {
      // 地面から離れる
      const enLoc = this.entity.location;
      if (this.moveLotationY + 2.5 > enLoc.y) {
        this.entity.applyImpulse({
          x: 0,
          y: 0.13,
          z: 0,
        });
      }
    }
  }

  huntingItem(): ItemStack {
    return new ItemStack(MHImmortalInsectHuntingItem);
  }

}
