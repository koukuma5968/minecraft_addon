import { EntityDamageCause, Player, system } from "@minecraft/server";
import { getLookPoints, getRandomInRange } from "../../../common/commonUtil";
import { shooting } from "../../../custom/ShooterMagicEvent";

/**
 * 烈風刃(れっぷうじん)
 */
export function windDesires(player:Player) {
    player.addTag("wind_desires");

    let {xlocation, ylocation, zlocation} = getLookPoints(player.getRotation(), player.location, 2);
    let targets = player.dimension.getEntities({
        excludeTags: [
            "wind_desires"
        ],
        excludeFamilies: [
            "inanimate", "magic", "player"
        ],
        excludeTypes: [
            "item"
        ],
        location: {x:xlocation!, y:player.location.y + 0.5, z:zlocation!},
        maxDistance: 3,
        closest: 3
    });
    targets.forEach(en => {
        en.runCommand("/particle kurokumaft:wind_desires_particle ^0.5^^");
        en.runCommand("/particle kurokumaft:wind_desires_particle ^^^");
        en.runCommand("/particle kurokumaft:wind_desires_particle ^-0.5^^");
        en.applyDamage(2, {
            cause: EntityDamageCause.flyIntoWall
        });
        en.applyDamage(2, {
            cause: EntityDamageCause.flyIntoWall
        });
        en.applyDamage(2, {
            cause: EntityDamageCause.flyIntoWall
        });
    });
    player.removeTag("wind_desires");
}

/**
 * 風鳴切(かなきり)
 */
export function windBarkSlash(player:Player) {

    let xran = parseFloat(getRandomInRange(-0.5, 0.5).toFixed(3));
    let yran = parseFloat(getRandomInRange(-0.2, 0.5).toFixed(3));
    let zran = parseFloat(getRandomInRange(-0.5, 0.5).toFixed(3));

    let intervalNum = system.runInterval(() => {
        shooting(player, "kurokumaft:wind_bark_slash", {x:xran,y:yran,z:zran}, 5,"kurokumaft:projectile_1");
        shooting(player, "kurokumaft:wind_bark_slash", {x:xran,y:yran,z:zran}, 5,"kurokumaft:projectile_2");
        shooting(player, "kurokumaft:wind_bark_slash", {x:xran,y:yran,z:zran}, 5,"kurokumaft:projectile_3");
    }, 5);

    system.runTimeout(() => {
        system.clearRun(intervalNum);
    }, 60);
}