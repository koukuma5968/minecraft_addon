import { ItemCustomComponent, ItemStack, ItemComponentUseEvent, Player, system, TicksPerSecond } from "@minecraft/server";
import { clearScope, lageScope } from "../../../common/WeaponsSniperScope";

/**
 * スナイパーライフル
 */
export class SniperRifle implements ItemCustomComponent {

    onUse(event:ItemComponentUseEvent) {
        let source = event.source as Player;
        let itemStack = event.itemStack as ItemStack;
        shotSniper(source, itemStack);
    }
}

/**
 * スナイパーライフルスコープ
 * @param {Player} player
 * @param {ItemStack} item
 */
async function shotSniper(player: Player, item: ItemStack) {
    player.setDynamicProperty("SniperRifleShot", true);
    let intervalNum = system.runInterval(() => {
        if (player.isSneaking) {
            lageScope(player);
        } else {
            clearScope(player);
        }
    }, 1);
    player.setDynamicProperty("SniperRifleShotIntervalNum", intervalNum);
}

/**
 * スナイパーライフルスコープ停止
 * @param {Player} player
 */
export async function stopSniper(player: Player) {
    let num = player.getDynamicProperty("SniperRifleShotIntervalNum") as number;
    system.clearRun(num);
    player.setDynamicProperty("SniperRifleShot", undefined);
    player.setDynamicProperty("SniperRifleShotIntervalNum", undefined);
    system.runTimeout(() => {
        clearScope(player);
    }, TicksPerSecond*1);
}

