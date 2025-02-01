import { Entity, EntityDamageCause } from "@minecraft/server";

/**
 * ファイアバードアタック
 */
export async function fireChickenAttack(hitEntity:Entity) {

    hitEntity.applyDamage(1, {
        cause: EntityDamageCause.fire
    });
    hitEntity.dimension.spawnParticle("kurokumaft:fox_frame", hitEntity.location);
}