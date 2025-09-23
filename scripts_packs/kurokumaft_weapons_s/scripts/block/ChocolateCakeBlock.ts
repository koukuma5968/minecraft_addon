import { BlockCustomComponent, BlockComponentPlayerInteractEvent, Block, Player, TicksPerSecond, BlockPermutation } from "@minecraft/server";
import { MinecraftBlockTypes, MinecraftEffectTypes } from "@minecraft/vanilla-data";

/**
 * チョコレートケーキ
 */
export class ChocolateCakeBlock implements BlockCustomComponent {

    onPlayerInteract(event:BlockComponentPlayerInteractEvent) {
        const block = event.block as Block;
        const player = event.player as Player;
        const states = block.permutation.getAllStates();
        const eat =  states["kurokumaft:eat"] as number;
        player.addEffect(MinecraftEffectTypes.Saturation, TicksPerSecond *1, {
            amplifier: 2,
            showParticles: false
        });
        if (eat < 6) {
            block.setPermutation(BlockPermutation.resolve(block.typeId, { "kurokumaft:eat" : eat + 1}));
        } else {
            block.setPermutation(BlockPermutation.resolve(MinecraftBlockTypes.Air));
        }
    }
}
