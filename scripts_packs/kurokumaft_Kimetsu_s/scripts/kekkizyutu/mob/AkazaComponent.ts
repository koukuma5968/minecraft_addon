import { Entity, system } from "@minecraft/server";
import { weightChoice } from "../../common/KimetuCommonUtil";
import { KekkizyutuMobUseComponent } from "../KekkizyutuUseComponent";
import { Hakaisatu } from "../zyutu/Hakaisatu";

const akazaKekkizyutuLists = weightChoice([
    { item: 2 , weight: 40 },
    { item: 3 , weight: 10 },
]);

/**
 * 累
 */
export class AkazaComponent implements KekkizyutuMobUseComponent {

    startMonitoring(entity:Entity) {
        if (entity != undefined && entity.isValid()) {
            entity.setProperty("kurokumaft:kokyu_use", true);
            entity.setProperty("kurokumaft:kokyu_particle", true);
            this.useAttackZyutu(entity);
        }
    }

    useAttackZyutu(entity:Entity): void {

        if (entity.getProperty("kurokumaft:rashin")) {
            const num = akazaKekkizyutuLists.pick();
            entity.setProperty("kurokumaft:kekkizyutu_kata", num);
            this.kokyuUse(entity, num);
        } else {
            entity.setProperty("kurokumaft:kekkizyutu_kata", 1);
            this.kokyuUse(entity, 1);
        }

    }

    private kokyuUse(entity:Entity, kata:number) {

        const hakaisatu = new Hakaisatu();

        switch (kata) {
            case 1 :
                entity.triggerEvent("kurokumaft:attack_stop");
                hakaisatu.rashin(entity);
                entity.setProperty("kurokumaft:rashin", true);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                    entity.triggerEvent("kurokumaft:kekkizyutu_end");
                }, 30);
            break;
            case 2 :
                entity.triggerEvent("kurokumaft:attack_stop");
                hakaisatu.kushiki(entity);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                    entity.triggerEvent("kurokumaft:kekkizyutu_end");
                }, 20);
            break;
            case 3 :
                entity.triggerEvent("kurokumaft:attack_stop");
                hakaisatu.ranshiki(entity);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                    entity.triggerEvent("kurokumaft:kekkizyutu_end");
                }, 80);
            break;
            case 4 :
                entity.triggerEvent("kurokumaft:attack_stop");
                hakaisatu.kamurosakiwari(entity);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                    entity.triggerEvent("kurokumaft:kekkizyutu_end");
                }, 60);
            break;
            case 5 :
                entity.triggerEvent("kurokumaft:attack_stop");
                hakaisatu.ryusengunkou(entity);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                    entity.triggerEvent("kurokumaft:kekkizyutu_end");
                }, 60);
            break;
            case 6 :
                entity.triggerEvent("kurokumaft:attack_stop");
                hakaisatu.hiyuuseisenrin(entity);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                    entity.triggerEvent("kurokumaft:kekkizyutu_end");
                }, 60);
            break;
            case 7 :
                entity.triggerEvent("kurokumaft:attack_stop");
                hakaisatu.manyousenyanagi(entity);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                    entity.triggerEvent("kurokumaft:kekkizyutu_end");
                }, 60);
            break;
            case 8 :
                entity.triggerEvent("kurokumaft:attack_stop");
                hakaisatu.kishinyaenshin(entity);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                    entity.triggerEvent("kurokumaft:kekkizyutu_end");
                }, 60);
            break;
            case 9 :
                entity.triggerEvent("kurokumaft:attack_stop");
                system.runTimeout(() => {
                    hakaisatu.messhiki(entity);
                }, 20);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                    entity.triggerEvent("kurokumaft:kekkizyutu_end");
                }, 60);
            break;
            case 10 :
                entity.triggerEvent("kurokumaft:attack_stop");
                hakaisatu.aoginranzankou(entity);
                system.runTimeout(() => {
                    entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                    entity.triggerEvent("kurokumaft:kekkizyutu_end");
                }, 80);
            break;
        }

    }
}
