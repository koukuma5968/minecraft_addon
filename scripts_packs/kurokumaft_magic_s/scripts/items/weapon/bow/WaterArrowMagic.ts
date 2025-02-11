import { Entity, EntityDamageCause, EntityQueryOptions, Player, system, TicksPerSecond, world } from "@minecraft/server";
import { shooting } from "../../../common/MagicShooterMagicEvent";
import { addTeamsTagFilter, getDirectionVector } from "../../../common/MagicCommonUtil";

/**
 * ウォーターアローホーミング
 */
export async function waterArrowHoming(player:Player, arrow:string, ran:number, speed:number) {
    let water = shooting(player, arrow, ran, speed, undefined);
    water.addTag("waterarrow")
    let intervalNum = system.runInterval(() => {
        if (water != undefined && water.isValid()) {

            let filterOption = {
                excludeTags: [
                    "waterarrow",
                ],
                location: water.location,
                maxDistance: 30,
                closest: 1
            } as EntityQueryOptions;
        
            addTeamsTagFilter(player, filterOption);
        
            let target = water.dimension.getEntities(filterOption);
            if (target != undefined && target.length > 0) {
                let targetLoc = getDirectionVector(water.location, target[0].location);
                let tpLoc = {
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
        } else {
            system.clearRun(intervalNum);
        }
    }, 5);
    system.runTimeout(() => {
        if (water != undefined && water.isValid()) {
            water.removeTag("waterarrow")
            water.remove();
        }
        system.clearRun(intervalNum);
    }, 10*TicksPerSecond);
}

/**
 * ウォーターアロー
 */
export async function waterArrow(entity:Entity) {
    let intervalNum = system.runInterval(() => {
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
    }, TicksPerSecond * 4);
}
