import { ItemCustomComponent, Player, ItemComponentConsumeEvent } from "@minecraft/server";

/**
 * 銅のバケツ
 */
export class CopperBucketMilk implements ItemCustomComponent {

    onConsume(event:ItemComponentConsumeEvent) {
        let player = event.source as Player;
        player.runCommand("/effect " + player.nameTag + " clear");
    }
}
