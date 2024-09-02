import { EntityDamageCause, Player, system, world } from "@minecraft/server";
import { getLookPoints, getRandomInRange } from "../../../common/commonUtil";
import { shooting } from "../../../custom/ShooterMagicEvent";

/**
 * 焔裂き(ほむらざき)
 */
export async function flamingDesires(player:Player) {
    player.addTag("flaming_desires");

    let {xlocation, ylocation, zlocation} = getLookPoints(player.getRotation(), player.location, 2);
    let targets = player.dimension.getEntities({
        excludeTags: [
            "flaming_desires"
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

        en.runCommand("/particle kurokumaft:flaming_desires_particle ~~~");
        en.applyDamage(5, {
            cause: EntityDamageCause.fire
        });
    });
    player.removeTag("flaming_desires");
}

/**
 * 紅蓮剣(ぐれんけん)
 */
export async function crimsonBread(player:Player) {

    let xran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
    let yran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
    let zran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));

    shooting(player, "kurokumaft:crimson_bread", {x:xran,y:yran,z:zran}, 2, undefined);

}