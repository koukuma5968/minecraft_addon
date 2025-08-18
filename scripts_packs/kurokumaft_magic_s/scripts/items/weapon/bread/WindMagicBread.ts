import { Entity, EntityDamageCause, Player, system } from "@minecraft/server";
import { shooting } from "../../../common/MagicShooterMagicEvent";

/**
 * 烈風刃(れっぷうじん)
 */
export function windDesires(entity:Entity) {

    if (entity != undefined && entity.isValid) {
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

    const intervalNum = system.runInterval(() => {
        shooting(player, "kurokumaft:wind_bark_slash", 1, 5,"kurokumaft:projectile_1");
        shooting(player, "kurokumaft:wind_bark_slash", 1, 5,"kurokumaft:projectile_2");
        shooting(player, "kurokumaft:wind_bark_slash", 1, 5,"kurokumaft:projectile_3");
    }, 5);

    system.runTimeout(() => {
        system.clearRun(intervalNum);
    }, 60);
}