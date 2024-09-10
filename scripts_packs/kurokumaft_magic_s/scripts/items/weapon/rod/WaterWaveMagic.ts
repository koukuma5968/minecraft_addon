import { Player, system, TicksPerSecond } from "@minecraft/server";
import { getAdjacentSphericalPoints } from "../../../common/ShooterPoints";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

/**
 * ウォーターウェーブ
 */
export async function waterwave(player:Player) {

    let {xapply, yapply, zapply, xlocation, ylocation, zlocation} = getAdjacentSphericalPoints(player.getRotation(), player.location);

    let wave = player.dimension.spawnEntity("kurokumaft:waterwavemagic", {x:xlocation!,y:player.location.y,z:zlocation!});
    let intervalNum = system.runInterval(() => {
        wave.applyImpulse({x:xapply!,y:0,z:zapply!});
        wave.setRotation({x:xlocation!,y:zlocation!});
    }, 2);
    system.runTimeout(() => {
        system.clearRun(intervalNum);
        wave.remove();
    }, 60);
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
        en.addEffect(MinecraftEffectTypes.Slowness, 10*TicksPerSecond, {
            amplifier: 50
        });
    })
    player.removeTag("waterjail_self");
}