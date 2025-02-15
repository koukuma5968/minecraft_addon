import { Block, BlockVolume, Entity, EquipmentSlot, ItemComponentUseOnEvent, ItemStack } from "@minecraft/server";
import { MinecraftBlockTypes } from "@minecraft/vanilla-data";
import { itemDurabilityDamageFixed } from "../../common/MagicItemDurabilityDamage";

/**
 * ブリーズマジックピッケル
 */
export async function freezeRangeBlock(event:ItemComponentUseOnEvent) {
    try {

        let entity = event.source as Entity;
        let itemStack = event.itemStack as ItemStack;
        let block = event.block as Block;

        let blockVol = new BlockVolume(
            {
                x:block.location.x-4,
                y:block.location.y-4,
                z:block.location.z-4
            },
            {
                x:block.location.x+4,
                y:block.location.y+4,
                z:block.location.z+4
            }
        );
        let blockIt = blockVol.getBlockLocationIterator();
        let nextValue = blockIt.next();
        while (!nextValue.done) {
            let value = nextValue.value;
            if (value.y >= -64) {
                let breakBlock = block.dimension.getBlock(value);
                if (breakBlock != undefined) {
                    if (breakBlock.typeId == MinecraftBlockTypes.Water || breakBlock.typeId == MinecraftBlockTypes.FlowingWater) {
                        breakBlock.dimension.setBlockType(breakBlock.location, MinecraftBlockTypes.PackedIce);
                    } else if (breakBlock.typeId == MinecraftBlockTypes.Lava || breakBlock.typeId == MinecraftBlockTypes.FlowingLava) {
                        breakBlock.dimension.setBlockType(breakBlock.location, MinecraftBlockTypes.Magma);
                    } else if (breakBlock.typeId == MinecraftBlockTypes.Sand) {
                        breakBlock.dimension.setBlockType(breakBlock.location, MinecraftBlockTypes.Sandstone);
                    } else if (breakBlock.typeId == MinecraftBlockTypes.RedSand) {
                        breakBlock.dimension.setBlockType(breakBlock.location, MinecraftBlockTypes.RedSandstone);
                    } else if (breakBlock.typeId == MinecraftBlockTypes.Gravel) {
                        breakBlock.dimension.setBlockType(breakBlock.location, MinecraftBlockTypes.CoarseDirt);
                    } else if (breakBlock.typeId == MinecraftBlockTypes.Mud) {
                        breakBlock.dimension.setBlockType(breakBlock.location, MinecraftBlockTypes.Clay);
                    }
                }
            }
            nextValue = blockIt.next();
        }
        itemDurabilityDamageFixed(entity, itemStack, EquipmentSlot.Mainhand, 5);
        block.dimension.spawnParticle("kurokumaft:ice_arrow_particle", {x:block.location.x+0.5,y:block.location.y,z:block.location.z+0.5});
    } catch(error) {
    }
}
