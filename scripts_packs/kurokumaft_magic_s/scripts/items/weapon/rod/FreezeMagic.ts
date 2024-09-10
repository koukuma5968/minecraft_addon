import { Entity, EntityDamageCause, Player, system, TicksPerSecond } from "@minecraft/server";
import { MinecraftBlockTypes, MinecraftEffectTypes } from "@minecraft/vanilla-data";

/**
 * フリーズコフィン
 */
export async function freezConclusion(player:Player) {
    player.addTag("freez_conclusion_self");
    let targets = player.dimension.getEntities({
        excludeTags: [
            "freez_conclusion_self"
        ],
        excludeFamilies: [
            "inanimate", "player", "familiar", "magic", "arrow"
        ],
        excludeTypes: [
            "item"
        ],
        location: player.location,
        maxDistance: 15,
        closest: 2
    });
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

        en.addEffect(MinecraftEffectTypes.Weakness, 20*TicksPerSecond, {
            amplifier: 3
        });
    })
    player.removeTag("freez_conclusion_self");
}

/**
 * アイスバレット
 */
export async function iceBarrette(entity:Entity) {
    entity.dimension.setBlockType(entity.location, MinecraftBlockTypes.Ice);
    entity.dimension.setBlockType({x:entity.location.x,y:entity.location.y+1,z:entity.location.z}, MinecraftBlockTypes.Ice);
}