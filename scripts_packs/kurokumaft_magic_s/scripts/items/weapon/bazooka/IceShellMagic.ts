import { Entity, EntityDamageCause, EntityQueryOptions, Player, system, TicksPerSecond } from "@minecraft/server";
import { addTeamsTagFilter } from "../../../common/MagicCommonUtil";

/**
 * アイスシェル
 */
export async function iceShell(entity:Entity, dameger:Entity) {
    try {
        const dim = dameger.dimension;
        const enLoc = entity.location

        dameger.addTag("ice_shell");
        const intervalNum = system.runInterval(() => {
            dim.spawnParticle("kurokumaft:ice_shell", enLoc);

            const filterOption = {
                excludeTags: [
                    "ice_shell",
                ],
                location: enLoc,
                maxDistance: 6
            } as EntityQueryOptions;

            addTeamsTagFilter(dameger as Player, filterOption);

            const targets = dim.getEntities(filterOption);
            targets.forEach(en => {
                if (en instanceof Player) {
                    en.applyDamage(1, {
                        cause: EntityDamageCause.freezing
                    });
                } else {
                    en.applyDamage(3, {
                        cause: EntityDamageCause.freezing
                    });
                }
            })
        }, 5);
        system.runTimeout(() => {
            system.clearRun(intervalNum);
            dameger.removeTag("ice_shell");
        }, 60);

    } catch(error) {
    } finally {
        entity.remove();
    }
}
