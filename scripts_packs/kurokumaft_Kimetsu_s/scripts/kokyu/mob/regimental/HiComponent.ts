import { Entity, system, TicksPerSecond } from "@minecraft/server";
import { KokyuMobUseComponent } from "../../NichirintouUseComponent";
import { HiNoKata } from "../../kata/HiNoKata";
import { weightChoice } from "../../../common/KimetuCommonUtil";

const hiKokyuLists = weightChoice([
    { item: 1 , weight: 30 },
    { item: 2 , weight: 30 },
    { item: 3 , weight: 30 },
    { item: 4 , weight: 20 },
    { item: 5 , weight: 10 },
    { item: 6 , weight: 20 },
    { item: 7 , weight: 20 },
    { item: 8 , weight: 20 },
    { item: 9 , weight: 10 },
    { item: 10 , weight: 20 },
    { item: 11 , weight: 10 },
    { item: 12 , weight: 20 },
]);

/**
 * 日
 */
export class HiComponent implements KokyuMobUseComponent {

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

        const num = hiKokyuLists.pick();
        entity.setProperty("kurokumaft:kokyu_kata", num);
        this.kokyuUse(entity, num);

    }

    private kokyuUse(entity:Entity, kata:number) {

        const hi = new HiNoKata();

        try {
            switch (kata) {
                case 1 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    hi.ichiNoKata(entity, undefined);
                    system.runTimeout(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 20);
                break;
                case 2 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    hi.niNoKata(entity, undefined);
                    system.runTimeout(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 20);
                    break;
                case 3 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    hi.sanNoKata(entity, undefined);
                    system.runTimeout(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 20);
                    break;
                case 4 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    hi.shiNoKata(entity, undefined);
                    system.runTimeout(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 20);
                break;
                case 5 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    system.runTimeout(() => {
                        hi.goNoKata(entity, undefined);
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 20);
                break;
                case 6 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    hi.rokuNoKata(entity, undefined);
                    system.runTimeout(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 90);
                break;
                case 7 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    hi.shitiNoKata(entity, undefined);
                    system.runTimeout(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 20);
                break;
                case 8 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    hi.hachiNoKata(entity, undefined);
                    system.runTimeout(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 20);
                break;
                case 9 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    hi.kuNoKata(entity, undefined);
                    system.runTimeout(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 20);
                break;
                case 10 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    hi.zyuNoKata(entity, undefined);
                    system.runTimeout(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 20);
                break;
                case 11 :
                    hi.zyuichiNoKata(entity, undefined);
                    system.runTimeout(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                    }, 10*TicksPerSecond);
                break;
                case 12 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    hi.zyuniNoKata(entity, undefined);
                    system.runTimeout(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 20);
                break;
            }

        } catch (error) {
            
        }

    }
}
