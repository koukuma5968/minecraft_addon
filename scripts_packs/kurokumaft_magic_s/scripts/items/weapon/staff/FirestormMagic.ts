import { Dimension, Entity, EntityDamageCause, Player, system, Vector3 } from "@minecraft/server";
import { getLookPoints } from "../../../common/commonUtil";

/**
 * ブラム・ファング
 */
export async function bramFang(player:Player) {
    let targets = player.dimension.getEntities({
        excludeTags: [
            "flamecircle_self"
        ],
        excludeFamilies: [
            "inanimate", "player", "familiar"
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

    player.addTag("mailstrom_self");

    let {xlocation, ylocation, zlocation} = getLookPoints(player.getRotation(), player.location, 15);

    let stand = player.dimension.spawnEntity("kurokumaft:firestormmagic_stand", 
        {
            x:xlocation!,
            y:player.location.y + 0.5,
            z:zlocation!
        }
    );
    let stormLo = stand.location;
    let intervalNum = system.runInterval(() => {
        stand.runCommand("/particle kurokumaft:firestome5_particle ~~~");
        let targets = stand.dimension.getEntities({
            excludeTags: [
                "firestormmagic_self"
            ],
            excludeFamilies: [
                "inanimate", "player", "familiar"
            ],
            excludeTypes: [
                "item"
            ],
            location: stormLo,
            maxDistance: 10
        });
        targets.forEach(en => {
            en.applyDamage(5, {
                cause: EntityDamageCause.fire
            });
        })
    }, 10);
    system.runTimeout(() => {
        system.clearRun(intervalNum);
        player.removeTag("firestormmagic_self");
        stand.remove();
    }, 100);

};

