import { Entity, EntityDamageCause, EntityQueryOptions, Player, system, TicksPerSecond } from "@minecraft/server";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";
import { getLookRotaionPoints, addTeamsTagFilter } from "../../../common/commonUtil";

/**
 * アースショック
 */
export async function earthShock(player:Player, entity:Entity) {

    player.addTag("earth_shock_self");

    let left = getLookRotaionPoints(entity.getRotation(), 0, 2.5);
    entity.dimension.spawnParticle("kurokumaft:earth_shock_particle", {x:entity.location.x+left.x, y:entity.location.y+1.8, z:entity.location.z+left.z});
    let center = getLookRotaionPoints(entity.getRotation(), 0, 0);
    entity.dimension.spawnParticle("kurokumaft:earth_shock_particle", {x:entity.location.x+center.x, y:entity.location.y+1.8, z:entity.location.z+center.z});
    let right = getLookRotaionPoints(entity.getRotation(), 0, -2.5);
    entity.dimension.spawnParticle("kurokumaft:earth_shock_particle", {x:entity.location.x+right.x, y:entity.location.y+1.8, z:entity.location.z+right.z});

    let filterOption = {
        excludeTags: [
            "earth_shock_self",
        ],
        location: entity.location,
        maxDistance: 5
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);

    let targets = player.dimension.getEntities(filterOption);
    targets.forEach(en => {
        let damage = 6;
        if (en instanceof Player) {
            damage = 2
        }
        en.applyDamage(damage, {
            cause: EntityDamageCause.anvil
        });
    });

    player.removeTag("earth_shock_self");
}

/**
 * グラビティフィールド
 */
export async function gravityField(player:Player) {
    player.addTag("gravity_field_self");
    let intervalNum = system.runInterval(() => {
        player.dimension.spawnParticle("kurokumaft:gravity_field_particle", player.location);

        let filterOption = {
            excludeTags: [
                "gravity_field_self",
            ],
            location: player.location,
            maxDistance: 10
        } as EntityQueryOptions;

        addTeamsTagFilter(player, filterOption);

        let targets = player.dimension.getEntities(filterOption);
        targets.forEach(en => {
            en.dimension.spawnParticle("kurokumaft:gravity_particle", en.location);
            if (en instanceof Player) {
                en.addEffect(MinecraftEffectTypes.Slowness, 2*TicksPerSecond, {
                    amplifier: 2
                });
                en.applyDamage(3, {
                    cause: EntityDamageCause.fallingBlock
                });
            } else {
                en.addEffect(MinecraftEffectTypes.Slowness, 4*TicksPerSecond, {
                    amplifier: 8
                });
                en.applyDamage(3, {
                    cause: EntityDamageCause.fallingBlock
                });
            }
        });

    }, 4);
    system.runTimeout(() => {
        system.clearRun(intervalNum);
        player.removeTag("gravity_field_self");
    }, 100);
}