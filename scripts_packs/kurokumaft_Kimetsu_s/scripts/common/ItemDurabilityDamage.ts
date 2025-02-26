import { ItemStack, ItemComponentTypes, ItemDurabilityComponent, Entity, EntityEquippableComponent, EntityComponentTypes, EquipmentSlot } from "@minecraft/server";
import { getRandomInRange } from "./KimetuCommonUtil";

/**
 * アイテムダメージ
 * @param {Entity} entity
 * @param {ItemStack} item
 * @param {EquipmentSlot} slot
 */
async function ItemDurabilityDamage(entity:Entity, item:ItemStack, slot:EquipmentSlot) {

    let equ = entity.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;

    let durability = item.getComponent(ItemComponentTypes.Durability) as ItemDurabilityComponent;
    let dChange = durability.getDamageChance(Math.ceil(getRandomInRange(0, 3)));

    if ((durability.damage + dChange) >= durability.maxDurability) {
        equ.setEquipment(slot, undefined);
    } else {

        durability.damage = durability.damage + dChange;
        equ.setEquipment(slot, item);
    }

}


export {ItemDurabilityDamage};