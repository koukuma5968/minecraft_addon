import { Entity, EntityDamageCause, EntityQueryOptions, Player, system, TicksPerSecond } from "@minecraft/server";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";
import { addTeamsTagFilter, getLookRotaionPoints } from "../../../common/MagicCommonUtil";

/**
 * ストームショック
 */
export async function stormShock(player:Player, entity:Entity) {

    player.addTag("storm_shock_self");

    let left = getLookRotaionPoints(entity.getRotation(), 0, 2.5);
    entity.dimension.spawnParticle("kurokumaft:storm_shock_particle", {x:entity.location.x+left.x, y:entity.location.y+1.8, z:entity.location.z+left.z});
    let center = getLookRotaionPoints(entity.getRotation(), 0, 0);
    entity.dimension.spawnParticle("kurokumaft:storm_shock_particle", {x:entity.location.x+center.x, y:entity.location.y+1.8, z:entity.location.z+center.z});
    let right = getLookRotaionPoints(entity.getRotation(), 0, -2.5);
    entity.dimension.spawnParticle("kurokumaft:storm_shock_particle", {x:entity.location.x+right.x, y:entity.location.y+1.8, z:entity.location.z+right.z});

    let filterOption = {
        excludeTags: [
            "storm_shock_self",
        ],
        location: entity.location,
        maxDistance: 5
    } as EntityQueryOptions;
    addTeamsTagFilter(player, filterOption);

    let targets = player.dimension.getEntities(filterOption);
    targets.forEach(en => {
        let damage = 6 as number;
        if (en instanceof Player) {
            damage = 2;
        }
        en.applyDamage(damage, {
            cause: EntityDamageCause.fall
        });
    });

    player.removeTag("storm_shock_self");
}

/**
 * アトモスフィア
 */
export async function atmosphere(player:Player) {
    player.addTag("atmosphere_self");
    let dimen = player.dimension;
    let intervalNum = system.runInterval(() => {
        let ploca = player.location;
        dimen.spawnParticle("kurokumaft:atmosphere_particle", ploca);

        let filterOption = {
            excludeTags: [
                "atmosphere_self",
            ],
            location: ploca,
            maxDistance: 10
        } as EntityQueryOptions;

        addTeamsTagFilter(player, filterOption);

        let targets = dimen.getEntities(filterOption);
        targets.forEach(en => {
            let enloca = en.location;
            dimen.spawnParticle("kurokumaft:wind_particle", {x:enloca.x,y:enloca.y,z:enloca.z});
            dimen.spawnParticle("kurokumaft:storm1_particle", {x:enloca.x,y:enloca.y+1,z:enloca.z});
            dimen.spawnParticle("kurokumaft:storm2_particle", {x:enloca.x,y:enloca.y,z:enloca.z});
            dimen.spawnParticle("kurokumaft:storm3_particle", {x:enloca.x,y:enloca.y+1.5,z:enloca.z});
            dimen.spawnParticle("kurokumaft:storm4_particle", {x:enloca.x,y:enloca.y+0.5,z:enloca.z});

            en.addEffect(MinecraftEffectTypes.Levitation, 1*TicksPerSecond, {
                amplifier: 10
            });
            let damage = 6 as number;
            if (en instanceof Player) {
                damage = 2;
            }
            en.applyDamage(damage, {
                cause: EntityDamageCause.fallingBlock
            });
        });

    }, 4);
    system.runTimeout(() => {
        system.clearRun(intervalNum);
        player.removeTag("atmosphere_self");
    }, 100);
}