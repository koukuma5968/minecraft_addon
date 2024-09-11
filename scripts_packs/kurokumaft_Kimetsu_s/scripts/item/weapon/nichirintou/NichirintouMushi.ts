import { ItemCustomComponent, ItemStack, ItemComponentUseEvent, Player } from "@minecraft/server";

/**
 * 日輪刀（炭治郎）
 */
export class NichirintouMushi implements ItemCustomComponent {

    // 右クリック
    onUse(event:ItemComponentUseEvent) {
        let itemStack = event.itemStack as ItemStack;
        let player = event.source as Player;
        player.setDynamicProperty("kokyu", true);
    }

}
