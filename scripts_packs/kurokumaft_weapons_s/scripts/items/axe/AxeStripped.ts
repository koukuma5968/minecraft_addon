import { ItemCustomComponent, ItemStack, Player, ItemComponentUseOnEvent, Block, BlockPermutation, EquipmentSlot, world } from "@minecraft/server";
import { itemDurabilityDamage } from "../../common/WeaponsItemDurabilityDamage";
import { WeaponLogBlocks, WeaponOtherLogBlocks, WeaponOtherStrippedLogBlocks, WeaponOtherStrippedWoodBlocks, WeaponOtherWoodBlocks, WeaponStrippedLogBlocks, WeaponStrippedWoodBlocks, WeaponWoodBlocks } from "../../common/WeaponsConstants";

/**
 * 斧
 */
export class AxeStripped implements ItemCustomComponent {

    onUseOn(event:ItemComponentUseOnEvent) {
        const source = event.source as Player;
        const itemStack = event.itemStack as ItemStack;
        const block = event.block as Block;
        stripped(source, block);
        itemDurabilityDamage(source, itemStack, EquipmentSlot.Mainhand);
    }
}

async function stripped(source:Player, block:Block) {

    if (WeaponLogBlocks.find(type => type === block.typeId) != undefined 
    || WeaponWoodBlocks.find(type => type === block.typeId) != undefined
    || WeaponOtherLogBlocks.find(type => type === block.typeId) != undefined
    || WeaponOtherWoodBlocks.find(type => type === block.typeId) != undefined) {

        const log = WeaponStrippedLogBlocks.find(type => {
            const str = "minecraft:stripped_" + block.typeId.substring("minecraft:".length);
            return type === str;
        });
        if (log) {
            block.setPermutation(BlockPermutation.resolve(log));
            source.playSound("use.wood", {
                pitch:2,
                volume:3
            });
            return;
        }

        const otlog = WeaponOtherStrippedLogBlocks.find(type => {
            const str = "minecraft:stripped_" + block.typeId.substring("minecraft:".length);
            return type === str;
        });
        if (otlog) {
            block.setPermutation(BlockPermutation.resolve(otlog));
            source.playSound("use.wood", {
                pitch:2,
                volume:3
            });
            return;
        }

        const wood = WeaponStrippedWoodBlocks.find(type => {
            const str = "minecraft:stripped_" + block.typeId.substring("minecraft:".length);
            return type === str;
        });
        if (wood) {
            block.setPermutation(BlockPermutation.resolve(wood));
            source.playSound("use.wood", {
                pitch:2,
                volume:3
            });
            return;
        }

        const otwood = WeaponOtherStrippedWoodBlocks.find(type => {
            const str = "minecraft:stripped_" + block.typeId.substring("minecraft:".length);
            return type === str;
        });
        if (otwood) {
            block.setPermutation(BlockPermutation.resolve(otwood));
            source.playSound("use.wood", {
                pitch:2,
                volume:3
            });
            return;
        }

    }
}
