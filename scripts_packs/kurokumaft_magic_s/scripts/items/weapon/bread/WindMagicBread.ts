import { Entity, EntityDamageCause, Player, system } from "@minecraft/server";
import { getRandomInRange } from "../../../common/commonUtil";
import { shooting } from "../../../custom/ShooterMagicEvent";

/**
 * 烈風刃(れっぷうじん)
 */
export function windDesires(entity:Entity) {

    if (entity != undefined && entity.isValid()) {
        entity.dimension.spawnParticle("kurokumaft:wind_desires_particle", {x:entity.location.x+0.5,y:entity.location.y,z:entity.location.z});
        entity.dimension.spawnParticle("kurokumaft:wind_desires_particle", {x:entity.location.x,y:entity.location.y,z:entity.location.z});
        entity.dimension.spawnParticle("kurokumaft:wind_desires_particle", {x:entity.location.x-0.5,y:entity.location.y,z:entity.location.z});
        entity.applyDamage(2, {
            cause: EntityDamageCause.flyIntoWall
        });
        entity.applyDamage(2, {
            cause: EntityDamageCause.flyIntoWall
        });
        entity.applyDamage(2, {
            cause: EntityDamageCause.flyIntoWall
        });
    }

}

/**
 * 風鳴切(かなきり)
 */
export function windBarkSlash(player:Player) {

    let xran = parseFloat(getRandomInRange(-0.5, 0.5).toFixed(3));
    let yran = parseFloat(getRandomInRange(-0.2, 0.5).toFixed(3));
    let zran = parseFloat(getRandomInRange(-0.5, 0.5).toFixed(3));

    let intervalNum = system.runInterval(() => {
        shooting(player, "kurokumaft:wind_bark_slash", {x:xran,y:yran,z:zran}, 5,"kurokumaft:projectile_1");
        shooting(player, "kurokumaft:wind_bark_slash", {x:xran,y:yran,z:zran}, 5,"kurokumaft:projectile_2");
        shooting(player, "kurokumaft:wind_bark_slash", {x:xran,y:yran,z:zran}, 5,"kurokumaft:projectile_3");
    }, 5);

    system.runTimeout(() => {
        system.clearRun(intervalNum);
    }, 60);
}