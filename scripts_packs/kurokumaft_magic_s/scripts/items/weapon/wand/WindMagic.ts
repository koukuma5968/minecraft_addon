import { Entity, EntityDamageCause, EntityQueryOptions, Player } from "@minecraft/server";
import { addTeamsTagFilter, getLookRotaionPoints } from "../../../common/MagicCommonUtil";

/**
 * ウィンドエッジ
 */
export async function windEdge(player:Player, hitEntity:Entity) {

    player.addTag("wind_edge_self");

    hitEntity.dimension.spawnParticle("kurokumaft:wind_particle", {x:hitEntity.location.x, y:hitEntity.location.y+1.8, z:hitEntity.location.z});

    let filterOption = {
        excludeTags: [
            "wind_edge_self",
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
            cause: EntityDamageCause.flyIntoWall
        });
    });

    player.removeTag("wind_edge_self");
}

/**
 * ウィンドウォール
 */
export async function windwall(player:Player) {

    let look = getLookRotaionPoints(player.getRotation(), 4, 0);
    player.dimension.setBlockType({x:player.location.x+look.x, y:player.location.y, z:player.location.z+look.z}, "kurokumaft:windwall_block");
    player.dimension.setBlockType({x:player.location.x+look.x, y:player.location.y+1, z:player.location.z+look.z}, "kurokumaft:windwall_block");

}

/**
 * ウィンドカッター
 */
export function windcutter(entity:Entity) {

    if (entity.location.y > -64) {
        entity.dimension.spawnParticle("kurokumaft:wind_particle", entity.location);
    }

}
