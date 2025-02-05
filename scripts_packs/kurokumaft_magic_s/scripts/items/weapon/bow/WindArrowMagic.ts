import { Entity, EntityDamageCause, Player, system, TicksPerSecond, world } from "@minecraft/server";
import { shooting } from "../../../common/ShooterMagicEvent";

/**
 * ウィンドアロー
 */
export async function windArrowShot(player:Player, arrow:string, ran:number, speed:number) {
    let intervalNum = system.runInterval(() => {
        shooting(player, arrow, ran, speed, undefined);
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
            if (entity instanceof Player) {
                if (world.gameRules.pvp) {
                    entity.applyDamage(1, {
                        cause: EntityDamageCause.fall
                    });
                }
            } else {
                entity.applyDamage(3, {
                    cause: EntityDamageCause.fall
                });
            }
        }
    }, TicksPerSecond);
    system.runTimeout(() => {
        system.clearRun(intervalNum);
    }, TicksPerSecond * 4);
}
