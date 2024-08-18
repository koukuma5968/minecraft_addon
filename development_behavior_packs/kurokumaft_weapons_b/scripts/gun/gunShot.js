import { system,EntityComponentTypes } from "@minecraft/server";
import { getAdjacentSphericalPoints } from "./gunSphericalPoints";
import { print,getRandomInRange,durabilityDamage,subtractionItem,breakItem } from "../common";

/**
 * ガトリング発射
 * @param {Player} player
 * @param {ItemStack} item
 */
function shotGatling(player, item) {

    player.setDynamicProperty("gatlingShot", true);
    let count = 0;
    player.setDynamicProperty("gatlingDamage", count);
    let intervalNum = system.runInterval(() => {

        let reEqu = player.getComponent(EntityComponentTypes.Equippable);
        let reItem = reEqu.getEquipment("Offhand");
        if (reItem == undefined || reItem.typeId != "kurokumaft:twenty_two_lr") {
            system.clearRun(intervalNum);
            return;
        }

        let {xapply, yapply, zapply, xlocation, ylocation, zlocation} = getAdjacentSphericalPoints(player.getRotation(), player.location);

        let xran = parseFloat(getRandomInRange(-0.3, 0.3).toFixed(3));
        let yran = parseFloat(getRandomInRange(-0.3, 0.3).toFixed(3));
        let zran = parseFloat(getRandomInRange(-0.3, 0.3).toFixed(3));

        let bulet = player.dimension.spawnEntity("kurokumaft:twenty_two_lr_entity", 
            {
                x:xlocation + xran,
                y:ylocation + yran,
                z:zlocation + zran
            }
        );
        bulet.setRotation({x:0,y:player.getRotation().y});
        if (count % 4 === 0) {
            bulet.runCommand("particle minecraft:explosion_manual ~~~");
            if (reItem.amount == 1) {
                breakItem(player, "slot.weapon.offhand");
            } else {
                subtractionItem(player, reItem, "slot.weapon.offhand", "Offhand", reItem.amount - 1);
            }
        }
        bulet.applyImpulse({x:xapply * 1.5,y:yapply * 1.5,z:zapply * 1.5});
        count = count + 1;
        player.setDynamicProperty("gatlingDamage", count);
    }, 1);
    player.setDynamicProperty("gatlingShotEventNum", intervalNum);

}

/**
 * ガトリング停止
 * @param {Player} player
 * @param {ItemStack} item
 */
function stopGatling(player, item) {

    let eventNum = player.getDynamicProperty("gatlingShotEventNum");
    let damage = player.getDynamicProperty("gatlingDamage");
    player.setDynamicProperty("gatlingShot", null);
    player.setDynamicProperty("gatlingDamage", null);
    player.setDynamicProperty("gatlingShotEventNum", null);
    system.clearRun(eventNum);

    let reEqu = player.getComponent(EntityComponentTypes.Equippable);
    let reItem = reEqu.getEquipment("Mainhand");
    if (reItem != undefined && reItem.typeId == "kurokumaft:gatling") {
        durabilityDamage(player, item, "slot.weapon.mainhand", "Mainhand", damage);
    }

}

/**
 * マシンガン発射
 * @param {Player} player
 * @param {ItemStack} item
 */
function shotMachinegun(player, item) {

    player.setDynamicProperty("machinegunShot", true);
    let count = 0;
    player.setDynamicProperty("machinegunDamage", count);
    let intervalNum = system.runInterval(() => {

        let reEqu = player.getComponent(EntityComponentTypes.Equippable);
        let reItem = reEqu.getEquipment("Offhand");
        if (reItem == undefined || reItem.typeId != "kurokumaft:thirty_eight_special") {
            system.clearRun(intervalNum);
            return;
        }

        let {xapply, yapply, zapply, xlocation, ylocation, zlocation} = getAdjacentSphericalPoints(player.getRotation(), player.location);

        let xran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
        let yran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
        let zran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));

        let bulet = player.dimension.spawnEntity("kurokumaft:thirty_eight_special_entity", 
            {
                x:xlocation + xran,
                y:ylocation + yran,
                z:zlocation + zran
            }
        );
        bulet.setRotation({x:0,y:player.getRotation().y});
        if (count % 4 === 0) {
            bulet.runCommand("particle minecraft:explosion_manual ~~~");
            if (reItem.amount == 1) {
                breakItem(player, "slot.weapon.offhand");
            } else {
                subtractionItem(player, reItem, "slot.weapon.offhand", "Offhand", reItem.amount - 1);
            }
        }
        bulet.applyImpulse({x:xapply * 1.5,y:yapply * 1.5,z:zapply * 1.5});
        count = count + 1;
        player.setDynamicProperty("machinegunDamage", count);
    }, 1);
    player.setDynamicProperty("machinegunShotEventNum", intervalNum);

}

/**
 * ガトリング停止
 * @param {Player} player
 * @param {ItemStack} item
 */
function stopMachinegun(player, item) {

    let eventNum = player.getDynamicProperty("machinegunShotEventNum");
    let damage = player.getDynamicProperty("machinegunDamage");
    player.setDynamicProperty("machinegunShot", null);
    player.setDynamicProperty("machinegunDamage", null);
    player.setDynamicProperty("machinegunShotEventNum", null);
    system.clearRun(eventNum);

    let reEqu = player.getComponent(EntityComponentTypes.Equippable);
    let reItem = reEqu.getEquipment("Mainhand");
    if (reItem != undefined && reItem.typeId == "kurokumaft:machine_gun") {
        durabilityDamage(player, item, "slot.weapon.mainhand", "Mainhand", damage);
    }

}

export {shotGatling, shotMachinegun, stopGatling, stopMachinegun}