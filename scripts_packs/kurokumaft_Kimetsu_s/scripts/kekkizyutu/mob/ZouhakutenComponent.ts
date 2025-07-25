import { Entity, system } from "@minecraft/server";
import { weightChoice } from "../../common/KimetuCommonUtil";
import { KekkizyutuMobUseComponent } from "../KekkizyutuUseComponent";
import { Bunretu } from "../zyutu/Bunretu";

const zouhakutenKekkizyutuLists = weightChoice([
    { item: 1 , weight: 50 },
    { item: 2 , weight: 20 },
    { item: 3 , weight: 20 },
    { item: 4 , weight: 10 },
]);

/**
 * 憎拍天
 */
export class ZouhakutenComponent implements KekkizyutuMobUseComponent {

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
            const num = zouhakutenKekkizyutuLists.pick();
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
                    bunretu.tokage(entity);
                    system.waitTicks(10).then(() => {
                        entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                        entity.triggerEvent("kurokumaft:kekkizyutu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 2 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    bunretu.kyouatumeiha(entity);
                    system.waitTicks(40).then(() => {
                        entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                        entity.triggerEvent("kurokumaft:kekkizyutu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 3 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    bunretu.kyoumeiraisatu(entity);
                    system.waitTicks(40).then(() => {
                        entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                        entity.triggerEvent("kurokumaft:kekkizyutu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 4 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    bunretu.mukengouzyu(entity);
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
