import { Entity, EntityDamageCause, EntityQueryOptions, Player } from "@minecraft/server";
import { addTeamsTagFilter, getLookRotaionPoints } from "../../../common/commonUtil";
import { MinecraftBlockTypes } from "@minecraft/vanilla-data";

/**
 * サンドブラスト
 */
export async function sandBlast(player:Player, hitEntity:Entity) {

    player.addTag("sand_blast_self");

    player.dimension.spawnParticle("kurokumaft:sand_particle", {x:hitEntity.location.x, y:hitEntity.location.y+1.8, z:hitEntity.location.z});

    let filterOption = {
        excludeTags: [
            "sand_blast_self",
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
            cause: EntityDamageCause.stalagmite
        });
    });

    player.removeTag("sand_blast_self");
}

/**
 * ストーンウォール
 */
export async function stonewall(player:Player) {

    let look = getLookRotaionPoints(player.getRotation(), 4, 0);
    player.dimension.setBlockType({x:player.location.x+look.x, y:player.location.y, z:player.location.z+look.z}, MinecraftBlockTypes.Basalt);
    player.dimension.setBlockType({x:player.location.x+look.x, y:player.location.y+1, z:player.location.z+look.z}, MinecraftBlockTypes.Basalt);

}

/**
 * ストーンバレット
 */
export function stonebarrette(entity:Entity) {

    if (entity.location.y > -64) {
        entity.dimension.spawnParticle("kurokumaft:stone_particle", entity.location);
    }

}
