import { Entity, EntityDamageCause, EntityQueryOptions, Player } from "@minecraft/server";
import { addTeamsTagFilter, getLookRotaionPointsV2 } from "../../../common/MagicCommonUtil";

/**
 * パウダースノー
 */
export async function powderedSnow(player:Player, hitEntity:Entity) {
    player.addTag(player.id);

    hitEntity.dimension.spawnParticle("kurokumaft:snow_particle", {x:hitEntity.location.x, y:hitEntity.location.y+1.8, z:hitEntity.location.z});

    const filterOption = {
        excludeTags: [
            player.id
        ],
        location: {x:hitEntity.location.x, y:hitEntity.location.y+1, z:hitEntity.location.z},
        maxDistance: 3
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);

    const targets = player.dimension.getEntities(filterOption);

    targets.forEach(en => {
        let damage = 2 as number;
        if (en instanceof Player) {
            damage = 1;
        }
        en.applyDamage(damage, {
            cause: EntityDamageCause.freezing
        });
    });

    player.removeTag(player.id);
}

/**
 * ディープスノー
 */
export async function deepSnow(player:Player) {
    player.addTag(player.id);
    const filterOption = {
        excludeTags: [
            player.id
        ],
        location: player.location,
        maxDistance: 10,
        closest: 1
    } as EntityQueryOptions;
    addTeamsTagFilter(player, filterOption);
    const targets = player.dimension.getEntities(filterOption);

    targets.forEach(en => {
        en.dimension.setBlockType({x:en.location.x, y:en.location.y-1,z:en.location.z}, "powder_snow");
        en.dimension.setBlockType({x:en.location.x, y:en.location.y-1,z:en.location.z+1}, "powder_snow");
        en.dimension.setBlockType({x:en.location.x, y:en.location.y-1,z:en.location.z-1}, "powder_snow");
        en.dimension.setBlockType({x:en.location.x+1, y:en.location.y-1,z:en.location.z}, "powder_snow");
        en.dimension.setBlockType({x:en.location.x+1, y:en.location.y-1,z:en.location.z+1}, "powder_snow");
        en.dimension.setBlockType({x:en.location.x+1, y:en.location.y-1,z:en.location.z-1}, "powder_snow");
        en.dimension.setBlockType({x:en.location.x-1, y:en.location.y-1,z:en.location.z}, "powder_snow");
        en.dimension.setBlockType({x:en.location.x-1, y:en.location.y-1,z:en.location.z+1}, "powder_snow");
        en.dimension.setBlockType({x:en.location.x-1, y:en.location.y-1,z:en.location.z-1}, "powder_snow");
    })
    player.removeTag(player.id);
}

/**
 * アイスウォール
 */
export async function icewall(player:Player) {

    const look = getLookRotaionPointsV2(player.getRotation(), 4, 0);
    player.dimension.setBlockType({x:player.location.x+look.x, y:player.location.y, z:player.location.z+look.z}, "minecraft:ice");
    player.dimension.setBlockType({x:player.location.x+look.x, y:player.location.y+1, z:player.location.z+look.z}, "minecraft:ice");

}
