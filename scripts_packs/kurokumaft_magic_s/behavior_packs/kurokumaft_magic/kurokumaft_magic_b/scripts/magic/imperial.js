import { system,Dimension } from "@minecraft/server";
import { print, playsound, durabilityDamage, breakItem } from "../common";

// ファイアストーム
/**
 * @param {Dimension} dim
 * @param {Vector3} locat
 */
function fireStorm(dim, locat) {

    let stand = dim.spawnEntity("kurokumaft:firestormmagic_stand", locat);
    stand.runCommand("tag @s add firestormmagic_self");
    // let intervalNum = system.runInterval(() => {
    //     try {
    //         dim.runCommand("execute positioned " + locat.x + " " + locat.y + " " + locat.z + " as @e[family=firestormmagic_stand,c=1] at @s run particle kurokumaft:firestome5_particle ~~~");
    //         dim.runCommand("execute positioned " + locat.x + " " + locat.y + " " + locat.z + " as @e[family=firestormmagic_stand,c=1] at @s run damage @e[family=!magic,family=!inanimate,family=!familiar,type=!item,r=5] 15 fire");
    //     } catch (error) {
    //     } finally {
    //     }
    // }, 1);
    // system.runTimeout(() => {
    //     dim.runCommand("execute positioned " + locat.x + " " + locat.y + " " + locat.z + " as @e[family=firestormmagic_stand,c=1] at @s run kill @s");
    //     system.clearRun(intervalNum);
    // }, 60);

};

export { fireStorm };
