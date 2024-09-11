import { ItemCustomComponent, ItemStack, ItemComponentUseEvent, Player, EntityComponentTypes, EntityVariantComponent } from "@minecraft/server";
import { getRandomInRange } from "../../../common/commonUtil";
import { shooting } from "../../../custom/ShooterMagicEvent";

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
            let xran = parseFloat(getRandomInRange(-0.3, 0.3).toFixed(3));
            let yran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
    
            shooting(player, "kurokumaft:hono_tiger", {x:xran,y:yran,z:0}, 2, undefined);
        }

    }

}
