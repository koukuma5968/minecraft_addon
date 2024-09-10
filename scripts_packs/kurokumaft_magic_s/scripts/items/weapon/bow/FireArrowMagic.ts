import { Entity, EntityDamageCause, system, TicksPerSecond } from "@minecraft/server";

/**
 * ファイアアロー
 */
export async function fireArrow(entity:Entity) {
    let intervalNum = system.runInterval(() => {
        if (entity.isValid()) {
            entity.applyDamage(3, {
                cause: EntityDamageCause.fireTick
            });
        }
    }, TicksPerSecond);
    system.runTimeout(() => {
        system.clearRun(intervalNum);
    }, TicksPerSecond * 4);
}
