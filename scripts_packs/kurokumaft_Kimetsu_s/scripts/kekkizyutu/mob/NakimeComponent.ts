import { Entity, system } from "@minecraft/server";
import { weightChoice } from "../../common/KimetuCommonUtil";
import { KekkizyutuMobUseComponent } from "../KekkizyutuUseComponent";
import { Biwa } from "../zyutu/Biwa";

const nakimeKekkizyutuLists = weightChoice([
    { item: 1 , weight: 50 },
    { item: 2 , weight: 50 },
]);

/**
 * 鳴女
 */
export class NakimeComponent implements KekkizyutuMobUseComponent {

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
            const num = nakimeKekkizyutuLists.pick();
            entity.setProperty("kurokumaft:kekkizyutu_kata", num);
            this.kokyuUse(entity, num);
        } catch (error: any) {
        }

    }

    private kokyuUse(entity:Entity, kata:number) {

        const biwa = new Biwa();

        try {
            switch (kata) {
                case 1 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    biwa.guard(entity);
                    system.waitTicks(2).then(() => {
                        entity.setProperty("kurokumaft:kekkizyutu_kata", 0);
                        entity.triggerEvent("kurokumaft:kekkizyutu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 2 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    biwa.gate(entity);
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
