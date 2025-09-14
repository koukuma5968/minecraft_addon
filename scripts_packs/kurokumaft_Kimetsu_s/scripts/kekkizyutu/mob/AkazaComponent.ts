import { Entity, system } from "@minecraft/server";
import { weightChoice } from "../../common/KimetuCommonUtil";
import { KekkizyutuMobUseComponent } from "../KekkizyutuUseComponent";
import { Hakaisatu } from "../zyutu/Hakaisatu";

const akazaKekkizyutuLists = weightChoice([
    { item: 2 , weight: 5 },
    { item: 3 , weight: 15 },
    { item: 4 , weight: 10 },
    { item: 5 , weight: 10 },
    { item: 6 , weight: 15 },
    { item: 7 , weight: 15 },
    { item: 8 , weight: 10 },
    { item: 9 , weight: 5 },
    { item: 10 , weight: 5 },
]);

/**
 * 累
 */
export class AkazaComponent implements KekkizyutuMobUseComponent {

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

            if (entity.getProperty("kurokumaft:rashin")) {
                const num = akazaKekkizyutuLists.pick();
                entity.setProperty("kurokumaft:kekkizyutu_kata", num);
                this.kokyuUse(entity, num);
            } else {
                entity.setProperty("kurokumaft:kekkizyutu_kata", 1);
                this.kokyuUse(entity, 1);
            }
        } catch (error: any) {
        }

    }

    private kokyuUse(entity:Entity, kata:number) {

        const hakaisatu = new Hakaisatu();

        try {

            switch (kata) {
                case 1 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    hakaisatu.rashin(entity);
                    entity.setProperty("kurokumaft:rashin", true);
                    system.waitTicks(30).then(() => {
                        entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                        entity.triggerEvent("kurokumaft:kekkizyutu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 2 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    hakaisatu.kushiki(entity);
                    system.waitTicks(20).then(() => {
                        entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                        entity.triggerEvent("kurokumaft:kekkizyutu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 3 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    hakaisatu.ranshiki(entity);
                    system.waitTicks(80).then(() => {
                        entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                        entity.triggerEvent("kurokumaft:kekkizyutu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 4 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    hakaisatu.kamurosakiwari(entity);
                    system.waitTicks(60).then(() => {
                        entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                        entity.triggerEvent("kurokumaft:kekkizyutu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 5 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    hakaisatu.ryusengunkou(entity);
                    system.waitTicks(60).then(() => {
                        entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                        entity.triggerEvent("kurokumaft:kekkizyutu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 6 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    hakaisatu.hiyuuseisenrin(entity);
                    system.waitTicks(60).then(() => {
                        entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                        entity.triggerEvent("kurokumaft:kekkizyutu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 7 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    hakaisatu.manyousenyanagi(entity);
                    system.waitTicks(60).then(() => {
                        entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                        entity.triggerEvent("kurokumaft:kekkizyutu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 8 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    hakaisatu.kishinyaenshin(entity);
                    system.waitTicks(60).then(() => {
                        entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                        entity.triggerEvent("kurokumaft:kekkizyutu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 9 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    system.runTimeout(() => {
                        hakaisatu.messhiki(entity);
                    }, 20);
                    system.waitTicks(60).then(() => {
                        entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                        entity.triggerEvent("kurokumaft:kekkizyutu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 10 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    hakaisatu.aoginranzankou(entity);
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
