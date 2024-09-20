import { ItemCustomComponent, ItemComponentHitEntityEvent, Entity, ItemStack } from "@minecraft/server";
import { sweepHit } from "../../../common/SweepAttack";


/**
 * ミスリルソード
 */
export class MithrilSword implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {
        let attackEntity = event.attackingEntity as Entity;
        let hitEntity = event.hitEntity as Entity;
        let itemStack = event.itemStack as ItemStack;
        sweepHit(attackEntity, hitEntity, 6);
    }

}
