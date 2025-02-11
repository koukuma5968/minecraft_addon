import { Entity, EntityDamageCause, EntityQueryOptions, Player, system, TicksPerSecond } from "@minecraft/server";
import { getAdjacentSphericalPoints } from "../../../common/MagicShooterPoints";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";
import { addTeamsTagFilter } from "../../../common/MagicCommonUtil";

/**
 * ウォーターカッター
 */
export async function watercutter(player:Player, hitEntity:Entity) {

    player.addTag("watercutter_self");

    hitEntity.dimension.spawnParticle("kurokumaft:watercutter_particle", {x:hitEntity.location.x, y:hitEntity.location.y+1.8, z:hitEntity.location.z});

    let filterOption = {
        excludeTags: [
            "watercutter_self",
        ],
        location: {x:hitEntity.location.x, y:hitEntity.location.y+1, z:hitEntity.location.z},
        maxDistance: 4
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);

    let targets = player.dimension.getEntities(filterOption);
    targets.forEach(en => {
        if (en instanceof Player) {
            en.applyDamage(1, {
                cause: EntityDamageCause.drowning
            });
        } else {
            en.applyDamage(3, {
                cause: EntityDamageCause.drowning
            });
        }
    });

    player.removeTag("watercutter_self");
}

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

    let filterOption = {
        excludeTags: [
            "waterjail_self"
        ],
        location: player.location,
        maxDistance: 20,
        closest: 2
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);
    let targets = player.dimension.getEntities(filterOption);
    targets.forEach(en => {
        en.dimension.spawnParticle("kurokumaft:waterjail_particle", en.location);
        if (en instanceof Player) {
            en.addEffect(MinecraftEffectTypes.Slowness, 5*TicksPerSecond, {
                amplifier: 10
            });
        } else {
            en.addEffect(MinecraftEffectTypes.Slowness, 10*TicksPerSecond, {
                amplifier: 50
            });
        }
    })
    player.removeTag("waterjail_self");
}