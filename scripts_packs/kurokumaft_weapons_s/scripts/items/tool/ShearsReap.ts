import {  ItemStack, Player, EquipmentSlot, Block, ItemCustomComponent, CustomComponentParameters, ItemComponentUseOnEvent, BlockPermutation, ItemComponentMineBlockEvent, Vector3, Dimension, system, BlockStates, BlockStateType } from "@minecraft/server";
import { itemDurabilityDamage } from "../../common/WeaponsItemDurabilityDamage";
import { MinecraftBlockTypes } from "@minecraft/vanilla-data";

/**
 * 刈り取り
 */
export class ShearsReap implements ItemCustomComponent {

    onUseOn (event: ItemComponentUseOnEvent, arg: CustomComponentParameters) {
        const source = event.source as Player;
        const block = event.block;
        const itemStack = event.itemStack;
        if (block.typeId === MinecraftBlockTypes.Pumpkin) {
            itemDurabilityDamage(source, itemStack, EquipmentSlot.Mainhand);
            block.dimension.setBlockType(block.location, MinecraftBlockTypes.CarvedPumpkin);
            const item = new ItemStack("minecraft:pumpkin_seeds", 1);
            block.dimension.spawnItem(item, {x:block.location.x, y:block.location.y+1, z:block.location.z});
        } else if (block.permutation.getState("honey_level") === 5) {
            itemDurabilityDamage(source, itemStack, EquipmentSlot.Mainhand);
            block.setPermutation(BlockPermutation.resolve(block.typeId,{honey_level:0}));
            const item = new ItemStack("minecraft:honeycomb", 1);
            block.dimension.spawnItem(item, {x:block.location.x, y:block.location.y+1, z:block.location.z});
        }
    }

    onMineBlock (event: ItemComponentMineBlockEvent, arg: CustomComponentParameters) {
        const source = event.source as Player;
        const itemStack = event.itemStack;
        if (itemStack !== undefined) {
            itemDurabilityDamage(source, itemStack, EquipmentSlot.Mainhand);
        }
    };

    public async breakReap(source: Player, itemStack: ItemStack, block: Block) {
        system.waitTicks(1).then(() => {
            try {
                if (itemStack !== undefined) {
                    itemDurabilityDamage(source, itemStack, EquipmentSlot.Mainhand);
                }
                const item = block.getItemStack(1, true);
                if (item !== undefined) {
                    block.dimension.spawnItem(item, block.location);
                }
                block.dimension.setBlockType(block.location, MinecraftBlockTypes.Air);
            } catch (error:any) {
            }
        });
    }
}
