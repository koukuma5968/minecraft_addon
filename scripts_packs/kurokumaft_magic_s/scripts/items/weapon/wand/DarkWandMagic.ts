import { Entity, EntityDamageCause, EntityQueryOptions, Player, TicksPerSecond } from "@minecraft/server";
import { addTeamsTagFilter } from "../../../common/MagicCommonUtil";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

/**
 * ダークブレード
 */
export async function darkBread(player:Player, hitEntity:Entity) {

    player.addTag(player.id);

    hitEntity.dimension.spawnParticle("kurokumaft:dark_bread_particle", {x:hitEntity.location.x, y:hitEntity.location.y+0.8, z:hitEntity.location.z});

    const filterOption = {
        excludeTags: [
            player.id
        ],
        location: {x:hitEntity.location.x, y:hitEntity.location.y+1, z:hitEntity.location.z},
        maxDistance: 3
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);
    const targets = player.dimension.getEntities(filterOption);
    targets.forEach(en => {
        let damage = 2 as number;
        if (en instanceof Player) {
            damage = 1;
        }
        en.applyDamage(damage, {
            cause: EntityDamageCause.wither
        });
    });

    player.removeTag(player.id);
}

/**
 * ダークネス
 */
export async function darkness(player:Player) {
    player.addTag(player.id);

    const filterOption = {
        excludeTags: [
            player.id
        ],
        location: player.location,
        maxDistance: 5,
        closest: 10
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);
    const targets = player.dimension.getEntities(filterOption);
    targets.forEach(en => {
        en.dimension.spawnParticle("kurokumaft:dark_particle", en.location);

        let damage = 2 as number;
        if (en instanceof Player) {
            damage = 1;
        }
        en.addEffect(MinecraftEffectTypes.Weakness, 5*TicksPerSecond, {
            amplifier: 5
        });
        en.applyDamage(damage, {
            cause: EntityDamageCause.wither
        });
    });

    player.removeTag(player.id);
}

/**
 * アブソープション
 */
export async function absorption(player:Player) {
    player.addEffect("minecraft:absorption", 10*TicksPerSecond, {
        amplifier: 1
    });
}

/**
 * インビジブル
 */
export async function invisibility(player:Player) {
    player.addEffect("minecraft:invisibility", 20*TicksPerSecond, {
        amplifier: 5
    });
}