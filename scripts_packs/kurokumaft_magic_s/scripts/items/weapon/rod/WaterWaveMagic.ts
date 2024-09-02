import { Player } from "@minecraft/server";
import { getAdjacentSphericalPoints } from "../../../common/ShooterPoints";

/**
 * ウォーターウェーブ
 */
export async function waterwave(player:Player) {

    let {xapply, yapply, zapply, xlocation, ylocation, zlocation} = getAdjacentSphericalPoints(player.getRotation(), player.location);

    let wave = player.dimension.spawnEntity("kurokumaft:waterwavemagic", {x:xlocation!,y:player.location.y,z:zlocation!});
    wave.applyImpulse({x:xapply!,y:0,z:zapply!});

}

/**
 * ウォータジェイル
 */
export async function waterjail(player:Player) {
    player.addTag("waterjail_self");
    let targets = player.dimension.getEntities({
        excludeTags: [
            "waterjail_self"
        ],
        excludeFamilies: [
            "inanimate", "player", "familiar"
        ],
        excludeTypes: [
            "item"
        ],
        location: player.location,
        maxDistance: 20,
        closest: 2
    });
    targets.forEach(en => {
        en.runCommand("/particle kurokumaft:waterjail_particle ~~~");
        en.addEffect("slowness", 10, {
            amplifier: 50
        });
    })
    player.removeTag("waterjail_self");
}