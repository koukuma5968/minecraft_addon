import { Entity, system } from "@minecraft/server";
import { weightChoice } from "../../common/KimetuCommonUtil";
import { KekkizyutuMobUseComponent } from "../KekkizyutuUseComponent";
import { Bunretu } from "../zyutu/Bunretu";
import { Bakketu } from "../zyutu/Bakketu";

const nezukoKekkizyutuLists = weightChoice([
    { item: 1 , weight: 100 },
]);

/**
 * ねずこ
 */
export class NezukoComponent implements KekkizyutuMobUseComponent {

    startMonitoring(entity:Entity) {
        if (entity !== undefined && entity.isValid()) {
            entity.setProperty("kurokumaft:kokyu_use", true);
            entity.setProperty("kurokumaft:kokyu_particle", true);
            this.useAttackZyutu(entity);
        }
    }

    useAttackZyutu(entity:Entity): void {

        const num = nezukoKekkizyutuLists.pick();
        entity.setProperty("kurokumaft:kekkizyutu_kata", num);
        this.kokyuUse(entity, num);

    }

    private kokyuUse(entity:Entity, kata:number) {

        const bakketu = new Bakketu();

        switch (kata) {
            case 1 :
                entity.triggerEvent("kurokumaft:attack_stop");
                bakketu.bakketu(entity);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                    entity.triggerEvent("kurokumaft:kekkizyutu_end");
                }, 80);
            break;
        }

    }
}
