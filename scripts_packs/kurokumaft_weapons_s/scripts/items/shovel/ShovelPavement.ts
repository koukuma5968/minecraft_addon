import { ItemCustomComponent, ItemStack, Player, ItemComponentUseOnEvent, Block, BlockPermutation, EquipmentSlot } from "@minecraft/server";
import { MinecraftBlockTypes } from "@minecraft/vanilla-data";
import { ItemDurabilityDamage } from "../../common/ItemDurabilityDamage";
import { PavementBlocks } from "../../common/Constants";

/**
 * シャベル
 */
export class ShovelPavement implements ItemCustomComponent {

    onUseOn(event:ItemComponentUseOnEvent) {
        let source = event.source as Player;
        let itemStack = event.itemStack as ItemStack;
        let block = event.block as Block;
        pavement(block);
        ItemDurabilityDamage(source, itemStack, EquipmentSlot.Mainhand, undefined);
    }
}

async function pavement(block:Block) {

    if (PavementBlocks.find(type => type == block.typeId) != undefined) {
        block.setPermutation(BlockPermutation.resolve(MinecraftBlockTypes.GrassPath));
    }
}
