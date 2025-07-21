import { Entity, system, TicksPerSecond } from "@minecraft/server";
import { KokyuMobUseComponent } from "../../NichirintouUseComponent";
import { MizuNoKata } from "../../kata/MizuNoKata";
import { weightChoice } from "../../../common/KimetuCommonUtil";

const mizuKokyuLists = weightChoice([
    { item: 1 , weight: 50 },
    { item: 2 , weight: 50 },
    { item: 3 , weight: 50 },
    { item: 4 , weight: 50 },
    { item: 5 , weight: 15 },
    { item: 6 , weight: 20 },
    { item: 7 , weight: 20 },
    { item: 8 , weight: 10 },
    { item: 9 , weight: 10 },
    { item: 10 , weight: 10 },
]);

/**
 * 水
 */
export class MizuComponent implements KokyuMobUseComponent {

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

    useAttackKokyu(entity:Entity): void {

        const num = mizuKokyuLists.pick();
        entity.setProperty("kurokumaft:kokyu_kata", num);
        this.kokyuUse(entity, num);

    }

    private kokyuUse(entity:Entity, kata:number) {

        const mizu = new MizuNoKata();

        try {

            switch (kata) {
                case 1 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    system.waitTicks(15).then(() => {
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
                    mizu.zyuNoKataMob(entity, undefined);
                    system.waitTicks(40).then(() => {
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
