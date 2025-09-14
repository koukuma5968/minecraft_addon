import { Entity, EntityDamageCause, Player, TicksPerSecond, world } from "@minecraft/server";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

/**
 * ウォーターソード
 * @param {Player} player
 * @param {Entity} entity
 */
export async function waterSword(player:Player, entity:Entity) {

    entity.dimension.spawnParticle("kurokumaft:water_sword_slash", entity.location);
    if (entity instanceof Player) {
        if (world.gameRules.pvp) {
            entity.applyDamage(2, {
                cause: EntityDamageCause.drowning
            });
            entity.addEffect(MinecraftEffectTypes.Slowness, 10*TicksPerSecond, {
                amplifier: 2
            });
        }
    } else {
        entity.applyDamage(10, {
            cause: EntityDamageCause.drowning
        });
        entity.addEffect(MinecraftEffectTypes.Slowness, 10*TicksPerSecond, {
            amplifier: 10
        });
    }
}


/**
 * ウォーターソード(モンス)
 * @param {Entity} attack
 * @param {Entity} hit
 */
export async function waterSwordMons(attack:Entity, hit:Entity) {

    hit.dimension.spawnParticle("kurokumaft:water_sword_slash", hit.location);
    if (hit instanceof Player) {
        hit.applyDamage(2, {
            cause: EntityDamageCause.drowning
        });
        hit.addEffect(MinecraftEffectTypes.Slowness, 10*TicksPerSecond, {
            amplifier: 2
        });
    } else {
        hit.applyDamage(10, {
            cause: EntityDamageCause.drowning
        });
        hit.addEffect(MinecraftEffectTypes.Slowness, 10*TicksPerSecond, {
            amplifier: 10
        });
   }
}