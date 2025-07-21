import { Entity, system } from "@minecraft/server";
import { KokyuMobUseComponent } from "../../NichirintouUseComponent";
import { weightChoice } from "../../../common/KimetuCommonUtil";
import { KaminariNoKata } from "../../kata/KaminariNoKata";

const kaminariKokyuLists = weightChoice([
    { item: 1 , weight: 10 },
    { item: 2 , weight: 20 },
    { item: 3 , weight: 20 },
    { item: 4 , weight: 20 },
    { item: 5 , weight: 20 },
    { item: 6 , weight: 20 },
]);

/**
 * 雷
 */
export class KaminariComponent implements KokyuMobUseComponent {

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

        const num = kaminariKokyuLists.pick();
        entity.setProperty("kurokumaft:kokyu_kata", num);
        this.kokyuUse(entity, num);

    }

    private kokyuUse(entity:Entity, kata:number) {

        const kaminari = new KaminariNoKata();

        try {

            switch (kata) {
                case 1 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    system.waitTicks(40).then(() => {
                        kaminari.ichiNoKata(entity, undefined);
                    }).catch((error: any) => {
                    });
                    system.waitTicks(60).then(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 2 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    kaminari.niNoKata(entity, undefined);
                    system.waitTicks(20).then(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }).catch((error: any) => {
                    });
                    break;
                case 3 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    kaminari.sanNoKata(entity, undefined);
                    system.waitTicks(20).then(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }).catch((error: any) => {
                    });
                    break;
                case 4 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    kaminari.shiNoKata(entity, undefined);
                    system.waitTicks(40).then(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 5 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    kaminari.goNoKata(entity, undefined);
                    system.waitTicks(40).then(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 6 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    kaminari.rokuNoKata(entity, undefined);
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
