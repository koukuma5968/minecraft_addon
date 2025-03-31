import { EntityComponentTypes, EntityEquippableComponent, EquipmentSlot, Player, system, TicksPerSecond, world } from "@minecraft/server";
import { KokyuObject, KokyuObjects } from "../item/weapon/NichirintouTypes";

export class KimetuEquipmentTick {

    player: Player;

    constructor(player: Player) {
        this.player = player;
    }

    checkPlayerKaikyuTick() {
        if (this.player.isValid()) {

            const kaikyuNum = this.player.getProperty("kurokumaft:kaikyu") as number;
            const kaikyu = "msg.kurokumaft:kaikyu"+ kaikyuNum +".value";
            this.player.onScreenDisplay.setTitle(
                {
                    rawtext:[
                        {translate:kaikyu}
                    ]
                },
                {
                    stayDuration: 100,
                    fadeInDuration: 0,
                    fadeOutDuration: 1,
                    subtitle: ""
                }
            );
            system.waitTicks(TicksPerSecond*5);
            system.run(this.checkPlayerKaikyuTick.bind(this));
        }
    };

    checkPlayerKimetuEquTick() {

        if (this.player.isValid()) {

            const equ = this.player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;

            // 日輪刀装備状態
            const mainHand = equ.getEquipment(EquipmentSlot.Mainhand);
            if (mainHand != undefined) {
                const object = KokyuObjects.find(ob => ob.itemName == mainHand.typeId) as KokyuObject;
                // 日輪刀を持っている
                if (object != undefined) {
                    if (this.player.getProperty("kurokumaft:nichirintou_type") != object.type) {
                        this.player.setProperty("kurokumaft:nichirintou_type", object.type);
                        this.player.setProperty("kurokumaft:kokyu_kata", object.kata[0]);
                        this.player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:" + object.kata_msg + object.kata[0]+ ".value\"}]}");
                    }
                // 日輪刀を持っていない
                } else {
                    this.player.setProperty("kurokumaft:nichirintou_type", 0);
                    this.player.setProperty("kurokumaft:kokyu_kata", 0);
                }
            } else {
                if (this.player.getProperty("kurokumaft:nichirintou_type") != 0) {
                    this.player.setProperty("kurokumaft:nichirintou_type", 0);
                    this.player.setProperty("kurokumaft:kokyu_kata", 0);
                }
            }
            system.waitTicks(TicksPerSecond);
            system.run(this.checkPlayerKimetuEquTick.bind(this));
        }
    }
}
