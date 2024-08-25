import { EntityDamageCause, Player, system } from "@minecraft/server";

/**
 * アトモスフィア
 */
export function atmosphere(player:Player) {
    player.addTag("atmosphere_self");
    let intervalNum = system.runInterval(() => {
        player.runCommand("/particle kurokumaft:atmosphere_particle ~~~");
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
            maxDistance: 10
        });
        targets.forEach(en => {
            en.runCommand("/particle kurokumaft:wind_particle ~~~");
            en.runCommand("/particle kurokumaft:storm1_particle ~~1~");
            en.runCommand("/particle kurokumaft:storm2_particle ~~0~");
            en.runCommand("/particle kurokumaft:storm3_particle ~~1.5~");
            en.runCommand("/particle kurokumaft:storm4_particle ~~0.5~");
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
        player.removeTag("atmosphere_self");
    }, 100);
}