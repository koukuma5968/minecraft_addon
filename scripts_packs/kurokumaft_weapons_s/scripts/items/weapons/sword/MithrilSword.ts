import { ItemCustomComponent, ItemComponentHitEntityEvent, Entity, ItemStack } from "@minecraft/server";
import { sweepHit } from "../../../common/WeaponsSweepAttack";


/**
 * ミスリルソード
 */
export class MithrilSword implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {
        const attackEntity = event.attackingEntity as Entity;
        const hitEntity = event.hitEntity as Entity;
        const itemStack = event.itemStack as ItemStack;
        sweepHit(attackEntity, hitEntity, 6);
    }

}
