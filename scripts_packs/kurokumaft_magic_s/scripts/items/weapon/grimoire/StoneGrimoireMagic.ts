import { ItemStack, Block, system, Player, ItemComponentUseOnEvent, ItemComponentTypes, BlockPermutation, Direction, ItemCooldownComponent, Vector3 } from "@minecraft/server";
import { decrimentGrimoireCount } from "../../../common/MagicItemDurabilityDamage";
import { MinecraftBlockTypes } from "@minecraft/vanilla-data";
import { MagicCraftBlocks } from "../../../common/MagicCommonUtil";

const FlowerBlockS = Object.freeze([
    "",
    "",
    "minecraft:tallgrass",
    "minecraft:poppy",
    "minecraft:blue_orchid",
    "minecraft:allium",
    "minecraft:azure_bluet",
    "minecraft:red_tulip",
    "minecraft:orange_tulip",
    "minecraft:white_tulip",
    "minecraft:pink_tulip",
    "minecraft:oxeye_daisy",
    "minecraft:cornflower",
    "minecraft:lily_of_the_valley",
    "minecraft:yellow_flower",
    "minecraft:dandelion",
    "double",
    "double",
    "double",
    "double"
]);

const DoubleFlowerBlockS = Object.freeze([
    {
        double_plant_type: "sunflower",
        upper_block_bit: false
    },
    {
        double_plant_type: "syringa",
        upper_block_bit: false
    },
    {
        double_plant_type: "grass",
        upper_block_bit: false
    },
    {
        double_plant_type: "fern",
        upper_block_bit: false
    },
    {
        double_plant_type: "rose",
        upper_block_bit: false
    },
    {
        double_plant_type: "paeonia",
        upper_block_bit: false
    }
]);

/**
 * 魔導書（モーヴィング）使用
 * @param {ItemComponentUseOnEvent} event
 */
export async function flowerGarden(event:ItemComponentUseOnEvent) {

    const entity = event.source as Player;
    const blockPerm = event.usedOnBlockPermutation as BlockPermutation;
    const itemStack = event.itemStack as ItemStack;
    const block = event.block as Block;
    const blockFace = event.blockFace as Direction;
    const faceLocation = event.faceLocation as Vector3;

    const blockDim = block.dimension;
    const bx = block.location.x;
    const by = block.location.y;
    const bz = block.location.z;

    const itemCool = itemStack.getComponent(ItemComponentTypes.Cooldown) as ItemCooldownComponent;

    let setFireF = false;

    if (itemCool.getCooldownTicksRemaining(entity) != 0) {
        return;
    }
    if ((MagicCraftBlocks.indexOf(block.typeId) != -1)) {
        return;
    }
    if (blockFace == Direction.Up) {
        blockDim.spawnParticle("kurokumaft:flower_garden_growth_emitter", block.location);
        itemCool.startCooldown(entity);
        let xpcount1 = 0;
        const intervalNumXP = system.runInterval(() => {
            for (let z=0; z<8;z++) {
                const vec = {"x":bx+xpcount1,"y":by,"z":bz+z};
                const upvec = {"x":bx+xpcount1,"y":by+1,"z":bz+z};
                const dupvec = {"x":bx+xpcount1,"y":by+2,"z":bz+z};

                const dimeBlock = blockDim.getBlock(vec) as Block;
                const updimeBlock = blockDim.getBlock(upvec) as Block;
                if(dimeBlock.typeId == MinecraftBlockTypes.GrassBlock || dimeBlock.typeId == MinecraftBlockTypes.Dirt ) {
                    if (dimeBlock.typeId == MinecraftBlockTypes.Dirt) {
                        blockDim.setBlockType(vec,MinecraftBlockTypes.GrassBlock );
                    }
                    if(updimeBlock.isAir) {
                        const randomBlock = FlowerBlockS[Math.floor(Math.random() * FlowerBlockS.length)];
                        if (randomBlock == "") {
                            continue;
                        }
                        const dupdimeBlock = blockDim.getBlock(dupvec) as Block;
                        if (randomBlock == "double") {
                            if (dupdimeBlock.isAir) {
                                const state = DoubleFlowerBlockS[Math.floor(Math.random() * DoubleFlowerBlockS.length)];
                                blockDim.setBlockPermutation(upvec,BlockPermutation.resolve("minecraft:double_plant",state));
                            }
                        } else {
                            blockDim.setBlockType(upvec,randomBlock);
                        }
                        setFireF = true;
                    }
                }
            }

            xpcount1++;

        }, 1);

        let xmcount1 = 0;
        const intervalNumXM = system.runInterval(() => {
            for (let z=0; z<8;z++) {
                const vec = {"x":bx+xmcount1,"y":by,"z":bz+z};
                const upvec = {"x":bx+xmcount1,"y":by+1,"z":bz+z};
                const dupvec = {"x":bx+xmcount1,"y":by+2,"z":bz+z};

                const dimeBlock = blockDim.getBlock(vec) as Block;
                const updimeBlock = blockDim.getBlock(upvec) as Block;
                if(dimeBlock.typeId == MinecraftBlockTypes.GrassBlock || dimeBlock.typeId == MinecraftBlockTypes.Dirt ) {
                    if (dimeBlock.typeId == MinecraftBlockTypes.Dirt) {
                        blockDim.setBlockType(vec,MinecraftBlockTypes.GrassBlock );
                    }
                    if(updimeBlock.isAir) {
                        const randomBlock = FlowerBlockS[Math.floor(Math.random() * FlowerBlockS.length)];
                        if (randomBlock == "") {
                            continue;
                        }
                        const dupdimeBlock = blockDim.getBlock(dupvec) as Block;
                        if (randomBlock == "double") {
                            if (dupdimeBlock.isAir) {
                                const state = DoubleFlowerBlockS[Math.floor(Math.random() * DoubleFlowerBlockS.length)];
                                blockDim.setBlockPermutation(upvec,BlockPermutation.resolve("minecraft:double_plant",state));
                            }
                        } else {
                            blockDim.setBlockType(upvec,randomBlock);
                        }
                        setFireF = true;
                    }
                }
            }
            xmcount1--;

        }, 1);

        let xpcount2 = 0;
        const intervalNumZP = system.runInterval(() => {
            for (let z=-1; z>-8;z--) {
                const vec = {"x":bx+xpcount2,"y":by,"z":bz+z};
                const upvec = {"x":bx+xpcount2,"y":by+1,"z":bz+z};
                const dupvec = {"x":bx+xpcount2,"y":by+2,"z":bz+z};

                const dimeBlock = blockDim.getBlock(vec) as Block;
                const updimeBlock = blockDim.getBlock(upvec) as Block;
                if(dimeBlock.typeId == MinecraftBlockTypes.GrassBlock || dimeBlock.typeId == MinecraftBlockTypes.Dirt ) {
                    if (dimeBlock.typeId == MinecraftBlockTypes.Dirt) {
                        blockDim.setBlockType(vec,MinecraftBlockTypes.GrassBlock );
                    }
                    if(updimeBlock.isAir) {
                        const randomBlock = FlowerBlockS[Math.floor(Math.random() * FlowerBlockS.length)];
                        if (randomBlock == "") {
                            continue;
                        }
                        const dupdimeBlock = blockDim.getBlock(dupvec) as Block;
                        if (randomBlock == "double") {
                            if (dupdimeBlock.isAir) {
                                const state = DoubleFlowerBlockS[Math.floor(Math.random() * DoubleFlowerBlockS.length)];
                                blockDim.setBlockPermutation(upvec,BlockPermutation.resolve("minecraft:double_plant",state));
                            }
                        } else {
                            blockDim.setBlockType(upvec,randomBlock);
                        }
                        setFireF = true;
                    }
                }
            }

            xpcount2++;

        }, 1);

        let xmcount2 = 0;
        const intervalNumZM = system.runInterval(() => {
            for (let z=-1; z>-8;z--) {
                const vec = {"x":bx+xmcount2,"y":by,"z":bz+z};
                const upvec = {"x":bx+xmcount2,"y":by+1,"z":bz+z};
                const dupvec = {"x":bx+xmcount2,"y":by+2,"z":bz+z};

                const dimeBlock = blockDim.getBlock(vec) as Block;
                const updimeBlock = blockDim.getBlock(upvec) as Block;
                if(dimeBlock.typeId == MinecraftBlockTypes.GrassBlock || dimeBlock.typeId == MinecraftBlockTypes.Dirt ) {
                    if (dimeBlock.typeId == MinecraftBlockTypes.Dirt) {
                        blockDim.setBlockType(vec,MinecraftBlockTypes.GrassBlock );
                    }
                    if(updimeBlock.isAir) {
                        const randomBlock = FlowerBlockS[Math.floor(Math.random() * FlowerBlockS.length)];
                        if (randomBlock == "") {
                            continue;
                        }
                        const dupdimeBlock = blockDim.getBlock(dupvec) as Block;
                        if (randomBlock == "double") {
                            if (dupdimeBlock.isAir) {
                                const state = DoubleFlowerBlockS[Math.floor(Math.random() * DoubleFlowerBlockS.length)];
                                blockDim.setBlockPermutation(upvec,BlockPermutation.resolve("minecraft:double_plant",state));
                            }
                        } else {
                            blockDim.setBlockType(upvec,randomBlock);
                        }
                        setFireF = true;
                    }
                }
            }

            xmcount2--;

        }, 1);

        system.runTimeout(() => {
            system.clearRun(intervalNumXP);
            system.clearRun(intervalNumZP);
            system.clearRun(intervalNumXM);
            system.clearRun(intervalNumZM);

            if (setFireF) {
                decrimentGrimoireCount(entity, itemStack);
            }
        }, 15);
    }

};

const wood_sapling = Object.freeze([
    "minecraft:oak_sapling",
    "minecraft:spruce_sapling",
    "minecraft:birch_sapling",
    "minecraft:jungle_sapling",
    "minecraft:acacia_sapling",
    "minecraft:dark_oak_sapling"
]);

/**
 * 魔導書（グロウス）使用
* @param {ItemComponentUseOnEvent} event
*/
export async function growth(event:ItemComponentUseOnEvent) {

    const player = event.source as Player;
    const blockPerm = event.usedOnBlockPermutation as BlockPermutation;
    const itemStack = event.itemStack as ItemStack;
    const block = event.block as Block;
    const blockFace = event.blockFace as Direction;
    const faceLocation = event.faceLocation as Vector3;


    const blockPer = block.permutation;
    const blockDim = block.dimension;
    const bx = block.location.x;
    const by = block.location.y;
    const bz = block.location.z;

    let setFireF = false;

    if ((MagicCraftBlocks.indexOf(block.typeId) != -1)) {
        return;
    } else if (block.typeId == MinecraftBlockTypes.Bamboo || block.typeId == MinecraftBlockTypes.BambooSapling) {
        if (block.typeId == MinecraftBlockTypes.BambooSapling) {
            blockDim.setBlockType(block.location, MinecraftBlockTypes.Bamboo);
        }
        let count = 1;
        let demBlock = blockDim.getBlock({"x":bx,"y":by+count,"z":bz}) as Block;
        while (count <= 15 && demBlock.isAir) {
            let blockCom = BlockPermutation.resolve(MinecraftBlockTypes.Bamboo, {
                bamboo_leaf_size: "no_leaves",
                bamboo_stalk_thickness: "thick"
            });
            if (count > 10) {
                blockCom = BlockPermutation.resolve(MinecraftBlockTypes.Bamboo, {
                    bamboo_leaf_size: "large_leaves",
                    bamboo_stalk_thickness: "thick"
                });
            } else if (count > 5) {
                blockCom = BlockPermutation.resolve(MinecraftBlockTypes.Bamboo, {
                    bamboo_leaf_size: "small_leaves",
                    bamboo_stalk_thickness: "thick"
                });
            }
            blockDim.setBlockPermutation({"x":bx,"y":by+count,"z":bz}, blockCom);
            setFireF = true;
            count++;
            demBlock = blockDim.getBlock({"x":bx,"y":by+count,"z":bz}) as Block;
        }
        blockDim.spawnParticle("minecraft:crop_growth_emitter", block.location);
    } else if (block.typeId == MinecraftBlockTypes.TwistingVines) {
        let air_count = 1;
        let airBlock = blockDim.getBlock({"x":bx,"y":by+air_count,"z":bz}) as Block;
        while (air_count <= 15 && airBlock.isAir) {
            blockDim.setBlockType({"x":bx,"y":by+air_count,"z":bz}, MinecraftBlockTypes.TwistingVines);
            setFireF = true;
            air_count++;
            airBlock = blockDim.getBlock({"x":bx,"y":by+air_count,"z":bz}) as Block;
        }
        blockDim.spawnParticle("minecraft:crop_growth_emitter", block.location);
    } else if (block.typeId == MinecraftBlockTypes.Reeds) {
        let air_count = 1;
        let airBlock = blockDim.getBlock({"x":bx,"y":by+air_count,"z":bz}) as Block;
        while (air_count <= 15 && airBlock.isAir) {
            blockDim.setBlockType({"x":bx,"y":by+air_count,"z":bz}, MinecraftBlockTypes.Reeds);
            setFireF = true;
            air_count++;
            airBlock = blockDim.getBlock({"x":bx,"y":by+air_count,"z":bz}) as Block;
        }
        blockDim.spawnParticle("minecraft:crop_growth_emitter", block.location);
    } else if ((wood_sapling.indexOf(block.typeId) != -1)) {
        const age_bit = blockPer.getState("age_bit");
        if (age_bit) {

        }
    }

    if (setFireF) {
        decrimentGrimoireCount(player, itemStack);
    }

};
