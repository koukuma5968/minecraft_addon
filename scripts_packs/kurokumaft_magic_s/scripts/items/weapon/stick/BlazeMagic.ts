import { Entity, EntityDamageCause, EntityQueryOptions, ExplosionOptions, Player } from "@minecraft/server";
import { addTeamsTagFilter, explosionMagic, getLookRotaionPointsV2 } from "../../../common/MagicCommonUtil";

/**
 * フレイムショック
 */
export async function flameShock(player:Player, entity:Entity) {

    player.addTag(player.id);

    const left = getLookRotaionPointsV2(entity.getRotation(), 0, 2.5);
    entity.dimension.spawnParticle("kurokumaft:flame_shock_particle", {x:entity.location.x+left.x, y:entity.location.y+1.8, z:entity.location.z+left.z});
    const center = getLookRotaionPointsV2(entity.getRotation(), 0, 0);
    entity.dimension.spawnParticle("kurokumaft:flame_shock_particle", {x:entity.location.x+center.x, y:entity.location.y+1.8, z:entity.location.z+center.z});
    const right = getLookRotaionPointsV2(entity.getRotation(), 0, -2.5);
    entity.dimension.spawnParticle("kurokumaft:flame_shock_particle", {x:entity.location.x+right.x, y:entity.location.y+1.8, z:entity.location.z+right.z});

    const filterOption = {
        excludeTags: [
            player.id,
        ],
        location: player.location,
        maxDistance: 5
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);

    const targets = player.dimension.getEntities(filterOption);
    targets.forEach(en => {
        if (!en.isValid) {
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

    player.removeTag(player.id);
}

/**
 * フレイムビット
 */
export async function flareBit(player:Player) {

    player.addTag(player.id);

    for (let x=-3.5; x<=3.5; x+=3.5) {
        for (let z=-3.5; z<=3.5; z+=3.5) {
            const option = {
                allowUnderwater: false,
                breaksBlocks: false,
                causesFire: false,
                source: player
            } as ExplosionOptions;
            player.dimension.createExplosion({x:player.location.x+x, y:player.location.y+1.8, z:player.location.z+z}, 2, option);
            player.dimension.spawnParticle("kurokumaft:flare_bit_particle", {x:player.location.x+x, y:player.location.y+1.8, z:player.location.z+z});
        }
    }

    player.removeTag(player.id);
}

/**
 * ブラストボム
 */
export async function blastbomb(player:Player) {

    player.addTag(player.id);

    const filterOption = {
        excludeTags: [
            player.id,
        ],
        location: player.location,
        maxDistance: 20,
        closest: 3
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);

    const targets = player.dimension.getEntities(filterOption);
    targets.forEach(en => {
        if (!en.isValid) {
            return;
        }

        let damage = 10 as number;
        if (en instanceof Player) {
            damage = 4;
        }
        en.dimension.spawnParticle("kurokumaft:burstflare_particle", {x:en.location.x+0.5, y:en.location.y+0.5, z:en.location.z+0.5});
        const option = {
            allowUnderwater: false,
            breaksBlocks: false,
            causesFire: false,
            source: player
        } as ExplosionOptions;
        explosionMagic(player, en, en.location, option, 3, damage, EntityDamageCause.fire);
    });

    player.removeTag(player.id);
}