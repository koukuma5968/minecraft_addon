import { Entity, EntityDamageCause, Player, TicksPerSecond, world } from "@minecraft/server";

/**
 * レインボーソード
 * @param {Player} player
 * @param {Entity} entity
 */
export async function rainbowSword(player:Player, entity:Entity) {

    player.addTag(player.id);
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
            entity.addEffect( "minecraft:weakness", 10*TicksPerSecond, {
                amplifier: 10
            });
            entity.addEffect("minecraft:wither", 10*TicksPerSecond, {
                amplifier: 1
            });
            entity.addEffect("minecraft:slowness", 10*TicksPerSecond, {
                amplifier: 1
            });
            entity.addEffect("minecraft:blindness", 3*TicksPerSecond, {
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
        entity.addEffect("minecraft:weakness", 20*TicksPerSecond, {
            amplifier: 15
        });
        entity.addEffect("minecraft:wither", 20*TicksPerSecond, {
            amplifier: 10
        });
        entity.addEffect("minecraft:slowness", 20*TicksPerSecond, {
            amplifier: 10
        });
        entity.addEffect("minecraft:blindness", 3*TicksPerSecond, {
            amplifier: 15
        });
    }
    player.removeTag(player.id);

}
