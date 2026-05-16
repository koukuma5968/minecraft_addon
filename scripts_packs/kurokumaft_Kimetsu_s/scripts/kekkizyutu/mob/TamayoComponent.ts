import { Entity, system } from "@minecraft/server";
import { weightChoice } from "../../common/KimetuCommonUtil";
import { KekkizyutuMobUseComponent } from "../KekkizyutuUseComponent";
import { Wakuti } from "../zyutu/Wakuti";

const tamayoKekkizyutuLists = weightChoice([
    { item: 1 , weight: 20 },
    { item: 2 , weight: 20 },
    { item: 3 , weight: 20 },
    { item: 4 , weight: 20 },
    { item: 5 , weight: 20 },
]);

/**
 * 珠世
 */
export class TamayoComponent implements KekkizyutuMobUseComponent {

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
            const num = tamayoKekkizyutuLists.pick();
            entity.setProperty("kurokumaft:kekkizyutu_kata", num);
            this.kokyuUse(entity, num);
        } catch (error: any) {
        }

    }

    private kokyuUse(entity:Entity, kata:number) {

        const wakuti = new Wakuti();

        try {
            if (!entity.isValid) {
                return;
            }
            switch (kata) {
                case 1 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    wakuti.shikakumugennokou(entity);
                    system.waitTicks(2).then(() => {
                        entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                        entity.triggerEvent("kurokumaft:kekkizyutu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 2 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    wakuti.houkazyubakunokou(entity);
                    system.waitTicks(2).then(() => {
                        entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                        entity.triggerEvent("kurokumaft:kekkizyutu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 3 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    wakuti.hakumugenwakunokou(entity);
                    system.waitTicks(2).then(() => {
                        entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                        entity.triggerEvent("kurokumaft:kekkizyutu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 4 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    wakuti.kigasyokumeinokou(entity);
                    system.waitTicks(2).then(() => {
                        entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                        entity.triggerEvent("kurokumaft:kekkizyutu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 5 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    wakuti.shizyufudokunokou(entity);
                    system.waitTicks(2).then(() => {
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
