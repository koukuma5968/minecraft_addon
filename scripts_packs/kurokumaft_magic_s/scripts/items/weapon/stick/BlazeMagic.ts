import { Entity, EntityDamageCause, EntityQueryOptions, Player, world } from "@minecraft/server";
import { addTeamsTagFilter, getLookRotaionPoints } from "../../../common/commonUtil";

/**
 * フレイムショック
 */
export async function flameShock(player:Player, entity:Entity) {

    player.addTag("flame_shock_self");

    let left = getLookRotaionPoints(entity.getRotation(), 0, 2.5);
    entity.dimension.spawnParticle("kurokumaft:flame_shock_particle", {x:entity.location.x+left.x, y:entity.location.y+1.8, z:entity.location.z+left.z});
    let center = getLookRotaionPoints(entity.getRotation(), 0, 0);
    entity.dimension.spawnParticle("kurokumaft:flame_shock_particle", {x:entity.location.x+center.x, y:entity.location.y+1.8, z:entity.location.z+center.z});
    let right = getLookRotaionPoints(entity.getRotation(), 0, -2.5);
    entity.dimension.spawnParticle("kurokumaft:flame_shock_particle", {x:entity.location.x+right.x, y:entity.location.y+1.8, z:entity.location.z+right.z});

    let filterOption = {
        excludeTags: [
            "flame_shock_self",
        ],
        location: player.location,
        maxDistance: 5
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);

    let targets = player.dimension.getEntities(filterOption);
    targets.forEach(en => {
        let damage = 6 as number;
        if (en instanceof Player) {
            damage = 3;
        }
        en.applyDamage(damage, {
            cause: EntityDamageCause.fire
        });
    });

    player.removeTag("flame_shock_self");
}

/**
 * ブラストボム
 */
export async function blastbomb(player:Player) {

    player.addTag("blastbomb_self");

    let filterOption = {
        excludeTags: [
            "blastbomb_self",
        ],
        location: player.location,
        maxDistance: 20,
        closest: 3
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);

    let targets = player.dimension.getEntities(filterOption);
    targets.forEach(en => {
        let damage = 10 as number;
        if (en instanceof Player) {
            damage = 4;
        }
        en.applyDamage(damage, {
            cause: EntityDamageCause.fire
        });
        en.dimension.spawnParticle("kurokumaft:burstflare_particle", {x:en.location.x+0.5, y:en.location.y+0.5, z:en.location.z+0.5});
        en.dimension.spawnEntity("kurokumaft:blastbombmagic<minecraft:explode>", {x:en.location.x+0.5, y:en.location.y+0.5, z:en.location.z+0.5})
    });

    player.removeTag("blastbomb_self");
}