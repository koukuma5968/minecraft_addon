import { ItemStack, ItemComponentTypes, ItemDurabilityComponent, Entity, EntityEquippableComponent, EntityComponentTypes, EquipmentSlot, GameMode, Player } from "@minecraft/server";
import { getRandomInRange } from "./KimetuCommonUtil";

/**
 * アイテムダメージ
 * @param {Entity} entity
 * @param {ItemStack} item
 * @param {EquipmentSlot} slot
 */
async function ItemDurabilityDamage(entity:Entity, item:ItemStack, slot:EquipmentSlot) {

    if (entity instanceof Player && entity.getGameMode() != GameMode.creative) {
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

}

/**
 * アイテムスタック減少
 * @param {Player} player
 * @param {ItemStack} item
 * @param {EquipmentSlot} slot
 * @param {number} decNum
 */
async function subtractionItem(player: Player, item: ItemStack, slot: EquipmentSlot, decNum: number) {
    let remaining = item.amount - decNum;
    let equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
    if (remaining <= 0) {
        equ.setEquipment(slot, undefined);
    } else {
        item.amount -= decNum;
        equ.setEquipment(slot, item);
    }
};

export {ItemDurabilityDamage, subtractionItem};