import { Entity, EntityComponentTypes, EntityProjectileComponent, ItemStack, Player, Vector3, world } from "@minecraft/server"
import { getDistanceLocation, getLookLocationDistancePitch } from "./KimetuCommonUtil";

/**
 * 投擲系魔法
 * @param {Entity} entity
 * @param {ItemStack} item
 * @param {string} throwItem
 * @param {number} ranNum
 */
function throwing(entity:Entity, item:ItemStack, throwItem:string, ranNum:number) {

    let bulet = entity.dimension.spawnEntity(throwItem, entity.getHeadLocation());
    item.amount++;

    let projectile = bulet.getComponent(EntityComponentTypes.Projectile) as EntityProjectileComponent;
    projectile.owner = entity;
    projectile.shoot(entity.getViewDirection(), {
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
function shooting(entity:Entity, throwItem:string, ranNum:number, seepd:number, event:string | undefined) {

    const distance = getLookLocationDistancePitch(entity.getRotation(), 1, ranNum);
    const bulet = entity.dimension.spawnEntity(throwItem, getDistanceLocation(
        {
            x:entity.location.x,
            y:entity.location.y+0.5,
            z:entity.location.z
        },
        distance
    ));
    if (event !== undefined) {
        bulet.triggerEvent(event);
    }

    const projectile = bulet.getComponent(EntityComponentTypes.Projectile) as EntityProjectileComponent;
    projectile.owner = entity;
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