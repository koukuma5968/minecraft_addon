import { Entity, EntityDamageCause } from "@minecraft/server";

/**
 * アースライノノックバック
 */
export async function earthRhinoKnockback(hitEntity:Entity) {

    hitEntity.dimension.spawnParticle("kurokumaft:rhino_knockback", hitEntity.location);
    hitEntity.applyKnockback(0, 3, 1, 1);
}