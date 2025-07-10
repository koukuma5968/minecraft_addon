import { Entity, EntityDamageCause, EntityQueryOptions, Player, TicksPerSecond } from "@minecraft/server";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";
import { addTeamsTagFilter } from "../../../common/MagicCommonUtil";

/**
 * ストーンブレード
 */
export async function stoneBread(player:Player, hitEntity:Entity) {

    player.addTag("stone_bread_self");

    hitEntity.dimension.spawnParticle("kurokumaft:stone_bread_particle", {x:hitEntity.location.x, y:hitEntity.location.y+1.8, z:hitEntity.location.z});

    const filterOption = {
        excludeTags: [
            "stone_bread_self",
        ],
        location: {x:hitEntity.location.x, y:hitEntity.location.y+1, z:hitEntity.location.z},
        maxDistance: 4
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);

    const targets = player.dimension.getEntities(filterOption);
    targets.forEach(en => {
        if (!en.isValid()) {
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

    player.removeTag("stone_bread_self");
}

/**
 * ロックブレイク
 */
export async function rockbreak(player:Player) {
    player.addTag("rock_break_self");

    const filterOption = {
        excludeTags: [
            "rock_break_self",
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

        if (en instanceof Player) {
            en.addEffect(MinecraftEffectTypes.Nausea, 5*TicksPerSecond, {
                amplifier: 2
            });
        } else {
            en.addEffect(MinecraftEffectTypes.Nausea, 10*TicksPerSecond, {
                amplifier: 10
            });
        }
        const rock = en.dimension.spawnEntity("kurokumaft:rockbreakmagic", {x:en.location.x,y:en.location.y + 10, z:en.location.z});
    });

    player.removeTag("rock_break_self");
}

/**
 * グレイボム
 */
export async function greybomb(player:Player) {
    player.addTag("grey_bomb_self");

    const filterOption = {
        excludeTags: [
            "grey_bomb_self",
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

    player.removeTag("grey_bomb_self");
}