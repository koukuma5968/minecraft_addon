import { Entity, EntityDamageCause, EntityQueryOptions, Player, TicksPerSecond } from "@minecraft/server";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";
import { addTeamsTagFilter } from "../../../common/commonUtil";

/**
 * ダークブレード
 */
export async function darkBread(player:Player, hitEntity:Entity) {

    player.addTag("darkBread_self");

    hitEntity.dimension.spawnParticle("kurokumaft:dark_bread_particle", {x:hitEntity.location.x, y:hitEntity.location.y+1.8, z:hitEntity.location.z});

    let filterOption = {
        excludeTags: [
            "darkBread_self",
        ],
        location: {x:hitEntity.location.x, y:hitEntity.location.y+1, z:hitEntity.location.z},
        maxDistance: 3
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);
    let targets = player.dimension.getEntities(filterOption);
    targets.forEach(en => {
        let damage = 2 as number;
        if (en instanceof Player) {
            damage = 1;
        }
        en.applyDamage(damage, {
            cause: EntityDamageCause.wither
        });
    });

    player.removeTag("darkBread_self");
}

/**
 * アブソープション
 */
export async function absorption(player:Player) {
    player.addEffect(MinecraftEffectTypes.Absorption, 10*TicksPerSecond, {
        amplifier: 1
    });
}

/**
 * インビジブル
 */
export async function invisibility(player:Player) {
    player.addEffect(MinecraftEffectTypes.Invisibility, 20*TicksPerSecond, {
        amplifier: 5
    });
}