import { Block, BlockVolume, Direction, Entity, EquipmentSlot, ItemComponentUseOnEvent, ItemStack, world } from "@minecraft/server";
import { MinecraftBlockTypes } from "@minecraft/vanilla-data";
import { itemDurabilityDamage } from "../../common/MagicItemDurabilityDamage";

const polishedStone = [
    "basalt",
    "blackstone_bricks",
    "blackstone_brick_stairs",
    "blackstone_brick_wall",
    "blackstone_brick_slab",
    "blackstone",
    "blackstone_stairs",
    "blackstone_slab",
    "blackstone_pressure_plate",
    "blackstone_button",
    "blackstone_wall",
    "tuff",
    "tuff_slab",
    "tuff_stairs",
    "tuff_wall",
    "granite_stairs",
    "diorite_stairs",
    "andesite_stairs",
    "deepslate",
    "deepslate_slab",
    "deepslate_stairs",
    "deepslate_wall",
    "deepslate_double_slab"
]

/**
 * ドレイズマジックピッケル
 */
export async function polishBlock(event:ItemComponentUseOnEvent) {
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
                    world.sendMessage(breakBlock.typeId);
                    if (breakBlock.typeId.startsWith("minecraft:weathered_")) {
                        breakBlock.dimension.setBlockType(breakBlock.location, breakBlock.typeId.split("weathered_").join(""));
                    } else if (breakBlock.typeId.startsWith("minecraft:oxidized_")) {
                        breakBlock.dimension.setBlockType(breakBlock.location, breakBlock.typeId.split("oxidized_").join(""));
                    } else if (polishedStone.indexOf(breakBlock.typeId) != -1) {
                        world.sendMessage("polished_" + polishedStone.filter(stone => stone == breakBlock.typeId)[0]);
                        breakBlock.dimension.setBlockType(breakBlock.location, "polished_" + polishedStone.filter(stone => stone == breakBlock.typeId)[0]);
                    }
                }
            }
            nextValue = blockIt.next();
        }
        itemDurabilityDamage(entity, itemStack, EquipmentSlot.Mainhand);
        block.dimension.spawnParticle("kurokumaft:mowing_particle", {x:block.location.x+0.5,y:block.location.y,z:block.location.z+0.5});
    } catch(error) {
    }
}
