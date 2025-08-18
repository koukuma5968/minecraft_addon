import { Entity, EntityDamageCause, EntityQueryOptions, Player, system } from "@minecraft/server";
import { addTeamsTagFilter, getLookRotaionPointsV2 } from "../../../common/MagicCommonUtil";

/**
 * ダークファング
 */
export async function darkFang(player:Player, hitEntity:Entity) {

    player.addTag("dark_fang_self");

    const look = getLookRotaionPointsV2(player.getRotation(), 3.5, 0);

    const filterOption = {
        excludeTags: [
            "dark_fang_self",
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

    player.removeTag("dark_fang_self");
}

/**
 * ブラストアッシュ
 */
export async function brushash(player:Player) {

    player.addTag("brushash_self");

    const filterOption = {
        excludeTags: [
            "brushash_self",
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
 
    player.removeTag("brushash_self");
}

/**
 * ダークスケルトン召喚
 */
export async function summonSkeconston(player:Player) {
    player.dimension.spawnEntity("kurokumaft:dark_skeconston", {x:player.location.x+3,y:player.location.y,z:player.location.z}).nameTag = "ダークスケルトン";
    player.dimension.spawnEntity("kurokumaft:dark_skeconston", {x:player.location.x-3,y:player.location.y,z:player.location.z}).nameTag = "ダークスケルトン";
    player.dimension.spawnEntity("kurokumaft:dark_skeconston", {x:player.location.x,y:player.location.y,z:player.location.z+3}).nameTag = "ダークスケルトン";
}