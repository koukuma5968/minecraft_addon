import { EntityDamageCause, EntityQueryOptions, Player, system } from "@minecraft/server";
import { addTeamsTagFilter, getLookPoints } from "../../../common/MagicCommonUtil";

/**
 * ブラム・ファング
 */
export async function bramFang(player:Player) {

    player.addTag("bram_fang_self");

    let filterOption = {
        excludeTags: [
            "bram_fang_self",
        ],
        location: player.location,
        maxDistance: 3
    } as EntityQueryOptions;
    addTeamsTagFilter(player, filterOption);

    let targets = player.dimension.getEntities(filterOption);
    targets.forEach(en => {
        en.dimension.spawnParticle("kurokumaft:bram_fang_particle", en.location);
        en.dimension.spawnEntity("kurokumaft:bram_fang_magic", en.location);
    });

    player.removeTag("bram_fang_self");

}

/**
 * ファイアストーム
 * @param {Player} player
 */
export async function fireStorm(player:Player) {

    player.addTag("firestormmagic_self");

    let look = getLookPoints(player.getRotation(), player.location, 15);

    let dim = player.dimension;
    let ploc = player.location
    let intervalNum = system.runInterval(() => {
        dim.spawnParticle("kurokumaft:firestome5_particle", {x:look.x,y:ploc.y,z:look.z});

        let filterOption = {
            excludeTags: [
                "firestormmagic_self",
            ],
            location: {x:look.x,y:ploc.y,z:look.z},
            maxDistance: 10
        } as EntityQueryOptions;
        addTeamsTagFilter(player, filterOption);
    
        let targets = dim.getEntities(filterOption);
        targets.forEach(en => {
            if (en instanceof Player) {
                en.applyDamage(3, {
                    cause: EntityDamageCause.fire
                });
            } else {
                en.applyDamage(6, {
                    cause: EntityDamageCause.fire
                });
            }
        })
    }, 1);
    system.runTimeout(() => {
        system.clearRun(intervalNum);
        player.removeTag("firestormmagic_self");
    }, 60);

};

