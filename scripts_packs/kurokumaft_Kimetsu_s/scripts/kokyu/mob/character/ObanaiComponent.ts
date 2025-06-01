import { Entity, system } from "@minecraft/server";
import { KokyuMobUseComponent } from "../../NichirintouUseComponent";
import { weightChoice } from "../../../common/KimetuCommonUtil";
import { HebiNoKata } from "../../kata/HebiNoKata";

const obanaiKokyuLists = weightChoice([
    { item: 1 , weight: 30 },
    { item: 2 , weight: 30 },
    { item: 3 , weight: 30 },
    { item: 4 , weight: 30 },
    { item: 5 , weight: 30 },
]);

/**
 * 小芭内
 */
export class ObanaiComponent implements KokyuMobUseComponent {

    startMonitoring(entity:Entity) {
        if (entity != undefined && entity.isValid()) {
            const nitirintou_equip = entity.getProperty("kurokumaft:nitirintou_equip") as boolean;
            if (nitirintou_equip) {
                entity.setProperty("kurokumaft:kokyu_use", true);
                entity.setProperty("kurokumaft:kokyu_particle", true);
                this.useAttackKokyu(entity);
            }
        }
    }

    useAttackKokyu(entity:Entity): void {

        const num = obanaiKokyuLists.pick();
        entity.setProperty("kurokumaft:kokyu_kata", num);
        this.kokyuUse(entity, num);

    }

    private kokyuUse(entity:Entity, kata:number) {

        const hebi = new HebiNoKata();

        switch (kata) {
            case 1 :
                entity.triggerEvent("kurokumaft:attack_stop");
                hebi.ichiNoKata(entity, undefined);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kokyu_kata", 0);
                    entity.triggerEvent("kurokumaft:kokyu_end");
                }, 30);
            break;
            case 2 :
                entity.triggerEvent("kurokumaft:attack_stop");
                hebi.niNoKata(entity, undefined);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kokyu_kata", 0);
                    entity.triggerEvent("kurokumaft:kokyu_end");
                }, 30);
            break;
            case 3 :
                entity.triggerEvent("kurokumaft:attack_stop");
                hebi.sanNoKata(entity, undefined);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kokyu_kata", 0);
                    entity.triggerEvent("kurokumaft:kokyu_end");
                }, 30);
            break;
            case 4 :
                entity.triggerEvent("kurokumaft:attack_stop");
                hebi.shiNoKata(entity, undefined);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kokyu_kata", 0);
                    entity.triggerEvent("kurokumaft:kokyu_end");
                }, 30);
            break;
            case 5 :
                entity.triggerEvent("kurokumaft:attack_stop");
                hebi.goNoKata(entity, undefined);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kokyu_kata", 0);
                    entity.triggerEvent("kurokumaft:kokyu_end");
                }, 30);
            break;
        }

    }
}
