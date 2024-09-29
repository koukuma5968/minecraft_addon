import { EntityComponentTypes, EntityEquippableComponent, EquipmentSlot, Player, system, world } from "@minecraft/server";
import { HelmetSurveillance } from "../items/armor/HelmetSurveillance";

async function checkPlayerEquTick() {

    let players = world.getPlayers() as Player[];

    for (let i = 0; i < players.length; i++) {
        let player = players[i];
        let equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        let offHand = equ.getEquipment(EquipmentSlot.Offhand);
        if (offHand) {
            if (offHand.hasTag("kurokumaft:shield") && player.isSneaking) {
                if (!player.hasTag("off_shield_guard")) {
                    player.addTag("off_shield_guard");
                    player.triggerEvent("kurokumaft:guard_effect_immunity");
                }
            } else {
                if (player.hasTag("off_shield_guard")) {
                    player.removeTag("off_shield_guard");
                    player.triggerEvent("kurokumaft:guard_effect_immunity_reset");
                }
            }
        }
        let mainHand = equ.getEquipment(EquipmentSlot.Mainhand);
        if (mainHand) {
            if (mainHand.hasTag("kurokumaft:shield") && player.isSneaking) {
                if (!player.hasTag("main_shield_guard")) {
                    player.addTag("main_shield_guard");
                    player.triggerEvent("kurokumaft:guard_effect_immunity");
                }
            } else {
                if (player.hasTag("main_shield_guard")) {
                    player.removeTag("main_shield_guard");
                    player.triggerEvent("kurokumaft:guard_effect_immunity_reset");
                }
            }
        }
        let head = equ.getEquipment(EquipmentSlot.Head);
        if (head) {
            if (player.getDynamicProperty("helmet_equ") != head.typeId) {
                new HelmetSurveillance(player, head).checkHelmetTick();
            }
        } else {
            player.setDynamicProperty("helmet_equ", undefined);
        }
        // let chest = equ.getEquipment(EquipmentSlot.Chest);
        // if (chest) {
        //     if (!player.getDynamicProperty("chest_equ")) {
        //     }
        // } else {
        //     player.setDynamicProperty("chest_equ", undefined);
        // }
        // let legs = equ.getEquipment(EquipmentSlot.Legs);
        // if (legs) {
        //     if (!player.getDynamicProperty("leg_equ")) {
        //     }
        // } else {
        //     player.setDynamicProperty("leg_equ", undefined);
        // }
        // let feet = equ.getEquipment(EquipmentSlot.Feet);
        // if (feet) {
        //     if (!player.getDynamicProperty("boot_equ")) {
        //     }
        // } else {
        //     player.setDynamicProperty("boot_equ", undefined);
        // }
    }

    system.run(checkPlayerEquTick);
}

export {checkPlayerEquTick}