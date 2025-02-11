import { Entity, EntityDamageCause, EntityQueryOptions, Player, TicksPerSecond } from "@minecraft/server";
import { addTeamsTagFilter, getLookRotaionPoints } from "../../../common/MagicCommonUtil";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

/**
 * アイスショック
 */
export async function iceShock(player:Player, entity:Entity) {

    player.addTag("ice_shock_self");

    let left = getLookRotaionPoints(entity.getRotation(), 0, 2.5);
    entity.dimension.spawnParticle("kurokumaft:ice_shock_particle", {x:entity.location.x+left.x, y:entity.location.y+1.8, z:entity.location.z+left.z});
    let center = getLookRotaionPoints(entity.getRotation(), 0, 0);
    entity.dimension.spawnParticle("kurokumaft:ice_shock_particle", {x:entity.location.x+center.x, y:entity.location.y+1.8, z:entity.location.z+center.z});
    let right = getLookRotaionPoints(entity.getRotation(), 0, -2.5);
    entity.dimension.spawnParticle("kurokumaft:ice_shock_particle", {x:entity.location.x+right.x, y:entity.location.y+1.8, z:entity.location.z+right.z});

    let filterOption = {
        excludeTags: [
            "ice_shock_self",
        ],
        location: player.location,
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
            cause: EntityDamageCause.freezing
        });
    });

    player.removeTag("ice_shock_self");
}

/**
 * アイスブロック
 */
export async function iceBlock(player:Player) {

    player.addTag("iceblock_self");

    let filterOption = {
        excludeTags: [
            "iceblock_self",
        ],
        location: player.location,
        maxDistance: 15,
        closest: 4
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);

    let targets = player.dimension.getEntities(filterOption);
    targets.forEach(en => {
        let damage = 10;
        if (en instanceof Player) {
            damage = 2;
        }
        en.addEffect(MinecraftEffectTypes.Slowness, 10*TicksPerSecond, {
            amplifier: damage
        });
        en.addEffect(MinecraftEffectTypes.Weakness, 10*TicksPerSecond, {
            amplifier: damage
        });
        en.dimension.spawnEntity("kurokumaft:ice_blockmagic", {x:en.location.x+0.5, y:en.location.y+10, z:en.location.z+0.5})
    });

    player.removeTag("iceblock_self");
}
