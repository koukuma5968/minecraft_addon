import { Entity, system } from "@minecraft/server";
import { KokyuMobUseComponent } from "../../NichirintouUseComponent";
import { TukiNoKata } from "../../kata/TukiNoKata";
import { weightChoice } from "../../../common/KimetuCommonUtil";

const tukiKokyuLists = weightChoice([
    { item: 1 , weight: 30 },
    { item: 2 , weight: 30 },
    { item: 3 , weight: 30 },
    { item: 5 , weight: 30 },
    { item: 6 , weight: 20 },
    { item: 7 , weight: 20 },
    { item: 8 , weight: 20 },
    { item: 9 , weight: 20 },
    { item: 10 , weight: 20 },
    { item: 14 , weight: 10 },
    { item: 16 , weight: 10 },
]);

/**
 * 呼吸（月）
 */
export class TukiComponent implements KokyuMobUseComponent {

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

        const num = tukiKokyuLists.pick();
        entity.setProperty("kurokumaft:kokyu_kata", num);
        this.kokyuUse(entity, num);

    }

    private kokyuUse(entity:Entity, kata:number) {

        const tuki = new TukiNoKata();

        try {
            switch (kata) {
                case 1 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    system.runTimeout(() => {
                        tuki.ichiNoKata(entity, undefined);
                    }, 30);
                    system.runTimeout(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 60);
                break;
                case 2 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    tuki.niNoKata(entity, undefined);
                    system.runTimeout(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 30);
                break;
                case 3 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    tuki.sanNoKata(entity, undefined);
                    system.runTimeout(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 30);
                break;
                case 5 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    tuki.goNoKata(entity, undefined);
                    system.runTimeout(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 30);
                break;
                case 6 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    tuki.rokuNoKata(entity, undefined);
                    system.runTimeout(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 30);
                break;
                case 7 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    tuki.shitiNoKata(entity, undefined);
                    system.runTimeout(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 30);
                break;
                case 8 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    tuki.hachiNoKata(entity, undefined);
                    system.runTimeout(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 30);
                break;
                case 9 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    tuki.kuNoKata(entity, undefined);
                    system.runTimeout(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 30);
                break;
                case 10 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    tuki.zyuNoKata(entity, undefined);
                    system.runTimeout(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 30);
                break;
                case 14 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    tuki.zyushiNoKata(entity, undefined);
                    system.runTimeout(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 30);
                break;
                case 16 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    tuki.zyurokuNoKata(entity, undefined);
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
