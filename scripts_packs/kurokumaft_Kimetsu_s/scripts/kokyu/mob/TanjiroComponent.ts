import { Entity, EntityComponentTypes, EntityEquippableComponent, EquipmentSlot, ItemStack, system, TicksPerSecond, world } from "@minecraft/server";
import { KokyuMobUseComponent } from "../NichirintouUseComponent";
import { MizuNoKata } from "../kata/MizuNoKata";
import { HiNoKata } from "../kata/HiNoKata";
import { getRandomInRange, weightChoice } from "../../common/KimetuCommonUtil";

const tanjiroKokyuLowLists = weightChoice([
    { item: 1 , weight: 50 },
    { item: 2 , weight: 50 },
    { item: 3 , weight: 50 },
    { item: 4 , weight: 40 },
    { item: 5 , weight: 15 },
    { item: 6 , weight: 30 },
    { item: 7 , weight: 20 },
    { item: 8 , weight: 20 },
    { item: 9 , weight: 10 },
    { item: 10 , weight: 10 },
]);

const tanjiroKokyuLists = weightChoice([
    { item: 1 , weight: 50 },
    { item: 2 , weight: 50 },
    { item: 3 , weight: 50 },
    { item: 4 , weight: 40 },
    { item: 5 , weight: 15 },
    { item: 6 , weight: 30 },
    { item: 7 , weight: 20 },
    { item: 8 , weight: 20 },
    { item: 9 , weight: 10 },
    { item: 10 , weight: 10 },
    { item: 11 , weight: 30 },
    { item: 12 , weight: 30 },
    { item: 13 , weight: 30 },
    { item: 14 , weight: 20 },
    { item: 15 , weight: 10 },
    { item: 16 , weight: 20 },
    { item: 17 , weight: 20 },
    { item: 18 , weight: 20 },
    { item: 19 , weight: 10 },
    { item: 20 , weight: 20 },
    { item: 21 , weight: 10 },
    { item: 22 , weight: 20 },
]);

/**
 * 炭治郎
 */
export class TanjiroComponent implements KokyuMobUseComponent {

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

        const kaikyuNum = entity.getProperty("kurokumaft:kaikyu") as number;
        if (kaikyuNum > 4) {
            const num = tanjiroKokyuLists.pick();
            this.kokyuUse(entity, num);
        } else {
            const num = tanjiroKokyuLowLists.pick();
            this.kokyuUse(entity, num);
        }

    }

    private kokyuUse(entity:Entity, kata:number) {

        const mizu = new MizuNoKata();
        const hi = new HiNoKata();

        entity.setProperty("kurokumaft:kokyu_kata", kata);
        switch (kata) {
            case 1 :
                entity.triggerEvent("kurokumaft:attack_stop");
                system.runTimeout(() => {
                    mizu.ichiNoKata(entity, undefined);
                    entity.setProperty("kurokumaft:kokyu_kata", 0);
                    entity.triggerEvent("kurokumaft:kokyu_end");
                }, 10);
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
            case 11 :
                entity.triggerEvent("kurokumaft:attack_stop");
                const ichi = getRandomInRange(1, 2);
                if (ichi == 1) {
                    hi.ichiNoKata(entity, undefined);
                    system.runTimeout(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 20);
                } else {
                    system.runTimeout(() => {
                        hi.ichiNoKataIssen(entity, undefined);
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }, 20);
                }
            break;
            case 12 :
                entity.triggerEvent("kurokumaft:attack_stop");
                hi.niNoKata(entity, undefined);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kokyu_kata", 0);
                    entity.triggerEvent("kurokumaft:kokyu_end");
                }, 20);
                break;
            case 13 :
                entity.triggerEvent("kurokumaft:attack_stop");
                hi.sanNoKata(entity, undefined);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kokyu_kata", 0);
                    entity.triggerEvent("kurokumaft:kokyu_end");
                }, 20);
                break;
            case 14 :
                entity.triggerEvent("kurokumaft:attack_stop");
                hi.shiNoKata(entity, undefined);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kokyu_kata", 0);
                    entity.triggerEvent("kurokumaft:kokyu_end");
                }, 20);
            break;
            case 15 :
                entity.triggerEvent("kurokumaft:attack_stop");
                system.runTimeout(() => {
                    hi.goNoKata(entity, undefined);
                    entity.setProperty("kurokumaft:kokyu_kata", 0);
                    entity.triggerEvent("kurokumaft:kokyu_end");
                }, 20);
            break;
            case 16 :
                entity.triggerEvent("kurokumaft:attack_stop");
                hi.rokuNoKata(entity, undefined);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kokyu_kata", 0);
                    entity.triggerEvent("kurokumaft:kokyu_end");
                }, 90);
            break;
            case 17 :
                entity.triggerEvent("kurokumaft:attack_stop");
                hi.shitiNoKata(entity, undefined);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kokyu_kata", 0);
                    entity.triggerEvent("kurokumaft:kokyu_end");
                }, 20);
            break;
            case 18 :
                entity.triggerEvent("kurokumaft:attack_stop");
                hi.hachiNoKata(entity, undefined);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kokyu_kata", 0);
                    entity.triggerEvent("kurokumaft:kokyu_end");
                }, 20);
            break;
            case 19 :
                entity.triggerEvent("kurokumaft:attack_stop");
                hi.kuNoKata(entity, undefined);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kokyu_kata", 0);
                    entity.triggerEvent("kurokumaft:kokyu_end");
                }, 20);
            break;
            case 20 :
                entity.triggerEvent("kurokumaft:attack_stop");
                hi.zyuNoKata(entity, undefined);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kokyu_kata", 0);
                    entity.triggerEvent("kurokumaft:kokyu_end");
                }, 20);
            break;
            case 21 :
                hi.zyuichiNoKata(entity, undefined);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kokyu_kata", 0);
                }, 10*TicksPerSecond);
            break;
            case 22 :
                entity.triggerEvent("kurokumaft:attack_stop");
                hi.zyuniNoKata(entity, undefined);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kokyu_kata", 0);
                    entity.triggerEvent("kurokumaft:kokyu_end");
                }, 20);
            break;
        }

    }
}
