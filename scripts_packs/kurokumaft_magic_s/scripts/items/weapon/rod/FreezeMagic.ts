import { EntityDamageCause, Player, system } from "@minecraft/server";

/**
 * フリーズコフィン
 */
export async function freezConclusion(player:Player) {
    player.addTag("freez_conclusion_self");
    let targets = player.dimension.getEntities({
        excludeTags: [
            "freez_conclusion_self"
        ],
        excludeFamilies: [
            "inanimate", "player", "familiar"
        ],
        excludeTypes: [
            "item"
        ],
        location: player.location,
        maxDistance: 15,
        closest: 2
    });
    targets.forEach(en => {
        en.runCommand("/particle kurokumaft:freezingconclusion_particle ~~~");
        en.runCommand("/fill ~-1 ~ ~-1 ~1 ~1 ~1 packed_ice");
        en.addEffect("weakness", 20, {
            amplifier: 3
        });
    })
    player.removeTag("freez_conclusion_self");
}