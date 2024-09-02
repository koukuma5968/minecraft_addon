import { ItemCustomComponent,ItemComponentBeforeDurabilityDamageEvent, ItemComponentUseEvent, ItemStack, Player, ItemComponent, ItemComponentTypes, ItemDurabilityComponent, Entity, EntityEquippableComponent, EntityComponentTypes, EquipmentSlot, EntityInventoryComponent, Container } from "@minecraft/server";
import { print,getRandomInRange } from "./commonUtil";

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

/**
 * 魔導書（召喚）ダメージ
 * @param {Entity} entity
 * @param {ItemStack} item
 * @param {EquipmentSlot} slot
 */
async function SummonGrimoireDurabilityDamage(entity:Entity, item:ItemStack, slot:EquipmentSlot) {

    let equ = entity.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;

    let durability = item.getComponent(ItemComponentTypes.Durability) as ItemDurabilityComponent;
    if ((durability.damage + 1) >= durability.maxDurability) {
        equ.setEquipment(slot, undefined);
    } else {
        durability.damage = durability.damage + 1;
        equ.setEquipment(slot, item);
    }

}

// 魔導書耐久減少
/**
 * @param {Player} player
 * @param {ItemStack} item
 */
async function decrimentGrimoireCount(player:Player, item:ItemStack) {
    let lore = item.getLore();
    if (lore.length > 0) {
        let cont = Number(lore[0].substr(3));
        cont--;
        let inventory = player.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
        let con = inventory.container as Container;
        if (cont == 0) {
            let grimoire_damage = new ItemStack("kurokumaft:grimoire_damage", 1);
            con.setItem(player.selectedSlotIndex, grimoire_damage);
        } else {
            item.setLore(["残数：" + cont]);
            con.setItem(player.selectedSlotIndex, item);
        }
    }
}

export {ItemDurabilityDamage, SummonGrimoireDurabilityDamage, decrimentGrimoireCount};