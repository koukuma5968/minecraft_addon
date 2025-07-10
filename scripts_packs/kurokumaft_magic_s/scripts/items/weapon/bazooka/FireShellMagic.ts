import { Entity, EntityDamageCause, EntityQueryOptions, Player, system } from "@minecraft/server";
import { addTeamsTagFilter } from "../../../common/MagicCommonUtil";

/**
 * ファイアシェル
 */
export async function fireShell(entity:Entity, dameger:Entity) {
    try {
        const dim = dameger.dimension;
        const enLoc = entity.location

        dameger.addTag("fire_shell");
        const intervalNum = system.runInterval(() => {
            dim.spawnParticle("kurokumaft:fire_shell", enLoc);

            const filterOption = {
                excludeTags: [
                    "fire_shell",
                ],
                location: enLoc,
                maxDistance: 6
            } as EntityQueryOptions;

            addTeamsTagFilter(dameger as Player, filterOption);

            const targets = dim.getEntities(filterOption);
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
