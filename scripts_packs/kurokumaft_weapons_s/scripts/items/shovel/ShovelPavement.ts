import { ItemCustomComponent, ItemStack, Player, ItemComponentUseOnEvent, Block, BlockPermutation, EquipmentSlot } from "@minecraft/server";
import { MinecraftBlockTypes } from "@minecraft/vanilla-data";
import { itemDurabilityDamage } from "../../common/WeaponsItemDurabilityDamage";
import { WeaponPavementBlocks } from "../../common/WeaponsConstants";

/**
 * シャベル
 */
export class ShovelPavement implements ItemCustomComponent {

    onUseOn(event:ItemComponentUseOnEvent) {
        const source = event.source as Player;
        const itemStack = event.itemStack as ItemStack;
        const block = event.block as Block;
        pavement(block);
        itemDurabilityDamage(source, itemStack, EquipmentSlot.Mainhand);
    }
}

async function pavement(block:Block) {

    if (WeaponPavementBlocks.find(type => type === block.typeId) !== undefined) {
        block.setPermutation(BlockPermutation.resolve(MinecraftBlockTypes.GrassPath));
    }
}
