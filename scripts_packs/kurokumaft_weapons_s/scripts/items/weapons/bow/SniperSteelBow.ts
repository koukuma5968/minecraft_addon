import { ItemCustomComponent, ItemStack, ItemComponentUseEvent, Player, system, TicksPerSecond, EntityComponentTypes, EntityEquippableComponent, EquipmentSlot } from "@minecraft/server";
import { clearScope, middleScope } from "../../../common/WeaponsSniperScope";

/**
 * スナイパーボウ
 */
export class SniperSteelBow implements ItemCustomComponent {

    onUse(event:ItemComponentUseEvent) {
        const source = event.source as Player;
        const itemStack = event.itemStack as ItemStack;
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
    const intervalNum = system.runInterval(() => {
        if (player.isSneaking) {
            middleScope(player);
        } else {
            clearScope(player);
        }
        const equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        const main = equ.getEquipment(EquipmentSlot.Mainhand) as ItemStack;
        if (main === undefined || main.typeId !== item.typeId) {
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

