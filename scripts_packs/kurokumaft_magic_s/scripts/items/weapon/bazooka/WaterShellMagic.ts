import { Entity, EntityDamageCause, system, TicksPerSecond } from "@minecraft/server";

/**
 * ウォーターシェル
 */
export async function waterShell(entity:Entity) {
    let dim = entity.dimension;
    let enLoc = entity.location
    try {
        let intervalNum = system.runInterval(() => {
            dim.spawnParticle("kurokumaft:water_shell", enLoc);
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
                    cause: EntityDamageCause.drowning
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
