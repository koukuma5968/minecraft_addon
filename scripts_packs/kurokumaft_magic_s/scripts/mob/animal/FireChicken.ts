import { Entity, EntityDamageCause, world } from "@minecraft/server";

/**
 * ファイアバードアタック
 */
export async function fireChickenAttack(hitEntity:Entity) {

    try {
        hitEntity.applyDamage(1, {
            cause: EntityDamageCause.fireTick
        });
        hitEntity.dimension.spawnParticle("kurokumaft:chicken_firing", {x:hitEntity.location.x,y:hitEntity.location.y+0.5,z:hitEntity.location.z});
    } catch(error) {
    }
}