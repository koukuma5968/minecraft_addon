import { Entity, system, TicksPerSecond } from "@minecraft/server";
import { weightChoice } from "../../common/KimetuCommonUtil";
import { KekkizyutuMobUseComponent } from "../KekkizyutuUseComponent";
import { Kokurai } from "../zyutu/Kokurai";

const kaigakuKekkizyutuLists = weightChoice([
    { item: 2 , weight: 25 },
    { item: 3 , weight: 25 },
    { item: 4 , weight: 20 },
    { item: 5 , weight: 20 },
    { item: 6 , weight: 10 },
]);

/**
 * 獪岳
 */
export class KaigakuComponent implements KekkizyutuMobUseComponent {

    startMonitoring(entity:Entity) {

        try {
            if (entity !== undefined && entity.isValid) {
                entity.setProperty("kurokumaft:kokyu_use", true);
                entity.setProperty("kurokumaft:kokyu_particle", true);
                this.useAttackZyutu(entity);
            }
        } catch (error: any) {
        }
    }

    /**
     * @param {Entity} entity
     */
    hitAttackZyutu(entity: Entity): void {
    }

    useAttackZyutu(entity:Entity): void {

        try {
            const num = kaigakuKekkizyutuLists.pick();
            entity.setProperty("kurokumaft:kekkizyutu_kata", num);
            this.kokyuUse(entity, num);
        } catch (error: any) {
        }

    }

    private kokyuUse(entity:Entity, kata:number) {

        const kokurai = new Kokurai();

        try {
            if (!entity.isValid) {
                return;
            }
            switch (kata) {
                case 2 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    kokurai.niNoKata(entity);
                    system.waitTicks(2*TicksPerSecond).then(() => {
                        entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                        entity.triggerEvent("kurokumaft:kekkizyutu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 3 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    kokurai.sanNoKata(entity);
                    system.waitTicks(1*TicksPerSecond).then(() => {
                        entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                        entity.triggerEvent("kurokumaft:kekkizyutu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 4 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    kokurai.shiNoKata(entity);
                    system.waitTicks(5).then(() => {
                        entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                        entity.triggerEvent("kurokumaft:kekkizyutu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 5 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    kokurai.goNoKata(entity);
                    system.waitTicks(2*TicksPerSecond).then(() => {
                        entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                        entity.triggerEvent("kurokumaft:kekkizyutu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 6 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    kokurai.rokuNoKata(entity);
                    system.waitTicks(1*TicksPerSecond).then(() => {
                        entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                        entity.triggerEvent("kurokumaft:kekkizyutu_end");
                    }).catch((error: any) => {
                    });
                break;
            }
        } catch (error: any) {
        }

    }
}
