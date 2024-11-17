import { ItemCustomComponent, Player, ItemComponentUseOnEvent, Block, Direction, BlockPermutation } from "@minecraft/server";
import { MinecraftBlockTypes } from "@minecraft/vanilla-data";

/**
 * 銅のバケツ
 */
export class CopperBucketWater implements ItemCustomComponent {

    onUseOn(event:ItemComponentUseOnEvent) {
        let player = event.source as Player;
        let block = event.block as Block;
        let blockFace = event.blockFace as Direction;
        let faceBlock;
        let blocLocation = block.location;
        if (Direction.Up == blockFace) {
            faceBlock = player.dimension.getBlock({x:blocLocation.x,y:blocLocation.y+1,z:blocLocation.z}) as Block;
        } else if (Direction.Down == blockFace) {
            faceBlock = player.dimension.getBlock({x:blocLocation.x,y:blocLocation.y-1,z:blocLocation.z}) as Block;
        } else if (Direction.East == blockFace) {
            faceBlock = player.dimension.getBlock({x:blocLocation.x+1,y:blocLocation.y,z:blocLocation.z}) as Block;
        } else if (Direction.West == blockFace) {
            faceBlock = player.dimension.getBlock({x:blocLocation.x-1,y:blocLocation.y,z:blocLocation.z}) as Block;
        } else if (Direction.North == blockFace) {
            faceBlock = player.dimension.getBlock({x:blocLocation.x,y:blocLocation.y,z:blocLocation.z-1}) as Block;
        } else if (Direction.South == blockFace) {
            faceBlock = player.dimension.getBlock({x:blocLocation.x,y:blocLocation.y,z:blocLocation.z+1}) as Block;
        }
        if (faceBlock == undefined) {
            return;
        }
        faceBlock.setPermutation(BlockPermutation.resolve(MinecraftBlockTypes.Water, {liquid_depth:0}));
}
}
