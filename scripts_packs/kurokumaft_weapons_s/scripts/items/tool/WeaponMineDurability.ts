import { ItemCustomComponent, ItemStack, Player, EquipmentSlot, ItemComponentMineBlockEvent } from "@minecraft/server";
import { itemDurabilityDamage } from "../../common/WeaponsItemDurabilityDamage";

/**
 * 採掘耐久減少
 */
export class WeaponMineDurability implements ItemCustomComponent {

    onMineBlock(event:ItemComponentMineBlockEvent) {
        const source = event.source as Player;
        const itemStack = event.itemStack as ItemStack;
        itemDurabilityDamage(source, itemStack, EquipmentSlot.Mainhand);
    }
}
