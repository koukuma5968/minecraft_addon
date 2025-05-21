import { EntityComponentTypes, EntityEquippableComponent, EquipmentSlot, Player, system, TicksPerSecond, world } from "@minecraft/server";
import { KokyuObject, KokyuObjects } from "../item/weapon/NichirintouTypes";
import { KekkizyutuObject, KekkizyutuObjects } from "../item/weapon/KekkizyutuTypes";

export class KimetuEquipmentTick {

    player: Player;
    num: number;

    constructor(player: Player) {
        this.player = player;
        this.num = 0;
    }

    startMonitoring() {
        this.num = system.runInterval(() => {
            if (this.player.isValid()) {
                this.checkPlayerKimetuEquTick();
                this.checkPlayerKaikyuTick();
            } else {
                system.clearRun(this.num);
            }
        }, 1*TicksPerSecond);
    }

    async checkPlayerKaikyuTick() {
        if (this.player.isValid()) {

            const orgeRank = this.player.getProperty("kurokumaft:orge_rank");
            if ("none" == orgeRank) {
                const kaikyuNum = this.player.getProperty("kurokumaft:kaikyu") as number;
                if (kaikyuNum > 0) {
                    let kataMess = "";
                    // 装備状態
                    const equ = this.player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
                    const mainHand = equ.getEquipment(EquipmentSlot.Mainhand);
                    if (mainHand != undefined) {
                        const kokyuObject = KokyuObjects.find(ob => ob.itemName == mainHand.typeId) as KokyuObject;
                        // 日輪刀を持っている
                        if (kokyuObject != undefined) {
                            if (kokyuObject.type > 1) {
                                const kataNum = this.player.getProperty("kurokumaft:kokyu_kata") as number;
                                if (kokyuObject.kata[kataNum-1] != undefined) {
                                    kataMess = "msg.kurokumaft:" + kokyuObject.kata_msg + kokyuObject.kata[kataNum-1]+ ".value";
                                }
                            }
                        }
                    }
                    const kaikyu = "msg.kurokumaft:kaikyu"+ kaikyuNum +".value";
                    this.player.onScreenDisplay.setTitle(
                        {
                            rawtext:[
                                {text:"階級："},
                                {translate:kaikyu},
                                {text:"\n"},
                                {translate:kataMess}
                            ]
                        },
                        {
                            stayDuration: 100,
                            fadeInDuration: 0,
                            fadeOutDuration: 1,
                            subtitle: ""
                        }
                    );
        
                }
            } else {
                const orgeMoon = this.player.getProperty("kurokumaft:orge_moon") as number;
                const rank = "msg.kurokumaft:orgerank_" + orgeRank + (("quarter" == orgeRank || "crescent" == orgeRank) ? orgeMoon : "") + ".value";
                this.player.onScreenDisplay.setTitle(
                    {
                        rawtext:[
                            {translate:rank}
                        ]
                    },
                    {
                        stayDuration: 100,
                        fadeInDuration: 0,
                        fadeOutDuration: 1,
                        subtitle: ""
                    }
                );

            }
        }
    };

    async checkPlayerKimetuEquTick() {

        if (this.player.isValid()) {

            const equ = this.player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;

            // 装備状態
            const mainHand = equ.getEquipment(EquipmentSlot.Mainhand);
            if (mainHand != undefined) {
                const kokyuObject = KokyuObjects.find(ob => ob.itemName == mainHand.typeId) as KokyuObject;
                // 日輪刀を持っている
                if (kokyuObject != undefined) {
                    if (this.player.getProperty("kurokumaft:nichirintou_type") != kokyuObject.type) {
                        this.player.setProperty("kurokumaft:nichirintou_type", kokyuObject.type);
                        if (kokyuObject.type > 1) {
                            this.player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[0]);
                            this.player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:" + kokyuObject.kata_msg + kokyuObject.kata[0]+ ".value"}]});
                        }
                    }
                // 日輪刀を持っていない
                } else {
                    this.player.setProperty("kurokumaft:nichirintou_type", 0);
                    this.player.setProperty("kurokumaft:kokyu_kata", 0);
                }
                const kekkizyutuObject = KekkizyutuObjects.find(ob => ob.itemName == mainHand.typeId) as KekkizyutuObject;
                // 血気術を持っている
                if (kekkizyutuObject != undefined) {
                    if (this.player.getProperty("kurokumaft:kekkizyutu_type") != kekkizyutuObject.type) {
                        this.player.setProperty("kurokumaft:kekkizyutu_type", kekkizyutuObject.type);
                        this.player.setProperty("kurokumaft:kekkizyutu_kata", kekkizyutuObject.kata[0]);
                        this.player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:" + kekkizyutuObject.kata_msg + kekkizyutuObject.kata[0]+ ".value"}]});
                    }
                // 血気術を持ってない
                } else {
                    this.player.setProperty("kurokumaft:kekkizyutu_type", 0);
                    this.player.setProperty("kurokumaft:kekkizyutu_kata", 0);
                }

            } else {
                if (this.player.getProperty("kurokumaft:nichirintou_type") != 0) {
                    this.player.setProperty("kurokumaft:nichirintou_type", 0);
                    this.player.setProperty("kurokumaft:kokyu_kata", 0);
                }
                if (this.player.getProperty("kurokumaft:kekkizyutu_type") != 0) {
                    this.player.setProperty("kurokumaft:kekkizyutu_type", 0);
                    this.player.setProperty("kurokumaft:kekkizyutu_kata", 0);
                }
            }
        }
    }
}
