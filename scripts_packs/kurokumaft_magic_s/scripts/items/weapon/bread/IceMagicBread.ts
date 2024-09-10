import { Entity, EntityDamageCause, Player } from "@minecraft/server";
import { getRandomInRange } from "../../../common/commonUtil";
import { shooting } from "../../../custom/ShooterMagicEvent";

/**
 * 斬雪(ざんせつ)
 */
export async function iceDesires(entity:Entity) {
    if (entity != undefined && entity.isValid()) {
        entity.dimension.spawnParticle("kurokumaft:ice_desires_particle", entity.location);
        entity.applyDamage(5, {
            cause: EntityDamageCause.freezing
        });
    }

}

/**
 * 終雪氷晶(しゅうせつひょうしょう)
 */
export async function syusetuBread(player:Player) {

    let xran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
    let yran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
    let zran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));

    shooting(player, "kurokumaft:syusetu_bread", {x:xran,y:yran,z:zran}, 4,"kurokumaft:projectile_1");

}