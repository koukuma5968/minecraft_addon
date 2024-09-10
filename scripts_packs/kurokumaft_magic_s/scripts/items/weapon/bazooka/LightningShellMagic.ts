import { Entity, EntityDamageCause, system, TicksPerSecond } from "@minecraft/server";

/**
 * ライトニングシェル
 */
export async function lightningShell(entity:Entity) {
    let dim = entity.dimension;
    let enLoc = entity.location
    try {
        let intervalNum = system.runInterval(() => {
            dim.spawnParticle("kurokumaft:lightning_shell", enLoc);
            let targets = dim.getEntities({
                excludeFamilies: [
                    "inanimate", "player", "familiar", "magic", "arrow"
                ],
                excludeTypes: [
                    "item"
                ],
                location: enLoc,
                maxDistance: 6
            });
            targets.forEach(en => {
                en.applyDamage(3, {
                    cause: EntityDamageCause.lightning
                });
            })
        }, 5);
        system.runTimeout(() => {
            system.clearRun(intervalNum);
        }, 60);
    } catch(error) {
    }
    entity.remove();
}
