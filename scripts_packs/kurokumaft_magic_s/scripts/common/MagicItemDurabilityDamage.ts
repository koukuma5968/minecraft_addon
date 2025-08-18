import { ItemStack, Player, ItemComponentTypes, ItemDurabilityComponent, Entity, EntityEquippableComponent, EntityComponentTypes, EquipmentSlot, EntityInventoryComponent, Container, GameMode, world, ItemEnchantableComponent } from "@minecraft/server";
import { getRandomInRange } from "./MagicCommonUtil";
import { MinecraftEnchantmentTypes } from "@minecraft/vanilla-data";

/**
 * アイテムダメージ
 * @param {Entity} entity
 * @param {ItemStack} item
 * @param {EquipmentSlot} slot
 */
async function itemDurabilityDamage(entity:Entity, item:ItemStack, slot:EquipmentSlot) {

    if (entity instanceof Player && entity.getGameMode() != GameMode.Creative) {
        const equ = entity.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;

        const durability = item.getComponent(ItemComponentTypes.Durability) as ItemDurabilityComponent;
        const dChangeRang = durability.getDamageChanceRange();
        let dChange = getRandomInRange(dChangeRang.min, dChangeRang.max);

        const enchantable = item.getComponent(ItemComponentTypes.Enchantable) as ItemEnchantableComponent;
        const unbreaking = enchantable.getEnchantment(MinecraftEnchantmentTypes.Unbreaking);
        if (unbreaking != undefined) {
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
 * 耐久値減少固定値
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
 * 魔導書（召喚）ダメージ
 * @param {Entity} entity
 * @param {ItemStack} item
 * @param {EquipmentSlot} slot
 */
async function summonGrimoireDurabilityDamage(entity:Entity, item:ItemStack, slot:EquipmentSlot) {

    if (entity instanceof Player && entity.getGameMode() != GameMode.Creative) {
        const equ = entity.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;

        const durability = item.getComponent(ItemComponentTypes.Durability) as ItemDurabilityComponent;
        if ((durability.damage + 1) >= durability.maxDurability) {
            equ.setEquipment(slot, undefined);
        } else {
            durability.damage = durability.damage + 1;
            equ.setEquipment(slot, item);
        }
    }
}

// 魔導書耐久減少
/**
 * @param {Player} player
 * @param {ItemStack} item
 */
async function decrimentGrimoireCount(player:Player, item:ItemStack) {

    if (player.getGameMode() != GameMode.Creative) {
        const lore = item.getLore();
        if (lore.length > 0) {
            let cont = Number(lore[0].substring(3));
            player.onScreenDisplay.setActionBar(cont+"");
            cont--;
            player.onScreenDisplay.setActionBar(cont+"");
            const inventory = player.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
            const con = inventory.container as Container;
            if (cont == 0) {
                player.onScreenDisplay.setActionBar("grimoire_damage");
                const grimoire_damage = new ItemStack("kurokumaft:grimoire_damage", 1);
                con.setItem(player.selectedSlotIndex, grimoire_damage);
            } else {
                item.setLore(["残数：" + cont]);
                player.onScreenDisplay.setActionBar(item.getLore());
                con.setItem(player.selectedSlotIndex, item);
            }
        }
    }
}

export {itemDurabilityDamage, itemDurabilityDamageFixed, summonGrimoireDurabilityDamage, decrimentGrimoireCount};