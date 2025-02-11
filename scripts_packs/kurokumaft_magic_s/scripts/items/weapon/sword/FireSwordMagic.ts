import { Entity, EntityDamageCause, EntityQueryOptions, Player, world } from "@minecraft/server";
import { addTeamsTagFilter } from "../../../common/MagicCommonUtil";

/**
 * フレイムソード
 * @param {Player} player
 * @param {Entity} entity
 */
export async function fireSword(player:Player, entity:Entity) {

    entity.dimension.spawnParticle("kurokumaft:fire_sword_slash", entity.location);
    entity.dimension.spawnEntity("kurokumaft:fire_sword_magic", 
        {
            x:entity.location.x,
            y:entity.location.y + 0.75,
            z:entity.location.z
        }
    );
    if (entity instanceof Player) {
        if (world.gameRules.pvp) {
            entity.applyDamage(10, {
                cause: EntityDamageCause.fire
            });
        }
    } else {
        entity.applyDamage(60, {
            cause: EntityDamageCause.fire
        });
    }
}

/**
 * §cブレイズバースト
 * @param {Player} player
 */
export async function blazeBurst(player:Player) {

    player.addTag("blazeBurst_self");
    player.dimension.spawnParticle("kurokumaft:explosion_shell", player.location);
    player.dimension.spawnParticle("kurokumaft:explosion_wave", player.location);

    let filterOption = {
        excludeTags: [
            "blazeBurst_self"
        ],
        location: player.location,
        maxDistance: 5
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);

    let entitys = player.dimension.getEntities(filterOption) as Entity[];
    entitys.forEach(en => {
        en.dimension.spawnEntity("kurokumaft:fire_sword_magic", 
            {
                x:en.location.x,
                y:en.location.y + 0.75,
                z:en.location.z
            }
        );
        let damage = 60;
        if (en instanceof Player) {
            damage = 20;
        }
        en.applyDamage(damage, {
            cause: EntityDamageCause.fire
        });
    });

    player.removeTag("blazeBurst_self");

}

/**
 * フレイムソード(モンス)
 * @param {Entity} attack
 * @param {Entity} hit
 */
export async function fireSwordMons(attack:Entity, hit:Entity) {

    hit.dimension.spawnParticle("kurokumaft:fire_sword_slash", hit.location);
    hit.dimension.spawnEntity("kurokumaft:fire_sword_magic", 
        {
            x:hit.location.x,
            y:hit.location.y + 0.75,
            z:hit.location.z
        }
    );
    if (hit instanceof Player) {
        hit.applyDamage(5, {
            cause: EntityDamageCause.fire
        });
    } else {
        hit.applyDamage(15, {
            cause: EntityDamageCause.fire
        });
    }
}