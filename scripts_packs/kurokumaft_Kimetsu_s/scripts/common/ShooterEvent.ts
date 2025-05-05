import { EntityComponentTypes, EntityProjectileComponent, ItemStack, Player, Vector3 } from "@minecraft/server"
import { getDistanceLocation, getLookLocationDistancePitch } from "./KimetuCommonUtil";

/**
 * 投擲系魔法
 * @param {Player} player
 * @param {ItemStack} item
 * @param {string} throwItem
 * @param {number} ranNum
 */
function throwing(player:Player, item:ItemStack, throwItem:string, ranNum:number) {

    let bulet = player.dimension.spawnEntity(throwItem, player.getHeadLocation());
    item.amount++;

    let projectile = bulet.getComponent(EntityComponentTypes.Projectile) as EntityProjectileComponent;
    projectile.owner = player;
    projectile.shoot(player.getViewDirection(), {
        uncertainty: ranNum
    });

}

/**
 * 投射系魔法
 * @param {Player} player
 * @param {string} throwItem
 * @param {number} ranNum
 * @param {string} event
 */
function shooting(player:Player, throwItem:string, ranNum:number, seepd:number, event:string | undefined) {

    let bulet;
    const distance = getLookLocationDistancePitch(player.getRotation(), 1, 0);

    if (event != undefined) {
        bulet = player.dimension.spawnEntity(throwItem+"<"+event+">", getDistanceLocation(
            {
                x:player.location.x,
                y:player.location.y+0.5,
                z:player.location.z
            },
            distance
        ));
    } else {
        bulet = player.dimension.spawnEntity(throwItem, getDistanceLocation(
            {
                x:player.location.x,
                y:player.location.y+0.5,
                z:player.location.z
            },
            distance
        ));
    }

    let projectile = bulet.getComponent(EntityComponentTypes.Projectile) as EntityProjectileComponent;
    projectile.owner = player;
    projectile.shoot({
        x:distance.x * seepd,
        y:distance.y * seepd,
        z:distance.z * seepd
    },
    {
        uncertainty: ranNum
    });

    return bulet;
}

export {throwing, shooting};