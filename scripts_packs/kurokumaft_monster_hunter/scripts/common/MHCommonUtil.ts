import { Container, EntityComponentTypes, EntityEquippableComponent, EquipmentSlot, ItemStack, Player, Vector2 } from "@minecraft/server";

export const weightChoice = (list: any[]) => {
    const totalWeight = list.reduce((p, c) => {
        return { weight: p.weight + c.weight }
    }).weight

    return {
        pick () {
            const r = Math.random() * totalWeight;
            let s = 0.0;
            for (const l of list) {
                s += l.weight
                if (r < s) { return l.choice }
            }
        }
    }
};

export function randomAngle(): Vector2 {
  return {
    x: 0,
    y: Math.floor(Math.random() * 360) - 179
  };
}

/**
 * アイテムスタック減少
 * @param {Player} player
 * @param {ItemStack} item
 * @param {EquipmentSlot} slot
 * @param {number} decNum
 */
export async function subtractionItem(player: Player, item: ItemStack, slot: EquipmentSlot, decNum: number) {
    const remaining = item.amount - decNum;
    const equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
    if (remaining <= 0) {
        equ.setEquipment(slot, undefined);
    } else {
        item.amount -= decNum;
        equ.setEquipment(slot, item);
    }
};

/**
 * コンテナスタック減少
 * @param {Player} player
 * @param {ItemStack} item
 * @param {EquipmentSlot} slot
 * @param {number} decNum
 */
export async function subtractionContainerItem(container: Container, slot: number, decNum: number) {
    const item = container.getItem(slot) as ItemStack;
    const remaining = item.amount - decNum;
    if (remaining <= 0) {
        container.setItem(slot, undefined);
    } else {
        item.amount -= decNum;
        container.setItem(slot, item);
    }
};
