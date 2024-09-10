import { Dimension, Entity, EntityDamageCause, Player, system, Vector3 } from "@minecraft/server";
import { getLookPoints, getRandomInRange } from "../../../common/commonUtil";

/**
 * ブラム・ファング
 */
export async function bramFang(player:Player) {
    let targets = player.dimension.getEntities({
        excludeTags: [
            "flamecircle_self"
        ],
        excludeFamilies: [
            "inanimate", "player", "familiar", "arrow"
        ],
        excludeTypes: [
            "item"
        ],
        location: player.location,
        maxDistance: 3
    });
    targets.forEach(en => {
        en.dimension.spawnEntity("kurokumaft:bram_fang_magic", en.location);
    })
}

/**
 * ファイアストーム
 * @param {Player} player
 */
export async function fireStorm(player:Player) {

    player.addTag("firestormmagic_self");

    let {xlocation, ylocation, zlocation} = getLookPoints(player.getRotation(), player.location, 15);

    let dim = player.dimension;
    let ploc = player.location
    let intervalNum = system.runInterval(() => {
        dim.spawnParticle("kurokumaft:firestome5_particle", {x:xlocation!,y:ploc.y,z:zlocation!});
        let targets = dim.getEntities({
            excludeTags: [
                "firestormmagic_self"
            ],
            excludeFamilies: [
                "inanimate", "player", "familiar", "magic", "arrow"
            ],
            excludeTypes: [
                "item"
            ],
            location: {x:xlocation!,y:player.location.y,z:zlocation!},
            maxDistance: 10
        });
        targets.forEach(en => {
            en.applyDamage(5, {
                cause: EntityDamageCause.fire
            });
        })
    }, 1);
    system.runTimeout(() => {
        system.clearRun(intervalNum);
        player.removeTag("firestormmagic_self");
    }, 60);

};

