import { Entity, EntityDamageCause, EntityQueryOptions, Player, system } from "@minecraft/server";
import { addTeamsTagFilter } from "../../../common/commonUtil";

/**
 * ファイアシェル
 */
export async function fireShell(entity:Entity, dameger:Entity) {
    try {
        let dim = dameger.dimension;
        let enLoc = entity.location

        dameger.addTag("fire_shell");
        let intervalNum = system.runInterval(() => {
            dim.spawnParticle("kurokumaft:fire_shell", enLoc);

            let filterOption = {
                excludeTags: [
                    "fire_shell",
                ],
                location: enLoc,
                maxDistance: 6
            } as EntityQueryOptions;

            addTeamsTagFilter(dameger as Player, filterOption);

            let targets = dim.getEntities(filterOption);
            targets.forEach(en => {
                if (en instanceof Player) {
                    en.applyDamage(1, {
                        cause: EntityDamageCause.fire
                    });
                } else {
                    en.applyDamage(3, {
                        cause: EntityDamageCause.fire
                    });
                }
            })
        }, 5);
        system.runTimeout(() => {
            system.clearRun(intervalNum);
            dameger.removeTag("fire_shell");
        }, 60);
    
    } catch(error) {
    } finally {
        entity.remove();
    }
}
