import { Block, BlockVolume, Entity, EquipmentSlot, ItemComponentUseOnEvent, ItemStack, world } from "@minecraft/server";
import { itemDurabilityMagicDamageFixed } from "../../common/MagicItemDurabilityDamage";
import { MinecraftBlockTypes } from "@minecraft/vanilla-data";

const polishedStone = [
    {polished:"minecraft:polished_andesite",coarse:"minecraft:andesite"},
    {polished:"minecraft:polished_andesite_double_slab",coarse:"minecraft:andesite_double_slab"},
    {polished:"minecraft:polished_andesite_slab",coarse:"minecraft:andesite_slab"},
    {polished:"minecraft:polished_andesite_stairs",coarse:"minecraft:andesite_stairs"},
    {polished:"minecraft:polished_basalt",coarse:"minecraft:basalt"},
    {polished:"minecraft:polished_blackstone",coarse:"minecraft:blackstone"},
    {polished:"minecraft:polished_blackstone_brick_double_slab",coarse:"minecraft:blackstone_brick_double_slab"},
    {polished:"minecraft:polished_blackstone_brick_slab",coarse:"minecraft:blackstone_brick_slab"},
    {polished:"minecraft:polished_blackstone_brick_stairs",coarse:"minecraft:blackstone_brick_stairs"},
    {polished:"minecraft:polished_blackstone_brick_wall",coarse:"minecraft:blackstone_brick_wall"},
    {polished:"minecraft:polished_blackstone_bricks",coarse:"minecraft:blackstone_bricks"},
    {polished:"minecraft:polished_blackstone_button",coarse:"minecraft:blackstone_button"},
    {polished:"minecraft:polished_blackstone_double_slab",coarse:"minecraft:blackstone_double_slab"},
    {polished:"minecraft:polished_blackstone_pressure_plate",coarse:"minecraft:blackstone_pressure_plate"},
    {polished:"minecraft:polished_blackstone_slab",coarse:"minecraft:blackstone_slab"},
    {polished:"minecraft:polished_blackstone_stairs",coarse:"minecraft:blackstone_stairs"},
    {polished:"minecraft:polished_blackstone_wall",coarse:"minecraft:blackstone_wall"},
    {polished:"minecraft:polished_deepslate",coarse:"minecraft:deepslate"},
    {polished:"minecraft:polished_deepslate_double_slab",coarse:"minecraft:deepslate_double_slab"},
    {polished:"minecraft:polished_deepslate_slab",coarse:"minecraft:deepslate_slab"},
    {polished:"minecraft:polished_deepslate_stairs",coarse:"minecraft:deepslate_stairs"},
    {polished:"minecraft:polished_deepslate_wall",coarse:"minecraft:deepslate_wall"},
    {polished:"minecraft:polished_diorite",coarse:"minecraft:diorite"},
    {polished:"minecraft:polished_diorite_double_slab",coarse:"minecraft:diorite_double_slab"},
    {polished:"minecraft:polished_diorite_slab",coarse:"minecraft:diorite_slab"},
    {polished:"minecraft:polished_diorite_stairs",coarse:"minecraft:diorite_stairs"},
    {polished:"minecraft:polished_granite",coarse:"minecraft:granite"},
    {polished:"minecraft:polished_granite_double_slab",coarse:"minecraft:granite_double_slab"},
    {polished:"minecraft:polished_granite_slab",coarse:"minecraft:granite_slab"},
    {polished:"minecraft:polished_granite_stairs",coarse:"minecraft:granite_stairs"},
    {polished:"minecraft:polished_tuff",coarse:"minecraft:tuff"},
    {polished:"minecraft:polished_tuff_double_slab",coarse:"minecraft:tuff_double_slab"},
    {polished:"minecraft:polished_tuff_slab",coarse:"minecraft:tuff_slab"},
    {polished:"minecraft:polished_tuff_stairs",coarse:"minecraft:tuff_stairs"},
    {polished:"minecraft:polished_tuff_wall",coarse:"minecraft:tuff_wall"}
]

const chiseledStone = [
    {chiseled:"minecraft:chiseled_tuff",carved:"minecraft:tuff"},
    {chiseled:"minecraft:chiseled_tuff_bricks",carved:"minecraft:tuff_bricks"},
    {chiseled:"minecraft:chiseled_polished_blackstone",carved:"minecraft:polished_blackstone"},
    {chiseled:"minecraft:chiseled_nether_bricks",carved:"minecraft:nether_brick"},
    {chiseled:"minecraft:chiseled_purpur_block",carved:"minecraft:purpur_block"},
    {chiseled:"minecraft:infested_chiseled_stone_bricks",carved:"minecraft:infested_stone_bricks"},
    {chiseled:"minecraft:chiseled_quartz_block",carved:"minecraft:quartz_block"},
    {chiseled:"minecraft:chiseled_red_sandstone",carved:"minecraft:red_sandstone"},
    {chiseled:"minecraft:chiseled_sandstone",carved:"minecraft:sandstone"},
    {chiseled:"minecraft:chiseled_stone_bricks",carved:"minecraft:stone_bricks"},
    {chiseled:"minecraft:chiseled_resin_bricks",carved:"minecraft:resin_bricks"},
    {chiseled:"minecraft:chiseled_deepslate",carved:"minecraft:deepslate"},
    {chiseled:"minecraft:chiseled_copper",carved:"minecraft:copper"},
    {chiseled:"minecraft:exposed_chiseled_copper",carved:"minecraft:exposed_copper"},
    {chiseled:"minecraft:oxidized_chiseled_copper",carved:"minecraft:oxidized_copper"},
    {chiseled:"minecraft:waxed_chiseled_copper",carved:"minecraft:waxed_copper"},
    {chiseled:"minecraft:waxed_exposed_chiseled_copper",carved:"minecraft:waxed_exposed_copper"},
    {chiseled:"minecraft:waxed_oxidized_chiseled_copper",carved:"minecraft:waxed_oxidized_copper"},
    {chiseled:"minecraft:waxed_weathered_chiseled_copper",carved:"minecraft:waxed_weathered_copper"},
    {chiseled:"minecraft:weathered_chiseled_copper",carved:"minecraft:weathered_copper"}
]

/**
 * ブレイズマジックピッケル
 */
export async function polishBlock(event:ItemComponentUseOnEvent) {
    try {

        const entity = event.source as Entity;
        const itemStack = event.itemStack as ItemStack;
        const block = event.block as Block;

        const blockVol = new BlockVolume(
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
        const blockIt = blockVol.getBlockLocationIterator();
        let nextValue = blockIt.next();
        while (!nextValue.done) {
            const value = nextValue.value;
            if (value.y >= -64) {
                const breakBlock = block.dimension.getBlock(value);
                if (breakBlock != undefined && breakBlock.typeId != MinecraftBlockTypes.Air) {
                    if (polishedStone.some(obj => obj.coarse == breakBlock.typeId)) {
                        const polisBlock = polishedStone.find(obj => obj.coarse == breakBlock.typeId);
                        if (polisBlock != undefined) {
                            breakBlock.dimension.setBlockType(breakBlock.location, polisBlock.polished);
                        }
                    } else if (chiseledStone.some(obj => obj.carved == breakBlock.typeId)) {
                        const chiseledBlock = chiseledStone.find(obj => obj.carved == breakBlock.typeId);
                        if (chiseledBlock != undefined) {
                            breakBlock.dimension.setBlockType(breakBlock.location, chiseledBlock.chiseled);
                        }
                    }
                }
            }
            nextValue = blockIt.next();
        }
        itemDurabilityMagicDamageFixed(entity, itemStack, EquipmentSlot.Mainhand, 5);
        block.dimension.spawnParticle("kurokumaft:mowing_particle", {x:block.location.x+0.5,y:block.location.y,z:block.location.z+0.5});
    } catch(error) {
    }
}
