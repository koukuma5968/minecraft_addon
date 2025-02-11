import { Entity, EntityDamageCause, Player } from "@minecraft/server";
import { shooting } from "../../../common/MagicShooterMagicEvent";

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

    shooting(player, "kurokumaft:break_rock_slash", 0.5, 3, undefined);

}