import { Entity, EntityDamageCause, EntityQueryOptions, Player, world } from "@minecraft/server";
import { addTeamsTagFilter, getLookRotaionPoints } from "../../../common/commonUtil";
import { MinecraftBlockTypes } from "@minecraft/vanilla-data";

/**
 * スプラッシュ
 */
export async function splash(player:Player, hitEntity:Entity) {

    player.addTag("splash_self");

    hitEntity.dimension.spawnParticle("kurokumaft:water_particle", {x:hitEntity.location.x, y:hitEntity.location.y+1.8, z:hitEntity.location.z});

    let filterOption = {
        excludeTags: [
            "splash_self",
        ],
        location: {x:hitEntity.location.x, y:hitEntity.location.y+1, z:hitEntity.location.z},
        maxDistance: 3
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);

    let targets = player.dimension.getEntities(filterOption);
    targets.forEach(en => {
        let damage = 2 as number;
        if (en instanceof Player) {
            damage = 1;
        }
        en.applyDamage(damage, {
            cause: EntityDamageCause.drowning
        });
    });

    player.removeTag("splash_self");
}

/**
 * ウォーターウォール
 */
export async function waterwall(player:Player) {

    let look = getLookRotaionPoints(player.getRotation(), 4, 0);
    player.dimension.setBlockType({x:player.location.x+look.x, y:player.location.y, z:player.location.z+look.z}, "kurokumaft:waterwall_block");
    player.dimension.setBlockType({x:player.location.x+look.x, y:player.location.y+1, z:player.location.z+look.z}, "kurokumaft:waterwall_block");

}

/**
 * ウォーターボール
 */
export function waterball(entity:Entity) {

    if (entity.location.y > -64) {
        entity.dimension.spawnParticle("kurokumaft:water_particle", entity.location);
    }

}
