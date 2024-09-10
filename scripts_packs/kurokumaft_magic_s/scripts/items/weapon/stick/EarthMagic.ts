import { EntityDamageCause, Player, system, TicksPerSecond } from "@minecraft/server";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

/**
 * グラビティフィールド
 */
export async function gravityField(player:Player) {
    player.addTag("gravity_field_self");
    let intervalNum = system.runInterval(() => {
        player.dimension.spawnParticle("kurokumaft:gravity_field_particle", player.location);
        let targets = player.dimension.getEntities({
            excludeTags: [
                "atmosphere_self"
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
        targets.forEach(en => {
            en.dimension.spawnParticle("kurokumaft:gravity_particle", en.location);
            en.addEffect(MinecraftEffectTypes.Slowness, 2*TicksPerSecond, {
                amplifier: 5
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