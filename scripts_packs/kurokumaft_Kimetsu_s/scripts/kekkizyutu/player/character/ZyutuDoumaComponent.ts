import { Entity, Player } from "@minecraft/server";
import { KekkizyutuUseComponent } from "../../KekkizyutuUseComponent";
import { KekkizyutuObject, KekkizyutuObjects } from "../../../item/weapon/KekkizyutuTypes";
import { Koori } from "../../zyutu/Koori";

/**
 * 血気術（童磨）
 */
export class ZyutuDoumaComponent implements KekkizyutuUseComponent {
    /**
     * 呼吸型変更
     * @param {Player} player
     */
    changeZyutu(player: Player): void {

        const kata = player.getProperty("kurokumaft:kekkizyutu_kata") as number;
        const kekkizyutuObject = KekkizyutuObjects[10] as KekkizyutuObject;

        switch (kata) {
            case kekkizyutuObject.kata[kekkizyutuObject.kata.length-1] :
                player.setProperty("kurokumaft:kekkizyutu_kata", kekkizyutuObject.kata[0]);
                player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_koori" + kekkizyutuObject.kata[0] + ".value"}]});
                break;
            default :
                const index = kekkizyutuObject.kata.findIndex((el) => el === kata);
                player.setProperty("kurokumaft:kekkizyutu_kata", kekkizyutuObject.kata[(index+1)]);
                player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_koori" + kekkizyutuObject.kata[(index+1)] + ".value"}]});
        }

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
        const koori = new Koori();

        try {
            switch (kata) {
                case 1 :
                    koori.hasuhagoori(entity);
                break;
                case 2 :
                    koori.karesonosizuri(entity);
                break;
                case 3 :
                    koori.itegumori(entity);
                break;
                case 4 :
                    koori.tururenge(entity);
                break;
                case 5 :
                    koori.kanretunosirahime(entity);
                break;
                case 6 :
                    koori.fuyuzareturara(entity);
                break;
                case 7 :
                    koori.tirirenge(entity);
                break;
                case 8 :
                    koori.kessyounomiko(entity);
                break;
                case 9 :
                    koori.muhyousuirenbosatu(entity);
                break;
            }
        } catch (error: any) {
            
        }

    }

    releaseAttackZyutu(entity: Entity): void {
    }

}
