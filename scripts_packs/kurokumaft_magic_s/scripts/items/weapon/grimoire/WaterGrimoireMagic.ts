import { ItemComponentUseOnEvent, Entity, BlockPermutation, ItemStack, Block, Direction, Player, ItemUseOnAfterEvent } from "@minecraft/server";
import { BlockLocationList, MagicCraftBlocks } from "../../../common/MagicCommonUtil";
import { decrimentGrimoireCount } from "../../../common/MagicItemDurabilityDamage";
import { MinecraftBlockTypes } from "@minecraft/vanilla-data";

/**
 * 魔導書（ウォーター）使用
 * @param {ItemComponentUseOnEvent} event
 */
export async function water(event:ItemComponentUseOnEvent) {

    const entity = event.source as Entity;
    const itemStack = event.itemStack as ItemStack;
    const block = event.block as Block;
    const blockFace = event.blockFace as Direction;

    let setFireF = false;

    if ((MagicCraftBlocks.indexOf(block.typeId) != -1)) {
        return;
    }
    BlockLocationList.forEach(obj => {
        if (obj.direction == blockFace) {
            const blockDim = block.dimension;
            const bx = block.location.x;
            const by = block.location.y;
            const bz = block.location.z;
            const vec = {"x":bx+obj.location.x,"y":by+obj.location.y,"z":bz+obj.location.z};

            const dimeBlock = blockDim.getBlock(vec) as Block;
            if(dimeBlock.isAir) {
                const setLocation = {x:(bx+obj.location.x),y:(by+obj.location.y),z:(bz+obj.location.z)};
                blockDim.setBlockPermutation(setLocation, BlockPermutation.resolve(MinecraftBlockTypes.FlowingWater, {liquid_depth:0}));
                setFireF = true;
            }
        }
    });

    if (setFireF) {
        decrimentGrimoireCount(entity as Player, itemStack);
    }

};

/**
 * 魔導書（ウォーター）大釜使用
 * @param {ItemUseOnAfterEvent} event
 */
export async function waterCauldron(event:ItemUseOnAfterEvent) {

    const entity = event.source as Entity;
    const itemStack = event.itemStack as ItemStack;
    const block = event.block as Block;

    const blockPer = block.permutation;
    const cauldron = blockPer.getState("cauldron_liquid");

    let setFireF = false;

    if (cauldron) {
        block.setPermutation(blockPer.withState("cauldron_liquid", "water"));
        block.setPermutation(blockPer.withState("fill_level", 6));
        setFireF = true;
    }

    if (setFireF) {
        decrimentGrimoireCount(entity as Player, itemStack);
    }

};
