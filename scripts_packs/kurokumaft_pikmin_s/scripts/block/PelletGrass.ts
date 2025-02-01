import { BlockCustomComponent, BlockComponentPlayerInteractEvent, Block, Player } from "@minecraft/server";

/**
 * ペレットブロック
 */
export class PelletGrassBlock implements BlockCustomComponent {

    onPlayerInteract(event:BlockComponentPlayerInteractEvent) {
        let block = event.block as Block;
        let player = event.player as Player;
    }
}
