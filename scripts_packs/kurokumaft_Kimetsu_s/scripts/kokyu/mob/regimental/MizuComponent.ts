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
                    system.runTimeout(() => {
                        mizu.ichiNoKata(entity, undefined);
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 15);
                break;
                case 2 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    mizu.niNoKata(entity, undefined);
                    system.runTimeout(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 20);
                break;
                case 3 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    mizu.sanNoKata(entity, undefined);
                    system.runTimeout(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 20);
                break;
                case 4 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    mizu.shiNoKata(entity, undefined);
                    system.runTimeout(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 20);
                break;
                case 5 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    system.runTimeout(() => {
                        mizu.goNoKata(entity, undefined);
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 20);
                break;
                case 6 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    system.runTimeout(() => {
                        mizu.rokuNoKata(entity, undefined);
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 20);
                break;
                case 7 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    system.runTimeout(() => {
                        mizu.shitiNoKata(entity, undefined);
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 20);
                break;
                case 8 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    system.runTimeout(() => {
                        mizu.hachiNoKata(entity, undefined);
                    }, 5);
                    system.runTimeout(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 50);
                break;
                case 9 :
                    mizu.kuNoKata(entity, undefined);
                    system.runTimeout(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                    }, 15*TicksPerSecond);
                break;
                case 10 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    mizu.zyuNoKataMob(entity, undefined);
                    system.runTimeout(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 40);
                break;
            }
        } catch (error) {
            
        }

    }
}
