import { EntityDamageCause, Player, system, TicksPerSecond } from "@minecraft/server";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

/**
 * エリアヒール
 */
export async function areaheel(player:Player) {
    player.dimension.spawnParticle("kurokumaft:areaheel_particle", player.location);
    let p = player.dimension.getEntities({
        excludeFamilies: [
            "inanimate", "magic", "arrow"
        ],
        excludeTypes: [
            "item"
        ],
        families: [
            "player"
        ],
        location: player.location,
        maxDistance: 10
    });
    let f = player.dimension.getEntities({
        excludeFamilies: [
            "inanimate", "magic", "arrow"
        ],
        excludeTypes: [
            "item"
        ],
        families: [
            "familiar"
        ],
        location: player.location,
        maxDistance: 10
    });
    let u = player.dimension.getEntities({
        excludeFamilies: [
            "inanimate", "magic", "arrow"
        ],
        excludeTypes: [
            "item"
        ],
        families: [
            "undead"
        ],
        location: player.location,
        maxDistance: 10
    });
    p.forEach(en => {
        en.addEffect(MinecraftEffectTypes.InstantHealth, 5*TicksPerSecond, {
            amplifier: 5,
            showParticles: true
        });
    });
    f.forEach(en => {
        en.addEffect(MinecraftEffectTypes.InstantHealth, 5*TicksPerSecond, {
            amplifier: 5,
            showParticles: true
        });
    });
    u.forEach(en => {
        en.addEffect(MinecraftEffectTypes.InstantHealth, 5*TicksPerSecond, {
            amplifier: 5,
            showParticles: true
        });
    });
}

/**
 * ブライトゴーレム召喚
 */
export async function summonGolem(player:Player) {
    let golem = player.dimension.spawnEntity("kurokumaft:brightness_golem<minecraft:from_player>", {x:player.location.x,y:player.location.y,z:player.location.z+3});
    golem.nameTag = "ブライトゴーレム";
}