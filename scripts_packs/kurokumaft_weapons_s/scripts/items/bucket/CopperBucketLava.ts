import { ItemCustomComponent, ItemStack, Player, ItemComponentUseOnEvent, Block, Direction, BlockPermutation, EntityComponentTypes, EntityEquippableComponent, EquipmentSlot } from "@minecraft/server";
import { MinecraftBlockTypes } from "@minecraft/vanilla-data";

/**
 * 銅のバケツ
 */
export class CopperBucketLava implements ItemCustomComponent {

    onUseOn(event:ItemComponentUseOnEvent) {
        const copper_bucket = event.itemStack as ItemStack;
        const player = event.source as Player;
        const block = event.block as Block;
        const blockFace = event.blockFace as Direction;
        let faceBlock;
        const blocLocation = block.location;
        if (Direction.Up === blockFace) {
            faceBlock = player.dimension.getBlock({x:blocLocation.x,y:blocLocation.y+1,z:blocLocation.z}) as Block;
        } else if (Direction.Down === blockFace) {
            faceBlock = player.dimension.getBlock({x:blocLocation.x,y:blocLocation.y-1,z:blocLocation.z}) as Block;
        } else if (Direction.East === blockFace) {
            faceBlock = player.dimension.getBlock({x:blocLocation.x+1,y:blocLocation.y,z:blocLocation.z}) as Block;
        } else if (Direction.West === blockFace) {
            faceBlock = player.dimension.getBlock({x:blocLocation.x-1,y:blocLocation.y,z:blocLocation.z}) as Block;
        } else if (Direction.North === blockFace) {
            faceBlock = player.dimension.getBlock({x:blocLocation.x,y:blocLocation.y,z:blocLocation.z-1}) as Block;
        } else if (Direction.South === blockFace) {
            faceBlock = player.dimension.getBlock({x:blocLocation.x,y:blocLocation.y,z:blocLocation.z+1}) as Block;
        }
        if (faceBlock === undefined) {
            return;
        }

        const bucket = new ItemStack("kurokumaft:copper_bucket", 1);
        const equippable = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        equippable.setEquipment(EquipmentSlot.Mainhand, bucket);

        faceBlock.setPermutation(BlockPermutation.resolve(MinecraftBlockTypes.Lava, {liquid_depth:0}));
    }
}
