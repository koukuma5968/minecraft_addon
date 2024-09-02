import { EntityDamageCause, Player, system } from "@minecraft/server";

/**
 * ブラストアッシュ
 */
export async function brushash(player:Player) {
    player.addTag("brushash_self");
    let targets = player.dimension.getEntities({
        excludeTags: [
            "brushash_self"
        ],
        excludeFamilies: [
            "inanimate", "player", "familiar"
        ],
        excludeTypes: [
            "item"
        ],
        location: player.location,
        maxDistance: 10,
        closest: 3
    });
    targets.forEach(en => {
        en.runCommand("/particle kurokumaft:dark_brushash_particle ~~~");
        en.applyDamage(6, {
            cause: EntityDamageCause.wither
        });
    })
    player.removeTag("brushash_self");
}

/**
 * ダークスケルトン召喚
 */
export async function summonSkeleton(player:Player) {
    player.dimension.spawnEntity("kurokumaft:dark_skeleton", {x:player.location.x+3,y:player.location.y,z:player.location.z}).nameTag = "ダークスケルトン";
    player.dimension.spawnEntity("kurokumaft:dark_skeleton", {x:player.location.x-3,y:player.location.y,z:player.location.z}).nameTag = "ダークスケルトン";
    player.dimension.spawnEntity("kurokumaft:dark_skeleton", {x:player.location.x,y:player.location.y,z:player.location.z+3}).nameTag = "ダークスケルトン";
}