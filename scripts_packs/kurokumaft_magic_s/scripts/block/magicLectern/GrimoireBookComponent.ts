
interface GrimoireBook extends Map<string, Object> {
    typeId: string,
    event: string,
    items: Items
}

interface Items extends Array<Items> {
    name: string,
    multiValue: number,
}[]

// 魔導書オブジェクト
const GrimoireBookOjects = Object.freeze({
    empty: {
        typeId: "kurokumaft:grimoire_empty",
        event : "kurokumaft:none",
        items : [
            {name: "", multiValue: 0},
        ]
    },
    torch: {
        typeId: "kurokumaft:grimoire_torchlight",
        event : "kurokumaft:fire",
        items : [
            {name: "minecraft:coal", multiValue: 1},
            {name: "minecraft:coal_block", multiValue: 9},
            {name: "minecraft:charcoal", multiValue: 1}
        ]
    },
    ignited: {
        typeId: "kurokumaft:grimoire_ignited",
        event : "kurokumaft:fire",
        items : [
            {name: "minecraft:flint", multiValue: 1}
        ]
    },
    water: {
        typeId: "kurokumaft:grimoire_water",
        event : "kurokumaft:water",
        items : [
            {name: "minecraft:water_bucket", multiValue: 10}
        ]
    },
    mowing: {
        typeId: "kurokumaft:grimoire_mowing",
        event : "kurokumaft:wind",
        items : [
            {name: "minecraft:shears", multiValue: 9}
        ]
    },
    music_sound: {
        typeId: "kurokumaft:grimoire_music_sound",
        event : "kurokumaft:wind",
        items : [
            {name: "minecraft:music_disc_11", multiValue: 10},
            {name: "minecraft:music_disc_13", multiValue: 10},
            {name: "minecraft:music_disc_5", multiValue: 10},
            {name: "minecraft:music_disc_blocks", multiValue: 10},
            {name: "minecraft:music_disc_cat", multiValue: 10},
            {name: "minecraft:music_disc_chirp", multiValue: 10},
            {name: "minecraft:music_disc_far", multiValue: 10},
            {name: "minecraft:music_disc_mall", multiValue: 10},
            {name: "minecraft:music_disc_mellohi", multiValue: 10},
            {name: "minecraft:music_disc_otherside", multiValue: 10},
            {name: "minecraft:music_disc_pigstep", multiValue: 10},
            {name: "minecraft:music_disc_relic", multiValue: 10},
            {name: "minecraft:music_disc_stal", multiValue: 10},
            {name: "minecraft:music_disc_strad", multiValue: 10},
            {name: "minecraft:music_disc_wait", multiValue: 10},
            {name: "minecraft:music_disc_ward", multiValue: 10},
            {name: "minecraft:music_disc_precipice", multiValue: 10},
            {name: "minecraft:music_disc_creator", multiValue: 10},
            {name: "minecraft:music_disc_creator_music_box", multiValue: 10}
        ]
    },
    growth: {
        typeId: "kurokumaft:grimoire_growth",
        event : "kurokumaft:stone",
        items : [
            {name: "minecraft:bone_meal", multiValue: 1},
            {name: "minecraft:bone_block", multiValue: 9},
            {name: "minecraft:bone", multiValue: 3}
        ]
    },
    flower_garden: {
        typeId: "kurokumaft:grimoire_flower_garden",
        event : "kurokumaft:stone",
        items : [
            {name: "minecraft:poppy", multiValue: 1},
            {name: "minecraft:blue_orchid", multiValue: 1},
            {name: "minecraft:allium", multiValue: 1},
            {name: "minecraft:azure_bluet", multiValue: 1},
            {name: "minecraft:red_tulip", multiValue: 1},
            {name: "minecraft:orange_tulip", multiValue: 1},
            {name: "minecraft:white_tulip", multiValue: 1},
            {name: "minecraft:pink_tulip", multiValue: 1},
            {name: "minecraft:oxeye_daisy", multiValue: 1},
            {name: "minecraft:cornflower", multiValue: 1},
            {name: "minecraft:lily_of_the_valley", multiValue: 1},
            {name: "minecraft:double_plant", multiValue: 4}
        ]
    }
});

/**
 * 魔導書名の魔導書アイテムオブジェクトを返す
 * @param {string} bookId
 */
function getGrimoireObjectId(bookId:string) {
    let grimoireKeys = Object.keys(GrimoireBookOjects) as (keyof typeof GrimoireBookOjects)[];
    return grimoireKeys.find(obj => GrimoireBookOjects[obj].typeId == bookId) as string;
};

/**
 * 魔導書アイテムオブジェクトに対応するアイテムか判定する
 * @param {string} grimoireItemType
 * @param {string} itemName
 */
function isGrimoireItemsObject(grimoireItemType:string, itemName:string) {
    let grimoireKeys = Object.keys(GrimoireBookOjects) as (keyof typeof GrimoireBookOjects)[];
    let type = grimoireKeys.find(obj => obj == grimoireItemType);
    if (type) {
        return GrimoireBookOjects[type].items.find(item => item.name == itemName) != undefined;
    }
    return false;

};

/**
 * 魔導書オブジェクトの中から魔導書アイテムオブジェクトに対応するアイテムか判定する
 * @param {string} itemName
 */
function isGrimoireAllItemsObject(itemName:string) {
    let items = (Object.values(GrimoireBookOjects).find(obj => {
        return obj.items.find(itemObj => {
            return itemObj.name == itemName;
        });
    }));
    return items != undefined;
};

/**
 * 魔導書アイテムオブジェクトに対応するアイテムの乗算値を返す
 * @param {Items} grimoireItems
 * @param {string} itemName
 */
function getGrimoireItemsMultiValue(grimoireItemType:string, itemName:string) {
    let grimoireKeys = Object.keys(GrimoireBookOjects) as (keyof typeof GrimoireBookOjects)[];
    let type = grimoireKeys.find(obj => obj == grimoireItemType);
    if (type) {
        return GrimoireBookOjects[type].items.find(item => item.name == itemName)?.multiValue;
    }
    return 0;
};

/**
 * 魔導書オブジェクトの中から魔導書アイテムオブジェクトに対応するアイテムの乗算値を返す
 * @param {string} itemName
 */
function getGrimoireAllItemsMultiValue(itemName:string) {
    let retVal = 1;
    Object.values(GrimoireBookOjects).forEach(obj => {
        obj.items.forEach(itemObj => {
            if (itemObj.name == itemName) {
                retVal = itemObj.multiValue;
            }
        });
    });
    return retVal;
};

/**
 * 魔導書オブジェクトの中から魔導書アイテムオブジェクトに対応するアイテムを持つIDを返す
 * @param {string} itemName
 */
function getGrimoireAllItemsId(itemName:string) {
    let obj = Object.values(GrimoireBookOjects).find(obj => {
        let filObj = obj.items.find(itemObj => {
            return itemObj.name == itemName;
        });
        return filObj;
    }) as GrimoireBook;
    return obj.typeId as string;
};

/**
 * 魔導書オブジェクトの中からIDに対応するアイテムを持つイベントを返す
 * @param {string} typeId
 */
function getGrimoireAllItemsEvent(typeId:string) {
    let obj = Object.values(GrimoireBookOjects).find(obj => {
        return obj.typeId == typeId;
    }) as GrimoireBook;
    return obj.event as string;
};

/**
 * 魔導書オブジェクトIDに一致する魔導書名かどうか
 * @param {string} bookName;
 */
function isGrimoireAllItemsId(bookName:string) {
    return Object.values(GrimoireBookOjects).find(obj => {
        return obj.typeId == bookName;
    }) != undefined;
};

/**
 * 魔導書オブジェクトIDに一致する魔導書名かどうか
 * @param {string} bookName;
 */
function getGrimoireAllObjectsId(bookName:string) {
    return Object.values(GrimoireBookOjects).find(obj => {
        return obj.typeId == bookName;
    }) as unknown as GrimoireBook;
};

export { getGrimoireObjectId, isGrimoireItemsObject, isGrimoireAllItemsObject, getGrimoireItemsMultiValue, getGrimoireAllItemsMultiValue, getGrimoireAllItemsId
    , isGrimoireAllItemsId, getGrimoireAllObjectsId, getGrimoireAllItemsEvent, GrimoireBook };
