import { Entity, system } from "@minecraft/server";
import { KokyuMobUseComponent } from "../../NichirintouUseComponent";
import { weightChoice } from "../../../common/KimetuCommonUtil";
import { KazeNoKata } from "../../kata/KazeNoKata";

const kazeKokyuLists = weightChoice([
    { item: 1 , weight: 50 },
    { item: 2 , weight: 50 },
    { item: 3 , weight: 50 },
    { item: 4 , weight: 50 },
    { item: 5 , weight: 15 },
    { item: 6 , weight: 20 },
    { item: 7 , weight: 20 },
    { item: 8 , weight: 10 },
    { item: 9 , weight: 10 },
]);

/**
 * 実生
 */
export class KazeComponent implements KokyuMobUseComponent {

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

        const num = kazeKokyuLists.pick();
        entity.setProperty("kurokumaft:kokyu_kata", num);
        this.kokyuUse(entity, num);

    }

    private kokyuUse(entity:Entity, kata:number) {

        const kaze = new KazeNoKata();

        switch (kata) {
            case 1 :
                entity.triggerEvent("kurokumaft:attack_stop");
                system.runTimeout(() => {
                    kaze.ichiNoKata(entity, undefined);
                }, 20);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kokyu_kata", 0);
                    entity.triggerEvent("kurokumaft:kokyu_end");
                }, 50);
            break;
            case 2 :
                entity.triggerEvent("kurokumaft:attack_stop");
                kaze.niNoKata(entity, undefined);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kokyu_kata", 0);
                    entity.triggerEvent("kurokumaft:kokyu_end");
                }, 30);
            break;
            case 3 :
                entity.triggerEvent("kurokumaft:attack_stop");
                kaze.sanNoKata(entity, undefined);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kokyu_kata", 0);
                    entity.triggerEvent("kurokumaft:kokyu_end");
                }, 30);
            break;
            case 4 :
                entity.triggerEvent("kurokumaft:attack_stop");
                kaze.shiNoKata(entity, undefined);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kokyu_kata", 0);
                    entity.triggerEvent("kurokumaft:kokyu_end");
                }, 30);
            break;
            case 5 :
                entity.triggerEvent("kurokumaft:attack_stop");
                kaze.goNoKata(entity, undefined);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kokyu_kata", 0);
                    entity.triggerEvent("kurokumaft:kokyu_end");
                }, 30);
            break;
            case 6 :
                entity.triggerEvent("kurokumaft:attack_stop");
                kaze.rokuNoKata(entity, undefined);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kokyu_kata", 0);
                    entity.triggerEvent("kurokumaft:kokyu_end");
                }, 50);
            break;
            case 7 :
                entity.triggerEvent("kurokumaft:attack_stop");
                kaze.shitiNoKata(entity, undefined);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kokyu_kata", 0);
                    entity.triggerEvent("kurokumaft:kokyu_end");
                }, 50);
            break;
            case 8 :
                entity.triggerEvent("kurokumaft:attack_stop");
                kaze.hachiNoKata(entity, undefined);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kokyu_kata", 0);
                    entity.triggerEvent("kurokumaft:kokyu_end");
                }, 50);
            break;
            case 9 :
                entity.triggerEvent("kurokumaft:attack_stop");
                kaze.kuNoKata(entity, undefined);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kokyu_kata", 0);
                    entity.triggerEvent("kurokumaft:kokyu_end");
                }, 50);
            break;
        }

    }
}
