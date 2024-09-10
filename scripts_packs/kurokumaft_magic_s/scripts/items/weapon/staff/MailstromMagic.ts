import { EntityDamageCause, Player, system, Vector3 } from "@minecraft/server";
import { getLookPoints } from "../../../common/commonUtil";

/**
 * メイルシュトローム
 */
export async function mailstrom(player:Player) {
    player.addTag("mailstrom_self");

    let {xlocation, ylocation, zlocation} = getLookPoints(player.getRotation(), player.location, 15);
    let mailLo = {x:xlocation, y:player.location.y, z:zlocation} as Vector3;
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
        let targets = dim.getEntities({
            excludeTags: [
                "mailstrom_self"
            ],
            excludeFamilies: [
                "inanimate", "player", "familiar", "magic", "arrow"
            ],
            excludeTypes: [
                "item"
            ],
            location: mailLo,
            maxDistance: 10
        });
        targets.forEach(en => {
            en.teleport(mailLo);
            en.applyDamage(5, {
                cause: EntityDamageCause.drowning
            });
        })
    }, 5);
    system.runTimeout(() => {
        system.clearRun(intervalNum);
        player.removeTag("mailstrom_self");
    }, 100);
}