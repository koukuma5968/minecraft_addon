import { EntityDamageCause, Player, system, TicksPerSecond } from "@minecraft/server";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

/**
 * ライトニングストライク
 */
export async function lightningStrike(player:Player) {
    player.addTag("lightningstrike_self");
    let intervalNum = system.runInterval(() => {
        player.dimension.spawnParticle("kurokumaft:thunder_sword_particle", player.location);
        let targets = player.dimension.getEntities({
            excludeTags: [
                "lightningstrike_self"
            ],
            excludeFamilies: [
                "inanimate", "player", "familiar", "magic", "arrow"
            ],
            excludeTypes: [
                "item"
            ],
            location: player.location,
            maxDistance: 10
        });
        targets.forEach(en => {
            en.dimension.spawnParticle("kurokumaft:spark_particle", en.location);
            en.addEffect(MinecraftEffectTypes.Slowness, 2*TicksPerSecond, {
                amplifier: 3
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