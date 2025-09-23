import { ItemCustomComponent, ItemStack, Block, EquipmentSlot, ItemComponentMineBlockEvent, BlockVolume, world, BlockPermutation, Vector3, Dimension, system } from "@minecraft/server";
import { itemDurabilityDamage } from "../../common/WeaponsItemDurabilityDamage";
import { MinecraftBlockTypes } from "@minecraft/vanilla-data";

interface BrakeBlockList {
    id: string;
    location: Vector3;
}

/**
 * ジャベル直下彫り
 */
export class StraightDownHole implements ItemCustomComponent {

    onMineBlock(event: ItemComponentMineBlockEvent) {
        const block = event.block;
        const mineBlock = event.minedBlockPermutation;
        const entity = event.source;
        const itemStack = event.itemStack;
        if (itemStack !== undefined) {
            itemDurabilityDamage(entity, itemStack, EquipmentSlot.Mainhand);
        }
        if (mineBlock.hasTag("minecraft:is_shovel_item_destructible")) {
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
        console.error(error);
    }
}

function destructionBlocks(location: Vector3, dimension: Dimension, brakeBlockList: BrakeBlockList[] = []): any[] {
    try {
        const blockVol = new BlockVolume(
            {
                x:location.x,
                y:location.y-1,
                z:location.z
            },
            {
                x:location.x,
                y:location.y-50,
                z:location.z
            }
        );
        const blockIt = blockVol.getBlockLocationIterator();
        let nextValue = blockIt.next();
        do {
            const value = nextValue.value;
            if (value.y >= -64) {
                const breakBlock = dimension.getBlock(value);
                if (breakBlock !== undefined) {
                    if (breakBlock.hasTag("minecraft:is_shovel_item_destructible")) {
                        if (brakeBlockList.find(blocks => (blocks.location.x === breakBlock.location.x && blocks.location.y === breakBlock.location.y && blocks.location.z === breakBlock.location.z)) === undefined) {
                            brakeBlockList.push({id:breakBlock.typeId, location: breakBlock.location});
                        }
                    }
                }
            }
            nextValue = blockIt.next();
        } while (!nextValue.done);

    } catch (error:any) {
        console.error(error);
    }
    return brakeBlockList;

}
