import { Vector2, Vector3} from "@minecraft/server";

// 乱数
/**
 * @param {number} min
 * @param {number} max
 */
function getRandomInRange(min:number, max:number) {
    return Math.round(Math.random() * (max - min) + min);
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
 * 視線位置
 * @param {Vector2} rotation
 * @param {Vector3} location
 * @param {number} point
 */
function getLookPoints(rotation:Vector2, location:Vector3, point:number) : Vector3 {
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
            xlocation = location.x + ((yRotax * xRota) * point);
            ylocation = (location.y + 0.5) + (yRota);
            zlocation = location.z + ((yRotaz * xRota) * point);

        // 正面～下
        } else if (rotation.x >= 0 && rotation.x <= 90) {
            let xRota = -(rotation.x - 90) / piNum;
            xlocation = location.x + ((yRotax * xRota) * point);
            ylocation = (location.y + 0.5) + (yRota);
            zlocation = location.z + ((yRotaz * xRota) * point)
        }

    // 北～東
    } else if (rotation.y >= 0 && rotation.y <= 90) {

        let yRotax = -rotation.y / piNum;
        let yRotaz = -(rotation.y - 90) / piNum;
        let yRota = -(rotation.x / piNum);
        // 上～正面
        if (rotation.x >= -90 && rotation.x < 0) {
            let xRota = (rotation.x + 90) / piNum;
            xlocation = location.x + ((yRotax * xRota) * point);
            ylocation = (location.y + 0.5) + (yRota);
            zlocation = location.z + ((yRotaz * xRota) * point);
        // 正面～下
        } else if (rotation.x >= 0 && rotation.x <= 90) {
            let xRota = -(rotation.x - 90) / piNum;
            xlocation = location.x + ((yRotax * xRota) * point);
            ylocation = (location.y + 0.5) + (yRota);
            zlocation = location.z + ((yRotaz * xRota) * point);
        }

    // 西～南
    } else if (rotation.y < -90 && rotation.y > -180) {

        let yRotax = (rotation.y + 180) / piNum;
        let yRotaz = (rotation.y + 90) / piNum;
        let yRota = -(rotation.x / piNum);
        // 上～正面
        if (rotation.x >= -90 && rotation.x < 0) {
            let xRota = (rotation.x + 90) / piNum;
            xlocation = location.x + ((yRotax * xRota) * point);
            ylocation = (location.y + 0.5) + (yRota);
            zlocation = location.z + ((yRotaz * xRota) * point);

        // 正面～下
        } else if (rotation.x >= 0 && rotation.x <= 90) {
            let xRota = -(rotation.x - 90) / piNum;
            xlocation = location.x + ((yRotax * xRota) * point);
            ylocation = (location.y + 0.5) + (yRota);
            zlocation = location.z + ((yRotaz * xRota) * point);
        }

    // 東～南
    } else if (rotation.y > 90 && rotation.y <= 180) {
        let yRotax = (rotation.y - 180) / piNum;
        let yRotaz = -(rotation.y - 90) / piNum;
        let yRota = -(rotation.x / piNum);
        // 上～正面
        if (rotation.x >= -90 && rotation.x < 0) {
            let xRota = (rotation.x + 90) / piNum;
            xlocation = location.x + ((yRotax * xRota) * point);
            ylocation = (location.y + 0.5) + (yRota);
            zlocation = location.z + ((yRotaz * xRota) * point);
        // 正面～下
        } else if (rotation.x >= 0 && rotation.x <= 90) {
            let xRota = -(rotation.x - 90) / piNum;
            xlocation = location.x + ((yRotax * xRota) * point);
            ylocation = (location.y + 0.5) + (yRota);
            zlocation = location.z + ((yRotaz * xRota) * point);
        }

    }
    return { x:xlocation!, y:ylocation!, z:zlocation! };
}

export { getDirectionVector, getRandomInRange, getLookPoints };
