import { Entity, EntityDamageCause, Player, system, TicksPerSecond, world } from "@minecraft/server";

/**
 * ホーリーアロー
 */
export async function hollyArrow(entity:Entity) {
    let intervalNum = system.runInterval(() => {
        if (entity.isValid()) {
            if (entity instanceof Player) {
                if (world.gameRules.pvp) {
                    entity.applyDamage(1, {
                        cause: EntityDamageCause.none
                    });
                }
            } else {
                entity.applyDamage(3, {
                    cause: EntityDamageCause.none
                });
            }
        }
    }, TicksPerSecond);
    system.runTimeout(() => {
        system.clearRun(intervalNum);
    }, TicksPerSecond * 4);
}
