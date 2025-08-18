import { Entity } from "@minecraft/server";

/**
 * アースライノノックバック
 */
export async function earthRhinoKnockback(hitEntity:Entity) {

    hitEntity.dimension.spawnParticle("kurokumaft:rhino_knockback", hitEntity.location);
    hitEntity.applyKnockback({x:0, z:3}, 1);
}