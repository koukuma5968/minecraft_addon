import { ItemCustomComponent, ItemStack, Player, EquipmentSlot, ItemComponentMineBlockEvent, ItemComponentUseOnEvent } from "@minecraft/server";
import { ItemDurabilityDamage } from "../../common/ItemDurabilityDamage";

/**
 * 銅のバケツ
 */
export class CopperBucket implements ItemCustomComponent {

    onUseOn(event:ItemComponentUseOnEvent) {
        let source = event.source as Player;
        let itemStack = event.itemStack as ItemStack;
        ItemDurabilityDamage(source, itemStack, EquipmentSlot.Mainhand, undefined);
    }
}
