import { Entity, system, TicksPerSecond } from "@minecraft/server";
import { weightChoice } from "../../common/KimetuCommonUtil";
import { KekkizyutuMobUseComponent } from "../KekkizyutuUseComponent";
import { Tigama } from "../zyutu/Tigama";

const gyutaroKekkizyutuLists = weightChoice([
    { item: 1 , weight: 50 },
    { item: 2 , weight: 40 },
    { item: 3 , weight: 10 },
]);

/**
 * 妓夫太郎
 */
export class GyutaroComponent implements KekkizyutuMobUseComponent {

    startMonitoring(entity:Entity) {
        if (entity !== undefined && entity.isValid()) {
            entity.setProperty("kurokumaft:kokyu_use", true);
            entity.setProperty("kurokumaft:kokyu_particle", true);
            this.useAttackZyutu(entity);
        }
    }

    useAttackZyutu(entity:Entity): void {

        const num = gyutaroKekkizyutuLists.pick();
        entity.setProperty("kurokumaft:kekkizyutu_kata", num);
        this.kokyuUse(entity, num);

    }

    private kokyuUse(entity:Entity, kata:number) {

        const kama = new Tigama();

        switch (kata) {
            case 1 :
                entity.triggerEvent("kurokumaft:attack_stop");
                kama.tobiTigama(entity);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                    entity.triggerEvent("kurokumaft:kekkizyutu_end");
                }, 30);
            break;
            case 2 :
                entity.triggerEvent("kurokumaft:attack_stop");
                kama.bakkotyouryou(entity);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                    entity.triggerEvent("kurokumaft:kekkizyutu_end");
                }, 3*TicksPerSecond);
            break;
            case 3 :
                entity.triggerEvent("kurokumaft:attack_stop");
                system.runTimeout(() => {
                    kama.enzansenkai(entity);
                }, 30);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                    entity.triggerEvent("kurokumaft:kekkizyutu_end");
                }, 60);
            break;
        }

    }
}
