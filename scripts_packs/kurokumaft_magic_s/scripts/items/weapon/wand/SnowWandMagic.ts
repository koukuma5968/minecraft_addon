import { EntityDamageCause, Player, system } from "@minecraft/server";

/**
 * ディープスノー
 */
export async function deepSnow(player:Player) {
    player.addTag("deepSnow_self");
    let targets = player.dimension.getEntities({
        excludeTags: [
            "deepSnow_self"
        ],
        excludeFamilies: [
            "inanimate", "player", "familiar", "magic", "arrow"
        ],
        excludeTypes: [
            "item"
        ],
        location: player.location,
        maxDistance: 10,
        closest: 1
    });
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
    player.removeTag("deepSnow_self");
}