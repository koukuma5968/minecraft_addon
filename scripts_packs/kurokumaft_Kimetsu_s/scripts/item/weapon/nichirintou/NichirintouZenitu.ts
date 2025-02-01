import { ItemCustomComponent, ItemStack, ItemComponentUseEvent, Player } from "@minecraft/server";

/**
 * 日輪刀（善逸）
 */
export class NichirintouZenitu implements ItemCustomComponent {

    // 右クリック
    onUse(event:ItemComponentUseEvent) {
        let itemStack = event.itemStack as ItemStack;
        let player = event.source as Player;
        player.setDynamicProperty("kokyu", true);
    }

}

/**
 * 善逸 呼吸
 * @param {ItemStack} itemStack
 * @param {Player} player
 */
export async function kokyuZenitu(itemStack:ItemStack, player:Player) {

}
