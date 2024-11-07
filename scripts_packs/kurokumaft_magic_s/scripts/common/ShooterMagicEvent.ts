import { EntityComponentTypes, EntityProjectileComponent, ItemStack, Player } from "@minecraft/server"

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

    let bulet = player.dimension.spawnEntity(throwItem, player.getHeadLocation());
    
    if (event) {
        bulet.triggerEvent(event);
    }

    let projectile = bulet.getComponent(EntityComponentTypes.Projectile) as EntityProjectileComponent;
    projectile.owner = player;
    projectile.shoot({
        x:player.getViewDirection().x * seepd,
        y:player.getViewDirection().y * seepd,
        z:player.getViewDirection().z * seepd
    },
    {
        uncertainty: ranNum
    });

    return bulet;
}
export {throwing, shooting};