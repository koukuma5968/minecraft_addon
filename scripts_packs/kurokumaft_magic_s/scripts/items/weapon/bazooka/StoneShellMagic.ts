import { Entity, EntityDamageCause, EntityQueryOptions, Player, system, TicksPerSecond } from "@minecraft/server";
import { addTeamsTagFilter } from "../../../common/MagicCommonUtil";

/**
 * ストーンシェル
 */
export async function stoneShell(entity:Entity, dameger:Entity) {
    try {
        let dim = dameger.dimension;
        let enLoc = entity.location
    
        dameger.addTag("stone_shell");
        let intervalNum = system.runInterval(() => {
            dim.spawnParticle("kurokumaft:stone_shell", enLoc);

            let filterOption = {
                excludeTags: [
                    "stone_shell",
                ],
                location: enLoc,
                maxDistance: 6
            } as EntityQueryOptions;

            addTeamsTagFilter(dameger as Player, filterOption);

            let targets = dim.getEntities(filterOption);
            targets.forEach(en => {
                if (en instanceof Player) {
                    en.applyDamage(1, {
                        cause: EntityDamageCause.stalagmite
                    });
                } else {
                    en.applyDamage(3, {
                        cause: EntityDamageCause.stalagmite
                    });
                }
            })
        }, 5);
        system.runTimeout(() => {
            system.clearRun(intervalNum);
            dameger.removeTag("stone_shell");
        }, 60);
    } catch(error) {
    } finally {
        entity.remove();
    }
}
