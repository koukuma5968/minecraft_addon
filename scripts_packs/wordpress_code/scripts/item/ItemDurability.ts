import { Entity, EntityComponentTypes, EntityEquippableComponent, EquipmentSlot, ItemComponentMineBlockEvent, ItemComponentTypes, ItemCustomComponent, ItemDurabilityComponent, ItemStack } from "@minecraft/server";

export class ItemDurability implements ItemCustomComponent {
    // ブロックを破壊した時のイベント
    onMineBlock(event:ItemComponentMineBlockEvent) {
        // 攻撃したエンティティ
        let source = event.source as Entity;
        // 使用したアイテム
        let itemStack = event.itemStack as ItemStack;
        decreaseDurability(source, itemStack);
    }
}

/**
 * アイテム耐久値を固定で「1」減らす
 * @param {Entity} source
 * @param {ItemStack} itemStack
 */
async function decreaseDurability(source:Entity, itemStack:ItemStack) {
    // エンティティの装備スロットを取得
    let equ = source.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
    // アイテムの耐久値を取得
    let durability = itemStack.getComponent(ItemComponentTypes.Durability) as ItemDurabilityComponent;
    if ((durability.damage-1) >= durability.maxDurability) {
        // 現在の耐久値-1 が最大耐久値に達したらメインハンドを空にする（アイテム壊れる）
        equ.setEquipment(EquipmentSlot.Mainhand, undefined);
    } else {
        // 現在の耐久値-1してメインハンドにセットしなおす
        durability.damage += 1;
        equ.setEquipment(EquipmentSlot.Mainhand, itemStack);
    }

}