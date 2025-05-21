import { Entity, EntityComponentTypes, EntityEquippableComponent, EquipmentSlot, ItemStack, system, TicksPerSecond, world } from "@minecraft/server";
import { KokyuMobUseComponent } from "../NichirintouUseComponent";
import { weightChoice } from "../../common/KimetuCommonUtil";
import { KaminariNoKata } from "../kata/KaminariNoKata";

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
        if (entity != undefined && entity.isValid()) {
            const nitirintou_equip = entity.getProperty("kurokumaft:nitirintou_equip") as boolean;
            if (nitirintou_equip) {
                entity.setProperty("kurokumaft:kokyu_use", true);
                this.useAttackKokyu(entity);
            }
        }
    }

    useAttackKokyu(entity:Entity): void {

        const num = zenituKokyuLists.pick();
        this.kokyuUse(entity, num);

    }

    private kokyuUse(entity:Entity, kata:number) {

        const kaminari = new KaminariNoKata();

        switch (kata) {
            case 1 :
                kaminari.ichiNoKata(entity, undefined);
            break;
            case 2 :
                kaminari.ichiNoKataShinsoku(entity, undefined);
            break;
            case 3 :
                kaminari.shitiNoKata(entity, undefined);
            break;
        }

    }
}
