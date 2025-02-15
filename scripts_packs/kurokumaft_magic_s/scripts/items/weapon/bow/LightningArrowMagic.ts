import { Entity, EntityDamageCause, Player, system, TicksPerSecond, world } from "@minecraft/server";

/**
 * ライトニングアロー
 */
export async function lightningArrow(entity:Entity) {
    let intervalNum = system.runInterval(() => {
        if (entity.isValid()) {
            if (entity instanceof Player) {
                if (world.gameRules.pvp) {
                    entity.dimension.spawnParticle("kurokumaft:thunder_desires_particle", entity.location);
                    entity.applyDamage(1, {
                        cause: EntityDamageCause.lightning
                    });
                }
            } else {
                entity.dimension.spawnParticle("kurokumaft:thunder_desires_particle", entity.location);
                entity.applyDamage(3, {
                    cause: EntityDamageCause.lightning
                });
            }
        }
    }, TicksPerSecond);
    system.runTimeout(() => {
        system.clearRun(intervalNum);
    }, TicksPerSecond * 2);
}
