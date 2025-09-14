import { Entity, EntityComponentTypes, EntityDamageCause, EntityQueryOptions, EntityTameableComponent, Player, system } from "@minecraft/server";
import { addTeamsTagFilter, getLookRotaionPointsV2 } from "../../../common/MagicCommonUtil";

/**
 * ダークファング
 */
export async function darkFang(player:Player, hitEntity:Entity) {

    player.addTag(player.id);

    const look = getLookRotaionPointsV2(player.getRotation(), 3.5, 0);

    const filterOption = {
        excludeTags: [
            player.id
        ],
        location: {x:hitEntity.location.x, y:hitEntity.location.y+1, z:hitEntity.location.z},
        maxDistance: 4
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);

    const targets = player.dimension.getEntities(filterOption);
    targets.forEach(en => {
        if (!en.isValid) {
            return;
        }

        en.dimension.spawnParticle("kurokumaft:dark_fang_particle", {x:player.location.x+look.x, y:player.location.y+0.8, z:player.location.z+look.z});
        if (en instanceof Player) {
            en.applyDamage(2, {
                cause: EntityDamageCause.wither
            });
        } else {
            en.applyDamage(6, {
                cause: EntityDamageCause.wither
            });
        }
    });

    player.removeTag(player.id);
}

/**
 * ブラストアッシュ
 */
export async function brushash(player:Player) {

    player.addTag(player.id);

    const filterOption = {
        excludeTags: [
            player.id
        ],
        location: player.location,
        maxDistance: 10,
        closest: 3
    } as EntityQueryOptions;

    addTeamsTagFilter(player, filterOption);

    const targets = player.dimension.getEntities(filterOption);
    const intervalNum = system.runInterval(() => {
        targets.forEach(en => {
            if (en.isValid) {
                en.dimension.spawnParticle("kurokumaft:dark_brushash_particle", en.location);
                if (en instanceof Player) {
                    en.applyDamage(2, {
                        cause: EntityDamageCause.wither
                    });
                } else {
                    en.applyDamage(6, {
                        cause: EntityDamageCause.wither
                    });
                }
            }
        });
    },4);
    system.runTimeout(() => {
        system.clearRun(intervalNum);
    }, 40);
 
    player.removeTag(player.id);
}

/**
 * ダークスケルトン召喚
 */
export async function summonSkeconston(player:Player) {
    const dark_skeconston1 = player.dimension.spawnEntity("kurokumaft:dark_skeconston", {x:player.location.x+3,y:player.location.y,z:player.location.z}) as Entity;
    const dark_skeconston2 = player.dimension.spawnEntity("kurokumaft:dark_skeconston", {x:player.location.x-3,y:player.location.y,z:player.location.z}) as Entity;
    const dark_skeconston3 = player.dimension.spawnEntity("kurokumaft:dark_skeconston", {x:player.location.x,y:player.location.y,z:player.location.z+3}) as Entity;
    dark_skeconston1.nameTag = "ダークスケルトン1"
    dark_skeconston2.nameTag = "ダークスケルトン2"
    dark_skeconston3.nameTag = "ダークスケルトン3"

    const tameable1 = dark_skeconston1.getComponent(EntityComponentTypes.Tameable) as EntityTameableComponent;
    if (!tameable1.isTamed) {
        if (player instanceof Player) {
            tameable1.tame(player);
        }
    }
    const tameable2 = dark_skeconston2.getComponent(EntityComponentTypes.Tameable) as EntityTameableComponent;
    if (!tameable2.isTamed) {
        if (player instanceof Player) {
            tameable2.tame(player);
        }
    }
    const tameable3 = dark_skeconston3.getComponent(EntityComponentTypes.Tameable) as EntityTameableComponent;
    if (!tameable3.isTamed) {
        if (player instanceof Player) {
            tameable3.tame(player);
        }
    }

}
