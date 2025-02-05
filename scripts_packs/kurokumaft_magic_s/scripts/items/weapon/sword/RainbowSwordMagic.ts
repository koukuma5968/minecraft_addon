import { Entity, EntityDamageCause, Player, TicksPerSecond, world } from "@minecraft/server";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

/**
 * ウォーターソード
 * @param {Player} player
 * @param {Entity} entity
 */
export async function rainbowSword(player:Player, entity:Entity) {

    player.addTag("rainbow_sword");
    entity.dimension.spawnParticle("kurokumaft:rainbow_sword_slash", entity.location);

    if (entity instanceof Player) {
        if (world.gameRules.pvp) {
            entity.applyDamage(5, {
                cause: EntityDamageCause.fire
            });
            entity.applyDamage(5, {
                cause: EntityDamageCause.lightning
            });
            entity.applyDamage(5, {
                cause: EntityDamageCause.freezing
            });
            entity.addEffect(MinecraftEffectTypes.Weakness, 10*TicksPerSecond, {
                amplifier: 10
            });
            entity.addEffect(MinecraftEffectTypes.Wither, 10*TicksPerSecond, {
                amplifier: 1
            });
            entity.addEffect(MinecraftEffectTypes.Slowness, 10*TicksPerSecond, {
                amplifier: 1
            });
            entity.addEffect(MinecraftEffectTypes.Blindness, 3*TicksPerSecond, {
                amplifier: 1
            });
            }
    } else {
        entity.applyDamage(20, {
            cause: EntityDamageCause.fire
        });
        entity.applyDamage(20, {
            cause: EntityDamageCause.lightning
        });
        entity.applyDamage(20, {
            cause: EntityDamageCause.freezing
        });
        entity.addEffect(MinecraftEffectTypes.Weakness, 20*TicksPerSecond, {
            amplifier: 15
        });
        entity.addEffect(MinecraftEffectTypes.Wither, 20*TicksPerSecond, {
            amplifier: 10
        });
        entity.addEffect(MinecraftEffectTypes.Slowness, 20*TicksPerSecond, {
            amplifier: 10
        });
        entity.addEffect(MinecraftEffectTypes.Blindness, 3*TicksPerSecond, {
            amplifier: 15
        });
    }
    player.removeTag("rainbow_sword");

}
