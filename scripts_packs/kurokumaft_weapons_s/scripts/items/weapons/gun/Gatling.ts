import { ItemCustomComponent, ItemComponentHitEntityEvent, ItemStack, Entity, system, ItemComponentUseEvent, Player, EquipmentSlot, EntityComponentTypes, EntityEquippableComponent } from "@minecraft/server";
import { getLookPoints } from "../../../common/WeaponsCommonUtil";
import { itemDurabilityDamage, subtractionItem } from "../../../common/WeaponsItemDurabilityDamage";
import { shooting } from "../../../common/WeaponsShooterPoints";

/**
 * ガトリング
 */
export class Gatling implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {

        const attackEntity = event.attackingEntity as Entity;
        const hitEntity = event.hitEntity as Entity;
        const itemStack = event.itemStack as ItemStack;
    }

    onUse(event:ItemComponentUseEvent) {
        const source = event.source as Player;
        const itemStack = event.itemStack as ItemStack;
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
    player.setProperty("kurokumaft:gun_shot", true);
    let count = 0;
    let shot = 1;
    const intervalNum = system.runInterval(() => {

        const reEqu = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        const reItem = reEqu.getEquipment(EquipmentSlot.Offhand);
        if (reItem === undefined || reItem.typeId !== "kurokumaft:twenty_two_lr") {
            system.clearRun(intervalNum);
            return;
        }

        shooting(player, "kurokumaft:twenty_two_lr_entity", 0.2, 5, "kurokumaft:shot"+shot);
        shot++;
        if (shot > 5) {
            shot=1;
        }
        if (count % 4 === 0) {
            let look = getLookPoints(player.getRotation(), player.location, 1.5);
            player.dimension.spawnParticle("minecraft:explosion_manual", look);
            subtractionItem(player, reItem, EquipmentSlot.Offhand, 1);
            itemDurabilityDamage(player, item, EquipmentSlot.Mainhand);
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

    const eventNum = player.getDynamicProperty("gatlingShotEventNum") as number;
    player.setProperty("kurokumaft:gun_shot", false);
    player.setDynamicProperty("gatlingShot", undefined);
    player.setDynamicProperty("gatlingShotEventNum", undefined);
    system.clearRun(eventNum);

}

