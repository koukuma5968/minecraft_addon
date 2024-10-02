import { ItemStack, Player, ItemComponentTypes, ItemDurabilityComponent, Entity, EntityEquippableComponent, EntityComponentTypes, EquipmentSlot, GameMode, EntityInventoryComponent, Container } from "@minecraft/server";
import { getRandomInRange } from "./commonUtil";

/**
 * 耐久値減少
 * @param {Entity} entity
 * @param {ItemStack} item
 * @param {EquipmentSlot} slot
 * @param {number} damage
 */
async function ItemDurabilityDamage(entity:Entity, item:ItemStack, slot:EquipmentSlot, damage:number|undefined) {

    if (entity instanceof Player && entity.getGameMode() == GameMode.creative) {
        return;
    }

    let equ = entity.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;

    let durability = item.getComponent(ItemComponentTypes.Durability) as ItemDurabilityComponent;
    let dChange;
    if (damage) {
        dChange = damage;
    } else {
        dChange = durability.getDamageChance(Math.ceil(getRandomInRange(0, 3)));
    }

    if ((durability.damage + dChange) >= durability.maxDurability) {
        equ.setEquipment(slot, undefined);
    } else {
        durability.damage = durability.damage + dChange;
        equ.setEquipment(slot, item);
    }

}

/**
 * 耐久値減少(投擲)
 * @param {Entity} entity
 * @param {ItemStack} item
 * @param {number} slotNum
 * @param {number} damage
 */
async function throwItemDurabilityDamage(entity:Entity, item:ItemStack, slotNum:number, damage:number|undefined) {

    if (entity instanceof Player && entity.getGameMode() == GameMode.creative) {
        return;
    }

    let invent = entity.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
    let container = invent.container as Container;

    let durability = item.getComponent(ItemComponentTypes.Durability) as ItemDurabilityComponent;
    let dChange;
    if (damage) {
        dChange = damage;
    } else {
        dChange = durability.getDamageChance(Math.ceil(getRandomInRange(0, 3)));
    }

    if ((durability.damage + dChange) >= durability.maxDurability) {
        container.setItem(slotNum, undefined);
    } else {
        durability.damage = durability.damage + dChange;
        container.setItem(slotNum, item);
    }

}

export {ItemDurabilityDamage, throwItemDurabilityDamage};
