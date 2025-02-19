import { ItemCustomComponent, ItemStack, ItemComponentUseEvent, Player, EntityComponentTypes, EntityVariantComponent } from "@minecraft/server";
import { shooting } from "../../../common/ShooterEvent";

/**
 * 日輪刀（炭治郎）
 */
export class NichirintouKyouzyuro implements ItemCustomComponent {

    // 右クリック
    onUse(event:ItemComponentUseEvent) {
        let itemStack = event.itemStack as ItemStack;
        let player = event.source as Player;
        player.setDynamicProperty("kokyu", true);

        let variant = player.getComponent(EntityComponentTypes.Variant) as EntityVariantComponent;

        if (variant && variant.value == 5) {
            shooting(player, "kurokumaft:hono_tiger", 0, 2, undefined);
        }

    }

}
