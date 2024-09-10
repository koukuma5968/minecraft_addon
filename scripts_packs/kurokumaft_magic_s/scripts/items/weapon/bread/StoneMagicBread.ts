import { Entity, EntityDamageCause, Player } from "@minecraft/server";
import { getRandomInRange } from "../../../common/commonUtil";
import { shooting } from "../../../custom/ShooterMagicEvent";

/**
 * 岩割刃(がんかつじん)
 */
export async function stoneDesires(entity:Entity) {
    if (entity != undefined && entity.isValid()) {
        entity.dimension.spawnParticle("kurokumaft:stone_desires_particle", entity.location);
        entity.applyDamage(5, {
            cause: EntityDamageCause.thorns
        });
    }
}

/**
 * 破岩衝(はがんしょう)
 */
export async function breakRockSlash(player:Player) {

    let xran = parseFloat(getRandomInRange(-0.2, 0.1).toFixed(3));
    let yran = parseFloat(getRandomInRange(-0.2, 0.2).toFixed(3));
    let zran = parseFloat(getRandomInRange(-0.2, 0.2).toFixed(3));

    shooting(player, "kurokumaft:break_rock_slash", {x:xran,y:yran,z:zran}, 3, undefined);

}