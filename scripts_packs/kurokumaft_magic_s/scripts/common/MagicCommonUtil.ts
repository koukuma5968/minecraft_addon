import { world,Player,Entity,Vector2, Vector3, Direction, EntityQueryOptions, Block} from "@minecraft/server";
import { HorizonVector2 } from "./MagicHorizonVector2";
import { MinecraftBlockTypes } from "@minecraft/vanilla-data";

const MagicCraftBlocks = [
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
    return Math.round(Math.random() * (max - min) + min);
}

// サウンド再生
/**
 * @param {Entity} entity
 * @param {String} sound
 */
function playsound(entity:Entity, sound:String) {
    const commandText =  "playsound " + sound + " @s";
    entity.runCommandAsync(commandText);
};

/**
 * 視線位置
 * @param {Vector2} rotation
 * @param {Vector3} location
 * @param {number} point
 */
function getLookPoints(rotation:Vector2, location:Vector3, point:number): Vector3 {
    const piNum = 90;
    let xlocation;
    let ylocation;
    let zlocation;

    // 西～北
    if (rotation.y >= -90 && rotation.y < 0) {
        const yRotax = -rotation.y / piNum;
        const yRotaz = (rotation.y + 90) / piNum;
        const yRota = -(rotation.x / piNum);
        // 上～正面
        if (rotation.x >= -90 && rotation.x < 0) {
            const xRota = (rotation.x + 90) / piNum;
            xlocation = location.x + (yRotax * xRota) * point;
            ylocation = (location.y + 1.5) + (yRota) * point;
            zlocation = location.z + (yRotaz * xRota) * point;

        // 正面～下
        } else if (rotation.x >= 0 && rotation.x <= 90) {
            const xRota = -(rotation.x - 90) / piNum;
            xlocation = location.x + (yRotax * xRota) * point;
            ylocation = (location.y + 1.5) + (yRota) * point;
            zlocation = location.z + (yRotaz * xRota) * point;
        }

    // 北～東
    } else if (rotation.y >= 0 && rotation.y <= 90) {

        const yRotax = -rotation.y / piNum;
        const yRotaz = -(rotation.y - 90) / piNum;
        const yRota = -(rotation.x / piNum);
        // 上～正面
        if (rotation.x >= -90 && rotation.x < 0) {
            const xRota = (rotation.x + 90) / piNum;
            xlocation = location.x + (yRotax * xRota) * point;
            ylocation = (location.y + 1.5) + (yRota) * point;
            zlocation = location.z + (yRotaz * xRota) * point;
        // 正面～下
        } else if (rotation.x >= 0 && rotation.x <= 90) {
            const xRota = -(rotation.x - 90) / piNum;
            xlocation = location.x + (yRotax * xRota) * point;
            ylocation = (location.y + 1.5) + (yRota) * point;
            zlocation = location.z + (yRotaz * xRota) * point;
        }

    // 西～南
    } else if (rotation.y < -90 && rotation.y > -180) {

        const yRotax = (rotation.y + 180) / piNum;
        const yRotaz = (rotation.y + 90) / piNum;
        const yRota = -(rotation.x / piNum);
        // 上～正面
        if (rotation.x >= -90 && rotation.x < 0) {
            const xRota = (rotation.x + 90) / piNum;
            xlocation = location.x + (yRotax * xRota) * point;
            ylocation = (location.y + 1.5) + (yRota) * point;
            zlocation = location.z + (yRotaz * xRota) * point;

        // 正面～下
        } else if (rotation.x >= 0 && rotation.x <= 90) {
            const xRota = -(rotation.x - 90) / piNum;
            xlocation = location.x + (yRotax * xRota) * point;
            ylocation = (location.y + 1.5) + (yRota) * point;
            zlocation = location.z + (yRotaz * xRota) * point;
        }

    // 東～南
    } else if (rotation.y > 90 && rotation.y <= 180) {
        const yRotax = (rotation.y - 180) / piNum;
        const yRotaz = -(rotation.y - 90) / piNum;
        const yRota = -(rotation.x / piNum);
        // 上～正面
        if (rotation.x >= -90 && rotation.x < 0) {
            const xRota = (rotation.x + 90) / piNum;
            xlocation = location.x + (yRotax * xRota) * point;
            ylocation = (location.y + 1.5) + (yRota) * point;
            zlocation = location.z + (yRotaz * xRota) * point;
        // 正面～下
        } else if (rotation.x >= 0 && rotation.x <= 90) {
            const xRota = -(rotation.x - 90) / piNum;
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
function getLookRotaionPointsV2(rotation:Vector2, point:number, side:number) : HorizonVector2 {
    const piNum = 90;
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

/**
 * 水平視線位置取得
 * @param {number} angle
 * @param {number} forwardPoint
 * @param {number} sidePoint
 * @param {number} udFixed
 */
function getLookLocationDistance(angle: number, forwardPoint:number, sidePoint:number, udFixed:number) : Vector3 {

    const forwardRad = degToRad(angle);

    const forntDisPoint = {
        x: -(Math.sin(forwardRad)) * forwardPoint,
        z: (Math.cos(forwardRad)) * forwardPoint,
    }

    if (sidePoint < 0) {
        const leftRad = degToRad(angle + 90);
        forntDisPoint.x = forntDisPoint.x + Math.sin(leftRad) * -sidePoint;
        forntDisPoint.z = forntDisPoint.z + Math.cos(leftRad) * -sidePoint;
    } else if (sidePoint > 0) {
        const rightRad = degToRad(angle - 90);
        forntDisPoint.x = forntDisPoint.x + Math.sin(rightRad) * sidePoint;
        forntDisPoint.z = forntDisPoint.z + Math.cos(rightRad) * sidePoint;
    }

    const angleDisPoint = {
        x: Number(forntDisPoint.x.toFixed(3)),
        y: udFixed,
        z: Number(forntDisPoint.z.toFixed(3))
    };

    return angleDisPoint;
}

/**
 * 空間視線位置取得
 * @param {Vector2} angle
 * @param {number} forwardPoint
 * @param {number} sidePoint
 */
function getLookLocationDistancePitch(angle: Vector2, forwardPoint:number, sidePoint:number) : Vector3 {

    const forwardRad = degToRad(angle.y);
    const pitchRad = degToRad(angle.x);

    let angleDisPoint = {
        x: -(Math.cos(pitchRad) * Math.sin(forwardRad)) * forwardPoint,
        y: Math.sin(pitchRad) * forwardPoint,
        z: (Math.cos(pitchRad) * Math.cos(forwardRad)) * forwardPoint,
    };

    if (sidePoint < 0) {
        const leftRad = degToRad(angle.y + 90);
        angleDisPoint = crossProduct(angleDisPoint, {
            x: Math.sin(leftRad) * -sidePoint,
            y: 0,
            z: Math.cos(leftRad) * -sidePoint
        });
    } else if (sidePoint > 0) {
        const rightRad = degToRad(angle.y - 90);
        angleDisPoint = crossProduct(angleDisPoint, {
            x: Math.sin(rightRad) * sidePoint,
            y: 0,
            z: Math.cos(rightRad) * sidePoint
        });
    }

    const retDisPoint = {
        x: Number(angleDisPoint.x.toFixed(3)),
        y: -Number(angleDisPoint.y.toFixed(3)),
        z: Number(angleDisPoint.z.toFixed(3))
    };
    return retDisPoint;
}

function degToRad(deg: number): number {
  return deg * Math.PI / 180;
}

function crossProduct(front: Vector3, side: Vector3): Vector3 {
    return {
      x: Number((front.x * + side.x).toFixed(3)),
      y: Number(front.y.toFixed(3)),
      z: Number((front.z + side.z).toFixed(3)),
    };
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

/**
 * 空間視線位置取得
 * @param {Vector3} origin
 * @param {Vector3} distance
 */
function getDistanceLocation(origin: Vector3, distance:Vector3) : Vector3 {
    const angleDisPoint = {
        x: Number((origin.x + distance.x).toFixed(3)),
        y: Number((origin.y + distance.y).toFixed(3)),
        z: Number((origin.z + distance.z).toFixed(3))
    };

    return angleDisPoint;
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
    const tags = player.getTags();
    if (tags != undefined && tags.length > 0) {
        for (const index in tags) {
            if (tags[index].indexOf("team") != -1) {
                filterOption.excludeTags.push(tags[index]);
            }
        }
    }

};

// 岩盤破壊キャンセル
export function explodeBedrock(impactBLockList:Block[]): Block[] | undefined {
    try {
        const filterBlockList = impactBLockList.filter(block => {
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

export { print, clamp, getRandomInRange, playsound, getLookPoints, getLookRotaionPointsV2, getDistanceLocation, getDirectionVector, addTeamsTagFilter,
    getLookLocationDistance, getLookLocationDistancePitch, 
    MagicCraftBlocks, BlockLocationList };
