import { Entity, EntityDamageCause, EntityQueryOptions, Player, TicksPerSecond, world } from "@minecraft/server";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";
import { getLookRotaionPoints, addTeamsTagFilter } from "../../../common/commonUtil";

/**
 * ライトブレード
 */
export async function lightBread(player:Player, hitEntity:Entity) {

    player.addTag("lightBread_self");

    hitEntity.dimension.spawnParticle("kurokumaft:light_bread_particle", {x:hitEntity.location.x, y:hitEntity.location.y+1.8, z:hitEntity.location.z});

    let filterOption = {
        excludeTags: [
            "lightBread_self",
        ],
        location: {x:hitEntity.location.x, y:hitEntity.location.y+1, z:hitEntity.location.z},
        maxDistance: 3
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);
    let targets = hitEntity.dimension.getEntities(filterOption);
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