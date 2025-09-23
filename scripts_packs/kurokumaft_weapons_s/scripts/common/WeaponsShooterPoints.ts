import { EntityComponentTypes, EntityProjectileComponent, ItemStack, Player, Vector2, Vector3 } from "@minecraft/server";

/**
 * 投擲系
 * @param {Player} player
 * @param {ItemStack} item
 * @param {string} throwItem
 * @param {number} ranNum
 */
export async function throwing(player:Player, item:ItemStack, throwItem:string, ranNum:number) {

    const bulet = player.dimension.spawnEntity(throwItem, player.getHeadLocation());
    item.amount++;

    const projectile = bulet.getComponent(EntityComponentTypes.Projectile) as EntityProjectileComponent;
    projectile.owner = player;
    projectile.shoot(player.getViewDirection(), {
        uncertainty: ranNum
    });

}

/**
 * 投射系
 * @param {Player} player
 * @param {string} throwItem
 * @param {number} ranNum
 * @param {string} event
 */
export async function shooting(player:Player, throwItem:string, ranNum:number, seepd:number, event:string | undefined) {

    const bulet =player.dimension.spawnEntity(throwItem, player.getHeadLocation(), {
        spawnEvent: event
    });

    const projectile = bulet.getComponent(EntityComponentTypes.Projectile) as EntityProjectileComponent;
    projectile.owner = player;
    projectile.shoot(player.getViewDirection(),
    {
        uncertainty: ranNum
    });

    return bulet;
}

/**
 * 投擲発射位置
 * @param {Vector2} rotation
 * @param {Vector3} location
 */
export function getAdjacentSphericalPoints(rotation:Vector2, location:Vector3) {

    const piNum = 75;
    let xapply;
    let yapply;
    let zapply;
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
            const xRota = -(rotation.x - 90) / piNum;
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

        const yRotax = rotation.y / piNum;
        const yRotaz = -(rotation.y - 90) / piNum;
        const yRota = -(rotation.x / piNum);
        // 上～正面
        if (rotation.x >= -90 && rotation.x < 0) {
            const xRota = (rotation.x + 90) / piNum;

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
            const xRota = -(rotation.x - 90) / piNum;
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

        const yRotax = (rotation.y + 180) / piNum;
        const yRotaz = (rotation.y + 90) / piNum;
        const yRota = -(rotation.x / piNum);
        // 上～正面
        if (rotation.x >= -90 && rotation.x < 0) {
            const xRota = (rotation.x + 90) / piNum;
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
            const xRota = -(rotation.x - 90) / piNum;
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
        const yRotax = -(rotation.y - 180) / piNum;
        const yRotaz = -(rotation.y - 90) / piNum;
        const yRota = -(rotation.x / piNum);
        // 上～正面
        if (rotation.x >= -90 && rotation.x < 0) {
            const xRota = (rotation.x + 90) / piNum;
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
            const xRota = -(rotation.x - 90) / piNum;
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
