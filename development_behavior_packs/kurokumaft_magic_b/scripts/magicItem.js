import { world,system,Player,Block,Entity,EntityComponentTypes,ItemStack,Direction,ItemComponentTypes,Dimension } from "@minecraft/server";
import { print, CraftBlocks, MusicRecodes } from "./common";
import { ModalFormData } from "@minecraft/server-ui";

// 帰還の実で転移
/**
 * @param {Player} player
 * @param {ItemStack} item
 */
function home_tp(player, item) {
    let lores = item.getLore();
    if (lores.length > 0 && lores[0].indexOf("拠点") != -1) {
        let entity = world.getEntity(lores[4].substr(3));
        // if (entity != undefined && entity.typeId == "kurokumaft:home_gate") {
            let text = "tp @s " + lores[1].substr(2) + " " + lores[2].substr(2) + " " + lores[3].substr(2);
            player.runCommand(text);
        // } else {
        //     print("登録した拠点は使用出来ません。");
        // }
    }
};

// ホームゲートに転移場所設定
/**
 * @param {Player} player
 * @param {ItemStack} item
 * @param {Entity} target
 */
function homeSetDialog(player, item, target) {

    let modalForm = new ModalFormData().title("拠点名を入力");
    modalForm.textField('拠点名', '');
    modalForm
        .show(player)
        .then(formData => {
            // player.sendMessage(`Modal form results: ${JSON.stringify(formData.formValues, undefined, 2)}`);
            item.setLore(["拠点:" + formData.formValues[0],"x:"+target.location.x,"y:"+target.location.y,"x:"+target.location.z,"id:"+target.id]);
            let inventory = player.getComponent(EntityComponentTypes.Inventory);
            inventory.container.setItem(player.selectedSlotIndex, item);
            target.addTag("home_gate_set");
            player.sendMessage(`拠点を登録しました。`)
        })
        .catch((error) => {
            return -1;
        });
};

// 魔導書（トーチ）使用
/**
 * @param {Player} player
 * @param {Block} block
 * @param {ItemStack} item
 */
function torchlight_use(player, block, item) {
    // print(block.typeId);
    if ((block.typeId.indexOf("chest") == -1) && (block.typeId.indexOf("boat") == -1) && (CraftBlocks.indexOf(block.typeId) == -1)) {
        decrimentGrimoireCount(player, item);
 
    }
};

const BlockLocationList = Object.freeze([
    {
        direction: Direction.Up,
        location: {x:0,y:1,z:0}
    },
    {
        direction: Direction.Down,
        location: {x:0,y:-1,z:0}
    },
    {
        direction: Direction.South,
        location: {x:0,y:0,z:1}
    },
    {
        direction: Direction.North,
        location: {x:0,y:0,z:-1}
    },
    {
        direction: Direction.East,
        location: {x:1,y:0,z:0}
    },
    {
        direction: Direction.West,
        location: {x:-1,y:0,z:0}
    }

]);

// 魔導書（イグナイテッド）使用
/**
 * @param {Player} player
 * @param {Block} block
 * @param {Direction} direction
 * @param {ItemStack} item
 */
function ignited_use_af(player, block, direction, item) {

    // print(item.typeId);
    // print(block.typeId);
    let blockPer = block.permutation;
    let extinguished = blockPer.getState("extinguished");
    let lit = blockPer.getState("lit");
    let blockDim = block.dimension;
    let bx = block.location.x;
    let by = block.location.y;
    let bz = block.location.z;

    let setFireF = false;
    let setLocation = "";

    if ((CraftBlocks.indexOf(block.typeId) != -1)) {
        return;
    }
    if (extinguished) {
        block.setPermutation(blockPer.withState("extinguished", false));
        setFireF = true;
    } else if (lit != undefined && !lit) {
        block.setPermutation(blockPer.withState("lit", true));
        setFireF = true;
    } else {
        BlockLocationList.forEach(obj => {
            if (obj.direction == direction) {
                let vec = {"x":bx+obj.location.x,"y":by+obj.location.y,"z":bz+obj.location.z};
                // print(blockDim.getBlock(vec));
                if(blockDim.getBlock(vec).isAir) {
                    setLocation = (bx+obj.location.x) + " " + (by+obj.location.y) + " " + (bz+obj.location.z);
                    player.runCommand("setblock " + setLocation + " minecraft:fire [\"age\"=0]");
                    setFireF = true;
                }
            }
        });
    }

    if (setFireF) {
        decrimentGrimoireCount(player, item);
    }

};

// 魔導書（イグナイテッド）使用(tnt着火用)
/**
 * @param {Player} player
 * @param {Block} block
 * @param {Direction} direction
 * @param {ItemStack} item
 */
function ignited_use_be(player, block, direction, item) {

    // print(item.typeId);
    // print(block.typeId);
    let bx = block.location.x;
    let by = block.location.y;
    let bz = block.location.z;

    if ((CraftBlocks.indexOf(block.typeId) != -1)) {
        return;
    }

    if (block.typeId == "minecraft:tnt") {
        // print("tnt spawn");
        player.runCommand("setblock " + bx + " " + by + " " + bz + " minecraft:air");
        player.runCommand("summon minecraft:tnt " + bx + " " + by + " " + bz + " ~ ~ from_explosion");

        decrimentGrimoireCount(player, item);
    
    }

};

// 魔導書（ウォーター）使用
/**
 * @param {Player} player
 * @param {Block} block
 * @param {Direction} direction
 * @param {ItemStack} item
 */
function water_use(player, block, direction, item) {

    // print(item.typeId);
    // print(block.typeId);
    let blockPer = block.permutation;
    let cauldron = blockPer.getState("cauldron_liquid");
    let blockDim = block.dimension;
    let bx = block.location.x;
    let by = block.location.y;
    let bz = block.location.z;

    let setFireF = false;
    let setLocation = "";

    if ((CraftBlocks.indexOf(block.typeId) != -1)) {
        return;
    }
    if (cauldron) {
        block.setPermutation(blockPer.withState("cauldron_liquid", "water"));
        block.setPermutation(blockPer.withState("fill_level", 6));
        setFireF = true;
    } else {
        BlockLocationList.forEach(obj => {
            if (obj.direction == direction) {
                let vec = {"x":bx+obj.location.x,"y":by+obj.location.y,"z":bz+obj.location.z};
                // print(blockDim.getBlock(vec));
                if(blockDim.getBlock(vec).isAir) {
                    setLocation = (bx+obj.location.x) + " " + (by+obj.location.y) + " " + (bz+obj.location.z);
                    setFireF = true;
                }
            }
        });
    }

    if (setFireF) {
        player.runCommand("setblock " + setLocation + " minecraft:flowing_water [\"liquid_depth\"=0]");
        decrimentGrimoireCount(player, item);
    }

};

const FlowerBlockS = Object.freeze([
    "",
    "",
    "",
    "",
    "",
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
    "minecraft:double_plant [\"double_plant_type\"=\"sunflower\", \"upper_block_bit\"=false]",
    "minecraft:double_plant [\"double_plant_type\"=\"syringa\", \"upper_block_bit\"=false]",
    "minecraft:double_plant [\"double_plant_type\"=\"grass\", \"upper_block_bit\"=false]",
    "minecraft:double_plant [\"double_plant_type\"=\"fern\", \"upper_block_bit\"=false]",
    "minecraft:double_plant [\"double_plant_type\"=\"rose\", \"upper_block_bit\"=false]",
    "minecraft:double_plant [\"double_plant_type\"=\"paeonia\", \"upper_block_bit\"=false]"
]);

// 魔導書（フラワーガーデン）使用
/**
 * @param {Player} player
 * @param {Block} block
 * @param {Direction} direction
 * @param {ItemStack} item
 */
function flower_garden_use(player, block, direction, item) {

    // print(item.typeId);
    // print(block.typeId);
    let blockPer = block.permutation;
    let blockDim = block.dimension;
    let bx = block.location.x;
    let by = block.location.y;
    let bz = block.location.z;

    let itemCool = item.getComponent(ItemComponentTypes.Cooldown);

    let setFireF = false;

    if (itemCool.getCooldownTicksRemaining(player) != 0) {
        return;
    }
    if ((CraftBlocks.indexOf(block.typeId) != -1)) {
        return;
    }
    if (block.typeId == "minecraft:grass_block") {
        if (direction == Direction.Up) {
            player.runCommand("particle kurokumaft:flower_garden_growth_emitter ~~~");
            itemCool.startCooldown(player);
            let xpcount1 = 0;
            let intervalNumXP = system.runInterval(() => {
                for (let z=0; z<8;z++) {
                    let vec = {"x":bx+xpcount1,"y":by,"z":bz+z};
                    let upvec = {"x":bx+xpcount1,"y":by+1,"z":bz+z};
                    let dupvec = {"x":bx+xpcount1,"y":by+2,"z":bz+z};

                    if(blockDim.getBlock(vec).typeId == "minecraft:grass_block" && blockDim.getBlock(upvec).isAir) {
                        let randomBlock = FlowerBlockS[Math.floor(Math.random() * FlowerBlockS.length)];
                        if (randomBlock == "") {
                            continue;
                        }
                        while (randomBlock.indexOf("double") != -1 && !blockDim.getBlock(dupvec).isAir) {
                            randomBlock = FlowerBlockS[Math.floor(Math.random() * FlowerBlockS.length)];
                        }
                        player.runCommand("setblock " + (bx+xpcount1) + " " + (by+1) + " " + (bz+z) + " " + randomBlock);
                        setFireF = true;
                    }
                }

                xpcount1++;

            }, 1);

            let xmcount1 = 0;
            let intervalNumXM = system.runInterval(() => {
                for (let z=0; z<8;z++) {
                    let vec = {"x":bx+xmcount1,"y":by,"z":bz+z};
                    let upvec = {"x":bx+xmcount1,"y":by+1,"z":bz+z};
                    let dupvec = {"x":bx+xmcount1,"y":by+2,"z":bz+z};

                    if(blockDim.getBlock(vec).typeId == "minecraft:grass_block" && blockDim.getBlock(upvec).isAir) {
                        let randomBlock = FlowerBlockS[Math.floor(Math.random() * FlowerBlockS.length)];
                        if (randomBlock == "") {
                            continue;
                        }
                        while (randomBlock.indexOf("double") != -1 && !blockDim.getBlock(dupvec).isAir) {
                            randomBlock = FlowerBlockS[Math.floor(Math.random() * FlowerBlockS.length)];
                        }
                        player.runCommand("setblock " + (bx+xmcount1) + " " + (by+1) + " " + (bz+z) + " " + randomBlock);
                        setFireF = true;
                    }
                }
                xmcount1--;

            }, 1);

            let xpcount2 = 0;
            let intervalNumZP = system.runInterval(() => {
                for (let z=-1; z>-8;z--) {
                    let vec = {"x":bx+xpcount2,"y":by,"z":bz+z};
                    let upvec = {"x":bx+xpcount2,"y":by+1,"z":bz+z};
                    let dupvec = {"x":bx+xpcount2,"y":by+2,"z":bz+z};

                    if(blockDim.getBlock(vec).typeId == "minecraft:grass_block" && blockDim.getBlock(upvec).isAir) {
                        let randomBlock = FlowerBlockS[Math.floor(Math.random() * FlowerBlockS.length)];
                        if (randomBlock == "") {
                            continue;
                        }
                        while (randomBlock.indexOf("double") != -1 && !blockDim.getBlock(dupvec).isAir) {
                            randomBlock = FlowerBlockS[Math.floor(Math.random() * FlowerBlockS.length)];
                        }
                        player.runCommand("setblock " + (bx+xpcount2) + " " + (by+1) + " " + (bz+z) + " " + randomBlock);
                        setFireF = true;
                    }
                }

                xpcount2++;

            }, 1);

            let xmcount2 = 0;
            let intervalNumZM = system.runInterval(() => {
                for (let z=-1; z>-8;z--) {
                    let vec = {"x":bx+xmcount2,"y":by,"z":bz+z};
                    let upvec = {"x":bx+xmcount2,"y":by+1,"z":bz+z};
                    let dupvec = {"x":bx+xmcount2,"y":by+2,"z":bz+z};

                    if(blockDim.getBlock(vec).typeId == "minecraft:grass_block" && blockDim.getBlock(upvec).isAir) {
                        let randomBlock = FlowerBlockS[Math.floor(Math.random() * FlowerBlockS.length)];
                        if (randomBlock == "") {
                            continue;
                        }
                        while (randomBlock.indexOf("double") != -1 && !blockDim.getBlock(dupvec).isAir) {
                            randomBlock = FlowerBlockS[Math.floor(Math.random() * FlowerBlockS.length)];
                        }
                        player.runCommand("setblock " + (bx+xmcount2) + " " + (by+1) + " " + (bz+z) + " " + randomBlock);
                        setFireF = true;
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
                    decrimentGrimoireCount(player, item);
                }
            }, 15);
        }
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

// 魔導書（グロウス）使用
/**
 * @param {Player} player
 * @param {Block} block
 * @param {Direction} direction
 * @param {ItemStack} item
 */
function growth_use(player, block, direction, item) {

    let blockPer = block.permutation;
    let blockDim = block.dimension;
    let bx = block.location.x;
    let by = block.location.y;
    let bz = block.location.z;

    let setFireF = false;
    let setLocation = "";

    if ((CraftBlocks.indexOf(block.typeId) != -1)) {
        return;
    } else if (block.typeId == "minecraft:bamboo" || block.typeId == "minecraft:bamboo_sapling") {
        if (block.typeId == "minecraft:bamboo_sapling") {
            player.runCommand("setblock " + (bx) + " " + (by) + " " + (bz) + " minecraft:bamboo");
        }
        let count = 1;
        while (count <= 15 && (blockDim.getBlock({"x":bx,"y":by+count,"z":bz}).typeId == "minecraft:bamboo" || blockDim.getBlock({"x":bx,"y":by+count,"z":bz}).isAir)) {
            let blockCom = "minecraft:bamboo [\"bamboo_leaf_size\"=\"no_leaves\", \"bamboo_stalk_thickness\" = \"thick\"]";
            if (count > 10) {
                blockCom = "minecraft:bamboo [\"bamboo_leaf_size\"=\"large_leaves\", \"bamboo_stalk_thickness\" = \"thick\"]";
            } else if (count > 5) {
                blockCom = "minecraft:bamboo [\"bamboo_leaf_size\"=\"small_leaves\", \"bamboo_stalk_thickness\" = \"thick\"]";
            }
            player.runCommand("setblock " + (bx) + " " + (by+count) + " " + (bz) + " " + blockCom);
            count++;
        }
        player.runCommand("particle minecraft:crop_growth_emitter " + (bx) + " " + (by) + " " + (bz));
    } else if (block.typeId == "minecraft:twisting_vines") {
        let vin_count = 1;
        while ((blockDim.getBlock({"x":bx,"y":by+vin_count,"z":bz}).typeId == "minecraft:twisting_vines")) {
            vin_count++;
        }
        let air_count = vin_count + 1;
        let air_last = (air_count+15);
        while (air_count <= air_last && blockDim.getBlock({"x":bx,"y":by+air_count,"z":bz}).isAir) {
            air_count++;
        }
        player.runCommand("fill " + (bx) + " " + (by+vin_count) + " " + (bz) + " " + (bx) + " " + (by+air_count) + " " + (bz) + " minecraft:twisting_vines");
        player.runCommand("particle minecraft:crop_growth_emitter " + (bx) + " " + (by) + " " + (bz));
    } else if (block.typeId == "minecraft:cave_vines") {
        let up_count = 1;
        while ((blockDim.getBlock({"x":bx,"y":by+up_count,"z":bz}).typeId == "minecraft:cave_vines")) {
            up_count++;
        }
        let down_count = 0;
        while ((blockDim.getBlock({"x":bx,"y":by+down_count,"z":bz}).typeId == "minecraft:cave_vines")) {
            down_count--;
        }
        player.runCommand("fill " + (bx) + " " + (by+down_count+2) + " " + (bz) + " " + (bx) + " " + (by+up_count-1) + " " + (bz) + " minecraft:cave_vines_body_with_berries");
        player.runCommand("setblock " + (bx) + " " + (by+down_count+1) + " " + (bz) + " minecraft:cave_vines_head_with_berries");
        player.runCommand("particle minecraft:crop_growth_emitter " + (bx) + " " + (by) + " " + (bz));

    } else if (block.typeId == "minecraft:reeds") {
        let vin_count = 1;
        while ((blockDim.getBlock({"x":bx,"y":by+vin_count,"z":bz}).typeId == "minecraft:reeds")) {
            vin_count++;
        }
        let air_count = vin_count + 1;
        let air_last = (air_count+15);
        while (air_count <= air_last && blockDim.getBlock({"x":bx,"y":by+air_count,"z":bz}).isAir) {
            air_count++;
        }
        player.runCommand("fill " + (bx) + " " + (by+vin_count) + " " + (bz) + " " + (bx) + " " + (by+air_count) + " " + (bz) + " minecraft:reeds");
        player.runCommand("particle minecraft:crop_growth_emitter " + (bx) + " " + (by) + " " + (bz));
    } else if ((wood_sapling.indexOf(block.typeId) != -1)) {
        let age_bit = blockPer.getState("age_bit");
        if (age_bit) {

        }
    }

    if (setFireF) {
        decrimentGrimoireCount(player, item);
    }

};

const MowingBlocks = Object.freeze([
    "minecraft:bamboo",
    "minecraft:bamboo_sapling",
    "minecraft:acacia_leaves",
    "minecraft:dark_oak_leaves",
    "minecraft:oak_leaves",
    "minecraft:spruce_leaves",
    "minecraft:birch_leaves",
    "minecraft:jungle_leaves",
    "minecraft:azalea_leaves",
    "minecraft:azalea_leaves_flowered",
    "minecraft:cherry_leaves",
    "minecraft:mangrove_leaves",
    "minecraft:reeds",
    "minecraft:cave_vines",
    "minecraft:cave_vines_body_with_berries",
    "minecraft:cave_vines_head_with_berries",
    "minecraft:twisting_vines",
    "minecraft:wheat",
    "minecraft:vine",
    "minecraft:pumpkin_stem",
    "minecraft:pumpkin",
    "minecraft:warped_stem",
    "minecraft:crimson_stem",
    "minecraft:melon_stem",
    "minecraft:melon",
    "minecraft:cocoa",
    "minecraft:potatoes",
    "minecraft:carrots",
    "minecraft:sweet_berry_bush",
    "minecraft:kelp",
    "minecraft:brown_mushroom",
    "minecraft:brown_mushroom_block",
    "minecraft:red_mushroom",
    "minecraft:red_mushroom_block",
    "minecraft:crimson_fungus",
    "minecraft:warped_fungus",
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
    "minecraft:lilac",
    "minecraft:large_fern",
    "minecraft:rose_bush",
    "minecraft:tall_grass",
    "minecraft:short_grass",
    "minecraft:sunflower",
    "minecraft:peony",
    "minecraft:double_plant"
]);

// 魔導書（モーヴィング）使用
/**
 * @param {Player} player
 * @param {ItemStack} item
 */
function mowing_use(player, item) {

    let playerDim = player.dimension;
    let bx = player.location.x;
    let by = player.location.y;
    let bz = player.location.z;

    let setFireF = false;
    let xpcount1 = 0;
    let intervalNumXP = system.runInterval(() => {
        for (let z=0; z<10;z++) {
            for (let y=0; y<10;y++) {
                let vec = {"x":bx+xpcount1,"y":by+y,"z":bz+z};
                if(!playerDim.getBlock(vec).isAir && MowingBlocks.indexOf(playerDim.getBlock(vec).typeId) != -1) {
                    player.runCommand("setblock " + (bx+xpcount1) + " " + (by+y) + " " + (bz+z) + " air destroy");
                    setFireF = true;
                }
            }
            for (let y=-1; y>-3;y--) {
                let vec = {"x":bx+xpcount1,"y":by+y,"z":bz+z};
                if(!playerDim.getBlock(vec).isAir && MowingBlocks.indexOf(playerDim.getBlock(vec).typeId) != -1) {
                    player.runCommand("setblock " + (bx+xpcount1) + " " + (by+y) + " " + (bz+z) + " air destroy");
                    setFireF = true;
                }
            }
        }
        xpcount1++;
    }, 1);

    let xmcount1 = 0;
    let intervalNumXM = system.runInterval(() => {
        for (let z=0; z<10;z++) {
            for (let y=0; y<10;y++) {
                let vec = {"x":bx+xmcount1,"y":by+y,"z":bz+z};
                if(!playerDim.getBlock(vec).isAir && MowingBlocks.indexOf(playerDim.getBlock(vec).typeId) != -1) {
                    player.runCommand("setblock " + (bx+xmcount1) + " " + (by+y) + " " + (bz+z) + " air destroy");
                    setFireF = true;
                }
            }
            for (let y=-1; y>-3;y--) {
                let vec = {"x":bx+xmcount1,"y":by+y,"z":bz+z};
                if(!playerDim.getBlock(vec).isAir && MowingBlocks.indexOf(playerDim.getBlock(vec).typeId) != -1) {
                    player.runCommand("setblock " + (bx+xmcount1) + " " + (by+y) + " " + (bz+z) + " air destroy");
                    setFireF = true;
                }
            }
        }
        xmcount1--;
    }, 1);

    let xpcount2 = 0;
    let intervalNumZP = system.runInterval(() => {
        for (let z=-1; z>-10;z--) {
            for (let y=0; y<10;y++) {
                let vec = {"x":bx+xpcount2,"y":by+y,"z":bz+z};
                if(!playerDim.getBlock(vec).isAir && MowingBlocks.indexOf(playerDim.getBlock(vec).typeId) != -1) {
                    player.runCommand("setblock " + (bx+xpcount2) + " " + (by+y) + " " + (bz+z) + " air destroy");
                    setFireF = true;
                }
            }
            for (let y=-1; y>-3;y--) {
                let vec = {"x":bx+xpcount2,"y":by+y,"z":bz+z};
                if(!playerDim.getBlock(vec).isAir && MowingBlocks.indexOf(playerDim.getBlock(vec).typeId) != -1) {
                    player.runCommand("setblock " + (bx+xpcount2) + " " + (by+y) + " " + (bz+z) + " air destroy");
                    setFireF = true;
                }
            }
        }
        xpcount2++;
    }, 1);

    let xmcount2 = 0;
    let intervalNumZM = system.runInterval(() => {
        for (let z=-1; z>-10;z--) {
            for (let y=0; y<10;y++) {
                let vec = {"x":bx+xmcount2,"y":by+y,"z":bz+z};
                if(!playerDim.getBlock(vec).isAir && MowingBlocks.indexOf(playerDim.getBlock(vec).typeId) != -1) {
                    player.runCommand("setblock " + (bx+xmcount2) + " " + (by+y) + " " + (bz+z) + " air destroy");
                    setFireF = true;
                }
            }
            for (let y=-1; y>-3;y--) {
                let vec = {"x":bx+xmcount2,"y":by+y,"z":bz+z};
                if(!playerDim.getBlock(vec).isAir && MowingBlocks.indexOf(playerDim.getBlock(vec).typeId) != -1) {
                    player.runCommand("setblock " + (bx+xmcount2) + " " + (by+y) + " " + (bz+z) + " air destroy");
                    setFireF = true;
                }
            }
        }
        xmcount2--;
    }, 1);

    player.runCommand("particle kurokumaft:mowing_particle " + (bx) + " " + (by) + " " + (bz));

    system.runTimeout(() => {
        system.clearRun(intervalNumXP);
        system.clearRun(intervalNumZP);
        system.clearRun(intervalNumXM);
        system.clearRun(intervalNumZM);

        if (setFireF) {
            decrimentGrimoireCount(player, item);
        }
    }, 15);

};

// 魔導書（プレイングサウンド）使用
/**
 * @param {Player} player
 * @param {ItemStack} item
 */
function music_sound_use(player, item) {
    player.runCommand("music play " + MusicRecodes[Math.floor(Math.random() * MusicRecodes.length)] + " 1 5");
    decrimentGrimoireCount(player, item);
};

// 魔導書耐久減少
/**
 * @param {Player} player
 * @param {ItemStack} item
 */
function decrimentGrimoireCount(player, item) {
    let lore = item.getLore();
    if (lore.length > 0) {
        let cont = Number(lore[0].substr(3));
        cont--;
        let inventory = player.getComponent(EntityComponentTypes.Inventory);
        if (cont == 0) {
            let grimoire_damage = new ItemStack("kurokumaft:grimoire_damage", 1);
            inventory.container.setItem(player.selectedSlotIndex, grimoire_damage);
        } else {
            item.setLore(["残数：" + cont]);
            inventory.container.setItem(player.selectedSlotIndex, item);
        }
    }
}

export { home_tp, homeSetDialog, torchlight_use, ignited_use_af, ignited_use_be, water_use, flower_garden_use, growth_use, mowing_use, music_sound_use };
