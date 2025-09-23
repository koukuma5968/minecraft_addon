import { ItemCustomComponent, ItemComponentHitEntityEvent, ItemStack, Entity, system, ItemComponentUseEvent, Player, EquipmentSlot, EntityComponentTypes, EntityEquippableComponent } from "@minecraft/server";
import { getLookPoints } from "../../../common/WeaponsCommonUtil";
import { itemDurabilityDamage, subtractionItem } from "../../../common/WeaponsItemDurabilityDamage";
import { shooting } from "../../../common/WeaponsShooterPoints";

/**
 * マシンガン
 */
export class MachineGun implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {
        const attackEntity = event.attackingEntity as Entity;
        const hitEntity = event.hitEntity as Entity;
        const itemStack = event.itemStack as ItemStack;
    }

    onUse(event:ItemComponentUseEvent) {
        const source = event.source as Player;
        const itemStack = event.itemStack as ItemStack;
        shotMachineGun(source, itemStack);
    }
}

/**
 * マシンガン発射
 * @param {Player} player
 * @param {ItemStack} item
 */
async function shotMachineGun(player: Player, item: ItemStack) {

    player.setDynamicProperty("machineGunShot", true);
    let count = 0;
    const intervalNum = system.runInterval(() => {

        const reEqu = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        const reItem = reEqu.getEquipment(EquipmentSlot.Offhand);
        if (reItem == undefined || reItem.typeId != "kurokumaft:thirty_eight_special") {
            system.clearRun(intervalNum);
            return;
        }

        shooting(player, "kurokumaft:thirty_eight_special_entity", 0.2, 5, undefined);
        if (count % 4 === 0) {
            const loock = getLookPoints(player.getRotation(), player.location, 1.5);
            player.dimension.spawnParticle("minecraft:explosion_manual", {x:loock.x, y:loock.y, z:loock.z});
            subtractionItem(player, reItem, EquipmentSlot.Offhand, 1);
            itemDurabilityDamage(player, item, EquipmentSlot.Mainhand);
        }
        count = count + 1;
    }, 1);
    player.setDynamicProperty("machineGunShotEventNum", intervalNum);

}

/**
 * マシンガン停止
 * @param {Player} player
 */
export async function stopMachineGun(player: Player) {

    const eventNum = player.getDynamicProperty("machineGunShotEventNum") as number;
    player.setDynamicProperty("machineGunShot", undefined);
    player.setDynamicProperty("machineGunShotEventNum", undefined);
    system.clearRun(eventNum);

}

