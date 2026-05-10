import { Entity, Player } from "@minecraft/server";
import { KekkizyutuUseComponent } from "../../KekkizyutuUseComponent";
import { Wakuti } from "../../zyutu/Wakuti";
import { KekkizyutuObject, KekkizyutuObjects } from "../../../item/weapon/KekkizyutuTypes";

/**
 * 血気術（）
 */
export class ZyutuTamayoComponent implements KekkizyutuUseComponent {

    wakuti = new Wakuti();
    /**
     * 変更
     * @param {Player} player
     */
    changeZyutu(player:Player): void {
        let kata = player.getProperty("kurokumaft:kekkizyutu_kata") as number;
        const kekkizyutuObject = KekkizyutuObjects[17] as KekkizyutuObject;

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
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_wakuti" + kata + ".value"}]});
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

        switch (kata) {
            case 1 :
                this.wakuti.shikakumugennokou(entity);
            break;
            case 2 :
                this.wakuti.houkazyubakunokou(entity);
            break;
            case 3 :
                this.wakuti.hakumugenwakunokou(entity);
            break;
            case 4 :
                this.wakuti.kigasyokumeinokou(entity);
            break;
            case 5 :
                this.wakuti.shizyufudokunokou(entity);
            break;
        }

    }

    releaseAttackZyutu(entity: Entity): void {
    }

}
