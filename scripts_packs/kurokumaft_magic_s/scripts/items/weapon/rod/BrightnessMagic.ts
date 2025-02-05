import { Entity, EntityDamageCause, EntityQueryOptions, Player, TicksPerSecond } from "@minecraft/server";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";
import { addTeamsTagFilter, getLookRotaionPoints } from "../../../common/commonUtil";

/**
 * ライトファング
 */
export async function lightFang(player:Player, hitEntity:Entity) {

    player.addTag("light_fang_self");

    let look = getLookRotaionPoints(player.getRotation(), 3.5, 0);
    player.dimension.spawnParticle("kurokumaft:light_fang_particle", {x:player.location.x+look.x, y:player.location.y+1.8, z:player.location.z+look.z});

    let filterOption = {
        excludeTags: [
            "light_self",
        ],
        location: {x:hitEntity.location.x, y:hitEntity.location.y+1, z:hitEntity.location.z},
        maxDistance: 4
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);

    let targets = player.dimension.getEntities(filterOption);
    targets.forEach(en => {
        if (en instanceof Player) {
            en.applyDamage(2, {
                cause: EntityDamageCause.soulCampfire
            });
        } else {
            en.applyDamage(6, {
                cause: EntityDamageCause.soulCampfire
            });
        }
    });
    player.removeTag("light_self");
}

/**
 * エリアヒール
 */
export async function areaheel(player:Player) {
    player.dimension.spawnParticle("kurokumaft:areaheel_particle", player.location);
    let p = player.dimension.getEntities({
        excludeFamilies: [
            "inanimate", "magic", "arrow"
        ],
        excludeTypes: [
            "item"
        ],
        families: [
            "player"
        ],
        location: player.location,
        maxDistance: 10
    });
    let f = player.dimension.getEntities({
        excludeFamilies: [
            "inanimate", "magic", "arrow"
        ],
        excludeTypes: [
            "item"
        ],
        families: [
            "familiar"
        ],
        location: player.location,
        maxDistance: 10
    });
    let u = player.dimension.getEntities({
        excludeFamilies: [
            "inanimate", "magic", "arrow"
        ],
        excludeTypes: [
            "item"
        ],
        families: [
            "undead"
        ],
        location: player.location,
        maxDistance: 10
    });
    p.forEach(en => {
        en.addEffect(MinecraftEffectTypes.InstantHealth, 5*TicksPerSecond, {
            amplifier: 5,
            showParticles: true
        });
    });
    f.forEach(en => {
        en.addEffect(MinecraftEffectTypes.InstantHealth, 5*TicksPerSecond, {
            amplifier: 5,
            showParticles: true
        });
    });
    u.forEach(en => {
        en.addEffect(MinecraftEffectTypes.InstantHealth, 5*TicksPerSecond, {
            amplifier: 5,
            showParticles: true
        });
    });
}

/**
 * ブライトゴーレム召喚
 */
export async function summonGolem(player:Player) {
    let golem = player.dimension.spawnEntity("kurokumaft:brightness_golem<minecraft:from_player>", {x:player.location.x,y:player.location.y,z:player.location.z+3});
    golem.nameTag = "ブライトゴーレム";
}