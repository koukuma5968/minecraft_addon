import { Entity, system } from "@minecraft/server";
import { weightChoice } from "../../common/KimetuCommonUtil";
import { KekkizyutuMobUseComponent } from "../KekkizyutuUseComponent";
import { Obi } from "../zyutu/Obi";

const dakiKekkizyutuLists = weightChoice([
    { item: 1 , weight: 30 },
    { item: 2 , weight: 20 },
    { item: 3 , weight: 40 },
    { item: 4 , weight: 10 },
]);

/**
 * 堕姫
 */
export class DakiComponent implements KekkizyutuMobUseComponent {

    startMonitoring(entity:Entity) {
        if (entity != undefined && entity.isValid()) {
            entity.setProperty("kurokumaft:kokyu_use", true);
            entity.setProperty("kurokumaft:kokyu_particle", true);
            this.useAttackZyutu(entity);
        }
    }

    useAttackZyutu(entity:Entity): void {

        const num = dakiKekkizyutuLists.pick();
        entity.setProperty("kurokumaft:kekkizyutu_kata", num);
        this.kokyuUse(entity, num);

    }

    private kokyuUse(entity:Entity, kata:number) {

        const obi = new Obi();

        switch (kata) {
            case 1 :
                entity.triggerEvent("kurokumaft:attack_stop");
                obi.yokonagi(entity);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                    entity.triggerEvent("kurokumaft:kekkizyutu_end");
                }, 30);
            break;
            case 2 :
                entity.triggerEvent("kurokumaft:attack_stop");
                obi.barrage(entity);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                    entity.triggerEvent("kurokumaft:kekkizyutu_end");
                }, 80);
            break;
            case 3 :
                entity.triggerEvent("kurokumaft:attack_stop");
                obi.yaeobigiri(entity);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                    entity.triggerEvent("kurokumaft:kekkizyutu_end");
                }, 10);
            break;
            case 4 :
                entity.triggerEvent("kurokumaft:attack_stop");
                obi.yaeobigiri(entity);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                    entity.triggerEvent("kurokumaft:kekkizyutu_end");
                }, 30);
            break;
        }

    }
}
