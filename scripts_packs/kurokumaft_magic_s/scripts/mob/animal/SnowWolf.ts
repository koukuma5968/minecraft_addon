import { Entity, EntityDamageCause } from "@minecraft/server";

/**
 * スノーウルフアタック
 */
export async function snowWolfAttack(hitEntity:Entity) {

    hitEntity.applyDamage(1, {
        cause: EntityDamageCause.freezing
    });
    hitEntity.dimension.spawnParticle("kurokumaft:ice_wolf_fang", hitEntity.location);
}