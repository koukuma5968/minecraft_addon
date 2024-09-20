import { EntityComponentTypes, EntityEquippableComponent, EquipmentSlot, Player, system, world } from "@minecraft/server";

async function checkPlayerEquTick() {

    let players = world.getPlayers() as Player[];

    for (let i = 0; i < players.length; i++) {
        let player = players[i];
        let equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        let offHand = equ.getEquipment(EquipmentSlot.Offhand);
        if (offHand) {
            if (offHand.hasTag("kurokumaft:magic_shield") && player.isSneaking) {
                if (!player.hasTag("off_shield_guard")) {
                    player.addTag("off_shield_guard");
                }
            } else {
                if (player.hasTag("off_shield_guard")) {
                    player.removeTag("off_shield_guard");
                }
            }
        }
        let mainHand = equ.getEquipment(EquipmentSlot.Mainhand);
        if (mainHand) {
            if (mainHand.hasTag("kurokumaft:magic_shield") && player.isSneaking) {
                if (!player.hasTag("main_shield_guard")) {
                    player.addTag("main_shield_guard");
                }
            } else {
                if (player.hasTag("main_shield_guard")) {
                    player.removeTag("main_shield_guard");
                }
            }
        }
        let head = equ.getEquipment(EquipmentSlot.Head);
        if (head) {
            if (!player.getDynamicProperty("magic_helmet_equ")) {
                // new MagicHelmetSurveillance(player, head).checkMagicHelmetTick();
            }
        } else {
            player.setDynamicProperty("magic_helmet_equ", false);
        }
        let chest = equ.getEquipment(EquipmentSlot.Chest);
        if (chest) {
            if (!player.getDynamicProperty("magic_chest_equ")) {
                // new MagicChestSurveillance(player, chest).checkMagicChestTick();
            }
        } else {
            player.setDynamicProperty("magic_chest_equ", false);
        }
        let legs = equ.getEquipment(EquipmentSlot.Legs);
        if (legs) {
            if (!player.getDynamicProperty("magic_leg_equ")) {
                // new MagicLeggingsSurveillance(player, legs).checkMagicLeggingsTick();
            }
        } else {
            player.setDynamicProperty("magic_leg_equ", false);
        }
        let feet = equ.getEquipment(EquipmentSlot.Feet);
        if (feet) {
            if (!player.getDynamicProperty("magic_boot_equ")) {
                // new MagicBootsSurveillance(player, feet).checkMagicBootsTick();
            }
        } else {
            player.setDynamicProperty("magic_boot_equ", false);
        }
    }

    system.run(checkPlayerEquTick);
}

export {checkPlayerEquTick}