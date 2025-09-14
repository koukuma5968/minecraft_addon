import { Entity, EntityDamageCause, Player, TicksPerSecond, world } from "@minecraft/server";

/**
 * アイスソード
 * @param {Player} player
 * @param {Entity} entity
 */
export async function iceSword(player:Player, entity:Entity) {

    entity.dimension.spawnParticle("kurokumaft:ice_sword_slash", entity.location);

    if (entity instanceof Player) {
        if (world.gameRules.pvp) {
            entity.addEffect("minecraft:poison", 10*TicksPerSecond, {
                amplifier: 2
            });
        }
    } else {
        entity.applyDamage(25, {
            cause: EntityDamageCause.freezing
        });
        entity.addEffect("minecraft:poison", 20*TicksPerSecond, {
            amplifier: 10
        });
    }
}

/**
 * アイスソード(モンス)
 * @param {Entity} attack
 * @param {Entity} hit
 */
export async function iceSwordMons(attack:Entity, hit:Entity) {

    hit.dimension.spawnParticle("kurokumaft:ice_sword_slash", hit.location);
    if (hit instanceof Player) {
        hit.applyDamage(2, {
            cause: EntityDamageCause.freezing
        });
        hit.addEffect("minecraft:poison", 10*TicksPerSecond, {
            amplifier: 2
        });
    } else {
        hit.applyDamage(15, {
            cause: EntityDamageCause.freezing
        });
        hit.addEffect("minecraft:poison", 20*TicksPerSecond, {
            amplifier: 10
        });
   }
}