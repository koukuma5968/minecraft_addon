import { Block, BlockVolume, Entity, EquipmentSlot, ItemComponentUseOnEvent, ItemStack } from "@minecraft/server";
import { MinecraftBlockTypes, MinecraftItemTypes } from "@minecraft/vanilla-data";
import { getRandomInRange } from "../../common/MagicCommonUtil";
import { itemDurabilityDamageFixed } from "../../common/MagicItemDurabilityDamage";

interface FiringOreBlockObject {
    block:string,
    item:string
}

const FiringOreBlocks = Object.freeze([
    {
        block: MinecraftBlockTypes.IronOre,
        item: MinecraftItemTypes.IronIngot
    },
    {
        block: MinecraftBlockTypes.CopperOre,
        item: MinecraftItemTypes.CopperIngot
    },
    {
        block: MinecraftBlockTypes.GoldOre,
        item: MinecraftItemTypes.GoldIngot
    },
    {
        block: MinecraftBlockTypes.DeepslateIronOre,
        item: MinecraftItemTypes.IronIngot
    },
    {
        block: MinecraftBlockTypes.DeepslateCopperOre,
        item: MinecraftItemTypes.CopperIngot
    },
    {
        block: MinecraftBlockTypes.DeepslateGoldOre,
        item: MinecraftItemTypes.GoldIngot
    },
    {
        block: MinecraftBlockTypes.Sand,
        item: MinecraftItemTypes.Glass
    }
]);

/**
 * ブレイズマジックピッケル
 */
export async function firingOreBlock(event:ItemComponentUseOnEvent) {
    try {

        let entity = event.source as Entity;
        let itemStack = event.itemStack as ItemStack;
        let block = event.block as Block;

        let oreBlock = FiringOreBlocks.find(obj => obj.block == block.typeId) as FiringOreBlockObject;
        if (oreBlock != undefined) {
            block.dimension.setBlockType(block.location, MinecraftBlockTypes.Air);
            block.dimension.spawnItem(new ItemStack(oreBlock.item, getRandomInRange(1,3)), {x:block.location.x,y:block.location.y+1,z:block.location.z});
            block.dimension.spawnParticle("kurokumaft:mobflame_firing", {x:block.location.x+0.5,y:block.location.y,z:block.location.z+0.5});
            itemDurabilityDamageFixed(entity, itemStack, EquipmentSlot.Mainhand, 5);
        }

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
                    if (breakBlock.typeId.indexOf("_terracotta") != -1 && breakBlock.typeId.indexOf("_glazed_") == -1) {
                        breakBlock.dimension.setBlockType(breakBlock.location, breakBlock.typeId.split("_").join("_glazed_"));
                        breakBlock.dimension.spawnParticle("kurokumaft:mobflame_firing", {x:breakBlock.location.x+0.5,y:breakBlock.location.y,z:breakBlock.location.z+0.5});
                        itemDurabilityDamageFixed(entity, itemStack, EquipmentSlot.Mainhand, 1);
                    }
                }
            }
            nextValue = blockIt.next();
        }

    } catch(error) {
    }
}
