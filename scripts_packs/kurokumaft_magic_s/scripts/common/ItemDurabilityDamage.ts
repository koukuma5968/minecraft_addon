import { ItemCustomComponent,ItemComponentBeforeDurabilityDamageEvent, ItemComponentUseEvent, ItemStack, Player, ItemComponent, ItemComponentTypes, ItemDurabilityComponent, Entity, EntityEquippableComponent, EntityComponentTypes, EquipmentSlot } from "@minecraft/server";
import { print,getRandomInRange } from "./commonUtil";

/**
 * アイテムダメージ
 * @param {Entity} entity
 * @param {ItemStack} item
 * @param {EquipmentSlot} slot
 */
async function ItemDurabilityDamageEvent(entity:Entity, item:ItemStack, slot:EquipmentSlot) {

    let equ = entity.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;

    let durability = item.getComponent(ItemComponentTypes.Durability) as ItemDurabilityComponent;
//    let damageRan = Math.ceil(getRandomInRange(durability.getDamageChanceRange().min, durability.getDamageChanceRange().max));
    let dChange = durability.getDamageChance(Math.ceil(getRandomInRange(0, 3)));
    print(dChange);

    if ((durability.damage + dChange) >= durability.maxDurability) {
        equ.setEquipment(slot, undefined);
    } else {

        durability.damage = durability.damage + dChange;
        equ.setEquipment(slot, item);
    }

}

export {ItemDurabilityDamageEvent};