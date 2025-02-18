import { ItemCustomComponent, ItemStack, Player, ItemComponentUseOnEvent, Block, BlockPermutation, EquipmentSlot } from "@minecraft/server";
import { MinecraftBlockTypes } from "@minecraft/vanilla-data";
import { itemDurabilityDamage } from "../../common/WeaponsItemDurabilityDamage";
import { WeaponFarmingBlocks } from "../../common/WeaponsConstants";

/**
 * くわ
 */
export class HoeFarming implements ItemCustomComponent {

    onUseOn(event:ItemComponentUseOnEvent) {
        let source = event.source as Player;
        let itemStack = event.itemStack as ItemStack;
        let block = event.block as Block;
        farming(block);
        itemDurabilityDamage(source, itemStack, EquipmentSlot.Mainhand);
    }
}

async function farming(block:Block) {

    if (WeaponFarmingBlocks.find(type => type == block.typeId) != undefined) {
        block.setPermutation(BlockPermutation.resolve(MinecraftBlockTypes.Farmland));
    }
}
