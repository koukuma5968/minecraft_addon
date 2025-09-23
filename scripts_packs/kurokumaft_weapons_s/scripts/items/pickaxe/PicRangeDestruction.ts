import { ItemCustomComponent, ItemStack, Block, EquipmentSlot, ItemComponentMineBlockEvent, BlockVolume, world, BlockPermutation, Vector3, Dimension, system } from "@minecraft/server";
import { itemDurabilityDamage } from "../../common/WeaponsItemDurabilityDamage";
import { MinecraftBlockTypes } from "@minecraft/vanilla-data";

interface BrakeBlockList {
    id: string;
    location: Vector3;
}

const oreBlocks = [
    {ore:"minecraft:quartz_ore",raw:"minecraft:quartz"},
    {ore:"minecraft:coal_ore",raw:"minecraft:coal"},
    {ore:"minecraft:diamond_ore",raw:"minecraft:diamond"},
    {ore:"minecraft:emerald_ore",raw:"minecraft:emerald"},
    {ore:"minecraft:gold_ore",raw:"minecraft:raw_gold"},
    {ore:"minecraft:iron_ore",raw:"minecraft:raw_iron"},
    {ore:"minecraft:copper_ore",raw:"minecraft:raw_copper"},
    {ore:"minecraft:lapis_ore",raw:"minecraft:lapis"},
    {ore:"minecraft:redstone_ore",raw:"minecraft:redstone"},
    {ore:"minecraft:oreRuby",raw:"minecraft:ruby"},
    {ore:"minecraft:nether_gold_ore",raw:"minecraft:raw_gold"},
    {ore:"minecraft:deepslate_gold_ore",raw:"minecraft:raw_gold"},
    {ore:"minecraft:deepslate_lapis_ore",raw:"minecraft:lapis"},
    {ore:"minecraft:deepslate_iron_ore",raw:"minecraft:raw_iron"},
    {ore:"minecraft:deepslate_redstone_ore",raw:"minecraft:redstone"},
    {ore:"minecraft:deepslate_diamond_ore",raw:"minecraft:diamond"},
    {ore:"minecraft:deepslate_coal_ore",raw:"minecraft:coal"},
    {ore:"minecraft:deepslate_emerald_ore",raw:"minecraft:emerald"},
    {ore:"minecraft:deepslate_copper_ore",raw:"minecraft:raw_copper"},
    {ore:"minecraft:ancient_debris",raw:"minecraft:netherite_scrap"},
    {ore:"kurokumaft:chromium_ore",raw:"kurokumaft:chromium_nugget"},
    {ore:"kurokumaft:deepslate_chromium_ore",raw:"kurokumaft:chromium_nugget"},
    {ore:"kurokumaft:orichalcum_ore",raw:"kurokumaft:orichalcum"},
    {ore:"kurokumaft:deepslate_orichalcum_ore",raw:"kurokumaft:orichalcum"},
]

/**
 * ピッケル範囲破壊
 */
export class PicRangeDestruction implements ItemCustomComponent {

    onMineBlock(event: ItemComponentMineBlockEvent) {
        const block = event.block;
        const mineBlock = event.minedBlockPermutation;
        const entity = event.source;
        const itemStack = event.itemStack;
        if (itemStack !== undefined) {
            itemDurabilityDamage(entity, itemStack, EquipmentSlot.Mainhand);
        }
        if (mineBlock.hasTag("minecraft:is_pickaxe_item_destructible")) {
            const brakeBlockList = destructionBlocks(block.location, block.dimension);
            processListWithDelay(block.dimension, brakeBlockList);
        }
        
    }

}

async function processListWithDelay(dimension: Dimension, list: BrakeBlockList[]) {
    try {
        for (const item of list) {
            dimension.spawnItem(new ItemStack(item.id), item.location);
            dimension.setBlockType(item.location, MinecraftBlockTypes.Air);
            // 待機
            await system.waitTicks(1);
        }
    } catch (error:any) {
//        console.error(error);
    }
}

function destructionBlocks(location: Vector3, dimension: Dimension, brakeBlockList: BrakeBlockList[] = []): any[] {
    try {
        const blockVol = new BlockVolume(
            {
                x:location.x-5,
                y:location.y-5,
                z:location.z-5
            },
            {
                x:location.x+5,
                y:location.y+5,
                z:location.z+5
            }
        );
        const blockIt = blockVol.getBlockLocationIterator();
        let nextValue = blockIt.next();
        do {
            const value = nextValue.value;
            if (value.y >= -64) {
                const breakBlock = dimension.getBlock(value);
                if (breakBlock !== undefined) {
                    if (breakBlock.hasTag("minecraft:is_pickaxe_item_destructible")) {
                        if (brakeBlockList.find(blocks => (blocks.location.x === breakBlock.location.x && blocks.location.y === breakBlock.location.y && blocks.location.z === breakBlock.location.z)) === undefined) {
                            const ore = oreBlocks.find(block => block.ore === breakBlock.typeId);
                            if (ore !== undefined) {
                                brakeBlockList.push({id:ore.raw, location: breakBlock.location});
                            } else {
                                brakeBlockList.push({id:breakBlock.typeId, location: breakBlock.location});
                            }
                        }
                    }
                }
            }
            nextValue = blockIt.next();
        } while (!nextValue.done);

    } catch (error:any) {
//        console.error(error);
    }
    return brakeBlockList;

}
