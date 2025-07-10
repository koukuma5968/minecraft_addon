import { Entity, EntityDamageCause, EntityQueryOptions, Player, world } from "@minecraft/server";
import { addTeamsTagFilter } from "../../../common/MagicCommonUtil";

/**
 * サンダーソード
 * @param {Player} player
 * @param {Entity} entity
 */
export async function thunderSword(player:Player, entity:Entity) {

    player.addTag("thunder_sword_slash_self");
    entity.dimension.spawnParticle("kurokumaft:thunder_sword_slash", entity.location);

    const entitys = player.dimension.getEntities({
        excludeFamilies: [
            "player", "inanimate", "familiar"
        ],
        excludeTypes: [
            "item"
        ],
        excludeTags: [
            "thunder_sword_slash_self"
        ],
        location: entity.location,
        maxDistance: 5
    }) as Entity[];

    entitys.forEach(en => {
        en.dimension.spawnEntity("kurokumaft:thunder_sword_magic", 
            {
                x:en.location.x,
                y:en.location.y + 0.75,
                z:en.location.z
            }
        );
        en.applyDamage(25, {
            cause: EntityDamageCause.lightning
        });
        en.addTag("thunder_sword_slash_target");
    });

    if (world.gameRules.pvp) {
        const filterOption = {
            excludeFamilies: [
                "inanimate"
            ],
            excludeTypes: [
                "item"
            ],
            excludeTags: [
                "thunder_sword_slash_target",
                "thunder_sword_slash_self"
            ],
            location: entity.location,
            maxDistance: 5
        } as EntityQueryOptions;

        addTeamsTagFilter(player, filterOption);
        const others = player.dimension.getEntities(filterOption) as Entity[];
    
        others.forEach(en => {
            en.dimension.spawnEntity("kurokumaft:thunder_sword_magic", 
                {
                    x:en.location.x,
                    y:en.location.y + 0.75,
                    z:en.location.z
                }
            );
            en.applyDamage(8, {
                cause: EntityDamageCause.lightning
            });
        });

        entitys.forEach(en => {
            en.removeTag("thunder_sword_slash_target");
        });
        player.removeTag("thunder_sword_slash_self");

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
 * サンダーソード(モンス)
 * @param {Entity} attack
 * @param {Entity} hit
 */
export async function thunderSwordMons(attack:Entity, hit:Entity) {

    attack.addTag("thunder_sword_slash_self");
    hit.dimension.spawnParticle("kurokumaft:thunder_sword_slash", hit.location);

    const entitys = attack.dimension.getEntities({
        excludeFamilies: [
            "player", "inanimate", "familiar"
        ],
        excludeTypes: [
            "item"
        ],
        excludeTags: [
            "thunder_sword_slash_self"
        ],
        location: hit.location,
        maxDistance: 5
    }) as Entity[];

    entitys.forEach(en => {
        en.dimension.spawnEntity("kurokumaft:thunder_sword_magic", 
            {
                x:en.location.x,
                y:en.location.y + 0.75,
                z:en.location.z
            }
        );
        en.applyDamage(25, {
            cause: EntityDamageCause.lightning
        });
        en.addTag("thunder_sword_slash_target");
    });

    const filterOption = {
        excludeFamilies: [
            "inanimate"
        ],
        excludeTypes: [
            "item"
        ],
        excludeTags: [
            "thunder_sword_slash_target",
            "thunder_sword_slash_self"
        ],
        location: hit.location,
        maxDistance: 5
    } as EntityQueryOptions;

    const others = attack.dimension.getEntities(filterOption) as Entity[];

    others.forEach(en => {
        en.dimension.spawnEntity("kurokumaft:thunder_sword_magic", 
            {
                x:en.location.x,
                y:en.location.y + 0.75,
                z:en.location.z
            }
        );
        en.applyDamage(4, {
            cause: EntityDamageCause.lightning
        });
    });

    entitys.forEach(en => {
        en.removeTag("thunder_sword_slash_target");
    });
    attack.removeTag("thunder_sword_slash_self");

}