import { EntityDamageCause, EntityQueryOptions, Player, system, Vector3 } from "@minecraft/server";
import { addTeamsTagFilter, getLookPoints, getLookRotaionPoints } from "../../../common/commonUtil";

/**
 * ソニックスライサー
 */
export async function sonicSlicer(player:Player) {
    player.addTag("sonicSlicer_self");

    let slicer1 = getLookRotaionPoints(player.getRotation(), 3, 0);
    player.dimension.spawnParticle("kurokumaft:storm_bread_particle", 
        {
            x:player.location.x+slicer1.x, 
            y:player.location.y+1.0,
            z:player.location.z+slicer1.z
        }
    );
    player.dimension.spawnParticle("kurokumaft:storm_bread_particle", 
        {
            x:player.location.x+slicer1.x, 
            y:player.location.y+1.5,
            z:player.location.z+slicer1.z
        }
    );

    let slicer2 = getLookRotaionPoints(player.getRotation(), 3, -2);
    player.dimension.spawnParticle("kurokumaft:storm_bread_particle", 
        {
            x:player.location.x+slicer2.x, 
            y:player.location.y+1.5,
            z:player.location.z+slicer2.z
        }
    );
    player.dimension.spawnParticle("kurokumaft:storm_bread_particle", 
        {
            x:player.location.x+slicer2.x, 
            y:player.location.y+2,
            z:player.location.z+slicer2.z
        }
    );

    let slicer3 = getLookRotaionPoints(player.getRotation(), 3, 2);
    player.dimension.spawnParticle("kurokumaft:storm_bread_particle", 
        {
            x:player.location.x+slicer3.x, 
            y:player.location.y+1.5,
            z:player.location.z+slicer3.z
        }
    );
    player.dimension.spawnParticle("kurokumaft:storm_bread_particle", 
        {
            x:player.location.x+slicer3.x, 
            y:player.location.y+2,
            z:player.location.z+slicer3.z
        }
    );

    let filterOption = {
        excludeTags: [
            "sonicSlicer_self",
        ],
        location: {x:player.location.x+slicer1.x, y:player.location.y+1.8, z:player.location.z+slicer1.z},
        maxDistance: 6.5
    } as EntityQueryOptions;
    addTeamsTagFilter(player, filterOption);

    let targets = player.dimension.getEntities(filterOption);
    targets.forEach(en => {
        if (en instanceof Player) {
            en.applyDamage(3, {
                cause: EntityDamageCause.fall
            });
        } else {
            en.applyDamage(20, {
                cause: EntityDamageCause.fall
            });
        }
    });

    player.removeTag("sonicSlicer_self");

}

/**
 * メイルシュトローム
 */
export async function mailstrom(player:Player) {
    player.addTag("mailstrom_self");

    let look = getLookPoints(player.getRotation(), player.location, 15);
    let mailLo = {x:look.x, y:player.location.y, z:look.z} as Vector3;
    let dim = player.dimension;

    let intervalNum = system.runInterval(() => {
        dim.spawnParticle("kurokumaft:mailstrom1_particle", mailLo);
        dim.spawnParticle("kurokumaft:mailstrom1_particle", {x:mailLo.x,y:mailLo.y+0.5,z:mailLo.z});
        dim.spawnParticle("kurokumaft:mailstrom2_particle", {x:mailLo.x,y:mailLo.y+1,z:mailLo.z});
        dim.spawnParticle("kurokumaft:mailstrom2_particle", {x:mailLo.x,y:mailLo.y+1.5,z:mailLo.z});
        dim.spawnParticle("kurokumaft:mailstrom3_particle", {x:mailLo.x,y:mailLo.y+2,z:mailLo.z});
        dim.spawnParticle("kurokumaft:mailstrom3_particle", {x:mailLo.x,y:mailLo.y+2.5,z:mailLo.z});
        dim.spawnParticle("kurokumaft:mailstrom4_particle", {x:mailLo.x,y:mailLo.y+3,z:mailLo.z});
        dim.spawnParticle("kurokumaft:mailstrom4_particle", {x:mailLo.x,y:mailLo.y+3.5,z:mailLo.z});
        dim.spawnParticle("kurokumaft:mailstrom5_particle", {x:mailLo.x,y:mailLo.y+4,z:mailLo.z});
        dim.spawnParticle("kurokumaft:mailstrom5_particle", {x:mailLo.x,y:mailLo.y+4.5,z:mailLo.z});
        dim.spawnParticle("kurokumaft:mailstrom6_particle", {x:mailLo.x,y:mailLo.y+5,z:mailLo.z});
        dim.spawnParticle("kurokumaft:mailstrom6_particle", {x:mailLo.x,y:mailLo.y+5.5,z:mailLo.z});

        let filterOption = {
            excludeTags: [
                "mailstrom_self",
            ],
            location: mailLo,
            maxDistance: 10
        } as EntityQueryOptions;
        addTeamsTagFilter(player, filterOption);

        let targets = dim.getEntities(filterOption);
        targets.forEach(en => {
            en.teleport(mailLo);
            if (en instanceof Player) {
                en.applyDamage(3, {
                    cause: EntityDamageCause.drowning
                });
            } else {
                en.applyDamage(5, {
                    cause: EntityDamageCause.drowning
                });
            }
        })
    }, 5);
    system.runTimeout(() => {
        system.clearRun(intervalNum);
        player.removeTag("mailstrom_self");
    }, 100);
}