import { ItemCustomComponent, ItemStack, ItemComponentUseEvent, Player, EntityComponentTypes, EntityVariantComponent } from "@minecraft/server";
import { shooting } from "../../../common/ShooterEvent";

/**
 * 血気術
 */
export class KekkizyutuTigama implements ItemCustomComponent {

    // 右クリック
    onUse(event:ItemComponentUseEvent) {
        let itemStack = event.itemStack as ItemStack;
        let player = event.source as Player;

        let variant = player.getComponent(EntityComponentTypes.Variant) as EntityVariantComponent;
        if (variant && variant.value == 1) {
            shooting(player, "kurokumaft:tobi_tigama", 0, 4, undefined);
        }

    }

}
