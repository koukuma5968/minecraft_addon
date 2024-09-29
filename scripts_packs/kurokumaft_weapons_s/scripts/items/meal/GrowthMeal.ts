import { ItemCustomComponent, ItemStack, Player, ItemComponentUseOnEvent, Block, BlockPermutation, EquipmentSlot, world, Direction, GameMode, Vector3, ItemComponentTypes, ItemCooldownComponent, system } from "@minecraft/server";
import { MinecraftBlockTypes } from "@minecraft/vanilla-data";
import { subtractionItem } from "../../common/ItemDurabilityDamage";
import { CraftBlocks, PlantsBlocks } from "../../common/Constants";
import { ProbabilisticChoice } from "../../common/commonUtil";

/**
 * 植物成長
 */
export class GrowthMeal implements ItemCustomComponent {

    onUseOn(event:ItemComponentUseOnEvent) {
        let source = event.source as Player;
        let itemStack = event.itemStack as ItemStack;
        let block = event.block as Block;
        growths(source, itemStack, block);
        woodGrowth(source, itemStack, block);
        grassPlant(event);
    }
}

async function growths(source:Player, itemStack:ItemStack, block:Block) {

    let growth = block.permutation.getState("growth");
    if (growth != undefined && growth as number < 7) {
        block.setPermutation(block.permutation.withState("growth", growth as number +1));
        block.dimension.spawnParticle("minecraft:crop_growth_emitter", {x:block.location.x+0.5, y:block.location.y, z:block.location.z+0.5});
        subtractionItem(source, itemStack, EquipmentSlot.Mainhand, 1);
    }
}

/**
 * 樹木成長
*/
async function woodGrowth(source:Player, itemStack:ItemStack, block:Block) {

    let blockPer = block.permutation;
    let blockDim = block.dimension;
    let bx = block.location.x;
    let by = block.location.y;
    let bz = block.location.z;

    let setFireF = false;

    // let states = blockPer.getAllStates();
    // world.sendMessage(JSON.stringify(Object.entries(states)));
    let age_bit = blockPer.getState("age_bit");
    if (age_bit != undefined) {
    }

    // if ((CraftBlocks.indexOf(block.typeId) != -1)) {
    //     return;
    // } else if (block.typeId == MinecraftBlockTypes.Bamboo || block.typeId == MinecraftBlockTypes.BambooSapling) {
    //     if (block.typeId == MinecraftBlockTypes.BambooSapling) {
    //         blockDim.setBlockType(block.location, MinecraftBlockTypes.Bamboo);
    //     }
    //     let count = 1;
    //     let demBlock = blockDim.getBlock({"x":bx,"y":by+count,"z":bz}) as Block;
    //     while (count <= 15 && demBlock.isAir) {
    //         let blockCom = BlockPermutation.resolve(MinecraftBlockTypes.Bamboo, {
    //             bamboo_leaf_size: "no_leaves",
    //             bamboo_stalk_thickness: "thick"
    //         });
    //         if (count > 10) {
    //             blockCom = BlockPermutation.resolve(MinecraftBlockTypes.Bamboo, {
    //                 bamboo_leaf_size: "large_leaves",
    //                 bamboo_stalk_thickness: "thick"
    //             });
    //         } else if (count > 5) {
    //             blockCom = BlockPermutation.resolve(MinecraftBlockTypes.Bamboo, {
    //                 bamboo_leaf_size: "small_leaves",
    //                 bamboo_stalk_thickness: "thick"
    //             });
    //         }
    //         blockDim.setBlockPermutation({"x":bx,"y":by+count,"z":bz}, blockCom);
    //         count++;
    //         demBlock = blockDim.getBlock({"x":bx,"y":by+count,"z":bz}) as Block;
    //     }
    //     blockDim.spawnParticle("minecraft:crop_growth_emitter", block.location);
    // } else if (block.typeId == MinecraftBlockTypes.TwistingVines) {
    //     let air_count = 1;
    //     let airBlock = blockDim.getBlock({"x":bx,"y":by+air_count,"z":bz}) as Block;
    //     while (air_count <= 15 && airBlock.isAir) {
    //         blockDim.setBlockType({"x":bx,"y":by+air_count,"z":bz}, MinecraftBlockTypes.TwistingVines);
    //         air_count++;
    //         airBlock = blockDim.getBlock({"x":bx,"y":by+air_count,"z":bz}) as Block;
    //     }
    //     blockDim.spawnParticle("minecraft:crop_growth_emitter", block.location);
    // } else if (block.typeId == MinecraftBlockTypes.Reeds) {
    //     let air_count = 1;
    //     let airBlock = blockDim.getBlock({"x":bx,"y":by+air_count,"z":bz}) as Block;
    //     while (air_count <= 15 && airBlock.isAir) {
    //         blockDim.setBlockType({"x":bx,"y":by+air_count,"z":bz}, MinecraftBlockTypes.Reeds);
    //         air_count++;
    //         airBlock = blockDim.getBlock({"x":bx,"y":by+air_count,"z":bz}) as Block;
    //     }
    //     blockDim.spawnParticle("minecraft:crop_growth_emitter", block.location);
    // } else if ((wood_sapling.indexOf(block.typeId) != -1)) {
    // }

    // if (player.getGameMode() != GameMode.creative) {
    //     if (setFireF) {
    //         subtractionItem(source, itemStack, EquipmentSlot.Mainhand, 1);
    //     }
    // }

};

const flowerChoiceLists = ProbabilisticChoice([
    { item: "" , weight: 50 },
    { item: "minecraft:short_grass" , weight: 15 },
    { item: "minecraft:fern" , weight: 15 },
    { item: "minecraft:poppy" , weight: 5 },
    { item: "minecraft:cornflower" , weight: 5 },
    { item: "minecraft:azure_bluet" , weight: 3 },
    { item: "minecraft:oxeye_daisy" , weight: 3 },
    { item: "minecraft:red_tulip" , weight: 2 },
    { item: "minecraft:dandelion" , weight: 2 }
]);

/**
 * @param {ItemComponentUseOnEvent} event
 */
async function grassPlant(event:ItemComponentUseOnEvent) {

    let player = event.source as Player;
    let itemStack = event.itemStack as ItemStack;
    let block = event.block as Block;
    let blockFace = event.blockFace as Direction;

    if ((CraftBlocks.indexOf(block.typeId) != -1) || (block.typeId != MinecraftBlockTypes.GrassBlock && block.typeId != MinecraftBlockTypes.Dirt)) {
        return;
    }
    if (blockFace == Direction.Up) {
        let blockDim = block.dimension;
        let bx = block.location.x;
        let by = block.location.y;
        let bz = block.location.z;
    
        blockDim.spawnParticle("minecraft:crop_growth_area_emitter", {"x":bx,"y":by+1,"z":bz});
        for (let y=-2; y<=2;y++) {
            for (let z=-2; z<=2;z++) {
                let vec = {"x":bx+y,"y":by,"z":bz+z};
                let upvec = {"x":bx+y,"y":by+1,"z":bz+z};

                let dimeBlock = blockDim.getBlock(vec) as Block;
                let updimeBlock = blockDim.getBlock(upvec) as Block;
                if (dimeBlock.typeId == MinecraftBlockTypes.Dirt) {
                    blockDim.setBlockType(dimeBlock.location, MinecraftBlockTypes.GrassBlock);
                }
                if(updimeBlock.isAir && (dimeBlock.typeId == MinecraftBlockTypes.GrassBlock)) {
                    let randomBlock = flowerChoiceLists.pick();
                    if (randomBlock != "") {
                        blockDim.setBlockType(upvec,randomBlock);
                    }
                }
            }
        }
        subtractionItem(player, itemStack, EquipmentSlot.Mainhand, 1);
    }

};