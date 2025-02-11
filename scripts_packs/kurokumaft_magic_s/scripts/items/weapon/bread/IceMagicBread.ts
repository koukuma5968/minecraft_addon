import { Entity, EntityDamageCause, Player } from "@minecraft/server";
import { shooting } from "../../../common/MagicShooterMagicEvent";

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

    shooting(player, "kurokumaft:syusetu_bread", 0.5, 4,"kurokumaft:projectile_1");

}