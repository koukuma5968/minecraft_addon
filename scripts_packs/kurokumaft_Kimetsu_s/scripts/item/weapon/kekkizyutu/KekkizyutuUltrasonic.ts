import { ItemCustomComponent, ItemStack, ItemComponentUseEvent, Player } from "@minecraft/server";

/**
 * 血気術
 */
export class KekkizyutuUltrasonic implements ItemCustomComponent {

    // 右クリック
    onUse(event:ItemComponentUseEvent) {
        let itemStack = event.itemStack as ItemStack;
        let player = event.source as Player;
    }

}
