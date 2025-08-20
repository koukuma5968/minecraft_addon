import { ItemStack, Player, ItemComponentTypes, ItemDurabilityComponent, Entity, EntityEquippableComponent, 
    EntityComponentTypes, EquipmentSlot, GameMode, EntityInventoryComponent, Container } from "@minecraft/server";
import { getRandomInRange } from "./PikuminCommonUtil";

/**
 * 耐久値減少
 * @param {Entity} entity
 * @param {ItemStack} item
 * @param {EquipmentSlot} slot
 * @param {number} damage
 */
async function ItemDurabilityDamage(entity:Entity, item:ItemStack, slot:EquipmentSlot, damage:number|undefined) {

    if (entity instanceof Player && entity.getGameMode() == GameMode.Creative) {
        return;
    }

    const equ = entity.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;

    const durability = item.getComponent(ItemComponentTypes.Durability) as ItemDurabilityComponent;
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

    if (entity instanceof Player && entity.getGameMode() == GameMode.Creative) {
        return;
    }

    const invent = entity.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
    const container = invent.container as Container;

    const durability = item.getComponent(ItemComponentTypes.Durability) as ItemDurabilityComponent;
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

/**
 * アイテムスタック減少
 * @param {Player} player
 * @param {ItemStack} item
 * @param {EquipmentSlot} slot
 * @param {number} decNum
 */
async function subtractionItem(player: Player, item: ItemStack, slot: EquipmentSlot, decNum: number) {
    const remaining = item.amount - decNum;
    const equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
    if (remaining <= 0) {
        equ.setEquipment(slot, undefined);
    } else {
        item.amount -= decNum;
        equ.setEquipment(slot, item);
    }
};

export {ItemDurabilityDamage, throwItemDurabilityDamage, subtractionItem};