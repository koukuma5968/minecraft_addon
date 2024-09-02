import { EntityDamageCause, Player, system } from "@minecraft/server";
import { getLookPoints, getRandomInRange } from "../../../common/commonUtil";
import { shooting } from "../../../custom/ShooterMagicEvent";

/**
 * 岩割刃(がんかつじん)
 */
export async function stoneDesires(player:Player) {
    player.addTag("stone_desires");

    let {xlocation, ylocation, zlocation} = getLookPoints(player.getRotation(), player.location, 2);
    let targets = player.dimension.getEntities({
        excludeTags: [
            "stone_desires"
        ],
        excludeFamilies: [
            "inanimate", "magic", "player"
        ],
        excludeTypes: [
            "item"
        ],
        location: {x:xlocation!, y:player.location.y + 0.5, z:zlocation!},
        maxDistance: 3,
        closest: 1
    });

    targets.forEach(en => {
        en.runCommand("/particle kurokumaft:stone_desires_particle ~~~");
        en.applyDamage(5, {
            cause: EntityDamageCause.piston
        });
    });
    player.removeTag("stone_desires");
}

/**
 * 破岩衝(はがんしょう)
 */
export async function breakRockSlash(player:Player) {

    let xran = parseFloat(getRandomInRange(-0.2, 0.1).toFixed(3));
    let yran = parseFloat(getRandomInRange(-0.2, 0.2).toFixed(3));
    let zran = parseFloat(getRandomInRange(-0.2, 0.2).toFixed(3));

    shooting(player, "kurokumaft:break_rock_slash", {x:xran,y:yran,z:zran}, 3, undefined);

}