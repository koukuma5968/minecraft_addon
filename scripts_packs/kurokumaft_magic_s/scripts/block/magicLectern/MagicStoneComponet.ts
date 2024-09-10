import {print} from "../../common/commonUtil"

interface MagicStoneOjects {
    name: string,
    state: number,
    event: string
}

// 魔法石オブジェクト
const MagicStoneOjects = Object.freeze([
    {
        name: "kurokumaft:fire_magic_stone",
        state: 1,
        event : "kurokumaft:fire"
    },
    {
        name: "kurokumaft:water_magic_stone",
        state: 2,
        event : "kurokumaft:water"
    },
    {
        name: "kurokumaft:stone_magic_stone",
        state: 3,
        event : "kurokumaft:stone"
    },
    {
        name: "kurokumaft:wind_magic_stone",
        state: 4,
        event : "kurokumaft:wind"
    },
    {
        name: "kurokumaft:lightning_magic_stone",
        state: 5,
        event : "kurokumaft:lightning"
    },
    {
        name: "kurokumaft:ice_magic_stone",
        state: 6,
        event : "kurokumaft:ice"
    },
    {
        name: "kurokumaft:ligh_magic_stone",
        state: 7,
        event : "kurokumaft:ligh"
    },
    {
        name: "kurokumaft:dark_magic_stone",
        state: 8,
        event : "kurokumaft:dark"
    }
]);

/**
 * 魔法石名に一致する魔法石オブジェクトを返す
 * @param {string} stoneName
 */
function getMagicStoneOjectByName(stoneName:string) {
    return MagicStoneOjects.find(obj => obj.name == stoneName) as MagicStoneOjects;
};

/**
 * 魔法石名に一致する魔法石オブジェクトがあるか判定する
 * @param {string} stoneName
 */
function isMagicStoneOject(stoneName:string) {
    return MagicStoneOjects.find(obj => obj.name == stoneName) != undefined;
};

export { getMagicStoneOjectByName, isMagicStoneOject, MagicStoneOjects };