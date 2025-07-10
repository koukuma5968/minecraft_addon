import { Entity, EntityDamageCause, EntityQueryOptions, Player, system, TicksPerSecond } from "@minecraft/server";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";
import { getLookRotaionPointsV2, addTeamsTagFilter } from "../../../common/MagicCommonUtil";

/**
 * アースショック
 */
export async function earthShock(player:Player, entity:Entity) {

    player.addTag("earth_shock_self");

    const left = getLookRotaionPointsV2(entity.getRotation(), 0, 2.5);
    entity.dimension.spawnParticle("kurokumaft:earth_shock_particle", {x:entity.location.x+left.x, y:entity.location.y+1.8, z:entity.location.z+left.z});
    const center = getLookRotaionPointsV2(entity.getRotation(), 0, 0);
    entity.dimension.spawnParticle("kurokumaft:earth_shock_particle", {x:entity.location.x+center.x, y:entity.location.y+1.8, z:entity.location.z+center.z});
    const right = getLookRotaionPointsV2(entity.getRotation(), 0, -2.5);
    entity.dimension.spawnParticle("kurokumaft:earth_shock_particle", {x:entity.location.x+right.x, y:entity.location.y+1.8, z:entity.location.z+right.z});

    const filterOption = {
        excludeTags: [
            "earth_shock_self",
        ],
        location: entity.location,
        maxDistance: 5
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);

    const targets = player.dimension.getEntities(filterOption);
    targets.forEach(en => {
        if (!en.isValid()) {
            return;
        }

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
    const intervalNum = system.runInterval(() => {
        player.dimension.spawnParticle("kurokumaft:gravity_field_particle", player.location);

        const filterOption = {
            excludeTags: [
                "gravity_field_self",
            ],
            location: player.location,
            maxDistance: 10
        } as EntityQueryOptions;

        addTeamsTagFilter(player, filterOption);

        const targets = player.dimension.getEntities(filterOption);
        targets.forEach(en => {
            if (!en.isValid()) {
                return;
            }

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