import { Entity, system } from "@minecraft/server";
import { weightChoice } from "../../common/KimetuCommonUtil";
import { KekkizyutuMobUseComponent } from "../KekkizyutuUseComponent";
import { Koushi } from "../zyutu/Koushi";

const ruiKekkizyutuLists = weightChoice([
    { item: 1 , weight: 50 },
    { item: 2 , weight: 40 },
    { item: 3 , weight: 10 },
]);

/**
 * 累
 */
export class RuiComponent implements KekkizyutuMobUseComponent {

    startMonitoring(entity:Entity) {
        if (entity != undefined && entity.isValid()) {
            entity.setProperty("kurokumaft:kokyu_use", true);
            entity.setProperty("kurokumaft:kokyu_particle", true);
            this.useAttackZyutu(entity);
        }
    }

    useAttackZyutu(entity:Entity): void {

        const num = ruiKekkizyutuLists.pick();
        entity.setProperty("kurokumaft:kekkizyutu_kata", num);
        this.kokyuUse(entity, num);

    }

    private kokyuUse(entity:Entity, kata:number) {

        const koushi = new Koushi();

        switch (kata) {
            case 1 :
                entity.triggerEvent("kurokumaft:attack_stop");
                koushi.kokushirou(entity);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                    entity.triggerEvent("kurokumaft:kekkizyutu_end");
                }, 30);
            break;
            case 2 :
                entity.triggerEvent("kurokumaft:attack_stop");
                koushi.kokushirinten(entity);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                    entity.triggerEvent("kurokumaft:kekkizyutu_end");
                }, 80);
            break;
            case 3 :
                entity.triggerEvent("kurokumaft:attack_stop");
                koushi.ayamekago(entity);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                    entity.triggerEvent("kurokumaft:kekkizyutu_end");
                }, 60);
            break;
        }

    }
}
