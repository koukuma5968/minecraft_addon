import { Entity, EntityDamageCause, EntityQueryOptions, Player, system, TicksPerSecond } from "@minecraft/server";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";
import { addTeamsTagFilter, getLookRotaionPoints } from "../../../common/MagicCommonUtil";

/**
 * アクアショック
 */
export async function aquaShock(player:Player, entity:Entity) {

    player.addTag("aqua_shock_self");

    let left = getLookRotaionPoints(entity.getRotation(), 0, 2.5);
    entity.dimension.spawnParticle("kurokumaft:aqua_shock_particle", {x:entity.location.x+left.x, y:entity.location.y+1.8, z:entity.location.z+left.z});
    let center = getLookRotaionPoints(entity.getRotation(), 0, 0);
    entity.dimension.spawnParticle("kurokumaft:aqua_shock_particle", {x:entity.location.x+center.x, y:entity.location.y+1.8, z:entity.location.z+center.z});
    let right = getLookRotaionPoints(entity.getRotation(), 0, -2.5);
    entity.dimension.spawnParticle("kurokumaft:aqua_shock_particle", {x:entity.location.x+right.x, y:entity.location.y+1.8, z:entity.location.z+right.z});

    let filterOption = {
        excludeTags: [
            "aqua_shock_self",
        ],
        location: entity.location,
        maxDistance: 5
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);

    let targets = player.dimension.getEntities(filterOption);
    targets.forEach(en => {
        if (en instanceof Player) {
            en.applyDamage(2, {
                cause: EntityDamageCause.drowning
            });
        } else {
            en.applyDamage(6, {
                cause: EntityDamageCause.drowning
            });
        }
    });

    player.removeTag("aqua_shock_self");
}

/**
 * アクアショット
 */
export async function aquaShot(player:Player) {
    player.addTag("aqua_shot_self");

    let dimension = player.dimension;

    let filterOption = {
        excludeTags: [
            "aqua_shot_self"
        ],
        location: player.location,
        closest: 4,
        maxDistance: 10
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);

    let targets = dimension.getEntities(filterOption);

    let intervalNum = system.runInterval(() => {
        targets.forEach(en => {
            en.dimension.spawnParticle("kurokumaft:aqua_shot_particle", en.location);
            en.addEffect("slowness", 5, {
                amplifier: 5
            });
            if (en instanceof Player) {
                en.applyDamage(2, {
                    cause: EntityDamageCause.drowning
                });
            } else {
                en.applyDamage(4, {
                    cause: EntityDamageCause.drowning
                });
            }
        })
    }, 4);

    system.runTimeout(() => {
        system.clearRun(intervalNum);
    }, 40);

    player.removeTag("aqua_shot_self");

}

/**
 * タイダルウェイブ
 */
export async function tidalWave(player:Player) {
    player.addTag("tidal_wave_self");
    let dimension = player.dimension;

    let filterOption = {
        excludeFamilies: [
            "inanimate", "familiar", "magic", "arrow"
        ],
        excludeTypes: [
            "item"
        ],
        excludeTags: [
            "tidal_wave_target",
            "tidal_wave_self"
        ],
        location: player.location,
        maxDistance: 15
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);

    let targets = dimension.getEntities(filterOption);

    let intervalNum = system.runInterval(() => {
        targets.forEach(en => {
            en.dimension.spawnParticle("kurokumaft:tidal_wave_particle", en.location);
            if (en instanceof Player) {
                en.addEffect(MinecraftEffectTypes.Slowness, 2*TicksPerSecond, {
                    amplifier: 3
                });
                en.applyDamage(3, {
                    cause: EntityDamageCause.drowning
                });
            } else {
                en.addEffect(MinecraftEffectTypes.Slowness, 6*TicksPerSecond, {
                    amplifier: 10
                });
                en.applyDamage(6, {
                    cause: EntityDamageCause.drowning
                });
            }
        });

    }, 4);

    system.runTimeout(() => {
        system.clearRun(intervalNum);
    }, 100);

    player.removeTag("tidal_wave_self");

}