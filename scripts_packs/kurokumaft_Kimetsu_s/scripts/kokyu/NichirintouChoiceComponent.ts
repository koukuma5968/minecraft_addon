import { ItemStack, Player, ItemComponentTypes, ItemEnchantableComponent, EntityComponentTypes, EntityEquippableComponent, EquipmentSlot } from "@minecraft/server";
import { weightChoice } from "../common/KimetuCommonUtil";
import { NichirintouUseComponent } from "./NichirintouUseComponent";

const nichirintouLists = weightChoice([
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

export class NichirintouChoiceComponent implements NichirintouUseComponent {

    changeKata(player: Player): void {
    }
    hitAttackKata(player: Player, itemStack: ItemStack): void {
    }
    useAttackKata(player: Player, itemStack: ItemStack): void {
    }
    releaseAttackKata(player: Player, itemStack: ItemStack, duration:number): void {
        this.probabilisticChoice(itemStack, player);
    }

    /**
     * 日輪刀色変わり
     * @param {ItemStack} itemStack
     * @param {Player} player
     */
    probabilisticChoice(itemStack:ItemStack, player:Player) {

        player.setProperty("kurokumaft:kokyu_particle", false);
        player.setProperty("kurokumaft:kokyu_use", false);

        let nichirintou = nichirintouLists.pick();

        let enchant = itemStack.getComponent(ItemComponentTypes.Enchantable) as ItemEnchantableComponent;

        let changeItem = new ItemStack(nichirintou);
        let newEnchant = changeItem.getComponent(ItemComponentTypes.Enchantable) as ItemEnchantableComponent;
        newEnchant.addEnchantments(enchant.getEnchantments());

        let equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        equ.setEquipment(EquipmentSlot.Mainhand, changeItem);

    }

}