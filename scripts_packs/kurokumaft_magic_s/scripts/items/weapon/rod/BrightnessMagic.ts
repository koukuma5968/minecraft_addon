import { Entity, EntityComponentTypes, EntityDamageCause, EntityQueryOptions, EntityTameableComponent, Player, TicksPerSecond } from "@minecraft/server";
import { addTeamsTagFilter, getLookRotaionPointsV2 } from "../../../common/MagicCommonUtil";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

/**
 * ライトファング
 */
export async function lightFang(player:Player, hitEntity:Entity) {

    player.addTag(player.id);

    const look = getLookRotaionPointsV2(player.getRotation(), 3.5, 0);

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

        en.dimension.spawnParticle("kurokumaft:light_fang_particle", {x:player.location.x+look.x, y:player.location.y+0.8, z:player.location.z+look.z});
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
    player.removeTag(player.id);
}

/**
 * アビリティ
 */
export async function ability(player:Player) {

    player.addEffect(MinecraftEffectTypes.Strength, 30*TicksPerSecond, {
        amplifier: 5
    })
    player.addEffect(MinecraftEffectTypes.Speed, 30*TicksPerSecond, {
        amplifier: 5
    })
    player.addEffect(MinecraftEffectTypes.JumpBoost, 30*TicksPerSecond, {
        amplifier: 5
    })
    player.addEffect(MinecraftEffectTypes.Resistance, 30*TicksPerSecond, {
        amplifier: 5
    })
    player.addEffect(MinecraftEffectTypes.Haste, 30*TicksPerSecond, {
        amplifier: 5
    })
}

/**
 * エリアヒール
 */
export async function areaheel(player:Player) {
    player.dimension.spawnParticle("kurokumaft:areaheel_particle", player.location);
    const p = player.dimension.getEntities({
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
    const f = player.dimension.getEntities({
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
    const u = player.dimension.getEntities({
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
        if (!en.isValid) {
            return;
        }

        en.addEffect("minecraft:instant_health", 5*TicksPerSecond, {
            amplifier: 5,
            showParticles: true
        });
    });
    f.forEach(en => {
        if (!en.isValid) {
            return;
        }

        en.addEffect("minecraft:instant_health", 5*TicksPerSecond, {
            amplifier: 5,
            showParticles: true
        });
    });
    u.forEach(en => {
        if (!en.isValid) {
            return;
        }

        en.addEffect("minecraft:instant_health", 5*TicksPerSecond, {
            amplifier: 5,
            showParticles: true
        });
    });
}

/**
 * ブライトゴーレム召喚
 */
export async function summonGolem(player:Player) {
    const golem = player.dimension.spawnEntity("kurokumaft:brightness_golem", {x:player.location.x,y:player.location.y,z:player.location.z+3});
    golem.nameTag = "ブライトゴーレム";
    golem.triggerEvent("minecraft:from_player");
    const tameable1 = golem.getComponent(EntityComponentTypes.Tameable) as EntityTameableComponent;
    if (!tameable1.isTamed) {
        if (player instanceof Player) {
            tameable1.tame(player);
        }
    }

}
