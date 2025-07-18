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
        if (entity !== undefined && entity.isValid()) {
            entity.setProperty("kurokumaft:kokyu_use", true);
            entity.setProperty("kurokumaft:kokyu_particle", true);
            this.useAttackZyutu(entity);
        }
    }

    useAttackZyutu(entity:Entity): void {

        const num = zouhakutenKekkizyutuLists.pick();
        entity.setProperty("kurokumaft:kekkizyutu_kata", num);
        this.kokyuUse(entity, num);

    }

    private kokyuUse(entity:Entity, kata:number) {

        const bunretu = new Bunretu();

        switch (kata) {
            case 1 :
                entity.triggerEvent("kurokumaft:attack_stop");
                bunretu.tokage(entity);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                    entity.triggerEvent("kurokumaft:kekkizyutu_end");
                }, 10);
            break;
            case 2 :
                entity.triggerEvent("kurokumaft:attack_stop");
                bunretu.kyouatumeiha(entity);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                    entity.triggerEvent("kurokumaft:kekkizyutu_end");
                }, 40);
            break;
            case 3 :
                entity.triggerEvent("kurokumaft:attack_stop");
                bunretu.kyoumeiraisatu(entity);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                    entity.triggerEvent("kurokumaft:kekkizyutu_end");
                }, 40);
            break;
            case 4 :
                entity.triggerEvent("kurokumaft:attack_stop");
                bunretu.mukengouzyu(entity);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                    entity.triggerEvent("kurokumaft:kekkizyutu_end");
                }, 80);
            break;
        }

    }
}
