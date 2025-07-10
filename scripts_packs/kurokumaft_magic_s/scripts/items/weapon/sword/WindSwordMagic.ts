import { Entity, EntityDamageCause, Player, world } from "@minecraft/server";

/**
 * ウィンドソード
 * @param {Player} player
 * @param {Entity} entity
 */
export async function windSword(player:Player, entity:Entity) {

    entity.dimension.spawnParticle("kurokumaft:wind_roar_particle", entity.location);
    entity.dimension.spawnEntity("kurokumaft:wind_sword_knockback_roar<player_roar>", 
        {
            x:entity.location.x,
            y:entity.location.y + 0.75,
            z:entity.location.z
        }
    );
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
 * ウィンドソード(モンス)
 * @param {Entity} attack
 * @param {Entity} hit
 */
export async function windSwordMons(attack:Entity, hit:Entity) {

    hit.dimension.spawnParticle("kurokumaft:wind_roar_particle", hit.location);
    hit.dimension.spawnEntity("kurokumaft:wind_sword_knockback_roar<monster_roar>", 
        {
            x:hit.location.x,
            y:hit.location.y + 0.75,
            z:hit.location.z
        }
    );
    if (hit instanceof Player) {
        if (world.gameRules.pvp) {
            hit.applyDamage(2, {
                cause: EntityDamageCause.fallingBlock
            });
        }
    } else {
        hit.applyDamage(10, {
            cause: EntityDamageCause.fallingBlock
        });
    }
}