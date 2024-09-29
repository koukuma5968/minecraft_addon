import { ItemCustomComponent, ItemStack, ItemComponentUseEvent, Player, system, TicksPerSecond } from "@minecraft/server";
import { clearScope, middleScope } from "../../../common/SniperScope";

/**
 * スナイパーボウ
 */
export class SniperSteelBow implements ItemCustomComponent {

    onUse(event:ItemComponentUseEvent) {
        let source = event.source as Player;
        let itemStack = event.itemStack as ItemStack;
        shotSniperBow(source, itemStack);
    }
}

/**
 * スナイパーボウスコープ
 * @param {Player} player
 * @param {ItemStack} item
 */
async function shotSniperBow(player: Player, item: ItemStack) {
    player.setDynamicProperty("SniperSteelBowShot", true);
    let intervalNum = system.runInterval(() => {
        if (player.isSneaking) {
            middleScope(player);
        } else {
            clearScope(player);
        }
    }, 1);
    player.setDynamicProperty("SniperSteelBowShotIntervalNum", intervalNum);
}

/**
 * スナイパーボウスコープ停止
 * @param {Player} player
 */
export async function stopSniperBow(player: Player) {
    let num = player.getDynamicProperty("SniperSteelBowShotIntervalNum") as number;
    system.clearRun(num);
    player.setDynamicProperty("SniperSteelBowShot", undefined);
    player.setDynamicProperty("SniperSteelBowShotIntervalNum", undefined);
    system.runTimeout(() => {
        clearScope(player);
    }, TicksPerSecond*1);
}

