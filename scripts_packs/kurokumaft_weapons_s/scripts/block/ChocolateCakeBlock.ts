import { BlockCustomComponent, BlockComponentPlayerInteractEvent, Block, Player, TicksPerSecond, BlockPermutation } from "@minecraft/server";
import { MinecraftBlockTypes, MinecraftEffectTypes } from "@minecraft/vanilla-data";

/**
 * ミスリルブロック
 */
export class ChocolateCakeBlock implements BlockCustomComponent {

    onPlayerInteract(event:BlockComponentPlayerInteractEvent) {
        let block = event.block as Block;
        let player = event.player as Player;
        let eat = block.permutation.getState("kurokumaft:eat") as number;
        player.addEffect(MinecraftEffectTypes.Saturation, TicksPerSecond *1, {
            amplifier: 2,
            showParticles: false
        });
        if (eat < 6) {
            block.setPermutation(block.permutation.withState("kurokumaft:eat", eat + 1));
        } else {
            block.setPermutation(BlockPermutation.resolve(MinecraftBlockTypes.Air));
        }
    }
}
