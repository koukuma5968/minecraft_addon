import { ItemCustomComponent, ItemStack, ItemComponentUseEvent, Player, EntityComponentTypes, EntityVariantComponent } from "@minecraft/server";
import { shooting } from "../../../custom/ShooterMagicEvent";

/**
 * 血気術
 */
export class KekkizyutuKoushi implements ItemCustomComponent {

    // 右クリック
    onUse(event:ItemComponentUseEvent) {
        let itemStack = event.itemStack as ItemStack;
        let player = event.source as Player;

        let variant = player.getComponent(EntityComponentTypes.Variant) as EntityVariantComponent;
        if (variant && variant.value == 3) {
            shooting(player, "kurokumaft:kokushirinten", {x:0,y:0,z:0}, 6, undefined);
        }

    }

}