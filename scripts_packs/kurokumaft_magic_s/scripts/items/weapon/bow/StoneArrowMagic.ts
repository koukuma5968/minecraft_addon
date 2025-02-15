import { Entity, EntityDamageCause, Player, system, TicksPerSecond, world } from "@minecraft/server";

/**
 * ストーンアロー
 */
export async function stoneArrow(entity:Entity) {
    entity.applyKnockback(1,1,1,1);
    let intervalNum = system.runInterval(() => {
        if (entity.isValid()) {
            if (entity instanceof Player) {
                if (world.gameRules.pvp) {
                    entity.applyDamage(1, {
                        cause: EntityDamageCause.thorns
                    });
                }
            } else {
                entity.applyDamage(3, {
                    cause: EntityDamageCause.thorns
                });
            }
        }
    }, TicksPerSecond);
    system.runTimeout(() => {
        system.clearRun(intervalNum);
    }, TicksPerSecond * 2);
}
