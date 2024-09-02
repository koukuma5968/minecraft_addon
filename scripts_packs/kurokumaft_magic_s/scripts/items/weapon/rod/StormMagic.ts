import { EntityDamageCause, Player, system } from "@minecraft/server";

/**
 * ストーム
 */
export async function storm(player:Player) {
    player.addTag("storm_self");
    let targets = player.dimension.getEntities({
        excludeTags: [
            "storm_self"
        ],
        excludeFamilies: [
            "inanimate", "player", "familiar"
        ],
        excludeTypes: [
            "item"
        ],
        location: player.location,
        maxDistance: 20,
        closest: 3
    });
    targets.forEach(en => {
        en.runCommand("/particle kurokumaft:storm1_particle ~~~");
        en.runCommand("/particle kurokumaft:storm2_particle ~~1~");
        en.runCommand("/particle kurokumaft:storm3_particle ~~2~");
        en.runCommand("/particle kurokumaft:storm4_particle ~~3~");
        en.addEffect("levitation", 1, {
            amplifier: 15
        });
        en.applyDamage(2, {
            cause: EntityDamageCause.fall
        });
    })
    player.removeTag("storm_self");
}

/**
 * エアロボム
 */
export async function aerobomb(player:Player) {
    player.addTag("aero_bomb_self");
    let targets = player.dimension.getEntities({
        excludeTags: [
            "aero_bomb_self"
        ],
        excludeFamilies: [
            "inanimate", "player", "familiar"
        ],
        excludeTypes: [
            "item"
        ],
        location: player.location,
        maxDistance: 20,
        closest: 3
    });
    targets.forEach(en => {
        en.runCommand("/particle kurokumaft:aero_bomb_particle ~~~");
        en.applyDamage(10, {
            cause: EntityDamageCause.fall
        });
        let bust = en.dimension.spawnEntity("kurokumaft:burstflaremagic", en.location);
        bust.triggerEvent("minecraft:explode");
    })
    player.removeTag("aero_bomb_self");
}