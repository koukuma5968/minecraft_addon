import { Entity, EntityDamageCause, Player, system, TicksPerSecond, world } from "@minecraft/server";

/**
 * ダークアロー
 */
export async function darkArrow(entity:Entity) {
    const intervalNum = system.runInterval(() => {
        if (entity.isValid) {
            if (entity instanceof Player) {
                if (world.gameRules.pvp) {
                    entity.applyDamage(1, {
                        cause: EntityDamageCause.wither
                    });
                }
            } else {
                entity.applyDamage(3, {
                    cause: EntityDamageCause.wither
                });
            }
        }
    }, TicksPerSecond);
    system.runTimeout(() => {
        system.clearRun(intervalNum);
    }, TicksPerSecond * 2);
}
