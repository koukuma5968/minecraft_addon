import { Entity, Player } from "@minecraft/server";
import { KekkizyutuUseComponent } from "../../KekkizyutuUseComponent";
import { Bunretu } from "../../zyutu/Bunretu";
import { KekkizyutuObjects, KekkizyutuObject } from "../../../item/weapon/KekkizyutuTypes";

/**
 * 血気術（）
 */
export class ZyutuZouhakutenComponent implements KekkizyutuUseComponent {
    /**
     * 変更
     * @param {Player} player
     */
    changeZyutu(player:Player): void {

        let kata = player.getProperty("kurokumaft:kekkizyutu_kata") as number;
        const kekkizyutuObject = KekkizyutuObjects[9] as KekkizyutuObject;

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
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_zouhakuten" + kata + ".value"}]});

    }

    /**
     * @param {Entity} entity
     */
    hitAttackZyutu(entity: Entity): void {
    }

    /**
     * @param {Entity} entity
     */
    useAttackZyutu(entity: Entity): void {

        const kata = entity.getProperty("kurokumaft:kekkizyutu_kata") as number;
        const bunretu = new Bunretu();

        switch (kata) {
            case 1 :
                bunretu.tokage(entity);
            break;
            case 2 :
                bunretu.kyoumeiraisatu(entity);
            break;
            case 3 :
                bunretu.kyouatumeiha(entity);
            break;
            case 4 :
                bunretu.mukengouzyu(entity);
            break;
        }

    }

    releaseAttackZyutu(entity: Entity): void {
    }

}
