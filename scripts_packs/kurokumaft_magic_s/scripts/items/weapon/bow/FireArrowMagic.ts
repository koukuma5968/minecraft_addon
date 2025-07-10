import { Entity, EntityDamageCause, Player, system, TicksPerSecond, world } from "@minecraft/server";

/**
 * ファイアアロー
 */
export async function fireArrow(entity:Entity) {
    const intervalNum = system.runInterval(() => {
        if (entity.isValid()) {
            if (entity instanceof Player) {
                if (world.gameRules.pvp) {
                    entity.applyDamage(1, {
                        cause: EntityDamageCause.fireTick
                    });
                    entity.setOnFire(10, true);
                }
            } else {
                entity.applyDamage(3, {
                    cause: EntityDamageCause.fireTick
                });
                entity.setOnFire(10, true);
            }
        }
    }, TicksPerSecond);
    system.runTimeout(() => {
        system.clearRun(intervalNum);
    }, TicksPerSecond * 2);
}
