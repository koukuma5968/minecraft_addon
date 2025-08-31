import { EntityComponentTypes, EntityEquippableComponent, EquipmentSlot, Player, system, TicksPerSecond, world } from "@minecraft/server";
import { KokyuObject, KokyuObjects } from "../item/weapon/NichirintouTypes";
import { KekkizyutuObject, KekkizyutuObjects } from "../item/weapon/KekkizyutuTypes";
import { kaikyuPointList, ogrePointList } from "../common/KimetuConst";

export class KimetuEquipmentTick {

    player: Player;
    num: number;

    constructor(player: Player) {
        this.player = player;
        this.num = 0;
    }

    startMonitoring() {
        this.num = system.runInterval(() => {
            if (this.player.isValid) {
                this.checkPlayerKimetuEquTick();
                this.checkPlayerKaikyuTick();
            } else {
                system.clearRun(this.num);
            }
        }, 5);
    }

    async checkPlayerKaikyuTick() {
        if (this.player.isValid) {

            let kataMess = "";
            let kaikyu = "";
            let rankuPoint = "";

            try {

                const ogreRank = this.player.getProperty("kurokumaft:ogre_rank") as string;
                const kaikyuNum = this.player.getProperty("kurokumaft:kaikyu") as number;
                // 鬼化を優先
                if (ogreRank !== "none") {
                    const ogreMoon = this.player.getProperty("kurokumaft:ogre_moon") as number;
                    kaikyu = "msg.kurokumaft:ogrerank_" + ogreRank + (("quarter" === ogreRank || "crescent" === ogreRank) ? ogreMoon : "") + ".value";
                    const becoming = this.player.getProperty("kurokumaft:ogre_becoming") as number;
                    const rank = ogrePointList.find((rank) => rank.name === ogreRank);
                    rankuPoint = becoming + "/" + rank?.value;
                } else if (kaikyuNum > 0) {
                    kaikyu = "msg.kurokumaft:kaikyu"+ kaikyuNum +".value";
                    const point = this.player.getProperty("kurokumaft:ogre_kill") as number;
                    rankuPoint = point + "/" + kaikyuPointList[kaikyuNum];
                }

                // 装備状態
                const nichirintou_type = this.player.getProperty("kurokumaft:nichirintou_type") as number;
                const kokyuObject = KokyuObjects.find(ob => ob.type === nichirintou_type) as KokyuObject;
                // 日輪刀を持っている
                if (kokyuObject !== undefined) {
                    if (kokyuObject.type > 1) {
                        const kataNum = this.player.getProperty("kurokumaft:kokyu_kata") as number;
                        const index = kokyuObject.kata.findIndex((el) => el === kataNum);
                        if (kokyuObject.type === 2) {
                            if (index > 9) {
                                if (kokyuObject.kata[index] !== undefined) {
                                    kataMess = "msg.kurokumaft:hinokami_kata" + kokyuObject.kata[index] + ".value";
                                }
                            } else {
                                kataMess = "msg.kurokumaft:" + kokyuObject.kata_msg + kokyuObject.kata[index]+ ".value";
                            }
                        } else {
                            if (kokyuObject.kata[index] !== undefined) {
                                kataMess = "msg.kurokumaft:" + kokyuObject.kata_msg + kokyuObject.kata[index]+ ".value";
                            }
                        }
                    }
                }
                const kekkizyutu_type = this.player.getProperty("kurokumaft:kekkizyutu_type") as number;
                const kekkizyutuObject = KekkizyutuObjects.find(ob => ob.type === kekkizyutu_type) as KekkizyutuObject;
                // 血気術を持っている
                if (kekkizyutuObject !== undefined) {
                    const kataNum = this.player.getProperty("kurokumaft:kekkizyutu_kata") as number;
                    const index = kekkizyutuObject.kata.findIndex((el) => el === kataNum);
                    if (kekkizyutuObject.kata[index] !== undefined) {
                        kataMess = "msg.kurokumaft:" + kekkizyutuObject.kata_msg + kekkizyutuObject.kata[index]+ ".value";
                    }
                }

            } catch (error: any) {

            } finally {
                this.player.onScreenDisplay.setTitle(
                    {
                        rawtext:[
                            {text:"階級："},
                            {translate:kaikyu},
                            {text:"\n"},
                            {text:"残り："},
                            {translate:rankuPoint},
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

        }

    };

    async checkPlayerKimetuEquTick() {

        if (this.player.isValid) {

            const equ = this.player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;

            // 装備状態
            const mainHand = equ.getEquipment(EquipmentSlot.Mainhand);
            if (mainHand !== undefined) {
                const kokyuObject = KokyuObjects.find(ob => ob.itemName === mainHand.typeId) as KokyuObject;
                // 日輪刀を持っている
                if (kokyuObject !== undefined) {
                    this.player.setProperty("kurokumaft:kekkizyutu_type", 0);
                    if (this.player.getProperty("kurokumaft:nichirintou_type") !== kokyuObject.type) {
                        this.player.setProperty("kurokumaft:nichirintou_type", kokyuObject.type);
                        if (kokyuObject.type > 1) {
                            this.player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[0]);
                            this.player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:" + kokyuObject.kata_msg + kokyuObject.kata[0]+ ".value"}]});
                        }
                        this.player.setProperty("kurokumaft:kokyu_use", false);
                        this.player.setProperty("kurokumaft:kokyu_particle", false);
                        this.player.setProperty("kurokumaft:kokyu_attack", false);
                        this.player.setProperty("kurokumaft:kokyu_chage", 0);
                        this.player.setProperty("kurokumaft:kokyu_ran", 0);
                        this.player.setDynamicProperty("kurokumaft:chage_type", undefined);
                        this.player.setProperty("kurokumaft:kekkizyutu_type", 0);
                        this.player.setProperty("kurokumaft:kekkizyutu_kata", 0);
                    }
                // 日輪刀を持っていない
                } else {
                    this.player.setProperty("kurokumaft:nichirintou_type", 0);
                    this.player.setProperty("kurokumaft:kokyu_kata", 0);

                    const kekkizyutuObject = KekkizyutuObjects.find(ob => ob.itemName === mainHand.typeId) as KekkizyutuObject;
                    // 血気術を持っている
                    if (kekkizyutuObject !== undefined) {
                        if (this.player.getProperty("kurokumaft:kekkizyutu_type") !== kekkizyutuObject.type) {
                            this.player.setProperty("kurokumaft:kekkizyutu_type", kekkizyutuObject.type);
                            this.player.setProperty("kurokumaft:kekkizyutu_kata", kekkizyutuObject.kata[0]);
                            this.player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:" + kekkizyutuObject.kata_msg + kekkizyutuObject.kata[0]+ ".value"}]});
                        }
                    // 血気術を持ってない
                    } else {
                        this.player.setProperty("kurokumaft:kokyu_use", false);
                        this.player.setProperty("kurokumaft:kokyu_particle", false);
                        this.player.setProperty("kurokumaft:kokyu_attack", false);
                        this.player.setProperty("kurokumaft:kokyu_chage", 0);
                        this.player.setProperty("kurokumaft:kokyu_ran", 0);
                        this.player.setDynamicProperty("kurokumaft:chage_type", undefined);
                        this.player.setProperty("kurokumaft:kekkizyutu_type", 0);
                        this.player.setProperty("kurokumaft:kekkizyutu_kata", 0);
                    }

                }

            } else {
                if (this.player.getProperty("kurokumaft:nichirintou_type") !== 0) {
                    this.player.setProperty("kurokumaft:nichirintou_type", 0);
                    this.player.setProperty("kurokumaft:kokyu_kata", 0);
                }
                if (this.player.getProperty("kurokumaft:kekkizyutu_type") !== 0) {
                    this.player.setProperty("kurokumaft:kekkizyutu_type", 0);
                    this.player.setProperty("kurokumaft:kekkizyutu_kata", 0);
                }
                this.player.setProperty("kurokumaft:kokyu_use", false);
                this.player.setProperty("kurokumaft:kokyu_particle", false);
                this.player.setProperty("kurokumaft:kokyu_attack", false);
                this.player.setProperty("kurokumaft:kokyu_chage", 0);
                this.player.setProperty("kurokumaft:kokyu_ran", 0);
                this.player.setDynamicProperty("kurokumaft:chage_type", undefined);
            }
        }
    }
}
