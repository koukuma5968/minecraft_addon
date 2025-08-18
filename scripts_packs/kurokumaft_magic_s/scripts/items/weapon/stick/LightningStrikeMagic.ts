import { Entity, EntityDamageCause, EntityQueryOptions, Player, system, TicksPerSecond } from "@minecraft/server";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";
import { getLookRotaionPointsV2, addTeamsTagFilter } from "../../../common/MagicCommonUtil";

/**
 * スパークショック
 */
export async function sparkShock(player:Player, entity:Entity) {

    player.addTag("spark_shock_self");

    const left = getLookRotaionPointsV2(entity.getRotation(), 0, 2.5);
    entity.dimension.spawnParticle("kurokumaft:spark_shock_particle", {x:entity.location.x+left.x, y:entity.location.y+1.8, z:entity.location.z+left.z});
    const center = getLookRotaionPointsV2(entity.getRotation(), 0, 0);
    entity.dimension.spawnParticle("kurokumaft:spark_shock_particle", {x:entity.location.x+center.x, y:entity.location.y+1.8, z:entity.location.z+center.z});
    const right = getLookRotaionPointsV2(entity.getRotation(), 0, -2.5);
    entity.dimension.spawnParticle("kurokumaft:spark_shock_particle", {x:entity.location.x+right.x, y:entity.location.y+1.8, z:entity.location.z+right.z});

    const filterOption = {
        excludeTags: [
            "spark_shock_self",
        ],
        location: entity.location,
        maxDistance: 5
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);

    const targets = player.dimension.getEntities(filterOption);
    targets.forEach(en => {
        if (!en.isValid) {
            return;
        }
        if (en instanceof Player) {
            en.applyDamage(2, {
                cause: EntityDamageCause.lightning
            });
        } else {
            en.applyDamage(6, {
                cause: EntityDamageCause.lightning
            });
        }
    });

    player.removeTag("spark_shock_self");
}

/**
 * ライトニングストライク
 */
export async function lightningStrike(player:Player) {
    player.addTag("lightningstrike_self");
    const intervalNum = system.runInterval(() => {
        player.dimension.spawnParticle("kurokumaft:thunder_sword_particle", player.location);

        const filterOption = {
            excludeTags: [
                "lightningstrike_self",
            ],
            location: player.location,
            maxDistance: 10
        } as EntityQueryOptions;

        addTeamsTagFilter(player, filterOption);

        const targets = player.dimension.getEntities(filterOption);
        targets.forEach(en => {
            if (!en.isValid) {
                return;
            }
            en.dimension.spawnParticle("kurokumaft:spark_particle", en.location);
            if (en instanceof Player) {
                en.addEffect(MinecraftEffectTypes.Slowness, 2*TicksPerSecond, {
                    amplifier: 3
                });
                en.applyDamage(2, {
                    cause: EntityDamageCause.lightning
                });
            } else {
                en.addEffect(MinecraftEffectTypes.Slowness, 3*TicksPerSecond, {
                    amplifier: 6
                });
                en.applyDamage(6, {
                    cause: EntityDamageCause.lightning
                });
            }
        })
 
    }, 4);
    system.runTimeout(() => {
        system.clearRun(intervalNum);
        player.removeTag("lightningstrike_self");
    }, 100);
}