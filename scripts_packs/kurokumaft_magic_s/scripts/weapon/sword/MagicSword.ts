import { world } from "@minecraft/server";

/**
 * フレイムソード
 * @param {string} text
 */
function print(text:string) {
    world.sendMessage(text + "");
};
