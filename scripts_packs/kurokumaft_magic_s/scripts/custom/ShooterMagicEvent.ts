import { ItemComponentTypes, ItemCooldownComponent, ItemStack, Player, Vector3 } from "@minecraft/server"
import { getAdjacentSphericalPoints } from "../common/ShooterPoints";
import { getRandomInRange } from "../common/commonUtil";

/**
 * 投擲系魔法
 * @param {Player} player
 * @param {ItemStack} item
 * @param {string} throwItem
 * @param {Vector3} ranNum
 */
function throwing(player:Player, item:ItemStack, throwItem:string, ranNum:Vector3) {

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

    let cool = item.getComponent(ItemComponentTypes.Cooldown) as ItemCooldownComponent;
    cool.startCooldown(player);

}

export {throwing};