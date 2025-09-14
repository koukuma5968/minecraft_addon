import { Entity, system } from "@minecraft/server";
import { weightChoice } from "../../common/KimetuCommonUtil";
import { KekkizyutuMobUseComponent } from "../KekkizyutuUseComponent";
import { TukiNoKataZyutu } from "../zyutu/TukiNoKataZyutu";
import { NomalAttack } from "../../kokyu/kata/NomalAttack";

const kokushibouKekkizyutuLists = weightChoice([
    { item: 1 , weight: 20 },
    { item: 2 , weight: 15 },
    { item: 3 , weight: 15 },
    { item: 5 , weight: 10 },
    { item: 6 , weight: 10 },
    { item: 7 , weight: 5 },
    { item: 8 , weight: 5 },
    { item: 9 , weight: 5 },
    { item: 10 , weight: 5 },
    { item: 14 , weight: 5 },
    { item: 16 , weight: 5 },
]);

/**
 * 黒死牟
 */
export class KokushibouComponent implements KekkizyutuMobUseComponent {

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
    async hitAttackZyutu(entity:Entity): Promise<void> {
        const attack = new NomalAttack();
        for (let i=0; i<4; i++) {
            attack.oneAttack(entity, undefined);
            await system.waitTicks(2.5);
        }
        entity.setProperty("kurokumaft:kokyu_attack", false);
    }

    useAttackZyutu(entity:Entity): void {

        try {
            const num = kokushibouKekkizyutuLists.pick();
            entity.setProperty("kurokumaft:kekkizyutu_kata", num);
            this.kokyuUse(entity, num);
        } catch (error: any) {
        }

    }

    private kokyuUse(entity:Entity, kata:number) {

        const tuki = new TukiNoKataZyutu();

        try {
            switch (kata) {
                case 1 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    tuki.ichiNoKata(entity);
                    system.waitTicks(10).then(() => {
                        entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                        entity.triggerEvent("kurokumaft:kekkizyutu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 2 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    tuki.niNoKata(entity);
                    system.waitTicks(20).then(() => {
                        entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                        entity.triggerEvent("kurokumaft:kekkizyutu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 3 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    tuki.sanNoKata(entity);
                    system.waitTicks(15).then(() => {
                        entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                        entity.triggerEvent("kurokumaft:kekkizyutu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 5 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    tuki.goNoKata(entity);
                    system.waitTicks(30).then(() => {
                        entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                        entity.triggerEvent("kurokumaft:kekkizyutu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 6 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    tuki.rokuNoKata(entity);
                    system.waitTicks(30).then(() => {
                        entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                        entity.triggerEvent("kurokumaft:kekkizyutu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 7 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    tuki.shitiNoKata(entity);
                    system.waitTicks(15).then(() => {
                        entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                        entity.triggerEvent("kurokumaft:kekkizyutu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 8 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    tuki.hachiNoKata(entity);
                    system.waitTicks(20).then(() => {
                        entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                        entity.triggerEvent("kurokumaft:kekkizyutu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 9 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    tuki.kuNoKata(entity);
                    system.waitTicks(25).then(() => {
                        entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                        entity.triggerEvent("kurokumaft:kekkizyutu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 10 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    tuki.zyuNoKata(entity);
                    system.waitTicks(20).then(() => {
                        entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                        entity.triggerEvent("kurokumaft:kekkizyutu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 14 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    tuki.zyushiNoKata(entity);
                    system.waitTicks(50).then(() => {
                        entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                        entity.triggerEvent("kurokumaft:kekkizyutu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 16 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    tuki.zyurokuNoKata(entity);
                    system.waitTicks(50).then(() => {
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
