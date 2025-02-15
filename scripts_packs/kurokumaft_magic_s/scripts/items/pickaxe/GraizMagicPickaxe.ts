import { Block, BlockVolume, Entity, EquipmentSlot, ItemComponentUseOnEvent, ItemStack } from "@minecraft/server";
import { MinecraftBlockTypes } from "@minecraft/vanilla-data";
import { itemDurabilityDamageFixed } from "../../common/MagicItemDurabilityDamage";

/**
 * グライズマジックピッケル
 */
export async function breakRangeBlock(event:ItemComponentUseOnEvent) {
    try {
        let entity = event.source as Entity;
        let itemStack = event.itemStack as ItemStack;
        let block = event.block as Block;

        let blockVol = new BlockVolume(
            {
                x:block.location.x-2,
                y:block.location.y-2,
                z:block.location.z-2
            },
            {
                x:block.location.x+2,
                y:block.location.y+2,
                z:block.location.z+2
            }
        );
        let blockIt = blockVol.getBlockLocationIterator();
        let nextValue = blockIt.next();
        while (!nextValue.done) {
            let value = nextValue.value;
            let breakBlock = block.dimension.getBlock(value);
            if (breakBlock != undefined) {
                if (breakBlock.hasTag("minecraft:is_pickaxe_item_destructible")) {
                    breakBlock.dimension.spawnItem(new ItemStack(breakBlock.typeId, 1), breakBlock.location);
                }
            }
            nextValue = blockIt.next();
        }
        let ListBlockVolume = block.dimension.fillBlocks(blockVol, MinecraftBlockTypes.Air, {
            blockFilter: {
                includeTags: [
                    "minecraft:is_pickaxe_item_destructible"
                ]
            },
            ignoreChunkBoundErrors: true
        });
        itemDurabilityDamageFixed(entity, itemStack, EquipmentSlot.Mainhand, 5);
        block.dimension.spawnParticle("kurokumaft:stone_charge_burst", {x:block.location.x+0.5,y:block.location.y,z:block.location.z+0.5});
    } catch(error) {
    }
}
