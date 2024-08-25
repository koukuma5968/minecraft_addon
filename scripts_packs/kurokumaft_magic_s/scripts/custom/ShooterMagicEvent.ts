import { ItemComponentTypes, ItemCooldownComponent, ItemStack, Player, Vector3 } from "@minecraft/server"
import { getAdjacentSphericalPoints } from "../common/ShooterPoints";
import { print, getRandomInRange } from "../common/commonUtil";

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

}

/**
 * 投射系魔法
 * @param {Player} player
 * @param {ItemStack} item
 * @param {string} throwItem
 * @param {Vector3} ranNum
 */
function shooting(player:Player, item:ItemStack, throwItem:string, ranNum:Vector3, seepd:number) {

    let {xapply, yapply, zapply, xlocation, ylocation, zlocation} = getAdjacentSphericalPoints(player.getRotation(), player.location);

    let xpos = Math.floor(xlocation! + ranNum.x) as number;
    let ypos = Math.floor(ylocation! + ranNum.y) as number;
    let zpos = Math.floor(zlocation! + ranNum.z) as number;

    let bulet = player.dimension.spawnEntity(throwItem, 
        {
            x:xlocation! + ranNum.x,
            y:ylocation! + ranNum.y,
            z:zlocation! + ranNum.z
        }
    );
    // item.amount++;
    // bulet.teleport({x:xlocation! + ranNum.x, y:ylocation! + ranNum.y, z:zlocation! + ranNum.z},
    //     {
    //         rotation: {x:5,y:0},
    //     }
    // );
    
    bulet.applyImpulse({x:xapply! * seepd,y:yapply! * seepd,z:zapply! * seepd});

}
export {throwing, shooting};