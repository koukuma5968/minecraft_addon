import { EntityDamageCause, Player, system } from "@minecraft/server";

/**
 * ロックブレイク
 */
export async function rockbreak(player:Player) {
    player.addTag("rock_break_self");
    let targets = player.dimension.getEntities({
        excludeTags: [
            "rock_break_self"
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
        en.addEffect("nausea", 5, {
            amplifier: 10
        });
        let rock = en.dimension.spawnEntity("kurokumaft:burstflaremagic", {x:en.location.x,y:en.location.y + 10, z:en.location.z});
    })
    player.removeTag("rock_break_self");
}

/**
 * グレイボム
 */
export async function greybomb(player:Player) {
    player.addTag("grey_bomb_self");
    let targets = player.dimension.getEntities({
        excludeTags: [
            "grey_bomb_self"
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
        en.runCommand("/particle kurokumaft:grey_bomb_particle ~~~");
        en.applyDamage(10, {
            cause: EntityDamageCause.fallingBlock
        });
        let bust = en.dimension.spawnEntity("kurokumaft:burstflaremagic", en.location);
        bust.triggerEvent("minecraft:explode");
    })
    player.removeTag("grey_bomb_self");
}