import { Entity, EntityDamageCause, Player } from "@minecraft/server";
import { shooting } from "../../../common/MagicShooterMagicEvent";

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

    shooting(player, "kurokumaft:crimson_bread", 0.5, 2, undefined);

}