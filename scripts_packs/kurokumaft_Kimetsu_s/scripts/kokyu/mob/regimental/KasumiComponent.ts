import { Entity, system } from "@minecraft/server";
import { KokyuMobUseComponent } from "../../NichirintouUseComponent";
import { weightChoice } from "../../../common/KimetuCommonUtil";
import { KasumiNoKata } from "../../kata/KasumiNoKata";
import { NomalAttack } from "../../kata/NomalAttack";

const kasumiKokyuLists = weightChoice([
    { item: 1 , weight: 50 },
    { item: 2 , weight: 50 },
    { item: 3 , weight: 50 },
    { item: 4 , weight: 50 },
    { item: 5 , weight: 15 },
    { item: 6 , weight: 20 },
    { item: 7 , weight: 20 },
]);

/**
 * 無一郎
 */
export class KasumiComponent implements KokyuMobUseComponent {

    startMonitoring(entity:Entity) {
        if (entity !== undefined && entity.isValid) {
            const nitirintou_equip = entity.getProperty("kurokumaft:nitirintou_equip") as boolean;
            if (nitirintou_equip) {
                entity.setProperty("kurokumaft:kokyu_use", true);
                entity.setProperty("kurokumaft:kokyu_particle", true);
                this.useAttackKokyu(entity);
            }
        }
    }

    /**
     * @param {Entity} entity
     */
    async hitAttackKata(entity:Entity): Promise<void> {
        const attack = new NomalAttack();
        for (let i=0; i<4; i++) {
            attack.oneAttack(entity, undefined);
            await system.waitTicks(2.5);
        }
        entity.setProperty("kurokumaft:kokyu_attack", false);
    }

    useAttackKokyu(entity:Entity): void {

        const num = kasumiKokyuLists.pick();
        entity.setProperty("kurokumaft:kokyu_kata", num);
        this.kokyuUse(entity, num);

    }

    private kokyuUse(entity:Entity, kata:number) {

        const kasumi = new KasumiNoKata();

        try {

            switch (kata) {
                case 1 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    system.waitTicks(20).then(() => {
                        kasumi.ichiNoKata(entity, undefined);
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 2 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    kasumi.niNoKata(entity, undefined);
                    system.waitTicks(30).then(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 3 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    kasumi.sanNoKata(entity, undefined);
                    system.waitTicks(30).then(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 4 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    system.waitTicks(20).then(() => {
                        kasumi.shiNoKata(entity, undefined);
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 5 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    kasumi.goNoKata(entity, undefined);
                    system.waitTicks(30).then(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 6 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    kasumi.rokuNoKata(entity, undefined);
                    system.waitTicks(30).then(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 7 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    kasumi.shitiNoKata(entity, undefined);
                    system.waitTicks(30).then(() => {
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }).catch((error: any) => {
                    });
                break;
            }
        } catch (error: any) {
            
        }

    }
}
