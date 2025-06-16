import { world,Player,Vector2, Vector3, Direction, EntityQueryOptions, Block, Entity, EntityComponentTypes, EntityTypeFamilyComponent} from "@minecraft/server";

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

/**
 * @param {number} current
 * @param {number} max
 * @param {number} percent
 */
function isBelowThreshold(current: number, max: number, percent: number): boolean {
  return current <= max * percent;
}

// サウンド再生
/**
 * @param {Player} entity
 * @param {string} sound
 */
function playsound(entity:Player, sound:string) {
    entity.playSound(sound);
};

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

function crossProduct(front: Vector3, side: Vector3): Vector3 {
    return {
      x: Number((front.x * + side.x).toFixed(3)),
      y: Number(front.y.toFixed(3)),
      z: Number((front.z + side.z).toFixed(3)),
    };
}

function degToRad(deg: number): number {
  return deg * Math.PI / 180;
}

function getForwardPosition(origin: Vector3, angleZ: number, distance: number): Vector3 {
  const rad = degToRad(angleZ);
  return {
    x: origin.x + Math.sin(rad) * distance,
    y: origin.y,
    z: origin.z + Math.cos(rad) * distance
  };
}

function getRightPosition(origin: Vector3, angleZ: number, distance: number): Vector3 {
  const rad = degToRad(angleZ + 90);
  return {
    x: origin.x + Math.sin(rad) * distance,
    y: origin.y,
    z: origin.z + Math.cos(rad) * distance
  };
}

function getLeftPosition(origin: Vector3, angleZ: number, distance: number): Vector3 {
  const rad = degToRad(angleZ - 90);
  return {
    x: origin.x + Math.sin(rad) * distance,
    y: origin.y,
    z: origin.z + Math.cos(rad) * distance
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

function addRegimentalFilter(closest:number, location:Vector3, maxDis:number, entity:Entity): EntityQueryOptions {

    let filterOption = {
        excludeFamilies: [
            "inanimate", "regimental_soldier", "villager", "animal"
        ],
        excludeTypes: [
            "item"
        ],
        excludeTags: [
            entity.id
        ],
        location: location,
        maxDistance: maxDis
    } as EntityQueryOptions;

    const familyTypes = entity.getComponent(EntityComponentTypes.TypeFamily) as EntityTypeFamilyComponent;
    if (familyTypes != undefined && familyTypes.hasTypeFamily("ogre")) {
        filterOption.excludeFamilies = [
            "inanimate", "animal"
        ];
    }

    if (!world.gameRules.pvp) {
        filterOption.excludeFamilies?.push("player");
    }
    if (closest != 0) {
        filterOption.closest = closest;
    }

    return filterOption;

};

function addOrgeFilter(closest:number, location:Vector3, maxDis:number, exeTag:string): EntityQueryOptions {

    const filterOption = {
        excludeFamilies: [
            "inanimate", "animal"
        ],
        excludeTypes: [
            "item"
        ],
        excludeTags: [
            exeTag
        ],
        location: location,
        maxDistance: maxDis
    } as EntityQueryOptions;

    if (!world.gameRules.pvp) {
        filterOption.excludeFamilies?.push("player");
    }
    if (closest != 0) {
        filterOption.closest = closest;
    }

    return filterOption;

};

function addProjectionFilter(closest:number, location:Vector3, maxDis:number): EntityQueryOptions {

    let filterOption = {
        families: [
            "arrow"
        ],
        location: location,
        maxDistance: maxDis
    } as EntityQueryOptions;

    if (closest != 0) {
        filterOption.closest = closest;
    }

    return filterOption;

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

const weightChoice = (list: any[]) => {
    const totalWeight = list.reduce((p, c) => {
        return { weight: p.weight + c.weight }
    }).weight

    return {
        pick () {
            const r = Math.random() * totalWeight;
            let s = 0.0;
            for (const l of list) {
                s += l.weight
                if (r < s) { return l.item }
            }
        }
    }
};

function getForwardVector(angleZ: number): Vector3 {
    const rad = degToRad(angleZ);
    return {
      x: Math.cos(rad),
      y: 0,
      z: Math.sin(rad),
    };
}
  
function normalize(v: Vector3): Vector3 {
    const length = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
    return { x: v.x / length, y: v.y / length, z: v.z / length };
}

function dot(v1: Vector3, v2: Vector3): number {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
}

function distance(v1: Vector3, v2: Vector3): number {
    const dx = v1.x - v2.x;
    const dy = v1.y - v2.y;
    const dz = v1.z - v2.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

function isTargetInFront(myPos: Vector3, yawDeg: number, targetPos: Vector3, maxHalfAngleDeg: number, maxDistance: number): boolean {

    const forward = normalize(getForwardVector(yawDeg));

    // ターゲットへのXZ方向ベクトルだけ作る（水平のみ）
    const toTarget = normalize({
      x: targetPos.x - myPos.x,
      y: 0,
      z: targetPos.z - myPos.z,
    });
  
    const dist = distance(myPos, targetPos);
  
    // 内積（cosθ）を取る
    const cosTheta = dot(forward, toTarget);
    const thetaDeg = Math.acos(cosTheta) * (180 / Math.PI);
  
    return thetaDeg <= maxHalfAngleDeg && dist <= maxDistance;
}

export { print, clamp, getRandomInRange, playsound, getDistanceLocation, isBelowThreshold,
    getDirectionVector, addRegimentalFilter, addOrgeFilter, addProjectionFilter, BlockLocationList, weightChoice,
    getForwardPosition, getRightPosition, getLeftPosition, getLookLocationDistance, getLookLocationDistancePitch, isTargetInFront,
    getForwardVector };
