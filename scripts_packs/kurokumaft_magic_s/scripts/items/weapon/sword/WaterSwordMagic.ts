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