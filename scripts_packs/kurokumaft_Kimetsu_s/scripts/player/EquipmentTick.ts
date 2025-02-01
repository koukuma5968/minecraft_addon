import { EntityComponentTypes, EntityEquippableComponent, EquipmentSlot, Player, system, world } from "@minecraft/server";
import { KokyuObject, KokyuObjects } from "../item/weapon/NichirintouTypes";

async function checkPlayerEquTick() {

    let players = world.getPlayers() as Player[];

    for (let i = 0; i < players.length; i++) {
        let player = players[i];
        if (!player.isValid()) {
            continue;
        }
        let equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;

        // 日輪刀装備状態
        let mainHand = equ.getEquipment(EquipmentSlot.Mainhand);
        if (mainHand != undefined) {
            let object = KokyuObjects.find(ob => ob.itemName == mainHand.typeId) as KokyuObject;
            if (object != undefined) {
                if (player.getProperty("kurokumaft:nichirintou_type") != object.type) {
                    player.setProperty("kurokumaft:nichirintou_type", object.type);
                    if (object.kata != undefined) {
                        player.setProperty("kurokumaft:kokyu_kata", object.kata[0]);
                        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"" + object.kata_msg + "1.name\"}]}");
                    }
                }
            } else {
                player.setProperty("kurokumaft:nichirintou_type", 0);
                player.setProperty("kurokumaft:kokyu_kata", 0);
            }
        } else {
            if (player.getProperty("kurokumaft:nichirintou_type") != 0) {
                player.setProperty("kurokumaft:nichirintou_type", 0);
                player.setProperty("kurokumaft:kokyu_kata", 0);
            }
        }
    }

    system.run(checkPlayerEquTick);
}

export {checkPlayerEquTick}