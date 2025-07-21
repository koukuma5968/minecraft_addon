import { Entity, system } from "@minecraft/server";
import { weightChoice } from "../../common/KimetuCommonUtil";
import { KekkizyutuMobUseComponent } from "../KekkizyutuUseComponent";
import { Bunretu } from "../zyutu/Bunretu";

const sekidoKekkizyutuLists = weightChoice([
    { item: 1 , weight: 100 },
]);

/**
 * 積怒
 */
export class SekidoComponent implements KekkizyutuMobUseComponent {

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

    useAttackZyutu(entity:Entity): void {

        try {
            const num = sekidoKekkizyutuLists.pick();
            entity.setProperty("kurokumaft:kekkizyutu_kata", num);
            this.kokyuUse(entity, num);
        } catch (error: any) {
        }

    }

    private kokyuUse(entity:Entity, kata:number) {

        const bunretu = new Bunretu();

        try {
            switch (kata) {
                case 1 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    bunretu.ikazuti(entity);
                    system.waitTicks(80).then(() => {
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
