import { ItemStack, Entity, Player } from "@minecraft/server";
import { KekkizyutuUseComponent } from "../../KekkizyutuUseComponent";
import { KekkizyutuObject, KekkizyutuObjects } from "../../../item/weapon/KekkizyutuTypes";
import { Koushi } from "../../zyutu/Koushi";

/**
 * 血気術（累）
 */
export class ZyutuRuiComponent implements KekkizyutuUseComponent {
    /**
     * 変更
     * @param {Player} player
     */
    changeZyutu(player:Player): void {

        let kata = player.getProperty("kurokumaft:kekkizyutu_kata") as number;
        const kekkizyutuObject = KekkizyutuObjects[1] as KekkizyutuObject;

        switch (kata) {
            case kekkizyutuObject.kata[kekkizyutuObject.kata.length-1] :
                kata = kekkizyutuObject.kata[0];
                player.setProperty("kurokumaft:kekkizyutu_kata", kata);
                break;
            default :
                const index = kekkizyutuObject.kata.findIndex((el) => el === kata);
                kata = kekkizyutuObject.kata[index+1];
                player.setProperty("kurokumaft:kekkizyutu_kata", kata);
            }
            player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_ito" + kata + ".value"}]});

    }

    /**
     * @param {Entity} entity
     */
    hitAttackZyutu(entity: Entity): void {
    }

    /**
     * @param {ItemStack} itemStack
     * @param {Entity} entity
     */
    useAttackZyutu(entity: Entity): void {

        const kata = entity.getProperty("kurokumaft:kekkizyutu_kata") as number;
        const koushi = new Koushi();

        switch (kata) {
            case 1 :
                koushi.kokushirou(entity);
            break;
            case 2 :
                koushi.kokushirinten(entity);
            break;
            case 3 :
                koushi.ayamekago(entity);
            break;
        }

    }

    releaseAttackZyutu(entity: Entity): void {
    }

}
