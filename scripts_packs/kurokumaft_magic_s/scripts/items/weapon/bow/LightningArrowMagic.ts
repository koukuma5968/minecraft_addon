import { Entity, EntityDamageCause, system, TicksPerSecond } from "@minecraft/server";
import { MinecraftEntityTypes } from "@minecraft/vanilla-data";

/**
 * ライトニングアロー
 */
export async function lightningArrow(entity:Entity) {
    let intervalNum = system.runInterval(() => {
        if (entity.isValid()) {
            entity.dimension.spawnParticle("kurokumaft:thunder_desires_particle", entity.location);
            entity.applyDamage(3, {
                cause: EntityDamageCause.lightning
            });
        }
    }, TicksPerSecond);
    system.runTimeout(() => {
        system.clearRun(intervalNum);
    }, TicksPerSecond * 4);
}
