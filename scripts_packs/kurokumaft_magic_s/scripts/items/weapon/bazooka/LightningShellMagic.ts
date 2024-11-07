import { Entity, EntityDamageCause, EntityQueryOptions, Player, system, TicksPerSecond } from "@minecraft/server";
import { addTeamsTagFilter } from "../../../common/commonUtil";

/**
 * ライトニングシェル
 */
export async function lightningShell(entity:Entity, dameger:Entity) {
    try {
        let dim = dameger.dimension;
        let enLoc = entity.location
    
        dameger.addTag("lightning_shell");
        let intervalNum = system.runInterval(() => {
            dim.spawnParticle("kurokumaft:lightning_shell", enLoc);

            let filterOption = {
                excludeTags: [
                    "lightning_shell",
                ],
                location: enLoc,
                maxDistance: 6
            } as EntityQueryOptions;

            addTeamsTagFilter(dameger as Player, filterOption);

            let targets = dim.getEntities(filterOption);
            targets.forEach(en => {
                if (en instanceof Player) {
                    en.applyDamage(1, {
                        cause: EntityDamageCause.lightning
                    });
                } else {
                    en.applyDamage(3, {
                        cause: EntityDamageCause.lightning
                    });
                }
            })
        }, 5);
        system.runTimeout(() => {
            system.clearRun(intervalNum);
            dameger.removeTag("lightning_shell");
        }, 60);
    } catch(error) {
    } finally {
        entity.remove();
    }
}
