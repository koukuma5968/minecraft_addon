import { Entity, EntityDamageCause, EntityQueryOptions, Player, TicksPerSecond } from "@minecraft/server";
import { addTeamsTagFilter } from "../../../common/MagicCommonUtil";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

/**
 * ライトブレード
 */
export async function lightBread(player:Player, hitEntity:Entity) {

    player.addTag(player.id);

    hitEntity.dimension.spawnParticle("kurokumaft:light_bread_particle", {x:hitEntity.location.x, y:hitEntity.location.y+0.8, z:hitEntity.location.z});

    const filterOption = {
        excludeTags: [
            player.id
        ],
        location: {x:hitEntity.location.x, y:hitEntity.location.y+1, z:hitEntity.location.z},
        maxDistance: 3
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);
    const targets = hitEntity.dimension.getEntities(filterOption);
    targets.forEach(en => {
        let damage = 2 as number;
        if (en instanceof Player) {
            damage = 1;
        }
        en.applyDamage(damage, {
            cause: EntityDamageCause.soulCampfire
        });
    });

    player.removeTag(player.id);
}

/**
 * フラッシュ
 */
export async function flash(player:Player) {
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
        en.dimension.spawnParticle("kurokumaft:light_particle", en.location);

        let damage = 2 as number;
        if (en instanceof Player) {
            damage = 1;
        }
        en.addEffect(MinecraftEffectTypes.Blindness, 5*TicksPerSecond, {
            amplifier: 5
        });
        en.applyDamage(damage, {
            cause: EntityDamageCause.soulCampfire
        });
    });

    player.removeTag(player.id);
}

/**
 * ヒーリング
 */
export async function healing(player:Player) {
    player.addEffect("minecraft:instant_health", 1*TicksPerSecond, {
        amplifier: 1
    });
}

/**
 * リカバリー
 */
export async function recovery(player:Player) {
    player.runCommand("/effect " + player.nameTag + " clear");
}