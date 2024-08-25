import { EntityDamageCause, Player, system } from "@minecraft/server";

/**
 * グラビティフィールド
 */
export function gravityField(player:Player) {
    player.addTag("gravity_field_self");
    let intervalNum = system.runInterval(() => {
        player.runCommand("/particle kurokumaft:gravity_field_particle ~~~");
        let targets = player.dimension.getEntities({
            excludeTags: [
                "atmosphere_self"
            ],
            excludeFamilies: [
                "inanimate", "player", "familiar"
            ],
            excludeTypes: [
                "item"
            ],
            location: player.location,
            maxDistance: 15
        });
        targets.forEach(en => {
            en.runCommand("/particle kurokumaft:gravity_particle ~~~");
            en.addEffect("slowness", 1, {
                amplifier: 10
            });
            en.applyDamage(3, {
                cause: EntityDamageCause.fallingBlock
            });
        })
    }, 4);
    system.runTimeout(() => {
        system.clearRun(intervalNum);
        player.removeTag("gravity_field_self");
    }, 100);
}