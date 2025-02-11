import { world,Player,Entity,Vector2, Vector3, Direction, EntityQueryOptions, Block} from "@minecraft/server";
import { HorizonVector2 } from "./MagicHorizonVector2";
import { MinecraftBlockTypes } from "@minecraft/vanilla-data";

const CraftBlocks = [
    MinecraftBlockTypes.CraftingTable,
    MinecraftBlockTypes.Anvil,
    MinecraftBlockTypes.SmithingTable,
    MinecraftBlockTypes.CartographyTable,
    MinecraftBlockTypes.Loom,
    MinecraftBlockTypes.Barrel,
    MinecraftBlockTypes.Smoker,
    MinecraftBlockTypes.BlastFurnace,
    MinecraftBlockTypes.Furnace,
    "kurokumaft:magic_lectern"
];

// デバッグ用
/**
 * @param {Object} text
 */
function print(text:Object) {
    world.sendMessage(text + "");
};

// 制限
/**
 * @param {number} min
 * @param {number} max
 */
function clamp(value:number, min:number, max:number) {
    return Math.min(Math.max(value, min), max);
};

// 乱数
/**
 * @param {number} min
 * @param {number} max
 */
function getRandomInRange(min:number, max:number) {
    return Math.random() * (max - min) + min;
}

// サウンド再生
/**
 * @param {Entity} entity
 * @param {String} sound
 */
function playsound(entity:Entity, sound:String) {
    let commandText =  "playsound " + sound + " @s";
    entity.runCommandAsync(commandText);
};

/**
 * 視線位置
 * @param {Vector2} rotation
 * @param {Vector3} location
 * @param {number} point
 */
function getLookPoints(rotation:Vector2, location:Vector3, point:number): Vector3 {
    let piNum = 90;
    let xlocation;
    let ylocation;
    let zlocation;

    // 西～北
    if (rotation.y >= -90 && rotation.y < 0) {
        let yRotax = -rotation.y / piNum;
        let yRotaz = (rotation.y + 90) / piNum;
        let yRota = -(rotation.x / piNum);
        // 上～正面
        if (rotation.x >= -90 && rotation.x < 0) {
            let xRota = (rotation.x + 90) / piNum;
            xlocation = location.x + (yRotax * xRota) * point;
            ylocation = (location.y + 1.5) + (yRota) * point;
            zlocation = location.z + (yRotaz * xRota) * point;

        // 正面～下
        } else if (rotation.x >= 0 && rotation.x <= 90) {
            let xRota = -(rotation.x - 90) / piNum;
            xlocation = location.x + (yRotax * xRota) * point;
            ylocation = (location.y + 1.5) + (yRota) * point;
            zlocation = location.z + (yRotaz * xRota) * point;
        }

    // 北～東
    } else if (rotation.y >= 0 && rotation.y <= 90) {

        let yRotax = -rotation.y / piNum;
        let yRotaz = -(rotation.y - 90) / piNum;
        let yRota = -(rotation.x / piNum);
        // 上～正面
        if (rotation.x >= -90 && rotation.x < 0) {
            let xRota = (rotation.x + 90) / piNum;
            xlocation = location.x + (yRotax * xRota) * point;
            ylocation = (location.y + 1.5) + (yRota) * point;
            zlocation = location.z + (yRotaz * xRota) * point;
        // 正面～下
        } else if (rotation.x >= 0 && rotation.x <= 90) {
            let xRota = -(rotation.x - 90) / piNum;
            xlocation = location.x + (yRotax * xRota) * point;
            ylocation = (location.y + 1.5) + (yRota) * point;
            zlocation = location.z + (yRotaz * xRota) * point;
        }

    // 西～南
    } else if (rotation.y < -90 && rotation.y > -180) {

        let yRotax = (rotation.y + 180) / piNum;
        let yRotaz = (rotation.y + 90) / piNum;
        let yRota = -(rotation.x / piNum);
        // 上～正面
        if (rotation.x >= -90 && rotation.x < 0) {
            let xRota = (rotation.x + 90) / piNum;
            xlocation = location.x + (yRotax * xRota) * point;
            ylocation = (location.y + 1.5) + (yRota) * point;
            zlocation = location.z + (yRotaz * xRota) * point;

        // 正面～下
        } else if (rotation.x >= 0 && rotation.x <= 90) {
            let xRota = -(rotation.x - 90) / piNum;
            xlocation = location.x + (yRotax * xRota) * point;
            ylocation = (location.y + 1.5) + (yRota) * point;
            zlocation = location.z + (yRotaz * xRota) * point;
        }

    // 東～南
    } else if (rotation.y > 90 && rotation.y <= 180) {
        let yRotax = (rotation.y - 180) / piNum;
        let yRotaz = -(rotation.y - 90) / piNum;
        let yRota = -(rotation.x / piNum);
        // 上～正面
        if (rotation.x >= -90 && rotation.x < 0) {
            let xRota = (rotation.x + 90) / piNum;
            xlocation = location.x + (yRotax * xRota) * point;
            ylocation = (location.y + 1.5) + (yRota) * point;
            zlocation = location.z + (yRotaz * xRota) * point;
        // 正面～下
        } else if (rotation.x >= 0 && rotation.x <= 90) {
            let xRota = -(rotation.x - 90) / piNum;
            xlocation = location.x + (yRotax * xRota) * point;
            ylocation = (location.y + 1.5) + (yRota) * point;
            zlocation = location.z + (yRotaz * xRota) * point;
        }

    }
    return { x:xlocation!, y:ylocation!, z:zlocation! };
}

/**
 * 視線方向
 * @param {Vector2} rotation
 * @param {number} point
 * @param {number} side
 */
function getLookRotaionPoints(rotation:Vector2, point:number, side:number) : HorizonVector2 {
    let piNum = 90;
    let rotax;
    let rotaz;

    // 西～北
    if (rotation.y >= -90 && rotation.y < 0) {
        rotax = (-rotation.y / piNum) * point + (side * ((rotation.y + 90) / piNum));
        rotaz = ((rotation.y + 90) / piNum) * point + (side * (-rotation.y / piNum));
    // 北～東
    } else if (rotation.y >= 0 && rotation.y <= 90) {
        rotax = (-rotation.y / piNum) * point + (side * (-(rotation.y + 90) / piNum));
        rotaz = (-(rotation.y - 90) / piNum) * point + (side * (-rotation.y / piNum));
    // 西～南
    } else if (rotation.y < -90 && rotation.y > -180) {
        rotax = ((rotation.y + 180) / piNum) * point + (side * ((rotation.y + 90) / piNum));
        rotaz = ((rotation.y + 90) / piNum) * point + (side * ((rotation.y + 180) / piNum));
    // 東～南
    } else if (rotation.y > 90 && rotation.y <= 180) {
        rotax = ((rotation.y - 180) / piNum) * point + (side * (-(rotation.y - 90) / piNum));
        rotaz = (-(rotation.y - 90) / piNum) * point + (side * ((rotation.y - 180) / piNum));
    }
    return { x:rotax!, z:rotaz! };
}

function normalizeVector(v: Vector3): Vector3 {
    const length = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
    return {
        x: v.x / length,
        y: v.y / length,
        z: v.z / length
    };
}

function getDirectionVector(thisEn: Vector3, targetEn: Vector3): Vector3 {
    const direction = {
        x: targetEn.x - thisEn.x,
        y: targetEn.y - thisEn.y,
        z: targetEn.z - thisEn.z
    };
    return normalizeVector(direction);
}

function addTeamsTagFilter(player:Player, filterOption:EntityQueryOptions) {

    if (filterOption.excludeFamilies == undefined) {
        filterOption.excludeFamilies = ["inanimate", "magic", "arrow"];
    } else {
        filterOption.excludeFamilies.push("inanimate", "magic", "arrow");
    }
    if (!world.gameRules.pvp) {
        filterOption.excludeFamilies.push("player");
    }

    if (filterOption.excludeTypes == undefined) {
        filterOption.excludeTypes = ["item"];
    } else {
        filterOption.excludeTypes.push("item");
    }

    if (filterOption.excludeTags == undefined) {
        filterOption.excludeTags = ["main_shield_guard", "off_shield_guard"];
    } else {
        filterOption.excludeTags.push("main_shield_guard", "off_shield_guard");
    }
    let tags = player.getTags();
    if (tags != undefined && tags.length > 0) {
        for (let index in tags) {
            if (tags[index].indexOf("team") != -1) {
                filterOption.excludeTags.push(tags[index]);
            }
        }
    }

};

// 岩盤破壊キャンセル
export function explodeBedrock(impactBLockList:Block[]): Block[] | undefined {
    try {
        let filterBlockList = impactBLockList.filter(block => {
            if (block.location.y >= -64) {
                if (!block.matches("minecraft:bedrock")) {
                    return block;
                }
            }
        });
        return filterBlockList;
    } catch (error) {
    }

}

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

export { print, clamp, getRandomInRange, playsound, getLookPoints, getLookRotaionPoints, getDirectionVector, addTeamsTagFilter, CraftBlocks, BlockLocationList };
