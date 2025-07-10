import { ItemComponentUseOnEvent, Entity, BlockPermutation, ItemStack, Block, Direction, Vector3, Player, Dimension } from "@minecraft/server";
import { BlockLocationList, MagicCraftBlocks } from "../../../common/MagicCommonUtil";
import { decrimentGrimoireCount } from "../../../common/MagicItemDurabilityDamage";
import { MinecraftBlockTypes, MinecraftEntityTypes } from "@minecraft/vanilla-data";

/**
 * トーチライト
 * @param {ItemComponentUseOnEvent} event
 */
export async function torchlight(event:ItemComponentUseOnEvent) {

    const entity = event.source as Entity;
    const blockPerm = event.usedOnBlockPermutation as BlockPermutation;
    const itemStack = event.itemStack as ItemStack;
    const block = event.block as Block;
    const blockFace = event.blockFace as Direction;
    const faceLocation = event.faceLocation as Vector3;

    if ((block.typeId.indexOf("chest") == -1) && (block.typeId.indexOf("boat") == -1) && (MagicCraftBlocks.indexOf(block.typeId) == -1)) {
        decrimentGrimoireCount(entity as Player, itemStack);
    }
   
}

/**
 * 魔導書（イグナイテッド）使用
 * @param {ItemComponentUseOnEvent} event
 */
export async function ignited(event:ItemComponentUseOnEvent) {

    const entity = event.source as Entity;
    const blockPerm = event.usedOnBlockPermutation as BlockPermutation;
    const itemStack = event.itemStack as ItemStack;
    const block = event.block as Block;
    const blockFace = event.blockFace as Direction;
    const faceLocation = event.faceLocation as Vector3;

    const blockPer = block.permutation;
    const extinguished = blockPer.getState("extinguished");
    const lit = blockPer.getState("lit");

    let setFireF = false;

    if ((MagicCraftBlocks.indexOf(block.typeId) != -1)) {
        return;
    }
    if (extinguished) {
        block.setPermutation(blockPer.withState("extinguished", false));
        setFireF = true;
    } else if (lit != undefined && !lit) {
        block.setPermutation(blockPer.withState("lit", true));
        setFireF = true;
    } else if (block.typeId == "minecraft:tnt") {
        const blockDim = block.dimension as Dimension;
        blockDim.setBlockType(block.location, MinecraftBlockTypes.Air);
        const tnt = blockDim.spawnEntity(MinecraftEntityTypes.Tnt, block.location);
        setFireF = true;
    } else {
        BlockLocationList.forEach(obj => {
            if (obj.direction == blockFace) {
                const bx = block.location.x;
                const by = block.location.y;
                const bz = block.location.z;
                const vec = {"x":bx+obj.location.x,"y":by+obj.location.y,"z":bz+obj.location.z};

                const blockDim = block.dimension as Dimension;
                const dimeBlock = blockDim.getBlock(vec) as Block;
                if(dimeBlock.isAir) {
                    const setLocation = {x:(bx+obj.location.x),y:(by+obj.location.y),z:(bz+obj.location.z)};
                    blockDim.setBlockPermutation(setLocation, BlockPermutation.resolve(MinecraftBlockTypes.Fire, {age:0}));
                    setFireF = true;
                }
            }
        });
    }

    if (setFireF) {
        decrimentGrimoireCount(entity as Player, itemStack);
    }

};

/**
 * 魔導書（イグナイテッド）使用(tnt着火用)
 * @param {ItemComponentUseOnEvent} event
 */
export async function ignitedTnt(event:ItemComponentUseOnEvent) {

    const entity = event.source as Entity;
    const itemStack = event.itemStack as ItemStack;
    const block = event.block as Block;

    const bx = block.location.x;
    const by = block.location.y;
    const bz = block.location.z;

    if ((MagicCraftBlocks.indexOf(block.typeId) != -1)) {
        return;
    }

    if (block.typeId == "minecraft:tnt") {
        const location = {x:bx,y:by,z:bz};
        // print("tnt spawn");
        entity.dimension.setBlockType(location, MinecraftBlockTypes.Air);
        const tnt = entity.dimension.spawnEntity(MinecraftEntityTypes.Tnt, location) as Entity;
        tnt.triggerEvent("from_explosion");

        decrimentGrimoireCount(entity as Player, itemStack);
        
    }

};
