import { Entity, EntityDamageCause, EntityQueryOptions, Player, system, TicksPerSecond, world } from "@minecraft/server";
import { shooting } from "../../../common/MagicShooterMagicEvent";
import { addTeamsTagFilter, getDirectionVector } from "../../../common/MagicCommonUtil";

/**
 * ウォーターアローホーミング
 */
export async function waterArrowHoming(player:Player, arrow:string, ran:number, speed:number) {
    const water = shooting(player, arrow, ran, speed, undefined);
    water.addTag("waterarrow")
    player.addTag("waterarrow_self");
    const intervalNum = system.runInterval(() => {
        if (water != undefined && water.isValid()) {

            const filterOption = {
                excludeTags: [
                    "waterarrow",
                    "waterarrow_self",
                ],
                location: water.location,
                maxDistance: 30,
                closest: 1
            } as EntityQueryOptions;
        
            addTeamsTagFilter(player, filterOption);
        
            const target = water.dimension.getEntities(filterOption);
            if (target != undefined && target.length > 0 && target[0].isValid()) {
                const targetLoc = getDirectionVector(water.location, target[0].location);
                const tpLoc = {
                    x:water.location.x+targetLoc.x,
                    y:water.location.y+targetLoc.y,
                    z:water.location.z+targetLoc.z
                }
                water.teleport(tpLoc, {
                    checkForBlocks: false,
                    facingLocation: targetLoc,
                    keepVelocity: false
                });
                water.applyImpulse(targetLoc);
            }
            player.setDynamicProperty(player.id, undefined);

        } else {
            system.clearRun(intervalNum);
        }
    }, 5);
    system.runTimeout(() => {
        if (water != undefined && water.isValid()) {
            water.removeTag("waterarrow")
            water.removeTag("waterarrow_self")
            water.remove();
        }
        system.clearRun(intervalNum);
    }, 10*TicksPerSecond);
}

/**
 * ウォーターアロー
 */
export async function waterArrow(entity:Entity) {
    const intervalNum = system.runInterval(() => {
        if (entity.isValid()) {
            if (entity instanceof Player) {
                if (world.gameRules.pvp) {
                    entity.applyDamage(1, {
                        cause: EntityDamageCause.drowning
                    });
                }
            } else {
                entity.applyDamage(3, {
                    cause: EntityDamageCause.drowning
                });
            }
        }
    }, TicksPerSecond);
    system.runTimeout(() => {
        system.clearRun(intervalNum);
    }, TicksPerSecond * 2);
}
