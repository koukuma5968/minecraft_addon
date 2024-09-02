import { EntityDamageCause, Player, system } from "@minecraft/server";

/**
 * ライトニングストライク
 */
export async function lightningStrike(player:Player) {
    player.addTag("lightningstrike_self");
    let intervalNum = system.runInterval(() => {
        player.runCommand("/particle kurokumaft:thunder_sword_particle ~~~");
        let targets = player.dimension.getEntities({
            excludeTags: [
                "lightningstrike_self"
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
            en.runCommand("/particle kurokumaft:spark_particle ~~~");
            en.addEffect("slowness", 1, {
                amplifier: 1
            });
            en.applyDamage(6, {
                cause: EntityDamageCause.lightning
            });
        })
    }, 4);
    system.runTimeout(() => {
        system.clearRun(intervalNum);
        player.removeTag("lightningstrike_self");
    }, 100);
}