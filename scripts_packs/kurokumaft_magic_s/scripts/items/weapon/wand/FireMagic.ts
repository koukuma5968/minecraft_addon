import { Entity, EntityDamageCause, EntityQueryOptions, Player } from "@minecraft/server";
import { addTeamsTagFilter, getLookRotaionPoints } from "../../../common/MagicCommonUtil";
import { MinecraftBlockTypes } from "@minecraft/vanilla-data";

/**
 * バーストロンド
 */
export async function burstRondo(player:Player, hitEntity:Entity) {

    player.addTag("burstRondo_self");

    hitEntity.dimension.spawnParticle("kurokumaft:fire_particle", {x:hitEntity.location.x, y:hitEntity.location.y+1.8, z:hitEntity.location.z});

    let filterOption = {
        excludeTags: [
            "burstRondo_self"
        ],
        location: {x:hitEntity.location.x, y:hitEntity.location.y+1, z:hitEntity.location.z},
        maxDistance: 3
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);
    let targets = hitEntity.dimension.getEntities(filterOption) as Entity[];
    targets.forEach(en => {
        let damage = 2 as number;
        if (en instanceof Player) {
            damage = 1;
        }
        en.applyDamage(damage, {
            cause: EntityDamageCause.fire
        });
    });

    player.removeTag("burstRondo_self");
}

/**
 * ファイアウォール
 */
export async function firewall(player:Player) {

    let look = getLookRotaionPoints(player.getRotation(), 4, 0);
    player.dimension.setBlockType({x:player.location.x+look.x, y:player.location.y, z:player.location.z+look.z}, MinecraftBlockTypes.Magma);
    player.dimension.setBlockType({x:player.location.x+look.x, y:player.location.y+1, z:player.location.z+look.z}, MinecraftBlockTypes.Magma);

}

/**
 * ファイアボール
 */
export function fireball(entity:Entity) {

    if (entity.location.y > -64) {
        entity.dimension.spawnParticle("kurokumaft:fire_particle", entity.location);
    }

}
