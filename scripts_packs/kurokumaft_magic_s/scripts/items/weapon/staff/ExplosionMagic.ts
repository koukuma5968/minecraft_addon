import { EntityDamageCause, Player, system } from "@minecraft/server";
import { getLookPoints } from "../../../common/commonUtil";

/**
 * エクスプロージョン
 */
export async function explosion(player:Player) {
    let {xlocation, ylocation, zlocation} = getLookPoints(player.getRotation(), player.location, 25);
    let explosion = player.dimension.spawnEntity("kurokumaft:explosionmagic", 
        {
            x:xlocation!,
            y:player.location.y + 25,
            z:zlocation!
        }
    );
}