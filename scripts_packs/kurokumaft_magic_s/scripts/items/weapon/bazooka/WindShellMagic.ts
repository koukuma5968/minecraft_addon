import { Entity, EntityDamageCause, Player, system, TicksPerSecond } from "@minecraft/server";
import { addTeamsTagFilter } from "../../../common/MagicCommonUtil";

/**
 * ウィンドシェル
 */
export async function windShell(entity:Entity, dameger:Entity) {
    try {
        const dim = dameger.dimension;
        const enLoc = entity.location
    
        dameger.addTag("wind_shell");
        const intervalNum = system.runInterval(() => {
            dim.spawnParticle("kurokumaft:wind_shell", enLoc);

            const filterOption = {
                excludeTags: [
                    "wind_shell",
                ],
                location: enLoc,
                maxDistance: 6
            } as ClientQueryOptions;

            addTeamsTagFilter(dameger as Player, filterOption);

            const targets = dim.getEntities(filterOption);
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
