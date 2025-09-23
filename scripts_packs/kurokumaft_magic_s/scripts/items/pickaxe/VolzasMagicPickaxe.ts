import { Block, BlockVolume, Entity, EquipmentSlot, ItemComponentUseOnEvent, ItemStack } from "@minecraft/server";
import { MinecraftBlockTypes } from "@minecraft/vanilla-data";
import { getLookPoints } from "../../common/MagicCommonUtil";
import { itemDurabilityMagicDamageFixed } from "../../common/MagicItemDurabilityDamage";

/**
 * ボルザスマジックピッケル
 */
export async function breakLineBlock(event:ItemComponentUseOnEvent) {
    try {
        const entity = event.source as Entity;
        const itemStack = event.itemStack as ItemStack;
        const block = event.block as Block;

        const point = getLookPoints(entity.getRotation(), entity.location, 10);
        const blockVol = new BlockVolume(
            block.location,
            point
        );
        const blockIt = blockVol.getBlockLocationIterator();
        let nextValue = blockIt.next();
        while (!nextValue.done) {
            const value = nextValue.value;
            const breakBlock = block.dimension.getBlock(value);
            if (breakBlock != undefined) {
                if (breakBlock.hasTag("minecraft:is_pickaxe_item_destructible")) {
                    breakBlock.dimension.spawnItem(new ItemStack(breakBlock.typeId, 1), breakBlock.location);
                }
            }
            nextValue = blockIt.next();
        }
        const ListBlockVolume = block.dimension.fillBlocks(blockVol, MinecraftBlockTypes.Air, {
            blockFilter: {
                includeTags: [
                    "minecraft:is_pickaxe_item_destructible"
                ]
            },
            ignoreChunkBoundErrors: true
        });
        itemDurabilityMagicDamageFixed(entity, itemStack, EquipmentSlot.Mainhand, 5);
        block.dimension.spawnParticle("kurokumaft:thunder_sword_particle", {x:block.location.x+0.5,y:block.location.y,z:block.location.z+0.5});
    } catch(error) {
    }
}
