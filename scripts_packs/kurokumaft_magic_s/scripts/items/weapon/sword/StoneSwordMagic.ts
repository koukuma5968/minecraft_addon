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
            entity.addEffect(MinecraftEffectTypes.Weakness, 20*TicksPerSecond, {
                amplifier: 2
            });
        }
    } else {
        entity.applyDamage(5, {
            cause: EntityDamageCause.fallingBlock
        });
        entity.addEffect(MinecraftEffectTypes.Weakness, 100*TicksPerSecond, {
            amplifier: 50
        });
    }
}

// /**
//  * §cブレイズバースト
//  * @param {Player} player
//  */
// export async function blazeBurst(player:Player) {

//     player.dimension.spawnParticle("kurokumaft:explosion_shell", player.location);
//     player.dimension.spawnParticle("kurokumaft:explosion_wave_particle", player.location);

//     let entitys = player.dimension.getEntities({
//         excludeFamilies: [
//             "player", "inanimate", "familiar"
//         ],
//         excludeTags: [
//             "item"
//         ],
//         maxDistance: 8
//     }) as Entity[];

//     entitys.forEach(en => {
//         en.dimension.spawnEntity("kurokumaft:fire_sword_magic", 
//             {
//                 x:en.location.x,
//                 y:en.location.y + 0.75,
//                 z:en.location.z
//             }
//         );
//         en.applyDamage(100, {
//             cause: EntityDamageCause.fire
//         });
//     });

//     if (world.gameRules.pvp) {
//         let players = player.dimension.getEntities({
//             families: [
//                 "player"
//             ],
//             maxDistance: 8
//         }) as Player[];
    
//         players.forEach(en => {
//             en.dimension.spawnEntity("kurokumaft:fire_sword_magic", 
//                 {
//                     x:en.location.x,
//                     y:en.location.y + 0.75,
//                     z:en.location.z
//                 }
//             );
//             en.applyDamage(10, {
//                 cause: EntityDamageCause.fire
//             });
//         });
//     }
// }

/**
 * ストーンソード(モンス)
 * @param {Entity} attack
 * @param {Entity} hit
 */
export async function stoneSwordMons(attack:Entity, hit:Entity) {

    hit.dimension.spawnParticle("kurokumaft:water_sword_slash", hit.location);
    if (hit instanceof Player) {
        hit.applyDamage(2, {
            cause: EntityDamageCause.fallingBlock
        });
        hit.addEffect(MinecraftEffectTypes.Weakness, 10*TicksPerSecond, {
            amplifier: 1
        });
    } else {
        hit.applyDamage(5, {
            cause: EntityDamageCause.fallingBlock
        });
        hit.addEffect(MinecraftEffectTypes.Weakness, 100*TicksPerSecond, {
            amplifier: 50
        });
    }
}