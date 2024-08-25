import { EntityComponentTypes, EntityEquippableComponent, EquipmentSlot, Player, system, world } from "@minecraft/server";

function checkPlayerEquTick() {

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
    }

    system.run(checkPlayerEquTick);
}

export {checkPlayerEquTick}