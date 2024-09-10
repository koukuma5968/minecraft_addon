import { Entity, EntityDamageCause, system, TicksPerSecond } from "@minecraft/server";

/**
 * ダークアロー
 */
export async function darkArrow(entity:Entity) {
    let intervalNum = system.runInterval(() => {
        if (entity.isValid()) {
            entity.applyDamage(3, {
                cause: EntityDamageCause.wither
            });
        }
    }, TicksPerSecond);
    system.runTimeout(() => {
        system.clearRun(intervalNum);
    }, TicksPerSecond * 4);
}
