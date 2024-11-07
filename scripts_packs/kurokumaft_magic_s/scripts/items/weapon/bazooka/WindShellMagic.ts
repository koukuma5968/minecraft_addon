import { Entity, EntityDamageCause, Player, system, TicksPerSecond } from "@minecraft/server";
import { addTeamsTagFilter } from "../../../common/commonUtil";

/**
 * ウィンドシェル
 */
export async function windShell(entity:Entity, dameger:Entity) {
    try {
        let dim = dameger.dimension;
        let enLoc = entity.location
    
        dameger.addTag("wind_shell");
        let intervalNum = system.runInterval(() => {
            dim.spawnParticle("kurokumaft:wind_shell", enLoc);

            let filterOption = {
                excludeTags: [
                    "wind_shell",
                ],
                location: enLoc,
                maxDistance: 6
            } as ClientQueryOptions;

            addTeamsTagFilter(dameger as Player, filterOption);

            let targets = dim.getEntities(filterOption);
            targets.forEach(en => {
                if (en instanceof Player) {
                    en.applyDamage(1, {
                        cause: EntityDamageCause.fall
                    });
                } else {
                    en.applyDamage(3, {
                        cause: EntityDamageCause.fall
                    });
                }
            })
        }, 5);
        system.runTimeout(() => {
            system.clearRun(intervalNum);
            dameger.removeTag("wind_shell");
        }, 60);
    } catch(error) {
    } finally {
        entity.remove();
    }
}
