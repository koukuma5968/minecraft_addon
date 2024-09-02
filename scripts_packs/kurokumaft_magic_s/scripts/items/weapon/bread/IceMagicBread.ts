import { EntityDamageCause, Player, system } from "@minecraft/server";
import { getLookPoints, getRandomInRange } from "../../../common/commonUtil";
import { shooting } from "../../../custom/ShooterMagicEvent";

/**
 * 斬雪(ざんせつ)
 */
export async function iceDesires(player:Player) {
    player.addTag("ice_desires");

    let {xlocation, ylocation, zlocation} = getLookPoints(player.getRotation(), player.location, 2);
    let targets = player.dimension.getEntities({
        excludeTags: [
            "ice_desires"
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
        en.runCommand("/particle kurokumaft:ice_desires_particle ~~~");
        en.applyDamage(10, {
            cause: EntityDamageCause.freezing
        });
    });
    player.removeTag("ice_desires");
}

/**
 * 終雪氷晶(しゅうせつひょうしょう)
 */
export async function syusetuBread(player:Player) {

    let xran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
    let yran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
    let zran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));

    shooting(player, "kurokumaft:syusetu_bread", {x:xran,y:yran,z:zran}, 4,"kurokumaft:projectile_1");

}