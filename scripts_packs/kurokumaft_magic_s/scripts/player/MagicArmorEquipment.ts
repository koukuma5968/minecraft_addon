import { EntityComponentTypes, EntityEquippableComponent, EquipmentSlot, Player, system, world } from "@minecraft/server";
import { MagicHelmetSurveillance } from "../items/weapon/armor/MagicHelmetSurveillance";
import { MagicChestSurveillance } from "../items/weapon/armor/MagicChestSurveillance";
import { MagicLeggingsSurveillance } from "../items/weapon/armor/MagicLeggingsSurveillance";
import { MagicBootsSurveillance } from "../items/weapon/armor/MagicBootsSurveillance";

async function checkMagicPlayerEquTick() {

    let players = world.getPlayers() as Player[];

    for (let i = 0; i < players.length; i++) {
        let player = players[i];
        if (!player.isValid()) {
            continue;
        }
        let equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        let offHand = equ.getEquipment(EquipmentSlot.Offhand);
        if (offHand != undefined) {
            if (offHand.typeId.indexOf("magic_shield") != -1 && player.isSneaking) {
                if (!player.hasTag("off_shield_guard")) {
                    player.addTag("off_shield_guard");
                }
            } else {
                if (player.hasTag("off_shield_guard")) {
                    player.removeTag("off_shield_guard");
                }
            }
        } else {
            if (player.hasTag("off_shield_guard")) {
                player.removeTag("off_shield_guard");
            }
        }

        let mainHand = equ.getEquipment(EquipmentSlot.Mainhand);
        if (mainHand != undefined) {
            if (mainHand.typeId.indexOf("magic_shield") != -1 && player.isSneaking) {
                if (!player.hasTag("main_shield_guard")) {
                    player.addTag("main_shield_guard");
                }
            } else {
                if (player.hasTag("main_shield_guard")) {
                    player.removeTag("main_shield_guard");
                }
            }
        } else {
            if (player.hasTag("main_shield_guard")) {
                player.removeTag("main_shield_guard");
            }
        }

        let head = equ.getEquipment(EquipmentSlot.Head);
        if (head != undefined) {
            if (!player.getDynamicProperty("magic_helmet_equ")) {
                new MagicHelmetSurveillance(player, head).checkMagicHelmetTick();
            }
        } else {
            player.setDynamicProperty("magic_helmet_equ", false);
        }
        let chest = equ.getEquipment(EquipmentSlot.Chest);
        if (chest != undefined) {
            if (!player.getDynamicProperty("magic_chest_equ")) {
                new MagicChestSurveillance(player, chest).checkMagicChestTick();
            }
        } else {
            player.setDynamicProperty("magic_chest_equ", false);
        }
        let legs = equ.getEquipment(EquipmentSlot.Legs);
        if (legs != undefined) {
            if (!player.getDynamicProperty("magic_leg_equ")) {
                new MagicLeggingsSurveillance(player, legs).checkMagicLeggingsTick();
            }
        } else {
            player.setDynamicProperty("magic_leg_equ", false);
        }
        let feet = equ.getEquipment(EquipmentSlot.Feet);
        if (feet != undefined) {
            if (!player.getDynamicProperty("magic_boot_equ")) {
                new MagicBootsSurveillance(player, feet).checkMagicBootsTick();
            }
        } else {
            player.setDynamicProperty("magic_boot_equ", false);
        }
    }

    system.run(checkMagicPlayerEquTick);
}

export {checkMagicPlayerEquTick}