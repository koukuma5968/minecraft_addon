import { Entity, EntityDamageCause, EntityQueryOptions, Player, TicksPerSecond } from "@minecraft/server";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";
import { addTeamsTagFilter } from "../../../common/MagicCommonUtil";

/**
 * ライトブレード
 */
export async function lightBread(player:Player, hitEntity:Entity) {

    player.addTag("lightBread_self");

    hitEntity.dimension.spawnParticle("kurokumaft:light_bread_particle", {x:hitEntity.location.x, y:hitEntity.location.y+0.8, z:hitEntity.location.z});

    const filterOption = {
        excludeTags: [
            "lightBread_self",
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

    player.removeTag("lightBread_self");
}

/**
 * ヒーリング
 */
export async function healing(player:Player) {
    player.addEffect(MinecraftEffectTypes.InstantHealth, 1*TicksPerSecond, {
        amplifier: 1
    });
}

/**
 * リカバリー
 */
export async function recovery(player:Player) {
    player.runCommand("/effect " + player.nameTag + " clear");
}