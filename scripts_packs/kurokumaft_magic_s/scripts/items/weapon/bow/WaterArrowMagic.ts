import { Entity, EntityDamageCause, Player, system, TicksPerSecond, Vector3 } from "@minecraft/server";
import { shooting } from "../../../custom/ShooterMagicEvent";
import { getDirectionVector } from "../../../common/commonUtil";

/**
 * ウォーターアローホーミング
 */
export async function waterArrowHoming(player:Player, arrow:string, loca:Vector3, speed:number) {
    let water = shooting(player, arrow, loca, 1.5, undefined);
    water.addTag("waterarrow")
    let intervalNum = system.runInterval(() => {
        if (water != undefined && water.isValid()) {
            let target = water.dimension.getEntities({
                excludeTags: [
                    "waterarrow"
                ],
                excludeFamilies: [
                    "inanimate", "magic", "player", "arrow"
                ],
                excludeTypes: [
                    "item"
                ],
                location: water.location,
                maxDistance: 30,
                closest: 1
            });
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
            entity.applyDamage(3, {
                cause: EntityDamageCause.drowning
            });
        }
    }, TicksPerSecond);
    system.runTimeout(() => {
        system.clearRun(intervalNum);
    }, TicksPerSecond * 4);
}
