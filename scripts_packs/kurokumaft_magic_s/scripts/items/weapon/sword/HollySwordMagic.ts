import { Entity, Player, TicksPerSecond } from "@minecraft/server";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

/**
 * ウォーターソード
 * @param {Player} player
 * @param {Entity} entity
 */
export async function hollySword(player:Player, entity:Entity) {

    entity.dimension.spawnParticle("kurokumaft:holly_sword_slash", entity.location);

    const entitys = entity.dimension.getEntities({
        excludeFamilies: [
            "inanimate", "magic", "arrow"
        ],
        excludeTypes: [
            "item"
        ],
        location: entity.location,
        maxDistance: 7
    }) as Entity[];

    entitys.forEach(en => {
        en.addEffect(MinecraftEffectTypes.InstantHealth, 1*TicksPerSecond, {
            amplifier: 10,
            showParticles: false
        });
    });

}

// /**
//  * §cブレイズバースト
//  * @param {Player} player
//  */
// export async function blazeBurst(player:Player) {

//     player.dimension.spawnParticle("kurokumaft:explosion_shell", player.location);
//     player.dimension.spawnParticle("kurokumaft:explosion_wave_particle", player.location);

//     const entitys = player.dimension.getEntities({
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
//         const players = player.dimension.getEntities({
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
export async function hollySwordMons(attack:Entity, hit:Entity) {

    hit.dimension.spawnParticle("kurokumaft:holly_sword_slash", hit.location);

    const entitys = hit.dimension.getEntities({
        excludeFamilies: [
            "inanimate", "magic", "arrow"
        ],
        excludeTypes: [
            "item"
        ],
        location: hit.location,
        maxDistance: 7
    }) as Entity[];

    entitys.forEach(en => {
        en.addEffect(MinecraftEffectTypes.InstantHealth, 1*TicksPerSecond, {
            amplifier: 10,
            showParticles: false
        });
    });

}