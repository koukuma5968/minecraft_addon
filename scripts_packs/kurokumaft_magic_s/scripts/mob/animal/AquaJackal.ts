import { Entity, EntityDamageCause } from "@minecraft/server";

/**
 * アクアジャッカルアタック
 */
export async function aquaJackalAttack(hitEntity:Entity) {

    hitEntity.applyDamage(1, {
        cause: EntityDamageCause.drowning
    });
    hitEntity.dimension.spawnParticle("kurokumaft:jackal_desires", hitEntity.location);
}