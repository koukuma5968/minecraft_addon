import { system,EntityComponentTypes, ItemStack, Player, EntityEquippableComponent, EquipmentSlot, Entity } from "@minecraft/server";
import { getLookPoints, getRandomInRange } from "../common/commonUtil";
import { ItemDurabilityDamage, subtractionItem } from "../common/ItemDurabilityDamage";
import { shooting } from "../common/ShooterPoints";


/**
 * マシンガン発射
 * @param {Player} player
 * @param {ItemStack} item
 */
function shotMachinegun(player: Player, item: ItemStack) {

    player.setDynamicProperty("machinegunShot", true);
    let count = 0;
    player.setDynamicProperty("machinegunDamage", count);
    let intervalNum = system.runInterval(() => {

        let reEqu = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        let reItem = reEqu.getEquipment(EquipmentSlot.Offhand);
        if (reItem == undefined || reItem.typeId != "kurokumaft:thirty_eight_special") {
            system.clearRun(intervalNum);
            return;
        }

        let xran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
        let yran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
        let zran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));

        shooting(player, reItem.typeId, {x:xran,y:yran,z:zran}, 5, undefined);
        if (count % 4 === 0) {
            let {xlocation, ylocation, zlocation} = getLookPoints(player.getRotation(), player.location, 1.5);
            player.dimension.spawnParticle("minecraft:explosion_manual", {x:xlocation!, y:ylocation!, z:zlocation!});
            subtractionItem(player, reItem, EquipmentSlot.Offhand, reItem.amount - 1);
        }
        count = count + 1;
        player.setDynamicProperty("machinegunDamage", count);
    }, 1);
    player.setDynamicProperty("machinegunShotEventNum", intervalNum);

}

/**
 * マシンガン停止
 * @param {Player} player
 * @param {ItemStack} item
 */
function stopMachinegun(player: Player, item: ItemStack) {

    let eventNum = player.getDynamicProperty("machinegunShotEventNum") as number;
    let damage = player.getDynamicProperty("machinegunDamage") as number;
    player.setDynamicProperty("machinegunShot", undefined);
    player.setDynamicProperty("machinegunDamage", undefined);
    player.setDynamicProperty("machinegunShotEventNum", undefined);
    system.clearRun(eventNum);

    let reEqu = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
    let reItem = reEqu.getEquipment(EquipmentSlot.Mainhand);
    if (reItem != undefined && reItem.typeId == "kurokumaft:machine_gun") {
        ItemDurabilityDamage(player, item, EquipmentSlot.Mainhand, damage);
    }

}

export {shotMachinegun, stopMachinegun}
