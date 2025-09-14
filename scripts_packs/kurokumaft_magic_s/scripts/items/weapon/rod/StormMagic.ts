import { Entity, EntityDamageCause, EntityQueryOptions, Player, TicksPerSecond } from "@minecraft/server";
import { addTeamsTagFilter } from "../../../common/MagicCommonUtil";

/**
 * ストームブレード
 */
export async function stormBread(player:Player, hitEntity:Entity) {

    player.addTag(player.id);

    hitEntity.dimension.spawnParticle("kurokumaft:storm_bread_particle", {x:hitEntity.location.x, y:hitEntity.location.y+1.8, z:hitEntity.location.z});

    const filterOption = {
        excludeTags: [
            player.id
        ],
        location: {x:hitEntity.location.x, y:hitEntity.location.y+1, z:hitEntity.location.z},
        maxDistance: 2
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);
    const targets = player.dimension.getEntities(filterOption);
    targets.forEach(en => {
        if (!en.isValid) {
            return;
        }

        if (en instanceof Player) {
            en.applyDamage(2, {
                cause: EntityDamageCause.fall
            });
        } else {
            en.applyDamage(4, {
                cause: EntityDamageCause.fall
            });
        }
    });

    player.removeTag(player.id);
}

/**
 * ストーム
 */
export async function storm(player:Player) {
    player.addTag(player.id);

    const filterOption = {
        excludeTags: [
            player.id
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

        en.dimension.spawnParticle("kurokumaft:storm1_particle", {x:en.location.x,y:en.location.y,z:en.location.z});
        en.dimension.spawnParticle("kurokumaft:storm2_particle", {x:en.location.x,y:en.location.y+1,z:en.location.z});
        en.dimension.spawnParticle("kurokumaft:storm3_particle", {x:en.location.x,y:en.location.y+2,z:en.location.z});
        en.dimension.spawnParticle("kurokumaft:storm4_particle", {x:en.location.x,y:en.location.y+3,z:en.location.z});
        if (en instanceof Player) {
            en.addEffect("minecraft:levitation", 1*TicksPerSecond, {
                amplifier: 10
            });
            en.applyDamage(1, {
                cause: EntityDamageCause.fall
            });
        } else {
            en.addEffect("minecraft:levitation", 1*TicksPerSecond, {
                amplifier: 15
            });
            en.applyDamage(3, {
                cause: EntityDamageCause.fall
            });
        }
    });

    player.removeTag(player.id);
}

/**
 * エアロボム
 */
export async function aerobomb(player:Player) {
    player.addTag(player.id);

    const filterOption = {
        excludeTags: [
            player.id
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

        if (en instanceof Player) {
            en.applyDamage(3, {
                cause: EntityDamageCause.fall
            });
        } else {
            en.applyDamage(10, {
                cause: EntityDamageCause.fall
            });
        }
        en.dimension.spawnParticle("kurokumaft:aero_bomb_particle", en.location);
        en.dimension.createExplosion(en.location, 2, {
            allowUnderwater: true,
            breaksBlocks: false,
            causesFire: false,
            source: player
        })
    });
 
    player.removeTag(player.id);

}