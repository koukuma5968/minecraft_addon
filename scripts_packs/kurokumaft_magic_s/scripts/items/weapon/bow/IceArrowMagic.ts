import { Entity, EntityDamageCause, Player, system, TicksPerSecond, world } from "@minecraft/server";

/**
 * アイスアロー
 */
export async function iceArrow(entity:Entity) {
    const intervalNum = system.runInterval(() => {
        if (entity.isValid()) {
            if (entity instanceof Player) {
                if (world.gameRules.pvp) {
                    entity.applyDamage(1, {
                        cause: EntityDamageCause.freezing
                    });
                }
            } else {
                entity.applyDamage(3, {
                    cause: EntityDamageCause.freezing
                });
            }
        }
    }, TicksPerSecond);
    system.runTimeout(() => {
        system.clearRun(intervalNum);
    }, TicksPerSecond * 2);
}
