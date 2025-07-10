import { Entity, EntityDamageCause, EntityQueryOptions, Player, system, TicksPerSecond } from "@minecraft/server";
import { addTeamsTagFilter } from "../../../common/MagicCommonUtil";

/**
 * ウォーターシェル
 */
export async function waterShell(entity:Entity, dameger:Entity) {
    try {
        const dim = dameger.dimension;
        const enLoc = entity.location
    
        dameger.addTag("water_shell");
        const intervalNum = system.runInterval(() => {
            dim.spawnParticle("kurokumaft:water_shell", enLoc);

            const filterOption = {
                excludeTags: [
                    "water_shell",
                ],
                location: enLoc,
                maxDistance: 6
            } as EntityQueryOptions;

            addTeamsTagFilter(dameger as Player, filterOption);

            const targets = dim.getEntities(filterOption);
            targets.forEach(en => {
                if (en instanceof Player) {
                    en.applyDamage(1, {
                        cause: EntityDamageCause.drowning
                    });
                } else {
                    en.applyDamage(3, {
                        cause: EntityDamageCause.drowning
                    });
                }
            })
        }, 5);
        system.runTimeout(() => {
            system.clearRun(intervalNum);
            dameger.removeTag("water_shell");
        }, 60);
    } catch(error) {
    } finally {
        entity.remove();
    }
}
