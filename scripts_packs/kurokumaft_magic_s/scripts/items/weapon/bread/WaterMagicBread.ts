import { EntityDamageCause, Player, system } from "@minecraft/server";
import { getLookPoints, getRandomInRange } from "../../../common/commonUtil";
import { shooting } from "../../../custom/ShooterMagicEvent";

/**
 * 蒼破斬(そうはざん)
 */
export async function aquaDesires(player:Player) {
    player.addTag("aqua_desires");

    let {xlocation, ylocation, zlocation} = getLookPoints(player.getRotation(), player.location, 2);
    let targets = player.dimension.getEntities({
        excludeTags: [
            "aqua_desires"
        ],
        excludeFamilies: [
            "inanimate", "magic", "player"
        ],
        excludeTypes: [
            "item"
        ],
        location: {x:xlocation!, y:player.location.y + 0.5, z:zlocation!},
        maxDistance: 3,
        closest: 2
    });
    targets.forEach(en => {
        en.runCommand("/particle kurokumaft:aqua_desires_particle ^0.5^^");
        en.runCommand("/particle kurokumaft:aqua_desires_particle ^^^");
        en.runCommand("/particle kurokumaft:aqua_desires_particle ^-0.5^^");
        en.applyDamage(5, {
            cause: EntityDamageCause.drowning
        });
    });
    player.removeTag("aqua_desires");
}

/**
 * 水星砕き(すいせいくだき)
 */
export async function mercurySmash(player:Player) {

    let xran = 0;
    let yran = 0;
    let zran = 0;

    shooting(player, "kurokumaft:mercury_smash", {x:xran,y:yran,z:zran}, 2,"kurokumaft:projectile_1");
    shooting(player, "kurokumaft:mercury_smash", {x:xran,y:yran,z:zran}, 2,"kurokumaft:projectile_2");
    shooting(player, "kurokumaft:mercury_smash", {x:xran,y:yran,z:zran}, 2,"kurokumaft:projectile_3");

}