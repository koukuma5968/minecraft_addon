import { Entity, ItemStack, Block, system, Player, GameMode, ItemComponentUseEvent, world } from "@minecraft/server";
import { decrimentGrimoireCount } from "../../../common/ItemDurabilityDamage";
import { MinecraftBlockTypes } from "@minecraft/vanilla-data";
import { ActionFormData, ActionFormResponse } from "@minecraft/server-ui";

const MowingBlockS = Object.freeze([
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
    "minecraft:double_plant",
    "minecraft:dandelion"
]);

/**
 * 魔導書（モーヴィング）使用
 * @param {ItemComponentUseEvent} event
 */
export async function mowing(event:ItemComponentUseEvent) {

    let entity = event.source as Entity;
    let itemStack = event.itemStack as ItemStack;

    let playerDim = entity.dimension;
    let bx = entity.location.x;
    let by = entity.location.y;
    let bz = entity.location.z;

    let setFireF = false;
    let xpcount1 = 0;
    let intervalNumXP = system.runInterval(() => {
        for (let z=0; z<10;z++) {
            for (let y=0; y<10;y++) {
                let vec = {"x":bx+xpcount1,"y":by+y,"z":bz+z};
                let dimBlock = playerDim.getBlock(vec) as Block;
                if(!dimBlock.isAir && MowingBlockS.indexOf(dimBlock.typeId) != -1) {
                    playerDim.getBlockFromRay
                    playerDim.runCommand("setblock " + (bx+xpcount1) + " " + (by+y) + " " + (bz+z) + " air destroy");
                    setFireF = true;
                }
            }
            for (let y=-1; y>-3;y--) {
                let vec = {"x":bx+xpcount1,"y":by+y,"z":bz+z};
                let dimBlock = playerDim.getBlock(vec) as Block;
                if(!dimBlock.isAir && MowingBlockS.indexOf(dimBlock.typeId) != -1) {
                    playerDim.runCommand("setblock " + (bx+xpcount1) + " " + (by+y) + " " + (bz+z) + " air destroy");
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
                let dimBlock = playerDim.getBlock(vec) as Block;
                if(!dimBlock.isAir && MowingBlockS.indexOf(dimBlock.typeId) != -1) {
                    playerDim.runCommand("setblock " + (bx+xmcount1) + " " + (by+y) + " " + (bz+z) + " air destroy");
                    setFireF = true;
                }
            }
            for (let y=-1; y>-3;y--) {
                let vec = {"x":bx+xmcount1,"y":by+y,"z":bz+z};
                let dimBlock = playerDim.getBlock(vec) as Block;
                if(!dimBlock.isAir && MowingBlockS.indexOf(dimBlock.typeId) != -1) {
                    playerDim.runCommand("setblock " + (bx+xmcount1) + " " + (by+y) + " " + (bz+z) + " air destroy");
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
                let dimBlock = playerDim.getBlock(vec) as Block;
                if(!dimBlock.isAir && MowingBlockS.indexOf(dimBlock.typeId) != -1) {
                    playerDim.runCommand("setblock " + (bx+xpcount2) + " " + (by+y) + " " + (bz+z) + " air destroy");
                    setFireF = true;
                }
            }
            for (let y=-1; y>-3;y--) {
                let vec = {"x":bx+xpcount2,"y":by+y,"z":bz+z};
                let dimBlock = playerDim.getBlock(vec) as Block;
                if(!dimBlock.isAir && MowingBlockS.indexOf(dimBlock.typeId) != -1) {
                    playerDim.runCommand("setblock " + (bx+xpcount2) + " " + (by+y) + " " + (bz+z) + " air destroy");
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
                let dimBlock = playerDim.getBlock(vec) as Block;
                if(!dimBlock.isAir && MowingBlockS.indexOf(dimBlock.typeId) != -1) {
                    playerDim.runCommand("setblock " + (bx+xmcount2) + " " + (by+y) + " " + (bz+z) + " air destroy");
                    setFireF = true;
                }
            }
            for (let y=-1; y>-3;y--) {
                let vec = {"x":bx+xmcount2,"y":by+y,"z":bz+z};
                let dimBlock = playerDim.getBlock(vec) as Block;
                if(!dimBlock.isAir && MowingBlockS.indexOf(dimBlock.typeId) != -1) {
                    playerDim.runCommand("setblock " + (bx+xmcount2) + " " + (by+y) + " " + (bz+z) + " air destroy");
                    setFireF = true;
                }
            }
        }
        xmcount2--;
    }, 1);

    playerDim.spawnParticle("kurokumaft:mowing_particle", entity.location);

    system.runTimeout(() => {
        system.clearRun(intervalNumXP);
        system.clearRun(intervalNumZP);
        system.clearRun(intervalNumXM);
        system.clearRun(intervalNumZM);

        if (entity instanceof Player && entity.getGameMode() != GameMode.creative) {
            if (setFireF) {
                decrimentGrimoireCount(entity as Player, itemStack);
            }
        }
    }, 15);

};

interface MusicRecode {
    itemName: string,
    eventName: string,
    viewDesc: string
}

// ミュージックレコード
const MusicRecodes = Object.freeze([
    {
        itemName: "minecraft:music_disc_11",
        eventName: "record.11",
        viewDesc: "item.record_11.desc"
    },
    {
        itemName: "minecraft:music_disc_13",
        eventName: "record.13",
        viewDesc: "item.record_13.desc"
    },
    {
        itemName: "minecraft:music_disc_5",
        eventName: "record.5",
        viewDesc: "item.record_5.desc"
    },
    {
        itemName: "minecraft:music_disc_blocks",
        eventName: "record.blocks",
        viewDesc: "item.record_blocks.desc"
    },
    {
        itemName: "minecraft:music_disc_cat",
        eventName: "record.cat",
        viewDesc: "item.record_cat.desc"
    },
    {
        itemName: "minecraft:music_disc_chirp",
        eventName: "record.chirp",
        viewDesc: "item.record_chirp.desc"
    },
    {
        itemName: "minecraft:music_disc_far",
        eventName: "record.far",
        viewDesc: "item.record_far.desc"
    },
    {
        itemName: "minecraft:music_disc_mal",
        eventName: "record.mall",
        viewDesc: "item.record_mall.desc"
    },
    {
        itemName: "minecraft:music_disc_mellohi",
        eventName: "record.mellohi",
        viewDesc: "item.record_mellohi.desc"
    },
    {
        itemName: "minecraft:music_disc_stal",
        eventName: "record.stal",
        viewDesc: "item.record_stal.desc"
    },
    {
        itemName: "minecraft:music_disc_strad",
        eventName: "record.strad",
        viewDesc: "item.record_strad.desc"
    },
    {
        itemName: "minecraft:music_disc_wait",
        eventName: "record.wait",
        viewDesc: "item.record_wait.desc"
    },
    {
        itemName: "minecraft:music_disc_ward",
        eventName: "record.ward",
        viewDesc: "item.record_ward.desc"
    },
    {
        itemName: "minecraft:music_disc_pigstep",
        eventName: "record.pigstep",
        viewDesc: "item.record_pigstep.desc"
    },
    {
        itemName: "minecraft:music_disc_otherside",
        eventName: "record.otherside",
        viewDesc: "item.record_otherside.desc"
    },
    {
        itemName: "minecraft:music_disc_relic",
        eventName: "record.relic",
        viewDesc: "item.record_relic.desc"
    },
    {
        itemName: "minecraft:music_disc_precipice",
        eventName: "record.precipice",
        viewDesc: "item.record_precipice.desc"
    },
    {
        itemName: "minecraft:music_disc_creator",
        eventName: "record.creator",
        viewDesc: "item.record_creator.desc"
    },
    {
        itemName: "minecraft:music_disc_creator_music_box",
        eventName: "record.creator_music_box",
        viewDesc: "item.record_creator_music_box"
    }
]);

// 魔導書（プレイングサウンド）使用
/**
 * @param {ItemComponentUseEvent} event
 */
export async function musicSound(event:ItemComponentUseEvent) {

    let entity = event.source as Entity;
    let itemStack = event.itemStack as ItemStack;

    world.stopMusic();

    const form = new ActionFormData()
    .title({ translate: "mess.kurokumaft:musicSound.title" })
    .body({ translate: "mess.kurokumaft:musicSound.body" });

    let viewList = new Array();
    if (entity instanceof Player && itemStack.getDynamicPropertyIds().length > 0) {
        itemStack.getDynamicPropertyIds().forEach((sound,index) => {
            let music = itemStack.getDynamicProperty(sound) as string;
            let music_rec = MusicRecodes.find(obj => obj.itemName == music) as MusicRecode;
            form.button({ translate: music_rec.viewDesc});
            viewList.push(music_rec.itemName);
        });
    } else {
        MusicRecodes.forEach(sound => {
            form.button({ translate: sound.viewDesc});
            viewList.push(sound.itemName);
        });
    }

    form.show(entity as Player)
    .then((response: ActionFormResponse) => {
        if (!response.canceled) {
            let music_rec = MusicRecodes.find(obj => obj.itemName == viewList[response.selection!]) as MusicRecode;
            world.playMusic(music_rec.eventName, {
                volume: 1,
                fade: 5
            })
        }
    });
};
