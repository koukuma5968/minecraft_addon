import { EquipmentSlot } from "@minecraft/server";
import { itemCoolDown } from "../common/PikuminCommonUtil";
import { ItemDurabilityDamage } from "../common/PikuminItemDurabilityDamage";
import { Pikumin } from "../entity/Pikmin";
/**
 * 唐辛子スプレー
 */
export class ExtremelyHotSpray {
    onUse(event) {
        const source = event.source;
        const itemStack = event.itemStack;
        source.dimension.spawnParticle("kurokumaft:extremely_hot_spray", source.location);
        const filterOption = {
            families: [
                "pikmin"
            ],
            location: source.location,
            maxDistance: 8
        };
        const targets = source.dimension.getEntities(filterOption);
        targets.forEach(en => {
            en.setProperty("kurokumaft:mode", "hot");
            new Pikumin().checkExtremelyHotTime(en);
        });
        ItemDurabilityDamage(source, itemStack, EquipmentSlot.Mainhand, undefined);
        itemCoolDown(source, itemStack);
    }
}
//# sourceMappingURL=ExtremelyHotSpray.js.map