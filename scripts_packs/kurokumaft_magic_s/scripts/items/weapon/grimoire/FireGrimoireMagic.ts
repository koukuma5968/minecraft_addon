import { ItemComponentUseOnEvent, Entity, BlockPermutation, ItemStack, Block, Direction, Vector3, system, EntityDamageCause, TicksPerSecond, Player, Dimension, GameMode, BlockTypes } from "@minecraft/server";
import { BlockLocationList, CraftBlocks } from "../../../common/commonUtil";
import { decrimentGrimoireCount } from "../../../common/ItemDurabilityDamage";
import { MinecraftBlockTypes, MinecraftEntityTypes } from "@minecraft/vanilla-data";

/**
 * トーチライト
 * @param {ItemComponentUseOnEvent} event
 */
export async function torchlight(event:ItemComponentUseOnEvent) {

    let entity = event.source as Entity;
    let blockPerm = event.usedOnBlockPermutation as BlockPermutation;
    let itemStack = event.itemStack as ItemStack;
    let block = event.block as Block;
    let blockFace = event.blockFace as Direction;
    let faceLocation = event.faceLocation as Vector3;

    if (entity instanceof Player && entity.getGameMode() != GameMode.creative) {
        if ((block.typeId.indexOf("chest") == -1) && (block.typeId.indexOf("boat") == -1) && (CraftBlocks.indexOf(block.typeId) == -1)) {
            decrimentGrimoireCount(entity as Player, itemStack);
       }
    }
   
}

/**
 * 魔導書（イグナイテッド）使用
 * @param {ItemComponentUseOnEvent} event
 */
export async function ignited(event:ItemComponentUseOnEvent) {

    let entity = event.source as Entity;
    let blockPerm = event.usedOnBlockPermutation as BlockPermutation;
    let itemStack = event.itemStack as ItemStack;
    let block = event.block as Block;
    let blockFace = event.blockFace as Direction;
    let faceLocation = event.faceLocation as Vector3;

    let blockPer = block.permutation;
    let extinguished = blockPer.getState("extinguished");
    let lit = blockPer.getState("lit");

    let setFireF = false;

    if ((CraftBlocks.indexOf(block.typeId) != -1)) {
        return;
    }
    if (extinguished) {
        block.setPermutation(blockPer.withState("extinguished", false));
        setFireF = true;
    } else if (lit != undefined && !lit) {
        block.setPermutation(blockPer.withState("lit", true));
        setFireF = true;
    } else if (block.typeId == "minecraft:tnt") {
        let blockDim = block.dimension as Dimension;
        blockDim.setBlockType(block.location, MinecraftBlockTypes.Air);
        let tnt = blockDim.spawnEntity(MinecraftEntityTypes.Tnt, block.location);
        setFireF = true;
    } else {
        BlockLocationList.forEach(obj => {
            if (obj.direction == blockFace) {
                let bx = block.location.x;
                let by = block.location.y;
                let bz = block.location.z;
                let vec = {"x":bx+obj.location.x,"y":by+obj.location.y,"z":bz+obj.location.z};

                let blockDim = block.dimension as Dimension;
                let dimeBlock = blockDim.getBlock(vec) as Block;
                if(dimeBlock.isAir) {
                    let setLocation = {x:(bx+obj.location.x),y:(by+obj.location.y),z:(bz+obj.location.z)};
                    blockDim.setBlockPermutation(setLocation, BlockPermutation.resolve(MinecraftBlockTypes.Fire, {age:0}));
                    setFireF = true;
                }
            }
        });
    }

    if (entity instanceof Player && entity.getGameMode() != GameMode.creative) {
        if (setFireF) {
            decrimentGrimoireCount(entity as Player, itemStack);
        }
    }

};


/**
 * 魔導書（イグナイテッド）使用(tnt着火用)
 * @param {ItemComponentUseOnEvent} event
 */
export async function ignitedTnt(event:ItemComponentUseOnEvent) {

    let entity = event.source as Entity;
    let blockPerm = event.usedOnBlockPermutation as BlockPermutation;
    let itemStack = event.itemStack as ItemStack;
    let block = event.block as Block;
    let blockFace = event.blockFace as Direction;
    let faceLocation = event.faceLocation as Vector3;

    let bx = block.location.x;
    let by = block.location.y;
    let bz = block.location.z;

    if ((CraftBlocks.indexOf(block.typeId) != -1)) {
        return;
    }

    if (block.typeId == "minecraft:tnt") {
        // print("tnt spawn");
        entity.runCommand("setblock " + bx + " " + by + " " + bz + " minecraft:air");
        entity.runCommand("summon minecraft:tnt " + bx + " " + by + " " + bz + " ~ ~ from_explosion");

        if (entity instanceof Player && entity.getGameMode() != GameMode.creative) {
            decrimentGrimoireCount(entity as Player, itemStack);
        }
        
    }

};