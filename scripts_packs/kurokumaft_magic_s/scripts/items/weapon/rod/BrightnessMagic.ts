import { EntityDamageCause, Player, system } from "@minecraft/server";

/**
 * エリアヒール
 */
export async function areaheel(player:Player) {
    let targets = player.dimension.getEntities({
        excludeFamilies: [
            "inanimate", "magic"
        ],
        excludeTypes: [
            "item"
        ],
        families: [
            "player", "familiar", "undead"
        ],
        location: player.location,
        maxDistance: 10
    });
    player.runCommand("/particle kurokumaft:areaheel_particle ~~~");
    targets.forEach(en => {
        en.addEffect("instant_health", 30, {
            amplifier: 5,
            showParticles: true
        });
    })
}

/**
 * ブライトゴーレム召喚
 */
export async function summonGolem(player:Player) {
    let golem = player.dimension.spawnEntity("kurokumaft:brightness_golem", {x:player.location.x,y:player.location.y,z:player.location.z+3});
    golem.nameTag = "ブライトゴーレム";
    golem.triggerEvent("minecraft:from_player");
}