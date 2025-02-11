import { Entity, EntityDamageCause, Player } from "@minecraft/server";
import { shooting } from "../../../common/MagicShooterMagicEvent";

/**
 * 蒼破斬(そうはざん)
 */
export async function aquaDesires(entity:Entity) {

    if (entity != undefined && entity.isValid()) {
        entity.dimension.spawnParticle("kurokumaft:aqua_desires_particle", {x:entity.location.x+0.5,y:entity.location.y,z:entity.location.z});
        entity.dimension.spawnParticle("kurokumaft:aqua_desires_particle", {x:entity.location.x,y:entity.location.y,z:entity.location.z});
        entity.dimension.spawnParticle("kurokumaft:aqua_desires_particle", {x:entity.location.x-0.5,y:entity.location.y,z:entity.location.z});
        entity.applyDamage(5, {
            cause: EntityDamageCause.drowning
        });
    }

}

/**
 * 水星砕き(すいせいくだき)
 */
export async function mercurySmash(player:Player) {

    shooting(player, "kurokumaft:mercury_smash", 0, 2,"kurokumaft:projectile_1");
    shooting(player, "kurokumaft:mercury_smash", 0, 2,"kurokumaft:projectile_2");
    shooting(player, "kurokumaft:mercury_smash", 0, 2,"kurokumaft:projectile_3");

}