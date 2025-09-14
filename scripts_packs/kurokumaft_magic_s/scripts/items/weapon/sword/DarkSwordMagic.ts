import { Entity, EntityDamageCause, Player, TicksPerSecond, world } from "@minecraft/server";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

/**
 * ダークーソード
 * @param {Player} player
 * @param {Entity} entity
 */
export async function darkSword(player:Player, entity:Entity) {

    entity.dimension.spawnParticle("kurokumaft:dark_sword_slash", entity.location);
    if (entity instanceof Player) {
        if (world.gameRules.pvp) {
            entity.applyDamage(5, {
                cause: EntityDamageCause.wither
            });
            entity.addEffect(MinecraftEffectTypes.Wither, 10*TicksPerSecond, {
                amplifier: 5
            });
        }
    } else {
        entity.applyDamage(15, {
            cause: EntityDamageCause.wither
        });
        entity.addEffect(MinecraftEffectTypes.Wither, 20*TicksPerSecond, {
            amplifier: 15
        });
    }
}

/**
 * ダークーソード(モンス)
 * @param {Entity} attack
 * @param {Entity} hit
 */
export async function darkSwordMons(attack:Entity, hit:Entity) {

    hit.dimension.spawnParticle("kurokumaft:dark_sword_slash", hit.location);
    if (hit instanceof Player) {
        hit.applyDamage(3, {
            cause: EntityDamageCause.wither
        });
        hit.addEffect("minecraft:wither", 10*TicksPerSecond, {
            amplifier: 3
        });
    } else {
        hit.applyDamage(15, {
            cause: EntityDamageCause.wither
        });
        hit.addEffect("minecraft:wither", 20*TicksPerSecond, {
            amplifier: 15
        });
   }
}