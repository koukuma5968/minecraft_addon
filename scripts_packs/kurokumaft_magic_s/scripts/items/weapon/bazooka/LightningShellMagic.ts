import { Entity, EntityDamageCause, EntityQueryOptions, Player, system, TicksPerSecond } from "@minecraft/server";
import { addTeamsTagFilter } from "../../../common/MagicCommonUtil";

/**
 * ライトニングシェル
 */
export async function lightningShell(entity:Entity, dameger:Entity) {
    try {
        const dim = dameger.dimension;
        const enLoc = entity.location
    
        dameger.addTag("lightning_shell");
        const intervalNum = system.runInterval(() => {
            dim.spawnParticle("kurokumaft:lightning_shell", enLoc);

            const filterOption = {
                excludeTags: [
                    "lightning_shell",
                ],
                location: enLoc,
                maxDistance: 6
            } as EntityQueryOptions;

            addTeamsTagFilter(dameger as Player, filterOption);

            const targets = dim.getEntities(filterOption);
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
