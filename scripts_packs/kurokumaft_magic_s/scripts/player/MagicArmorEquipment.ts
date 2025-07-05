import { EntityComponentTypes, EntityEquippableComponent, EquipmentSlot, ItemStack, Player, system, world } from "@minecraft/server";
import { MagicHelmetSurveillance } from "../items/weapon/armor/MagicHelmetSurveillance";
import { MagicChestSurveillance } from "../items/weapon/armor/MagicChestSurveillance";
import { MagicLeggingsSurveillance } from "../items/weapon/armor/MagicLeggingsSurveillance";
import { MagicBootsSurveillance } from "../items/weapon/armor/MagicBootsSurveillance";

async function checkMagicPlayerEquTick() {

    try {
    let players = world.getPlayers() as Player[];

    for (let i = 0; i < players.length; i++) {
        const player = players[i];
        if (!player.isValid()) {
            continue;
        }
        const equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        const offHand = equ.getEquipment(EquipmentSlot.Offhand);
        if (offHand != undefined) {
            if (offHand.hasTag("kurokumaft:") && player.isSneaking) {
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

        const mainHand = equ.getEquipment(EquipmentSlot.Mainhand);
        if (mainHand != undefined) {
            if (mainHand.hasTag("kurokumaft:") && player.isSneaking) {
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

        const head = equ.getEquipment(EquipmentSlot.Head);
        if (head != undefined) {
            if (!player.getDynamicProperty("magic_helmet_equ")) {
                new MagicHelmetSurveillance(player, head).checkMagicHelmetTick();
            }
        } else {
            player.setDynamicProperty("magic_helmet_equ", false);
        }
        const chest = equ.getEquipment(EquipmentSlot.Chest);
        if (chest != undefined) {
            if (!player.getDynamicProperty("magic_chest_equ")) {
                new MagicChestSurveillance(player, chest).checkMagicChestTick();
            }
        } else {
            player.setDynamicProperty("magic_chest_equ", false);
        }
        const legs = equ.getEquipment(EquipmentSlot.Legs);
        if (legs != undefined) {
            if (!player.getDynamicProperty("magic_leg_equ")) {
                new MagicLeggingsSurveillance(player, legs).checkMagicLeggingsTick();
            }
        } else {
            player.setDynamicProperty("magic_leg_equ", false);
        }
        const feet = equ.getEquipment(EquipmentSlot.Feet);
        if (feet != undefined) {
            if (!player.getDynamicProperty("magic_boot_equ")) {
                new MagicBootsSurveillance(player, feet).checkMagicBootsTick();
            }
        } else {
            player.setDynamicProperty("magic_boot_equ", false);
        }
        checkAttackProtection(player, head, chest, legs, feet);
    }
    } catch (error) {
        if (error instanceof Error) {
            world.sendMessage(error.message);
        }
    }
    system.run(checkMagicPlayerEquTick);
}

function checkAttackProtection(player:Player, head:ItemStack|undefined, chest:ItemStack|undefined , legs:ItemStack|undefined, feet:ItemStack|undefined) {

    if (!player.hasTag("attack_protection")) {
        if (head != undefined && head.hasTag("kurokumaft:nether_magic_armor")) {
            player.addTag("attack_protection");
        } else if (chest != undefined && chest.hasTag("kurokumaft:nether_magic_armor")) {
            player.addTag("attack_protection");
        } else if (legs != undefined && legs.hasTag("kurokumaft:nether_magic_armor")) {
            player.addTag("attack_protection");
        } else if (feet != undefined && feet.hasTag("kurokumaft:nether_magic_armor")) {
            player.addTag("attack_protection");
        } else {
            player.removeTag("attack_protection");
        }
    }
};

export {checkMagicPlayerEquTick}