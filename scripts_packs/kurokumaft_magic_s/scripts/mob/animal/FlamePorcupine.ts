import { Entity, EntityDamageCause } from "@minecraft/server";

/**
 * フレイムポークパインガード
 */
export async function flamePorcupineGuard(dameger:Entity) {

    dameger.applyDamage(3, {
        cause: EntityDamageCause.fire
    });
    dameger.dimension.spawnParticle("kurokumaft:porcupine_pillar", dameger.location);
}