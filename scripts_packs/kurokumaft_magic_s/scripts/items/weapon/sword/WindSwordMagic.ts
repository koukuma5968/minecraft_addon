import { Entity, EntityDamageCause, Player, world } from "@minecraft/server";

/**
 * ウィンドソード
 * @param {Player} player
 * @param {Entity} entity
 */
export async function windSword(player:Player, entity:Entity) {

    entity.dimension.spawnParticle("kurokumaft:wind_roar_particle", entity.location);
    entity.applyKnockback({x:entity.getViewDirection().x-2, z:entity.getViewDirection().z-2}, 0.5);
    if (entity instanceof Player) {
        if (world.gameRules.pvp) {
            entity.applyDamage(2, {
                cause: EntityDamageCause.fallingBlock
            });
        }
    } else {
        entity.applyDamage(10, {
            cause: EntityDamageCause.fallingBlock
        });
    }
}

/**
 * ウィンドソード(モンス)
 * @param {Entity} attack
 * @param {Entity} hit
 */
export async function windSwordMons(attack:Entity, hit:Entity) {

    hit.dimension.spawnParticle("kurokumaft:wind_roar_particle", hit.location);
    hit.applyKnockback({x:hit.getViewDirection().x, z:hit.getHeadLocation().z}, 0.5);
    if (hit instanceof Player) {
        hit.applyDamage(2, {
            cause: EntityDamageCause.fallingBlock
        });
    } else {
        hit.applyDamage(10, {
            cause: EntityDamageCause.fallingBlock
        });
    }
}