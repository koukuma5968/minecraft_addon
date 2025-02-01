import { EquipmentSlot } from "@minecraft/server";
import { itemCoolDown } from "../common/commonUtil";
import { ItemDurabilityDamage } from "../common/ItemDurabilityDamage";
/**
 * 唐辛子スプレー
 */
export class ExtremelyHotSpray {
    onUse(event) {
        let source = event.source;
        let itemStack = event.itemStack;
        ItemDurabilityDamage(source, itemStack, EquipmentSlot.Mainhand, undefined);
        itemCoolDown(source, itemStack);
    }
}
//# sourceMappingURL=ExtremelyHotSpray.js.map