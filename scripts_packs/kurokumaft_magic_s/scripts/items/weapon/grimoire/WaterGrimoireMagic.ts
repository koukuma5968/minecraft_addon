import { ItemComponentUseOnEvent, Entity, BlockPermutation, ItemStack, Block, Direction, Player, ItemUseOnAfterEvent } from "@minecraft/server";
import { BlockLocationList, MagicCraftBlocks } from "../../../common/MagicCommonUtil";
import { decrimentGrimoireCount } from "../../../common/MagicItemDurabilityDamage";
import { MinecraftBlockTypes } from "@minecraft/vanilla-data";

/**
 * 魔導書（ウォーター）使用
 * @param {ItemComponentUseOnEvent} event
 */
export async function water(event:ItemComponentUseOnEvent) {

    let entity = event.source as Entity;
    let itemStack = event.itemStack as ItemStack;
    let block = event.block as Block;
    let blockFace = event.blockFace as Direction;

    let setFireF = false;

    if ((MagicCraftBlocks.indexOf(block.typeId) != -1)) {
        return;
    }
    BlockLocationList.forEach(obj => {
        if (obj.direction == blockFace) {
            let blockDim = block.dimension;
            let bx = block.location.x;
            let by = block.location.y;
            let bz = block.location.z;
            let vec = {"x":bx+obj.location.x,"y":by+obj.location.y,"z":bz+obj.location.z};

            let dimeBlock = blockDim.getBlock(vec) as Block;
            if(dimeBlock.isAir) {
                let setLocation = {x:(bx+obj.location.x),y:(by+obj.location.y),z:(bz+obj.location.z)};
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

    let entity = event.source as Entity;
    let itemStack = event.itemStack as ItemStack;
    let block = event.block as Block;

    let blockPer = block.permutation;
    let cauldron = blockPer.getState("cauldron_liquid");

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
