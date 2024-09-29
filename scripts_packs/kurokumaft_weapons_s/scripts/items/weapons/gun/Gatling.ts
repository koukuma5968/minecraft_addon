import { ItemCustomComponent, ItemComponentHitEntityEvent, ItemStack, Entity, system, ItemComponentUseEvent, Player, EquipmentSlot, EntityComponentTypes, EntityEquippableComponent } from "@minecraft/server";
import { getLookPoints, getRandomInRange } from "../../../common/commonUtil";
import { ItemDurabilityDamage, subtractionItem } from "../../../common/ItemDurabilityDamage";
import { shooting } from "../../../common/ShooterPoints";

/**
 * ガトリング
 */
export class Gatling implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {

        let attackEntity = event.attackingEntity as Entity;
        let hitEntity = event.hitEntity as Entity;
        let itemStack = event.itemStack as ItemStack;
    }

    onUse(event:ItemComponentUseEvent) {
        let source = event.source as Player;
        let itemStack = event.itemStack as ItemStack;
        shotGatling(source, itemStack);
    }
}

/**
 * ガトリング発射
 * @param {Player} player
 * @param {ItemStack} item
 */
async function shotGatling(player: Player, item: ItemStack) {

    player.setDynamicProperty("gatlingShot", true);
    let count = 0;
    let intervalNum = system.runInterval(() => {

        let reEqu = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        let reItem = reEqu.getEquipment(EquipmentSlot.Offhand);
        if (reItem == undefined || reItem.typeId != "kurokumaft:twenty_two_lr") {
            system.clearRun(intervalNum);
            return;
        }

        let xran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
        let yran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
        let zran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));

        shooting(player, "kurokumaft:twenty_two_lr_entity", {x:xran,y:yran,z:zran}, 5, undefined);
        if (count % 4 === 0) {
            let look = getLookPoints(player.getRotation(), player.location, 1.5);
            player.dimension.spawnParticle("minecraft:explosion_manual", look);
            subtractionItem(player, reItem, EquipmentSlot.Offhand, 1);
            ItemDurabilityDamage(player, item, EquipmentSlot.Mainhand, undefined);
        }
        count = count + 1;
    }, 1);
    player.setDynamicProperty("gatlingShotEventNum", intervalNum);

}

/**
 * ガトリング停止
 * @param {Player} player
 */
export async function stopGatling(player: Player) {

    let eventNum = player.getDynamicProperty("gatlingShotEventNum") as number;
    player.setDynamicProperty("gatlingShot", undefined);
    player.setDynamicProperty("gatlingShotEventNum", undefined);
    system.clearRun(eventNum);

}

