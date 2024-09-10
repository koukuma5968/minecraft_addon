import { Entity, EntityDamageCause, system, TicksPerSecond } from "@minecraft/server";

/**
 * ファイアシェル
 */
export async function fireShell(entity:Entity) {
    let dim = entity.dimension;
    let enLoc = entity.location
    try {
        let intervalNum = system.runInterval(() => {
            dim.spawnParticle("kurokumaft:fire_shell", enLoc);
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
                    cause: EntityDamageCause.fire
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
