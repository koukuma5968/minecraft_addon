import { ItemCustomComponent, ItemComponentHitEntityEvent, Entity, EquipmentSlot, ItemComponentUseEvent, ItemStack, Player } from "@minecraft/server";
import { itemCoolDown } from "../common/commonUtil";
import { ItemDurabilityDamage } from "../common/ItemDurabilityDamage";

/**
 * 唐辛子スプレー
 */
export class ExtremelyHotSpray implements ItemCustomComponent {

    onUse(event:ItemComponentUseEvent) {
        let source = event.source as Player;
        let itemStack = event.itemStack as ItemStack;
        ItemDurabilityDamage(source, itemStack, EquipmentSlot.Mainhand, undefined);
        itemCoolDown(source, itemStack);
    }

}
