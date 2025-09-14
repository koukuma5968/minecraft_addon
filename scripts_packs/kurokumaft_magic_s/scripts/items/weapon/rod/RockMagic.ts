import { Entity, EntityComponentTypes, EntityDamageCause, EntityProjectileComponent, EntityQueryOptions, Player, TicksPerSecond } from "@minecraft/server";
import { addTeamsTagFilter } from "../../../common/MagicCommonUtil";

/**
 * ストーンブレード
 */
export async function stoneBread(player:Player, hitEntity:Entity) {

    player.addTag(player.id);

    hitEntity.dimension.spawnParticle("kurokumaft:stone_bread_particle", {x:hitEntity.location.x, y:hitEntity.location.y+1.8, z:hitEntity.location.z});

    const filterOption = {
        excludeTags: [
            player.id
        ],
        location: {x:hitEntity.location.x, y:hitEntity.location.y+1, z:hitEntity.location.z},
        maxDistance: 4
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);

    const targets = player.dimension.getEntities(filterOption);
    targets.forEach(en => {
        if (!en.isValid) {
            return;
        }

        if (en instanceof Player) {
            en.applyDamage(2, {
                cause: EntityDamageCause.fallingBlock
            });
        } else {
            en.applyDamage(4, {
                cause: EntityDamageCause.fallingBlock
            });
        }
    });

    player.removeTag(player.id);
}

/**
 * ロックブレイク
 */
export async function rockbreak(player:Player) {
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
            en.addEffect("minecraft:nausea", 5*TicksPerSecond, {
                amplifier: 2
            });
        } else {
            en.addEffect("minecraft:nausea", 10*TicksPerSecond, {
                amplifier: 10
            });
        }
        const rock = en.dimension.spawnEntity("kurokumaft:rockbreakmagic", {x:en.location.x,y:en.location.y + 10, z:en.location.z});
        const projectile = rock.getComponent(EntityComponentTypes.Projectile) as EntityProjectileComponent;
        projectile.owner = player;

    });

    player.removeTag(player.id);
}

/**
 * グレイボム
 */
export async function greybomb(player:Player) {
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

        en.dimension.spawnParticle("kurokumaft:grey_bomb_particle", en.location);
        if (en instanceof Player) {
            en.applyDamage(3, {
                cause: EntityDamageCause.fallingBlock
            });
        } else {
            en.applyDamage(10, {
                cause: EntityDamageCause.fallingBlock
            });
        }
        en.dimension.createExplosion(en.location, 2, {
            allowUnderwater: true,
            breaksBlocks: false,
            causesFire: false,
            source: player
        })

    });

    player.removeTag(player.id);
}