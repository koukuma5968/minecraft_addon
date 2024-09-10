import { EntityDamageCause, Player, system, TicksPerSecond } from "@minecraft/server";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

/**
 * ホーリーフィールド
 */
export async function hollyField(player:Player) {
    let holly_field = player.dimension.spawnEntity("kurokumaft:holly_field", 
        {
            x:player.location.x,
            y:player.location.y,
            z:player.location.z
        }
    );
    let holeLo = holly_field.location;
    let intervalNum = system.runInterval(() => {
        holly_field.dimension.spawnParticle("kurokumaft:holly_field_particle", holly_field.location);
        holly_field.dimension.spawnParticle("kurokumaft:holly_field_outer_particle", holly_field.location);
        let targets = player.dimension.getEntities({
            excludeFamilies: [
                "inanimate", "magic", "arrow"
            ],
            excludeTypes: [
                "item"
            ],
            location: holeLo,
            maxDistance: 15
        });
        targets.forEach(en => {
            en.addEffect(MinecraftEffectTypes.InstantHealth, 2*TicksPerSecond, {
                amplifier: 10
            });
        })
    }, 10);
    system.runTimeout(() => {
        system.clearRun(intervalNum);
        holly_field.remove();
    }, 100);
}