import { Entity, EntityDamageCause, system, TicksPerSecond } from "@minecraft/server";

/**
 * アイスアロー
 */
export async function iceArrow(entity:Entity) {
    let intervalNum = system.runInterval(() => {
        if (entity.isValid()) {
            entity.applyDamage(3, {
                cause: EntityDamageCause.freezing
            });
        }
    }, TicksPerSecond);
    system.runTimeout(() => {
        system.clearRun(intervalNum);
    }, TicksPerSecond * 4);
}
