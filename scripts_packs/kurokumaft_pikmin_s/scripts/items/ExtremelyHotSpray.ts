import { ItemCustomComponent, EquipmentSlot, ItemComponentUseEvent, ItemStack, Player, EntityQueryOptions } from "@minecraft/server";
import { itemCoolDown } from "../common/PikuminCommonUtil";
import { ItemDurabilityDamage } from "../common/PikuminItemDurabilityDamage";

/**
 * 唐辛子スプレー
 */
export class ExtremelyHotSpray implements ItemCustomComponent {

    onUse(event:ItemComponentUseEvent) {
        const source = event.source as Player;
        const itemStack = event.itemStack as ItemStack;

        source.dimension.spawnParticle("kurokumaft:extremely_hot_spray", source.location);
        const filterOption = {
            families: [
                "pikmin"
            ],
            location: source.location,
            maxDistance: 6
        } as EntityQueryOptions;
        const targets = source.dimension.getEntities(filterOption);
        targets.forEach(en => {
            en.triggerEvent("kurokumaft:extremely_hot_up");
        });

        ItemDurabilityDamage(source, itemStack, EquipmentSlot.Mainhand, undefined);
        itemCoolDown(source, itemStack);
    }

}
