import { Entity, EntityDamageCause, EntityQueryOptions, Player, world } from "@minecraft/server";
import { addTeamsTagFilter } from "../../../common/MagicCommonUtil";

/**
 * サンダーソード
 * @param {Player} player
 * @param {Entity} entity
 */
export async function thunderSword(player:Player, entity:Entity) {

    player.addTag(player.id);
    entity.dimension.spawnParticle("kurokumaft:thunder_sword_slash", entity.location);

    const entitys = player.dimension.getEntities({
        excludeFamilies: [
            "inanimate", "familiar"
        ],
        excludeTypes: [
            "item"
        ],
        excludeTags: [
            player.id
        ],
        location: entity.location,
        maxDistance: 5
    }) as Entity[];

    entitys.forEach(en => {
        if (entity instanceof Player) {
            if (world.gameRules.pvp) {
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
            }
        }
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
                player.id
            ],
            location: entity.location,
            maxDistance: 5
        } as EntityQueryOptions;

        addTeamsTagFilter(player, filterOption);
        const others = player.dimension.getEntities(filterOption) as Entity[];
    
        others.forEach(en => {
            en.applyDamage(8, {
                cause: EntityDamageCause.lightning
            });
        });

        entitys.forEach(en => {
            en.removeTag("thunder_sword_slash_target");
        });
        player.removeTag(player.id);

    }
}

/**
 * サンダーソード(モンス)
 * @param {Entity} attack
 * @param {Entity} hit
 */
export async function thunderSwordMons(attack:Entity, hit:Entity) {

    attack.addTag(attack.id);
    hit.dimension.spawnParticle("kurokumaft:thunder_sword_slash", hit.location);

    const entitys = attack.dimension.getEntities({
        excludeFamilies: [
            "player", "inanimate", "familiar"
        ],
        excludeTypes: [
            "item"
        ],
        excludeTags: [
            attack.id
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
            attack.id
        ],
        location: hit.location,
        maxDistance: 5
    } as EntityQueryOptions;

    const others = attack.dimension.getEntities(filterOption) as Entity[];

    others.forEach(en => {
        en.applyDamage(6, {
            cause: EntityDamageCause.lightning
        });
    });

    entitys.forEach(en => {
        en.removeTag("thunder_sword_slash_target");
    });
    attack.removeTag(attack.id);

}