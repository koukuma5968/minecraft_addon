import { Entity, EntityDamageCause, system, TicksPerSecond } from "@minecraft/server";

/**
 * ストーンアロー
 */
export async function stoneArrow(entity:Entity) {
    entity.applyKnockback(1,1,1,1);
    let intervalNum = system.runInterval(() => {
        if (entity.isValid()) {
            entity.applyDamage(3, {
                cause: EntityDamageCause.thorns
            });
        }
    }, TicksPerSecond);
    system.runTimeout(() => {
        system.clearRun(intervalNum);
    }, TicksPerSecond * 4);
}
