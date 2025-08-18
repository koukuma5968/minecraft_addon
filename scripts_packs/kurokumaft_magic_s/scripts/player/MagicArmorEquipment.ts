import { EntityComponentTypes, EntityEquippableComponent, EquipmentSlot, ItemStack, Player, system } from "@minecraft/server";
import { MagicHelmetSurveillance } from "../items/weapon/armor/MagicHelmetSurveillance";
import { MagicChestSurveillance } from "../items/weapon/armor/MagicChestSurveillance";
import { MagicLeggingsSurveillance } from "../items/weapon/armor/MagicLeggingsSurveillance";
import { MagicBootsSurveillance } from "../items/weapon/armor/MagicBootsSurveillance";

export class MagicPlayerMonitorTick {

    player: Player;

    constructor(player: Player) {
        this.player = player;
    }

    startMonitoring() {
        this.checkPlayerMagicEquTick();
    }

    async checkPlayerMagicEquTick() {
        if (this.player.isValid) {

            try {
                const equ = this.player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
                const offHand = equ.getEquipment(EquipmentSlot.Offhand);
                if (offHand != undefined) {
                    if (offHand.hasTag("kurokumaft:magic_shield") && this.player.isSneaking) {
                        if (!this.player.hasTag("off_shield_guard")) {
                            this.player.addTag("off_shield_guard");
                        }
                    } else {
                        if (this.player.hasTag("off_shield_guard")) {
                            this.player.removeTag("off_shield_guard");
                        }
                    }
                } else {
                    if (this.player.hasTag("off_shield_guard")) {
                        this.player.removeTag("off_shield_guard");
                    }
                }

                const mainHand = equ.getEquipment(EquipmentSlot.Mainhand);
                if (mainHand != undefined) {
                    if (mainHand.hasTag("kurokumaft:magic_shield") && this.player.isSneaking) {
                        if (!this.player.hasTag("main_shield_guard")) {
                            this.player.addTag("main_shield_guard");
                        }
                    } else {
                        if (this.player.hasTag("main_shield_guard")) {
                            this.player.removeTag("main_shield_guard");
                        }
                    }
                } else {
                    if (this.player.hasTag("main_shield_guard")) {
                        this.player.removeTag("main_shield_guard");
                    }
                }

                const head = equ.getEquipment(EquipmentSlot.Head);
                if (head != undefined) {
                    if (!this.player.getDynamicProperty("magic_helmet_equ")) {
                        new MagicHelmetSurveillance(this.player, head).checkMagicHelmetTick();
                    }
                } else {
                    this.player.setDynamicProperty("magic_helmet_equ", false);
                }
                const chest = equ.getEquipment(EquipmentSlot.Chest);
                if (chest != undefined) {
                    if (!this.player.getDynamicProperty("magic_chest_equ")) {
                        new MagicChestSurveillance(this.player, chest).checkMagicChestTick();
                    }
                } else {
                    this.player.setDynamicProperty("magic_chest_equ", false);
                }
                const legs = equ.getEquipment(EquipmentSlot.Legs);
                if (legs != undefined) {
                    if (!this.player.getDynamicProperty("magic_leg_equ")) {
                        new MagicLeggingsSurveillance(this.player, legs).checkMagicLeggingsTick();
                    }
                } else {
                    this.player.setDynamicProperty("magic_leg_equ", false);
                }
                const feet = equ.getEquipment(EquipmentSlot.Feet);
                if (feet != undefined) {
                    if (!this.player.getDynamicProperty("magic_boot_equ")) {
                        new MagicBootsSurveillance(this.player, feet).checkMagicBootsTick();
                    }
                } else {
                    this.player.setDynamicProperty("magic_boot_equ", false);
                }
                checkAttackProtection(this.player, head, chest, legs, feet);
            } catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                }
            }
            system.waitTicks(2).then(() => {
                new MagicPlayerMonitorTick(this.player).startMonitoring();
            });
        }
    }
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
