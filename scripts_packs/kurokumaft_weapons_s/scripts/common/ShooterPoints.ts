import { ItemStack, Player, Vector2, Vector3, world } from "@minecraft/server";
import { print } from "./commonUtil";

/**
 * 投擲系
 * @param {Player} player
 * @param {ItemStack} item
 * @param {string} throwItem
 * @param {Vector3} ranNum
 */
export async function throwing(player:Player, item:ItemStack, throwItem:string, ranNum:Vector3) {

    let {xapply, yapply, zapply, xlocation, ylocation, zlocation} = getAdjacentSphericalPoints(player.getRotation(), player.location);

    let bulet = player.dimension.spawnEntity(throwItem, 
        {
            x:xlocation! + ranNum.x,
            y:ylocation! + ranNum.y,
            z:zlocation! + ranNum.z
        }
    );
    item.amount++;
    bulet.setRotation({x:0,y:player.getRotation().y});
    bulet.applyImpulse({x:xapply! * 1.5,y:yapply! * 1.5,z:zapply! * 1.5});

}

/**
 * 投射系
 * @param {Player} player
 * @param {string} throwItem
 * @param {Vector3} ranNum
 * @param {string} event
 */
export async function shooting(player:Player, throwItem:string, ranNum:Vector3, seepd:number, event:string | undefined) {

    let {xapply, yapply, zapply, xlocation, ylocation, zlocation} = getAdjacentSphericalPoints(player.getRotation(), player.location);

    // world.sendMessage("x:"+ xlocation);
    // world.sendMessage("y:"+ ylocation);
    // world.sendMessage("z:"+ zlocation);

    let bulet = player.dimension.spawnEntity(throwItem, 
        {
            x:xlocation! + ranNum.x,
            y:ylocation! + ranNum.y,
            z:zlocation! + ranNum.z
        }
    );

    if (event) {
        bulet.triggerEvent(event);
    }

    bulet.setRotation({x:0,y:player.getRotation().y});
    bulet.applyImpulse({x:xapply! * seepd,y:yapply! * seepd,z:zapply! * seepd});

    return bulet;
}

/**
 * 投擲発射位置
 * @param {Vector2} rotation
 * @param {Vector3} location
 */
function getAdjacentSphericalPoints(rotation:Vector2, location:Vector3) {
    let r = 1.5;  // 半径

    let piNum = 75;
    let xapply;
    let yapply;
    let zapply;
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
            xlocation = location.x + (yRotax * xRota) * 1.75;
            xapply = yRotax * xRota;

            if (rotation.x <= -45) {
                ylocation = (location.y + 1.5) + (yRota) * 1.75;
            } else {
                ylocation = (location.y + 1.75) + (yRota) * 1.5;
            }
            yapply = (yRota);

            zlocation = location.z + (yRotaz * xRota) * 1.75;
            zapply = yRotaz * xRota;

        // 正面～下
        } else if (rotation.x >= 0 && rotation.x <= 90) {
            let xRota = -(rotation.x - 90) / piNum;
            xlocation = location.x + (yRotax * xRota) * 1.75;
            xapply = yRotax * xRota;

            if (rotation.x >= 45) {
                ylocation = (location.y + 1.5) + (yRota) * 1.75;
            } else {
                ylocation = (location.y + 1.75) + (yRota) * 1.5;
            }
            yapply = (yRota);

            zlocation = location.z + (yRotaz * xRota) * 1.75;
            zapply = yRotaz * xRota;

        }

    // 北～東
    } else if (rotation.y >= 0 && rotation.y <= 90) {

        let yRotax = rotation.y / piNum;
        let yRotaz = -(rotation.y - 90) / piNum;
        let yRota = -(rotation.x / piNum);
        // 上～正面
        if (rotation.x >= -90 && rotation.x < 0) {
            let xRota = (rotation.x + 90) / piNum;

            if (rotation.y >= 45) {
                xlocation = location.x - (yRotax * xRota) * 1.75;
            } else {
                xlocation = location.x - (yRotax * xRota + 0.5) * 1.75;
            }
            xapply = -(yRotax * xRota);

            if (rotation.x <= -45) {
                ylocation = (location.y + 1.75) + (yRota) * 1.5;
            } else {
                ylocation = (location.y + 1.5) + (yRota) * 1.75;
            }
            yapply = (yRota);

            if (rotation.y >= 45) {
                zlocation = location.z + (yRotaz * xRota - 0.5) * 1.75;
            } else {
                zlocation = location.z + (yRotaz * xRota) * 1.75;
            }

            zapply = yRotaz * xRota;

        // 正面～下
        } else if (rotation.x >= 0 && rotation.x <= 90) {
            let xRota = -(rotation.x - 90) / piNum;
            if (rotation.y >= 45) {
                xlocation = location.x - (yRotax * xRota) * 1.75;
            } else {
                xlocation = location.x - (yRotax * xRota + 0.5) * 1.75;
            }
            xapply = -(yRotax * xRota);

            if (rotation.x >= 45) {
                ylocation = (location.y + 1.75) + (yRota) * 1.5;
            } else {
                ylocation = (location.y + 1.5) + (yRota) * 1.75;
            }
            yapply = (yRota);

            if (rotation.y >= 45) {
                zlocation = location.z + (yRotaz * xRota - 0.5) * 1.75;
            } else {
                zlocation = location.z + (yRotaz * xRota) * 1.75;
            }
            zapply = yRotaz * xRota;

        }

    // 西～南
    } else if (rotation.y < -90 && rotation.y > -180) {

        let yRotax = (rotation.y + 180) / piNum;
        let yRotaz = (rotation.y + 90) / piNum;
        let yRota = -(rotation.x / piNum);
        // 上～正面
        if (rotation.x >= -90 && rotation.x < 0) {
            let xRota = (rotation.x + 90) / piNum;
            xlocation = location.x + (yRotax * xRota) * 1.75;
            xapply = yRotax * xRota;

            if (rotation.x <= -45) {
                ylocation = (location.y + 1.75) + (yRota) * 1.5;
            } else {
                ylocation = (location.y + 1.5) + (yRota) * 1.75;
            }
            yapply = (yRota);

            zlocation = location.z + (yRotaz * xRota) * 1.75;
            zapply = yRotaz * xRota;

        // 正面～下
        } else if (rotation.x >= 0 && rotation.x <= 90) {
            let xRota = -(rotation.x - 90) / piNum;
            xlocation = location.x + (yRotax * xRota) * 1.75;
            xapply = yRotax * xRota;

            if (rotation.x >= 45) {
                ylocation = (location.y + 1.75) + (yRota) * 1.5;
            } else {
                ylocation = (location.y + 1.5) + (yRota) * 1.75;
            }
            yapply = (yRota);

            zlocation = location.z + (yRotaz * xRota) * 1.75;
            zapply = yRotaz * xRota;

        }

    // 東～南
    } else if (rotation.y > 90 && rotation.y <= 180) {
        let yRotax = -(rotation.y - 180) / piNum;
        let yRotaz = -(rotation.y - 90) / piNum;
        let yRota = -(rotation.x / piNum);
        // 上～正面
        if (rotation.x >= -90 && rotation.x < 0) {
            let xRota = (rotation.x + 90) / piNum;
            xlocation = location.x - (yRotax * xRota) * 1.75;
            xapply = -(yRotax * xRota);

            if (rotation.x <= -45) {
                ylocation = (location.y + 1.5) + (yRota) * 1.75;
            } else {
                ylocation = (location.y + 1.75) + (yRota) * 1.5;
            }
            yapply = (yRota);

            if (rotation.y <= 135) {
                zlocation = location.z + (yRotaz * xRota - 0.5) * 1.75;
            } else {
                zlocation = location.z + (yRotaz * xRota) * 1.75;
            }

            zapply = yRotaz * xRota;

        // 正面～下
        } else if (rotation.x >= 0 && rotation.x <= 90) {
            let xRota = -(rotation.x - 90) / piNum;
            xlocation = location.x - (yRotax * xRota) * 1.75;
            xapply = -(yRotax * xRota);

            if (rotation.x >= 45) {
                ylocation = (location.y + 1.75) + (yRota) * 1.5;
            } else {
                ylocation = (location.y + 1.5) + (yRota) * 1.75;
            }
            yapply = (yRota);

            if (rotation.y <= 135) {
                zlocation = location.z + (yRotaz * xRota - 0.5) * 1.75;
            } else {
                zlocation = location.z + (yRotaz * xRota) * 1.75;
            }
            zapply = yRotaz * xRota;

        }

    }
    return { xapply, yapply, zapply, xlocation, ylocation, zlocation };
}
