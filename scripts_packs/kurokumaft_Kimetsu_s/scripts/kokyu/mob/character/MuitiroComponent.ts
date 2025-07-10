import { Entity, system } from "@minecraft/server";
import { KokyuMobUseComponent } from "../../NichirintouUseComponent";
import { weightChoice } from "../../../common/KimetuCommonUtil";
import { KasumiNoKata } from "../../kata/KasumiNoKata";

const muitiroKokyuLists = weightChoice([
    { item: 1 , weight: 50 },
    { item: 2 , weight: 50 },
    { item: 3 , weight: 50 },
    { item: 4 , weight: 50 },
    { item: 5 , weight: 15 },
    { item: 6 , weight: 20 },
    { item: 7 , weight: 20 },
]);

/**
 * 無一郎
 */
export class MuitiroComponent implements KokyuMobUseComponent {

    startMonitoring(entity:Entity) {
        if (entity !== undefined && entity.isValid()) {
            const nitirintou_equip = entity.getProperty("kurokumaft:nitirintou_equip") as boolean;
            if (nitirintou_equip) {
                entity.setProperty("kurokumaft:kokyu_use", true);
                entity.setProperty("kurokumaft:kokyu_particle", true);
                this.useAttackKokyu(entity);
            }
        }
    }

    useAttackKokyu(entity:Entity): void {

        const num = muitiroKokyuLists.pick();
        entity.setProperty("kurokumaft:kokyu_kata", num);
        this.kokyuUse(entity, num);

    }

    private kokyuUse(entity:Entity, kata:number) {

        const kasumi = new KasumiNoKata();

        try {

            switch (kata) {
                case 1 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    system.runTimeout(() => {
                        kasumi.ichiNoKata(entity, undefined);
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 20);
                break;
                case 2 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    kasumi.niNoKata(entity, undefined);
                    system.runTimeout(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 30);
                break;
                case 3 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    kasumi.sanNoKata(entity, undefined);
                    system.runTimeout(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 30);
                break;
                case 4 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    system.runTimeout(() => {
                        kasumi.shiNoKata(entity, undefined);
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 20);
                break;
                case 5 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    kasumi.goNoKata(entity, undefined);
                    system.runTimeout(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 30);
                break;
                case 6 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    kasumi.rokuNoKata(entity, undefined);
                    system.runTimeout(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 30);
                break;
                case 7 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    kasumi.shitiNoKata(entity, undefined);
                    system.runTimeout(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 30);
                break;
            }
        } catch (error) {
            
        }

    }
}
