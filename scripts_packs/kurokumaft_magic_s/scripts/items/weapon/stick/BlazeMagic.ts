import { Entity, EntityDamageCause, EntityQueryOptions, Player } from "@minecraft/server";
import { addTeamsTagFilter, getLookRotaionPointsV2 } from "../../../common/MagicCommonUtil";

/**
 * フレイムショック
 */
export async function flameShock(player:Player, entity:Entity) {

    player.addTag("flame_shock_self");

    const left = getLookRotaionPointsV2(entity.getRotation(), 0, 2.5);
    entity.dimension.spawnParticle("kurokumaft:flame_shock_particle", {x:entity.location.x+left.x, y:entity.location.y+1.8, z:entity.location.z+left.z});
    const center = getLookRotaionPointsV2(entity.getRotation(), 0, 0);
    entity.dimension.spawnParticle("kurokumaft:flame_shock_particle", {x:entity.location.x+center.x, y:entity.location.y+1.8, z:entity.location.z+center.z});
    const right = getLookRotaionPointsV2(entity.getRotation(), 0, -2.5);
    entity.dimension.spawnParticle("kurokumaft:flame_shock_particle", {x:entity.location.x+right.x, y:entity.location.y+1.8, z:entity.location.z+right.z});

    const filterOption = {
        excludeTags: [
            "flame_shock_self",
        ],
        location: player.location,
        maxDistance: 5
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);

    const targets = player.dimension.getEntities(filterOption);
    targets.forEach(en => {
        if (!en.isValid()) {
            return;
        }

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

    const filterOption = {
        excludeTags: [
            "blastbomb_self",
        ],
        location: player.location,
        maxDistance: 20,
        closest: 3
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);

    const targets = player.dimension.getEntities(filterOption);
    targets.forEach(en => {
        if (!en.isValid()) {
            return;
        }

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