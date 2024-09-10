import { EntityDamageCause, Player, system } from "@minecraft/server";

/**
 * フレイムサークル
 */
export async function flarecircle(player:Player) {
    player.addTag("flamecircle_self");
    let intervalNum = system.runInterval(() => {
        let targets = player.dimension.getEntities({
            excludeTags: [
                "flamecircle_self"
            ],
            excludeFamilies: [
                "inanimate", "player", "familiar", "magic", "arrow"
            ],
            excludeTypes: [
                "item"
            ],
            location: player.location,
            maxDistance: 20,
            closest: 3
        });
        targets.forEach(en => {
            en.dimension.spawnParticle("kurokumaft:explosion_wave_particle",en.location);
            en.applyDamage(5, {
                cause: EntityDamageCause.fire
            });
        })
    }, 2);
    system.runTimeout(() => {
        system.clearRun(intervalNum);
        player.removeTag("flamecircle_self");
    }, 60);
}

/**
 * バーストフレア
 */
export async function burstflare(player:Player) {
    player.addTag("burstflare_self");
    let targets = player.dimension.getEntities({
        excludeTags: [
            "burstflare_self"
        ],
        excludeFamilies: [
            "inanimate", "player", "familiar", "magic", "arrow"
        ],
        excludeTypes: [
            "item"
        ],
        location: player.location,
        maxDistance: 20,
        closest: 3
    });
    targets.forEach(en => {
        en.runCommand("/particle kurokumaft:burstflare_particle ~~~");
        en.dimension.spawnEntity("kurokumaft:burstflaremagic<minecraft:explode>", en.location);
        en.applyDamage(10, {
            cause: EntityDamageCause.fire
        });
    })
    player.removeTag("burstflare_self");
}