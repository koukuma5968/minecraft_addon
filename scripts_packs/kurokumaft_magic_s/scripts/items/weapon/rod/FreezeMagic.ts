import { Entity, EntityDamageCause, EntityQueryOptions, Player, TicksPerSecond } from "@minecraft/server";
import { MinecraftBlockTypes, MinecraftEffectTypes } from "@minecraft/vanilla-data";
import { addTeamsTagFilter } from "../../../common/commonUtil";

/**
 * アイスブレード
 */
export async function iceBread(player:Player, hitEntity:Entity) {

    player.addTag("ice_bread_self");

    hitEntity.dimension.spawnParticle("kurokumaft:ice_bread_particle", {x:hitEntity.location.x, y:hitEntity.location.y+1.8, z:hitEntity.location.z});

    let filterOption = {
        excludeTags: [
            "ice_bread_self",
        ],
        location: {x:hitEntity.location.x, y:hitEntity.location.y+1, z:hitEntity.location.z},
        maxDistance: 2
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);

    let targets = player.dimension.getEntities(filterOption);
    targets.forEach(en => {
        if (en instanceof Player) {
            en.applyDamage(2, {
                cause: EntityDamageCause.freezing
            });
        } else {
            en.applyDamage(6, {
                cause: EntityDamageCause.freezing
            });
        }
    });

    player.removeTag("ice_bread_self");
}

/**
 * フリーズコフィン
 */
export async function freezConclusion(player:Player) {
    player.addTag("freez_conclusion_self");

    let filterOption = {
        excludeTags: [
            "freez_conclusion_self",
        ],
        location: player.location,
        maxDistance: 15,
        closest: 2
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);

    let targets = player.dimension.getEntities(filterOption);
    targets.forEach(en => {
        en.dimension.spawnParticle("kurokumaft:freezingconclusion_particle", en.location);
        en.dimension.setBlockType({x:en.location.x-1,y:en.location.y,z:en.location.z}, MinecraftBlockTypes.PackedIce);
        en.dimension.setBlockType({x:en.location.x-1,y:en.location.y,z:en.location.z+1}, MinecraftBlockTypes.PackedIce);
        en.dimension.setBlockType({x:en.location.x-1,y:en.location.y,z:en.location.z-1}, MinecraftBlockTypes.PackedIce);
        en.dimension.setBlockType({x:en.location.x,y:en.location.y,z:en.location.z}, MinecraftBlockTypes.PackedIce);
        en.dimension.setBlockType({x:en.location.x,y:en.location.y,z:en.location.z+1}, MinecraftBlockTypes.PackedIce);
        en.dimension.setBlockType({x:en.location.x,y:en.location.y,z:en.location.z-1}, MinecraftBlockTypes.PackedIce);
        en.dimension.setBlockType({x:en.location.x+1,y:en.location.y,z:en.location.z}, MinecraftBlockTypes.PackedIce);
        en.dimension.setBlockType({x:en.location.x+1,y:en.location.y,z:en.location.z+1}, MinecraftBlockTypes.PackedIce);
        en.dimension.setBlockType({x:en.location.x+1,y:en.location.y,z:en.location.z-1}, MinecraftBlockTypes.PackedIce);

        en.dimension.setBlockType({x:en.location.x-1,y:en.location.y+1,z:en.location.z}, MinecraftBlockTypes.PackedIce);
        en.dimension.setBlockType({x:en.location.x-1,y:en.location.y+1,z:en.location.z+1}, MinecraftBlockTypes.PackedIce);
        en.dimension.setBlockType({x:en.location.x-1,y:en.location.y+1,z:en.location.z-1}, MinecraftBlockTypes.PackedIce);
        en.dimension.setBlockType({x:en.location.x,y:en.location.y+1,z:en.location.z}, MinecraftBlockTypes.PackedIce);
        en.dimension.setBlockType({x:en.location.x,y:en.location.y+1,z:en.location.z+1}, MinecraftBlockTypes.PackedIce);
        en.dimension.setBlockType({x:en.location.x,y:en.location.y+1,z:en.location.z-1}, MinecraftBlockTypes.PackedIce);
        en.dimension.setBlockType({x:en.location.x+1,y:en.location.y+1,z:en.location.z}, MinecraftBlockTypes.PackedIce);
        en.dimension.setBlockType({x:en.location.x+1,y:en.location.y+1,z:en.location.z+1}, MinecraftBlockTypes.PackedIce);
        en.dimension.setBlockType({x:en.location.x+1,y:en.location.y+1,z:en.location.z-1}, MinecraftBlockTypes.PackedIce);

        if (en instanceof Player) {
            en.addEffect(MinecraftEffectTypes.Weakness, 5*TicksPerSecond, {
                amplifier: 1
            });
        } else {
            en.addEffect(MinecraftEffectTypes.Weakness, 20*TicksPerSecond, {
                amplifier: 3
            });
        }
    });

    player.removeTag("freez_conclusion_self");
}

/**
 * アイスバレット
 */
export async function iceBarrette(entity:Entity) {
    entity.dimension.setBlockType(entity.location, MinecraftBlockTypes.Ice);
    entity.dimension.setBlockType({x:entity.location.x,y:entity.location.y+1,z:entity.location.z}, MinecraftBlockTypes.Ice);
}