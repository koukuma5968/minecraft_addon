import { Entity, EntityDamageCause, Player } from "@minecraft/server";
import { getRandomInRange } from "../../../common/commonUtil";
import { shooting } from "../../../custom/ShooterMagicEvent";

/**
 * 雷斬(らいきり)
 */
export async function thunderDesires(entity:Entity) {

    if (entity != undefined && entity.isValid()) {
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

    let xran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
    let yran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
    let zran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));

    shooting(player, "kurokumaft:raizin_bread", {x:xran,y:yran,z:zran}, 4, undefined);

}