import { ItemStack, ItemComponentTypes, ItemDurabilityComponent, Entity, EntityEquippableComponent, EntityComponentTypes, 
    EquipmentSlot, GameMode, Player, ItemEnchantableComponent } from "@minecraft/server";
import { getRandomInRange } from "./KimetuCommonUtil";

/**
 * アイテムダメージ
 * @param {Entity} entity
 * @param {ItemStack} item
 */
async function ItemDurabilityDamage(entity:Entity, item:ItemStack) {

    if (entity instanceof Player && entity.getGameMode() !== GameMode.Creative) {
        const durability = item.getComponent(ItemComponentTypes.Durability) as ItemDurabilityComponent;
        const dChangeRang = durability.getDamageChanceRange();
        let dChange = getRandomInRange(dChangeRang.min, dChangeRang.max);

        const enchantable = item.getComponent(ItemComponentTypes.Enchantable) as ItemEnchantableComponent;
        const unbreaking = enchantable.getEnchantment("minecraft:unbreaking");
        if (unbreaking !== undefined) {
            dChange = durability.getDamageChance(unbreaking.level);
        }

        const equippable = entity.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        const mainHand = equippable.getEquipment(EquipmentSlot.Mainhand);
        if (mainHand !== undefined) {
            if (mainHand.typeId === item.typeId) {
                if ((durability.damage + dChange) >= durability.maxDurability) {
                    equippable.setEquipment(EquipmentSlot.Mainhand, undefined);
                } else {
                    durability.damage = durability.damage + dChange;
                    equippable.setEquipment(EquipmentSlot.Mainhand, item);
                }
            }
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