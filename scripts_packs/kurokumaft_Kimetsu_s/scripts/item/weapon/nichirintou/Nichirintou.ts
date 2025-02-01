import { ItemCustomComponent, ItemStack, world, ItemComponentUseEvent, Player, ItemComponentCompleteUseEvent, EntityComponentTypes, EntityInventoryComponent, Container, EquipmentSlot, EntityEquippableComponent, ItemComponentTypes, ItemEnchantableComponent } from "@minecraft/server";

const ProbabilisticChoice = (list: any[]) => {
    const totalWeight = list.reduce((p, c) => {
        return { weight: p.weight + c.weight }
    }).weight

    return {
        pick () {
        const r = Math.random() * totalWeight;
        let s = 0.0;
        for (const l of list) {
            s += l.weight
            if (r < s) { return l.item }
        }
        }
    }
};

const nichirintouLists = ProbabilisticChoice([
    { item: 'kurokumaft:nichirintou_mizu' , weight: 50 },
    { item: 'kurokumaft:nichirintou_hono' , weight: 30 },
    { item: 'kurokumaft:nichirintou_kaze' , weight: 20 },
    { item: 'kurokumaft:nichirintou_hana' , weight: 20 },
    { item: 'kurokumaft:nichirintou_kaminari' , weight: 15 },
    { item: 'kurokumaft:nichirintou_koi' , weight: 5 },
    { item: 'kurokumaft:nichirintou_mushi' , weight: 5 },
    { item: 'kurokumaft:nichirintou_oto' , weight: 5 },
    { item: 'kurokumaft:nichirintou_hi' , weight: 1 },
]);

/**
 * 日輪刀
 */
export class Nichirintou implements ItemCustomComponent {

    // 右クリック
    onUse(event:ItemComponentUseEvent) {
        let player = event.source as Player;
        player.setDynamicProperty("kokyu", true);
    }

}

/**
 * 日輪刀色変わり
 * @param {ItemStack} itemStack
 * @param {Player} player
 */
export async function probabilisticChoice(itemStack:ItemStack, player:Player) {
    let nichirintou = nichirintouLists.pick();

    let enchant = itemStack.getComponent(ItemComponentTypes.Enchantable) as ItemEnchantableComponent;

    let changeItem = new ItemStack(nichirintou);
    let newEnchant = changeItem.getComponent(ItemComponentTypes.Enchantable) as ItemEnchantableComponent;
    newEnchant.addEnchantments(enchant.getEnchantments());

    let equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
    equ.setEquipment(EquipmentSlot.Mainhand, changeItem);

}
