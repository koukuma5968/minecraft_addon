import { Block, BlockVolume, Entity, EquipmentSlot, ItemComponentUseOnEvent, ItemStack } from "@minecraft/server";
import { MinecraftBlockTypes } from "@minecraft/vanilla-data";
import { itemDurabilityDamageFixed } from "../../common/MagicItemDurabilityDamage";

/**
 * ドレイズマジックピッケル
 */
export async function wetRangeBlock(event:ItemComponentUseOnEvent) {
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
                    if (breakBlock.typeId == MinecraftBlockTypes.Sandstone) {
                        breakBlock.dimension.setBlockType(breakBlock.location, MinecraftBlockTypes.Sand);
                    } else if (breakBlock.typeId == MinecraftBlockTypes.RedSandstone) {
                        breakBlock.dimension.setBlockType(breakBlock.location, MinecraftBlockTypes.RedSand);
                    } else if (breakBlock.typeId == MinecraftBlockTypes.CoarseDirt) {
                        breakBlock.dimension.setBlockType(breakBlock.location, MinecraftBlockTypes.Gravel);
                    } else if (breakBlock.typeId.indexOf("concrete_powder") != -1) {
                        breakBlock.dimension.setBlockType(breakBlock.location, breakBlock.typeId.split("_powder").join(""));
                    }
                }
            }
            nextValue = blockIt.next();
        }
        itemDurabilityDamageFixed(entity, itemStack, EquipmentSlot.Mainhand, 5);
        block.dimension.spawnParticle("kurokumaft:water_sword_slash", {x:block.location.x+0.5,y:block.location.y,z:block.location.z+0.5});
    } catch(error) {
    }
}
