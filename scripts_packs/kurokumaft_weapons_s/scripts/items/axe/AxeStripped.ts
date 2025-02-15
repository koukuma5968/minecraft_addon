import { ItemCustomComponent, ItemStack, Player, ItemComponentUseOnEvent, Block, BlockPermutation, EquipmentSlot } from "@minecraft/server";
import { itemDurabilityDamage } from "../../common/WeaponsItemDurabilityDamage";
import { WeaponLogBlocks, WeaponOtherLogBlocks, WeaponOtherStrippedLogBlocks, WeaponOtherStrippedWoodBlocks, WeaponOtherWoodBlocks, WeaponStrippedLogBlocks, WeaponStrippedWoodBlocks, WeaponWoodBlocks } from "../../common/WeaponsConstants";

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

    if (WeaponLogBlocks.find(type => type == block.typeId) != undefined 
    || WeaponWoodBlocks.find(type => type == block.typeId) != undefined
    || WeaponOtherLogBlocks.find(type => type == block.typeId) != undefined
    || WeaponOtherWoodBlocks.find(type => type == block.typeId) != undefined) {

        let log = WeaponStrippedLogBlocks.find(type => {
            let str = "minecraft:stripped_" + block.typeId.substring("minecraft:".length);
            return type == str;
        });
        if (log) {
            block.setPermutation(BlockPermutation.resolve(log));
            return;
        }

        let otlog = WeaponOtherStrippedLogBlocks.find(type => {
            let str = "minecraft:stripped_" + block.typeId.substring("minecraft:".length);
            return type == str;
        });
        if (otlog) {
            block.setPermutation(BlockPermutation.resolve(otlog));
            return;
        }

        let wood = WeaponStrippedWoodBlocks.find(type => {
            let str = "minecraft:stripped_" + block.typeId.substring("minecraft:".length);
            return type == str;
        });
        if (wood) {
            block.setPermutation(BlockPermutation.resolve(wood));
            return;
        }

        let otwood = WeaponOtherStrippedWoodBlocks.find(type => {
            let str = "minecraft:stripped_" + block.typeId.substring("minecraft:".length);
            return type == str;
        });
        if (otwood) {
            block.setPermutation(BlockPermutation.resolve(otwood));
            return;
        }

    }
}
