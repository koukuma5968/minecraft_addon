import { ItemComponent, ItemComponentTypes, ItemComponentUseEvent, ItemCooldownComponent, ItemCustomComponent, ItemStack, Player } from "@minecraft/server";
import { throwing } from "../../custom/ShooterMagicEvent";
import { getRandomInRange } from "../../common/commonUtil";
import { ItemDurabilityDamageEvent } from "../../common/ItemDurabilityDamage";

/**
 * ファイアボール
 */
export class FireBallShot implements ItemCustomComponent {

    onUse(event:ItemComponentUseEvent) {
        let itemStack = event.itemStack as ItemStack;
        let player = event.source as Player;

        let xran = parseFloat(getRandomInRange(-0.1, 0.5).toFixed(3));
        let yran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
        let zran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));

        ItemDurabilityDamageEvent(player, itemStack);
        throwing(player, itemStack, "kurokumaft:fireballmagic", {x:xran,y:yran,z:zran});

    }

}