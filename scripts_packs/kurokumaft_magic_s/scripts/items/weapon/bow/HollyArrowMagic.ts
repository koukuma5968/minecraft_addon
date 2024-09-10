import { Entity, EntityDamageCause, system, TicksPerSecond } from "@minecraft/server";

/**
 * ホーリーアロー
 */
export async function hollyArrow(entity:Entity) {
    let intervalNum = system.runInterval(() => {
        if (entity.isValid()) {
            entity.applyDamage(3, {
                cause: EntityDamageCause.none
            });
        }
    }, TicksPerSecond);
    system.runTimeout(() => {
        system.clearRun(intervalNum);
    }, TicksPerSecond * 4);
}
