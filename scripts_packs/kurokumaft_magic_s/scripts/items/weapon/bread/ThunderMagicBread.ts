import { Entity, EntityDamageCause, Player } from "@minecraft/server";
import { shooting } from "../../../common/MagicShooterMagicEvent";

/**
 * 雷斬(らいきり)
 */
export async function thunderDesires(entity:Entity) {

    if (entity != undefined && entity.isValid) {
        entity.dimension.spawnParticle("kurokumaft:thunder_desires_particle", entity.location);
        entity.applyDamage(5, {
            cause: EntityDamageCause.lightning
        });
    }

}

/**
 * 雷神剣(らいじんけん)
 */
export async function raizinBread(player:Player) {

    shooting(player, "kurokumaft:raizin_bread", 0.1, 4, undefined);

}