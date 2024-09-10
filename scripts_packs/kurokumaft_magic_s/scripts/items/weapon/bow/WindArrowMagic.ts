import { Entity, EntityDamageCause, Player, system, TicksPerSecond, Vector3 } from "@minecraft/server";
import { shooting } from "../../../custom/ShooterMagicEvent";

/**
 * ウィンドアロー
 */
export async function windArrowShot(player:Player, arrow:string, loca:Vector3, speed:number) {
    let intervalNum = system.runInterval(() => {
        shooting(player, arrow, loca, speed, undefined);
    }, 2);
    system.runTimeout(() => {
        system.clearRun(intervalNum);
    }, 10);
}

/**
 * ウィンドアローヒット
 */
export async function windArrow(entity:Entity) {
    let intervalNum = system.runInterval(() => {
        if (entity.isValid()) {
            entity.applyDamage(3, {
                cause: EntityDamageCause.fall
            });
        }
    }, TicksPerSecond);
    system.runTimeout(() => {
        system.clearRun(intervalNum);
    }, TicksPerSecond * 4);
}
