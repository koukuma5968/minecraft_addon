import { Entity, system } from "@minecraft/server";
import { KokyuMobUseComponent } from "../../NichirintouUseComponent";
import { weightChoice } from "../../../common/KimetuCommonUtil";
import { HonoNoKata } from "../../kata/HonoNoKata";

const kyouzyuroKokyuLists = weightChoice([
    { item: 1 , weight: 40 },
    { item: 2 , weight: 30 },
    { item: 3 , weight: 30 },
    { item: 4 , weight: 30 },
    { item: 5 , weight: 20 },
    { item: 9 , weight: 10 },
]);

/**
 * 杏寿郎
 */
export class KyouzyuroComponent implements KokyuMobUseComponent {

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

        const num = kyouzyuroKokyuLists.pick();
        entity.setProperty("kurokumaft:kokyu_kata", num);
        this.kokyuUse(entity, num);

    }

    private kokyuUse(entity:Entity, kata:number) {

        const hono = new HonoNoKata();

        try {

            switch (kata) {
                case 1 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    system.runTimeout(() => {
                        hono.ichiNoKata(entity, undefined);
                    }, 30);
                    system.runTimeout(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 60);
                break;
                case 2 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    hono.niNoKata(entity, undefined);
                    system.runTimeout(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 30);
                break;
                case 3 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    hono.sanNoKata(entity, undefined);
                    system.runTimeout(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 30);
                break;
                case 4 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    hono.shiNoKata(entity, undefined);
                    system.runTimeout(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 30);
                break;
                case 5 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    hono.goNoKata(entity, undefined);
                    system.runTimeout(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 30);
                break;
                case 9 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    system.runTimeout(() => {
                        hono.kuNoKata(entity, undefined);
                    }, 40);
                    system.runTimeout(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 80);
                break;
            }
        } catch (error) {
            
        }

    }
}
