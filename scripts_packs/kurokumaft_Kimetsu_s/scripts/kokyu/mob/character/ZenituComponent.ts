import { Entity, system } from "@minecraft/server";
import { KokyuMobUseComponent } from "../../NichirintouUseComponent";
import { weightChoice } from "../../../common/KimetuCommonUtil";
import { KaminariNoKata } from "../../kata/KaminariNoKata";

const zenituKokyuLists = weightChoice([
    { item: 1 , weight: 80 },
    { item: 2 , weight: 15 },
    { item: 3 , weight: 5 },
]);

/**
 * 善逸
 */
export class ZenituComponent implements KokyuMobUseComponent {

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

        const num = zenituKokyuLists.pick();
        entity.setProperty("kurokumaft:kokyu_kata", num);
        this.kokyuUse(entity, num);

    }

    private kokyuUse(entity:Entity, kata:number) {

        const kaminari = new KaminariNoKata();

        try {

            switch (kata) {
                case 1 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    system.runTimeout(() => {
                        kaminari.ichiNoKata(entity, undefined);
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 40);
                break;
                case 2 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    system.runTimeout(() => {
                        kaminari.ichiNoKataShinsoku(entity, undefined);
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 80);
                break;
                case 3 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    system.runTimeout(() => {
                        kaminari.shitiNoKata(entity, undefined);
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 120);
                break;
            }

        } catch (error) {
            
        }
    }
}
