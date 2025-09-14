import { Entity, system, TicksPerSecond } from "@minecraft/server";
import { KokyuMobUseComponent } from "../../NichirintouUseComponent";
import { MizuNoKata } from "../../kata/MizuNoKata";
import { HiNoKata } from "../../kata/HiNoKata";
import { getRandomInRange, weightChoice } from "../../../common/KimetuCommonUtil";
import { NomalAttack } from "../../kata/NomalAttack";

const tanjiroKokyuLowLists = weightChoice([
    { item: 1 , weight: 50 },
    { item: 2 , weight: 50 },
    { item: 3 , weight: 50 },
    { item: 4 , weight: 40 },
    { item: 5 , weight: 15 },
    { item: 6 , weight: 30 },
    { item: 7 , weight: 20 },
    { item: 8 , weight: 20 },
    { item: 9 , weight: 10 },
    { item: 10 , weight: 10 },
]);

const tanjiroKokyuLists = weightChoice([
    { item: 1 , weight: 50 },
    { item: 2 , weight: 50 },
    { item: 3 , weight: 50 },
    { item: 4 , weight: 40 },
    { item: 5 , weight: 15 },
    { item: 6 , weight: 30 },
    { item: 7 , weight: 20 },
    { item: 8 , weight: 20 },
    { item: 9 , weight: 10 },
    { item: 10 , weight: 10 },
    { item: 11 , weight: 30 },
    { item: 12 , weight: 30 },
    { item: 13 , weight: 30 },
    { item: 14 , weight: 20 },
    { item: 15 , weight: 10 },
    { item: 16 , weight: 20 },
    { item: 17 , weight: 20 },
    { item: 18 , weight: 20 },
    { item: 19 , weight: 10 },
    { item: 20 , weight: 20 },
    { item: 21 , weight: 10 },
    { item: 22 , weight: 20 },
]);

const tanjiroKokyuHiLists = weightChoice([
    { item: 11 , weight: 30 },
    { item: 12 , weight: 30 },
    { item: 13 , weight: 30 },
    { item: 14 , weight: 20 },
    { item: 15 , weight: 10 },
    { item: 16 , weight: 20 },
    { item: 17 , weight: 20 },
    { item: 18 , weight: 20 },
    { item: 19 , weight: 10 },
    { item: 20 , weight: 20 },
    { item: 21 , weight: 10 },
    { item: 22 , weight: 20 },
]);

/**
 * 炭治郎
 */
export class TanjiroComponent implements KokyuMobUseComponent {

    startMonitoring(entity:Entity) {
        if (entity !== undefined && entity.isValid) {
            const nitirintou_equip = entity.getProperty("kurokumaft:nitirintou_equip") as boolean;
            if (nitirintou_equip) {
                entity.setProperty("kurokumaft:kokyu_use", true);
                entity.setProperty("kurokumaft:kokyu_particle", true);
                this.useAttackKokyu(entity);
            }
        }
    }

    /**
     * @param {Entity} entity
     */
    async hitAttackKata(entity:Entity): Promise<void> {
        const attack = new NomalAttack();
        for (let i=0; i<4; i++) {
            attack.oneAttack(entity, undefined);
            await system.waitTicks(2.5);
        }
        entity.setProperty("kurokumaft:kokyu_attack", false);
    }

    useAttackKokyu(entity:Entity): void {

        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        if (kaikyuNum > 7) {
            const num = tanjiroKokyuHiLists.pick();
            entity.setProperty("kurokumaft:kokyu_kata", num);
            this.kokyuUse(entity, num);
        } else if (kaikyuNum > 4) {
            const num = tanjiroKokyuLists.pick();
            entity.setProperty("kurokumaft:kokyu_kata", num);
            this.kokyuUse(entity, num);
        } else {
            const num = tanjiroKokyuLowLists.pick();
            entity.setProperty("kurokumaft:kokyu_kata", num);
            this.kokyuUse(entity, num);
        }

    }

    private kokyuUse(entity:Entity, kata:number) {

        const mizu = new MizuNoKata();
        const hi = new HiNoKata();

        try {

            switch (kata) {
                case 1 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    system.waitTicks(10).then(() => {
                        mizu.ichiNoKata(entity, undefined);
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 2 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    mizu.niNoKata(entity, undefined);
                    system.waitTicks(20).then(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 3 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    mizu.sanNoKata(entity, undefined);
                    system.waitTicks(20).then(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 4 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    mizu.shiNoKata(entity, undefined);
                    system.waitTicks(20).then(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 5 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    system.waitTicks(20).then(() => {
                        mizu.goNoKata(entity, undefined);
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 6 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    system.waitTicks(20).then(() => {
                        mizu.rokuNoKata(entity, undefined);
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 7 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    system.waitTicks(20).then(() => {
                        mizu.shitiNoKata(entity, undefined);
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 8 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    system.waitTicks(5).then(() => {
                        mizu.hachiNoKata(entity, undefined);
                    }).catch((error: any) => {
                    });
                    system.waitTicks(50).then(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 9 :
                    mizu.kuNoKata(entity, undefined);
                    system.waitTicks(15*TicksPerSecond).then(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                    }).catch((error: any) => {
                    });
                break;
                case 10 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    mizu.zyuNoKata(entity, undefined);
                    system.waitTicks(40).then(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 11 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    const ichi = getRandomInRange(1, 2);
                    if (ichi === 1) {
                        hi.ichiNoKata(entity, undefined);
                        system.waitTicks(20).then(() => {
                            entity.setProperty("kurokumaft:kokyu_kata", 0);
                            entity.triggerEvent("kurokumaft:kokyu_end");
                        }).catch((error: any) => {
                        });
                    } else {
                        system.waitTicks(20).then(() => {
                            hi.ichiNoKataIssen(entity, undefined);
                            entity.setProperty("kurokumaft:kokyu_kata", 0);
                            entity.triggerEvent("kurokumaft:kokyu_end");
                        }).catch((error: any) => {
                        });
                    }
                break;
                case 12 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    hi.niNoKata(entity, undefined);
                    system.waitTicks(20).then(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }).catch((error: any) => {
                    });
                    break;
                case 13 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    hi.sanNoKata(entity, undefined);
                    system.waitTicks(20).then(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }).catch((error: any) => {
                    });
                    break;
                case 14 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    hi.shiNoKata(entity, undefined);
                    system.waitTicks(20).then(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 15 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    system.waitTicks(20).then(() => {
                        hi.goNoKata(entity, undefined);
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 16 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    hi.rokuNoKata(entity, undefined);
                    system.waitTicks(90).then(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 17 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    hi.shitiNoKata(entity, undefined);
                    system.waitTicks(20).then(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 18 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    hi.hachiNoKata(entity, undefined);
                    system.waitTicks(20).then(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 19 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    hi.kuNoKata(entity, undefined);
                    system.waitTicks(20).then(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 20 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    hi.zyuNoKata(entity, undefined);
                    system.waitTicks(20).then(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 21 :
                    hi.zyuichiNoKata(entity, undefined);
                    system.waitTicks(10*TicksPerSecond).then(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                    }).catch((error: any) => {
                    });
                break;
                case 22 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    hi.zyuniNoKata(entity, undefined);
                    system.waitTicks(20).then(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }).catch((error: any) => {
                    });
                break;
            }

        } catch (error: any) {
            
        }
    }
}
