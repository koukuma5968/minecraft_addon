import { Player, ItemComponentTypes, EntityComponentTypes, GameMode } from "@minecraft/server";
import { getRandomInRange } from "./commonUtil";
/**
 * 耐久値減少
 * @param {Entity} entity
 * @param {ItemStack} item
 * @param {EquipmentSlot} slot
 * @param {number} damage
 */
function ItemDurabilityDamage(entity, item, slot, damage) {
    return __awaiter(this, void 0, void 0, function* () {
        if (entity instanceof Player && entity.getGameMode() == GameMode.creative) {
            return;
        }
        let equ = entity.getComponent(EntityComponentTypes.Equippable);
        let durability = item.getComponent(ItemComponentTypes.Durability);
        let dChange;
        if (damage) {
            dChange = damage;
        }
        else {
            dChange = durability.getDamageChance(Math.ceil(getRandomInRange(0, 3)));
        }
        if ((durability.damage + dChange) >= durability.maxDurability) {
            equ.setEquipment(slot, undefined);
        }
        else {
            durability.damage = durability.damage + dChange;
            equ.setEquipment(slot, item);
        }
    });
}
/**
 * 耐久値減少(投擲)
 * @param {Entity} entity
 * @param {ItemStack} item
 * @param {number} slotNum
 * @param {number} damage
 */
function throwItemDurabilityDamage(entity, item, slotNum, damage) {
    return __awaiter(this, void 0, void 0, function* () {
        if (entity instanceof Player && entity.getGameMode() == GameMode.creative) {
            return;
        }
        let invent = entity.getComponent(EntityComponentTypes.Inventory);
        let container = invent.container;
        let durability = item.getComponent(ItemComponentTypes.Durability);
        let dChange;
        if (damage) {
            dChange = damage;
        }
        else {
            dChange = durability.getDamageChance(Math.ceil(getRandomInRange(0, 3)));
        }
        if ((durability.damage + dChange) >= durability.maxDurability) {
            container.setItem(slotNum, undefined);
        }
        else {
            durability.damage = durability.damage + dChange;
            container.setItem(slotNum, item);
        }
    });
}
/**
 * アイテムスタック減少
 * @param {Player} player
 * @param {ItemStack} item
 * @param {EquipmentSlot} slot
 * @param {number} decNum
 */
function subtractionItem(player, item, slot, decNum) {
    return __awaiter(this, void 0, void 0, function* () {
        let remaining = item.amount - decNum;
        let equ = player.getComponent(EntityComponentTypes.Equippable);
        if (remaining <= 0) {
            equ.setEquipment(slot, undefined);
        }
        else {
            item.amount -= decNum;
            equ.setEquipment(slot, item);
        }
    });
}
;
export { ItemDurabilityDamage, throwItemDurabilityDamage, subtractionItem };
//# sourceMappingURL=ItemDurabilityDamage.js.map