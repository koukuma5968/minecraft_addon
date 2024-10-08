import { EffectType, EntityDamageCause, Player, system, TicksPerSecond, world } from "@minecraft/server";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

/**
 * アクアショット
 */
export async function aquaShot(player:Player) {
    player.addTag("aqua_shot_self");
    let dimension = player.dimension;
    let targets = dimension.getEntities({
        excludeTags: [
            "aqua_shot_self"
        ],
        excludeFamilies: [
            "inanimate", "player", "familiar", "magic", "arrow"
        ],
        excludeTypes: [
            "item"
        ],
        location: player.location,
        closest: 4,
        maxDistance: 10
    });
    let intervalNum = system.runInterval(() => {
        targets.forEach(en => {
            en.runCommand("/particle kurokumaft:aqua_shot_particle ~~~")
            en.addEffect("slowness", 5, {
                amplifier: 5
            });
            en.applyDamage(2, {
                cause: EntityDamageCause.drowning
            });
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
    let targets = dimension.getEntities({
        excludeTags: [
            "tidal_wave_self"
        ],
        excludeFamilies: [
            "inanimate", "player", "familiar", "magic", "arrow"
        ],
        excludeTypes: [
            "item"
        ],
        location: player.location,
        maxDistance: 15
    });
    let intervalNum = system.runInterval(() => {
        targets.forEach(en => {
            en.dimension.spawnParticle("kurokumaft:tidal_wave_particle", en.location);
            en.addEffect(MinecraftEffectTypes.Slowness, 2*TicksPerSecond, {
                amplifier: 10
            });
            en.applyDamage(3, {
                cause: EntityDamageCause.drowning
            });
        })
    }, 4);
    system.runTimeout(() => {
        system.clearRun(intervalNum);
    }, 100);
    player.removeTag("tidal_wave_self");

}
