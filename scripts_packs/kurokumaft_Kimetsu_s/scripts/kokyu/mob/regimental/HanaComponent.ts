import { Entity, system } from "@minecraft/server";
import { KokyuMobUseComponent } from "../../NichirintouUseComponent";
import { weightChoice } from "../../../common/KimetuCommonUtil";
import { HanaNoKata } from "../../kata/HanaNoKata";

const hanaKokyuLists = weightChoice([
    { item: 2 , weight: 20 },
    { item: 4 , weight: 20 },
    { item: 5 , weight: 15 },
    { item: 6 , weight: 15 },
]);

/**
 * カナヲ
 */
export class HanaComponent implements KokyuMobUseComponent {

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

        const num = hanaKokyuLists.pick();
        entity.setProperty("kurokumaft:kokyu_kata", num);
        this.kokyuUse(entity, num);

    }

    private kokyuUse(entity:Entity, kata:number) {

        const hana = new HanaNoKata();

        try {
            switch (kata) {
                case 2 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    hana.niNoKata(entity, undefined);
                    system.waitTicks(30).then(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 4 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    hana.shiNoKata(entity, undefined);
                    system.waitTicks(30).then(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 5 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    hana.goNoKata(entity, undefined);
                    system.waitTicks(30).then(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 6 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    hana.rokuNoKata(entity, undefined);
                    system.waitTicks(30).then(() => {
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
