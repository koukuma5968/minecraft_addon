import { ItemStack, Player, ItemComponentTypes, ItemDurabilityComponent, Entity, EntityEquippableComponent, EntityComponentTypes, EquipmentSlot, EntityInventoryComponent, Container, GameMode, world } from "@minecraft/server";
import { getRandomInRange } from "./MagicCommonUtil";

/**
 * アイテムダメージ
 * @param {Entity} entity
 * @param {ItemStack} item
 * @param {EquipmentSlot} slot
 */
async function itemDurabilityDamage(entity:Entity, item:ItemStack, slot:EquipmentSlot) {

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
 * 耐久値減少固定値
 * @param {Entity} entity
 * @param {ItemStack} item
 * @param {EquipmentSlot} slot
 * @param {number} damage
 */
async function itemDurabilityDamageFixed(entity:Entity, item:ItemStack, slot:EquipmentSlot, damage:number) {

    if (entity instanceof Player && entity.getGameMode() == GameMode.creative) {
        return;
    }

    let equ = entity.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;

    let durability = item.getComponent(ItemComponentTypes.Durability) as ItemDurabilityComponent;

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

    if (entity instanceof Player && entity.getGameMode() != GameMode.creative) {
        let equ = entity.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;

        let durability = item.getComponent(ItemComponentTypes.Durability) as ItemDurabilityComponent;
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

    if (player.getGameMode() != GameMode.creative) {
        let lore = item.getLore();
        if (lore.length > 0) {
            let cont = Number(lore[0].substring(3));
            world.sendMessage(cont+"");
            cont--;
            world.sendMessage(cont+"");
            let inventory = player.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
            let con = inventory.container as Container;
            if (cont == 0) {
                world.sendMessage("grimoire_damage");
                let grimoire_damage = new ItemStack("kurokumaft:grimoire_damage", 1);
                con.setItem(player.selectedSlotIndex, grimoire_damage);
            } else {
                item.setLore(["残数：" + cont]);
                world.sendMessage(item.getLore());
                con.setItem(player.selectedSlotIndex, item);
            }
        }
    }
}

export {itemDurabilityDamage, itemDurabilityDamageFixed, summonGrimoireDurabilityDamage, decrimentGrimoireCount};