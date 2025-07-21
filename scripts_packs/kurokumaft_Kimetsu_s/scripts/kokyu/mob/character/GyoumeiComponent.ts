import { Entity, system } from "@minecraft/server";
import { KokyuMobUseComponent } from "../../NichirintouUseComponent";
import { weightChoice } from "../../../common/KimetuCommonUtil";
import { IwaNoKata } from "../../kata/IwaNoKata";

const gyoumeiKokyuLists = weightChoice([
    { item: 1 , weight: 30 },
    { item: 2 , weight: 30 },
    { item: 3 , weight: 30 },
    { item: 4 , weight: 20 },
    { item: 5 , weight: 10 },
]);

/**
 * 行冥
 */
export class GyoumeiComponent implements KokyuMobUseComponent {

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

        const num = gyoumeiKokyuLists.pick();
        entity.setProperty("kurokumaft:kokyu_kata", num);
        this.kokyuUse(entity, num);

    }

    private kokyuUse(entity:Entity, kata:number) {

        const iwa = new IwaNoKata();

        try {

            switch (kata) {
                case 1 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    iwa.ichiNoKata(entity, undefined);
                    system.waitTicks(30).then(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 2 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    system.waitTicks(30).then(() => {
                        iwa.niNoKata(entity, undefined);
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 3 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    iwa.sanNoKata(entity, undefined);
                    system.waitTicks(30).then(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 4 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    iwa.shiNoKata(entity, undefined);
                    system.waitTicks(30).then(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 5 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    iwa.goNoKata(entity, undefined);
                    system.waitTicks(50).then(() => {
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
