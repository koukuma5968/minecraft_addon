import { ItemCustomComponent, ItemStack, ItemComponentUseEvent, Player, system, TicksPerSecond, EntityComponentTypes, EntityEquippableComponent, EquipmentSlot } from "@minecraft/server";
import { clearScope, middleScope } from "../../../common/WeaponsSniperScope";

/**
 * スナイパーボウ
 */
export class SniperSteelBow implements ItemCustomComponent {

    onUse(event:ItemComponentUseEvent) {
        let source = event.source as Player;
        let itemStack = event.itemStack as ItemStack;
        shotSniperBow(source, itemStack);
    }
}

/**
 * スナイパーボウスコープ
 * @param {Player} player
 * @param {ItemStack} item
 */
async function shotSniperBow(player: Player, item: ItemStack) {
    player.setDynamicProperty("SniperSteelBowShot", true);
    let intervalNum = system.runInterval(() => {
        if (player.isSneaking) {
            middleScope(player);
        } else {
            clearScope(player);
        }
        let equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        let main = equ.getEquipment(EquipmentSlot.Mainhand) as ItemStack;
        if (main == undefined || main.typeId != item.typeId) {
            clearScope(player);
            system.clearRun(intervalNum);
        }
    }, 1);
}

/**
 * スナイパーボウスコープ停止
 * @param {Player} player
 */
export async function stopSniperBow(player: Player) {
    player.setDynamicProperty("SniperSteelBowShot", undefined);
    // system.runTimeout(() => {
    //     clearScope(player);
    // }, TicksPerSecond*1);
}

