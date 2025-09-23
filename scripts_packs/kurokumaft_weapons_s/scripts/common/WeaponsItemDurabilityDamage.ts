import { ItemStack, Player, ItemComponentTypes, ItemDurabilityComponent, Entity, EntityEquippableComponent, EntityComponentTypes, EquipmentSlot, GameMode, EntityInventoryComponent, Container, ItemEnchantableComponent } from "@minecraft/server";
import { getRandomInRange } from "./WeaponsCommonUtil";
import { MinecraftEnchantmentTypes } from "@minecraft/vanilla-data";

/**
 * アイテムダメージ
 * @param {Entity} entity
 * @param {ItemStack} item
 * @param {EquipmentSlot} slot
 */
async function itemDurabilityDamage(entity:Entity, item:ItemStack, slot:EquipmentSlot) {

    if (entity instanceof Player && entity.getGameMode() != GameMode.Creative) {
        const durability = item.getComponent(ItemComponentTypes.Durability) as ItemDurabilityComponent;
        const dChangeRang = durability.getDamageChanceRange();
        let dChange = getRandomInRange(dChangeRang.min, dChangeRang.max);

        const enchantable = item.getComponent(ItemComponentTypes.Enchantable) as ItemEnchantableComponent;
        const unbreaking = enchantable.getEnchantment(MinecraftEnchantmentTypes.Unbreaking);
        if (unbreaking !== undefined) {
            dChange = durability.getDamageChance(unbreaking.level);
        }

        const equippable = entity.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        const mainHand = equippable.getEquipment(slot);
        if (mainHand !== undefined) {
            if (mainHand.typeId === item.typeId) {
                if ((durability.damage + dChange) >= durability.maxDurability) {
                    equippable.setEquipment(slot, undefined);
                } else {
                    durability.damage = durability.damage + dChange;
                    equippable.setEquipment(slot, item);
                }
            }
        }

    }

}

/**
 * 耐久値減少
 * @param {Entity} entity
 * @param {ItemStack} item
 * @param {EquipmentSlot} slot
 * @param {number} damage
 */
async function itemDurabilityDamageFixed(entity:Entity, item:ItemStack, slot:EquipmentSlot, damage:number) {

    if (entity instanceof Player && entity.getGameMode() == GameMode.Creative) {
        return;
    }

    const equ = entity.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;

    const durability = item.getComponent(ItemComponentTypes.Durability) as ItemDurabilityComponent;

    if ((durability.damage + damage) >= durability.maxDurability) {
        equ.setEquipment(slot, undefined);
    } else {
        durability.damage = durability.damage + damage;
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
    if (damage !== undefined) {
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

export {itemDurabilityDamage, itemDurabilityDamageFixed, throwItemDurabilityDamage, subtractionItem};