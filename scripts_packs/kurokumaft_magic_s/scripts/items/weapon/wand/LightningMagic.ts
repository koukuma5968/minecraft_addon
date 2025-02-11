import { Entity, EntityDamageCause, EntityQueryOptions, Player } from "@minecraft/server";
import { addTeamsTagFilter, getLookRotaionPoints } from "../../../common/MagicCommonUtil";

/**
 * スパーク
 */
export async function spark(player:Player, hitEntity:Entity) {

    player.addTag("spark_self");

    player.dimension.spawnParticle("kurokumaft:spark_particle", {x:hitEntity.location.x, y:hitEntity.location.y+1.8, z:hitEntity.location.z});

    let filterOption = {
        excludeTags: [
            "spark_self",
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
            cause: EntityDamageCause.lightning
        });
});

    player.removeTag("spark_self");
}

/**
 * ライトニングウォール
 */
export async function lightningwall(player:Player) {

    let look = getLookRotaionPoints(player.getRotation(), 4, 0);
    player.dimension.setBlockType({x:player.location.x+look.x, y:player.location.y, z:player.location.z+look.z}, "kurokumaft:lightningwall_block");
    player.dimension.setBlockType({x:player.location.x+look.x, y:player.location.y+1, z:player.location.z+look.z}, "kurokumaft:lightningwall_block");

}

/**
 * ライトニングボルト
 */
export function lightningbolt(entity:Entity) {

    if (entity.location.y > -64) {
        entity.dimension.spawnParticle("kurokumaft:lightning_particle", entity.location);
    }

}
