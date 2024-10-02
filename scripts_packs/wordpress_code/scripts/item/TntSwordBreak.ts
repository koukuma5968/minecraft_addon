import { ItemCustomComponent, ItemComponentHitEntityEvent, Entity, Dimension, Vector3, EquipmentSlot, ItemStack } from "@minecraft/server";
import { ItemDurabilityDamage } from "../common/ItemDurabilityDamage";


/**
 * TNTソード
 */
export class TntSwordBreak implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {
        let attackEntity = event.attackingEntity as Entity;
        let hitEntity = event.hitEntity as Entity;
        let item = event.itemStack as ItemStack;
        tntBreak(attackEntity, item, hitEntity.location);
    }

}

export async function tntBreak(attackEntity:Entity, itemStack:ItemStack, location:Vector3) {
    attackEntity.dimension.spawnEntity("kurokumaft:tnt_sword_break", location);
    ItemDurabilityDamage(attackEntity, itemStack, EquipmentSlot.Mainhand, undefined);
}