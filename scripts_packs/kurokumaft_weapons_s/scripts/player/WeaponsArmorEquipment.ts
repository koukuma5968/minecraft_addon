import { EntityComponentTypes, EntityEquippableComponent, EquipmentSlot, Player, system, world } from "@minecraft/server";
import { HelmetSurveillance } from "../items/armor/HelmetSurveillance";

export class WeaponsArmorEquipment {

    player: Player;

    constructor(player: Player) {
        this.player = player;
    }

    startMonitoring() {
        this.checkWeaponsPlayerEquTick();
    }

    async checkWeaponsPlayerEquTick() {

        const players = world.getPlayers() as Player[];

        for (let i = 0; i < players.length; i++) {
            const player = players[i];
            const equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
            const offHand = equ.getEquipment(EquipmentSlot.Offhand);
            if (offHand !== undefined) {
                if (offHand.hasTag("kurokumaft:shield") && player.isSneaking) {
                    if (!player.hasTag("off_shield_guard")) {
                        player.addTag("off_shield_guard");
                        player.triggerEvent("kurokumaft:guard_effect_immunity");
                        if (offHand.typeId === "kurokumaft:steel_shield") {
                            player.triggerEvent("kurokumaft:knockback_resist");
                        }
                    }
                } else {
                    if (player.hasTag("off_shield_guard")) {
                        player.removeTag("off_shield_guard");
                        player.triggerEvent("kurokumaft:guard_effect_immunity_reset");
                        if (offHand.typeId === "kurokumaft:steel_shield") {
                            player.triggerEvent("kurokumaft:knockback_resist_reset");
                        }
                    }
                }
            } else {
                if (player.hasTag("off_shield_guard")) {
                    player.removeTag("off_shield_guard");
                    player.triggerEvent("kurokumaft:guard_effect_immunity_reset");
                    player.triggerEvent("kurokumaft:knockback_resist_reset");
                }
            }
            const mainHand = equ.getEquipment(EquipmentSlot.Mainhand);
            if (mainHand !== undefined) {
                if (mainHand.hasTag("kurokumaft:shield") && player.isSneaking) {
                    if (!player.hasTag("main_shield_guard")) {
                        player.addTag("main_shield_guard");
                        player.triggerEvent("kurokumaft:guard_effect_immunity");
                        if (mainHand.typeId === "kurokumaft:steel_shield") {
                            player.triggerEvent("kurokumaft:knockback_resist");
                        }
                    }
                } else {
                    if (player.hasTag("main_shield_guard")) {
                        player.removeTag("main_shield_guard");
                        player.triggerEvent("kurokumaft:guard_effect_immunity_reset");
                        if (mainHand.typeId === "kurokumaft:steel_shield") {
                            player.triggerEvent("kurokumaft:knockback_resist_reset");
                        }
                    }
                }
            } else {
                if (player.hasTag("main_shield_guard")) {
                    player.removeTag("main_shield_guard");
                    player.triggerEvent("kurokumaft:guard_effect_immunity_reset");
                    player.triggerEvent("kurokumaft:knockback_resist_reset");
                }
            }
            const head = equ.getEquipment(EquipmentSlot.Head);
            if (head !== undefined) {
                if (player.getDynamicProperty("helmet_equ") !== head.typeId) {
                    new HelmetSurveillance(player, head).checkHelmetTick();
                }
            } else {
                player.setDynamicProperty("helmet_equ", undefined);
            }
        }

        system.waitTicks(2).then(() => {
            new WeaponsArmorEquipment(this.player).startMonitoring();
        });
    }
}
