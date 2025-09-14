import { Entity, EntityDamageCause, Player, TicksPerSecond, world } from "@minecraft/server";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

/**
 * ストーンソード
 * @param {Player} player
 * @param {Entity} entity
 */
export async function stoneSword(player:Player, entity:Entity) {

    entity.dimension.spawnParticle("kurokumaft:stone_sword_slash", entity.location);
    if (entity instanceof Player) {
        if (world.gameRules.pvp) {
            entity.applyDamage(2, {
                cause: EntityDamageCause.fallingBlock
            });
            entity.addEffect("minecraft:weakness", 20*TicksPerSecond, {
                amplifier: 5
            });
        }
    } else {
        entity.applyDamage(5, {
            cause: EntityDamageCause.fallingBlock
        });
        entity.addEffect("minecraft:weakness", 50*TicksPerSecond, {
            amplifier: 20
        });
    }
}

// /**

/**
 * ストーンソード(モンス)
 * @param {Entity} attack
 * @param {Entity} hit
 */
export async function stoneSwordMons(attack:Entity, hit:Entity) {

    hit.dimension.spawnParticle("kurokumaft:stone_sword_slash", hit.location);
    if (hit instanceof Player) {
        hit.applyDamage(2, {
            cause: EntityDamageCause.fallingBlock
        });
        hit.addEffect("minecraft:weakness", 10*TicksPerSecond, {
            amplifier: 1
        });
    } else {
        hit.applyDamage(5, {
            cause: EntityDamageCause.fallingBlock
        });
        hit.addEffect("minecraft:weakness", 50*TicksPerSecond, {
            amplifier: 20
        });
    }
}