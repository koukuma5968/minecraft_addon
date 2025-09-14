import { Entity, system } from "@minecraft/server";
import { KokyuMobUseComponent } from "../../NichirintouUseComponent";
import { weightChoice } from "../../../common/KimetuCommonUtil";
import { KaminariNoKata } from "../../kata/KaminariNoKata";
import { NomalAttack } from "../../kata/NomalAttack";

const zenituKokyuLists = weightChoice([
    { item: 1 , weight: 80 },
    { item: 2 , weight: 15 },
    { item: 3 , weight: 5 },
]);

/**
 * 善逸
 */
export class ZenituComponent implements KokyuMobUseComponent {

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

        const num = zenituKokyuLists.pick();
        entity.setProperty("kurokumaft:kokyu_kata", num);
        this.kokyuUse(entity, num);

    }

    private kokyuUse(entity:Entity, kata:number) {

        const kaminari = new KaminariNoKata();

        try {

            switch (kata) {
                case 1 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    system.waitTicks(40).then(() => {
                        kaminari.ichiNoKata(entity, undefined);
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 2 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    system.waitTicks(80).then(() => {
                        kaminari.ichiNoKataShinsoku(entity, undefined);
                        entity.setProperty("kurokumaft:kokyu_kata", 0);
                        entity.triggerEvent("kurokumaft:kokyu_end");
                    }).catch((error: any) => {
                    });
                break;
                case 3 :
                    entity.triggerEvent("kurokumaft:attack_stop");
                    system.waitTicks(120).then(() => {
                        kaminari.shitiNoKata(entity, undefined);
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
