import { Entity, system } from "@minecraft/server";
import { weightChoice } from "../../common/KimetuCommonUtil";
import { KekkizyutuMobUseComponent } from "../KekkizyutuUseComponent";
import { Bunretu } from "../zyutu/Bunretu";

const urogiKekkizyutuLists = weightChoice([
    { item: 1 , weight: 100 },
]);

/**
 * 空喜
 */
export class UrogiComponent implements KekkizyutuMobUseComponent {

    startMonitoring(entity:Entity) {
        if (entity !== undefined && entity.isValid()) {
            entity.setProperty("kurokumaft:kokyu_use", true);
            entity.setProperty("kurokumaft:kokyu_particle", true);
            this.useAttackZyutu(entity);
        }
    }

    useAttackZyutu(entity:Entity): void {

        const num = urogiKekkizyutuLists.pick();
        entity.setProperty("kurokumaft:kekkizyutu_kata", num);
        this.kokyuUse(entity, num);

    }

    private kokyuUse(entity:Entity, kata:number) {

        const bunretu = new Bunretu();

        switch (kata) {
            case 1 :
                entity.triggerEvent("kurokumaft:attack_stop");
                bunretu.ultrasonic(entity);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                    entity.triggerEvent("kurokumaft:kekkizyutu_end");
                }, 80);
            break;
        }

    }
}
