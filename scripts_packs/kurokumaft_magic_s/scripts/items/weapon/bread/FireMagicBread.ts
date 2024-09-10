import { Entity, EntityDamageCause, Player } from "@minecraft/server";
import { getRandomInRange } from "../../../common/commonUtil";
import { shooting } from "../../../custom/ShooterMagicEvent";

/**
 * 焔裂き(ほむらざき)
 */
export async function flamingDesires(entity:Entity) {
    if (entity != undefined && entity.isValid()) {
        entity.dimension.spawnParticle("kurokumaft:flaming_desires_particle", entity.location);
        entity.applyDamage(5, {
            cause: EntityDamageCause.fire
        });
    }
}

/**
 * 紅蓮剣(ぐれんけん)
 */
export async function crimsonBread(player:Player) {

    let xran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
    let yran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
    let zran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));

    shooting(player, "kurokumaft:crimson_bread", {x:xran,y:yran,z:zran}, 2, undefined);

}