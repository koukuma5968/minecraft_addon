import { ItemCustomComponent, ItemStack, ItemComponentUseEvent, Player, system, TicksPerSecond, EntityComponentTypes, EntityEquippableComponent, EquipmentSlot } from "@minecraft/server";
import { clearScope, lageScope } from "../../../common/WeaponsSniperScope";

/**
 * スナイパーライフル
 */
export class SniperRifle implements ItemCustomComponent {

    onUse(event:ItemComponentUseEvent) {
        let source = event.source as Player;
        let itemStack = event.itemStack as ItemStack;
        shotSniper(source, itemStack);
    }
}

/**
 * スナイパーライフルスコープ
 * @param {Player} player
 * @param {ItemStack} item
 */
async function shotSniper(player: Player, item: ItemStack) {
    player.setDynamicProperty("SniperRifleShot", true);
    let intervalNum = system.runInterval(() => {
        if (player.isSneaking) {
            lageScope(player);
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
 * スナイパーライフルスコープ停止
 * @param {Player} player
 */
export async function stopSniper(player: Player) {
    player.setDynamicProperty("SniperRifleShot", undefined);
    // system.runTimeout(() => {
    //     clearScope(player);
    // }, TicksPerSecond*1);
}

