import { ItemStack, ItemComponentTypes, ItemDurabilityComponent, Entity, EntityEquippableComponent, EntityComponentTypes, EquipmentSlot, GameMode, Player, world, ItemEnchantableComponent, EnchantmentType } from "@minecraft/server";
import { getRandomInRange } from "./KimetuCommonUtil";
import { MinecraftEnchantmentTypes } from "@minecraft/vanilla-data";

/**
 * アイテムダメージ
 * @param {Entity} entity
 * @param {ItemStack} item
 * @param {EquipmentSlot} slot
 */
async function ItemDurabilityDamage(entity:Entity, item:ItemStack, slot:EquipmentSlot) {

    if (entity instanceof Player && entity.getGameMode() !== GameMode.creative) {
        const equ = entity.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;

        const durability = item.getComponent(ItemComponentTypes.Durability) as ItemDurabilityComponent;
        const dChangeRang = durability.getDamageChanceRange();
        let dChange = getRandomInRange(dChangeRang.min, dChangeRang.max);

        const enchantable = item.getComponent(ItemComponentTypes.Enchantable) as ItemEnchantableComponent;
        const unbreaking = enchantable.getEnchantment(MinecraftEnchantmentTypes.Unbreaking);
        if (unbreaking !== undefined) {
            dChange = durability.getDamageChance(unbreaking.level);
        }

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
    const remaining = item.amount - decNum;
    const equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
    if (remaining <= 0) {
        equ.setEquipment(slot, undefined);
    } else {
        item.amount -= decNum;
        equ.setEquipment(slot, item);
    }
};

export {ItemDurabilityDamage, subtractionItem};