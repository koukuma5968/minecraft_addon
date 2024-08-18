import { ItemCustomComponent,ItemComponentBeforeDurabilityDamageEvent, ItemComponentUseEvent, ItemStack, Player, ItemComponent, ItemComponentTypes, ItemDurabilityComponent, Entity, EntityEquippableComponent, EntityComponentTypes, EquipmentSlot } from "@minecraft/server";
import { print,getRandomInRange } from "./commonUtil";

/**
 * アイテムダメージ
 * @param {Player} player
 * @param {ItemStack} item
 */
async function ItemDurabilityDamageEvent(player:Player, item:ItemStack) {

    let equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;

    let durability = item.getComponent(ItemComponentTypes.Durability) as ItemDurabilityComponent;
    print(durability.damage+"");
    let damageRan = parseFloat(getRandomInRange(durability.getDamageChanceRange().min, durability.getDamageChanceRange().max).toFixed(3));
    print(damageRan+"");
    let dChange = durability.getDamageChance(damageRan);
    print(dChange+"");

    durability.damage = durability.damage + dChange;
    print(durability.damage+"");

    equ.setEquipment(EquipmentSlot.Mainhand, item);
}

export {ItemDurabilityDamageEvent};