import { EntityDamageCause, Player, system } from "@minecraft/server";
import { getLookPoints, getRandomInRange } from "../../../common/commonUtil";
import { shooting } from "../../../custom/ShooterMagicEvent";

/**
 * 雷斬(らいきり)
 */
export async function thunderDesires(player:Player) {
    player.addTag("thunder_desires");

    let {xlocation, ylocation, zlocation} = getLookPoints(player.getRotation(), player.location, 2);
    let targets = player.dimension.getEntities({
        excludeTags: [
            "thunder_desires"
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
        en.runCommand("/particle kurokumaft:thunder_desires_particle ~~~");
        en.applyDamage(10, {
            cause: EntityDamageCause.lightning
        });
    });
    player.removeTag("thunder_desires");
}

/**
 * 雷神剣(らいじんけん)
 */
export async function raizinBread(player:Player) {

    let xran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
    let yran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
    let zran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));

    shooting(player, "kurokumaft:raizin_bread", {x:xran,y:yran,z:zran}, 4, undefined);

}