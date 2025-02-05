import { ItemCustomComponent, ItemStack, Player, ItemComponentUseOnEvent, Block, BlockPermutation, EquipmentSlot } from "@minecraft/server";
import { itemDurabilityDamage } from "../../common/ItemDurabilityDamage";
import { LogBlocks, OtherLogBlocks, OtherStrippedLogBlocks, OtherStrippedWoodBlocks, OtherWoodBlocks, StrippedLogBlocks, StrippedWoodBlocks, WoodBlocks } from "../../common/Constants";

/**
 * 斧
 */
export class AxeStripped implements ItemCustomComponent {

    onUseOn(event:ItemComponentUseOnEvent) {
        let source = event.source as Player;
        let itemStack = event.itemStack as ItemStack;
        let block = event.block as Block;
        stripped(block);
        itemDurabilityDamage(source, itemStack, EquipmentSlot.Mainhand);
    }
}

async function stripped(block:Block) {

    if (LogBlocks.find(type => type == block.typeId) != undefined 
    || WoodBlocks.find(type => type == block.typeId) != undefined
    || OtherLogBlocks.find(type => type == block.typeId) != undefined
    || OtherWoodBlocks.find(type => type == block.typeId) != undefined) {

        let log = StrippedLogBlocks.find(type => {
            let str = "minecraft:stripped_" + block.typeId.substring("minecraft:".length);
            return type == str;
        });
        if (log) {
            block.setPermutation(BlockPermutation.resolve(log));
            return;
        }

        let otlog = OtherStrippedLogBlocks.find(type => {
            let str = "minecraft:stripped_" + block.typeId.substring("minecraft:".length);
            return type == str;
        });
        if (otlog) {
            block.setPermutation(BlockPermutation.resolve(otlog));
            return;
        }

        let wood = StrippedWoodBlocks.find(type => {
            let str = "minecraft:stripped_" + block.typeId.substring("minecraft:".length);
            return type == str;
        });
        if (wood) {
            block.setPermutation(BlockPermutation.resolve(wood));
            return;
        }

        let otwood = OtherStrippedWoodBlocks.find(type => {
            let str = "minecraft:stripped_" + block.typeId.substring("minecraft:".length);
            return type == str;
        });
        if (otwood) {
            block.setPermutation(BlockPermutation.resolve(otwood));
            return;
        }

    }
}
