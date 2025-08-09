import { Entity, Player } from "@minecraft/server";
import { TukiNoKataZyutu } from "../../zyutu/TukiNoKataZyutu";
import { KekkizyutuUseComponent } from "../../KekkizyutuUseComponent";
import { KekkizyutuObject, KekkizyutuObjects } from "../../../item/weapon/KekkizyutuTypes";

/**
 * 血気術（黒死牟）
 */
export class ZyutuKokushibouComponent implements KekkizyutuUseComponent {
    /**
     * 呼吸型変更
     * @param {Player} player
     */
    changeZyutu(player: Player): void {

        const kata = player.getProperty("kurokumaft:kekkizyutu_kata") as number;
        const kekkizyutuObject = KekkizyutuObjects[11] as KekkizyutuObject;

        switch (kata) {
            case kekkizyutuObject.kata[kekkizyutuObject.kata.length-1] :
                player.setProperty("kurokumaft:kekkizyutu_kata", kekkizyutuObject.kata[0]);
                player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:tuki_kata" + kekkizyutuObject.kata[0] + ".value"}]});
                break;
            default :
                const index = kekkizyutuObject.kata.findIndex((el) => el === kata);
                player.setProperty("kurokumaft:kekkizyutu_kata", kekkizyutuObject.kata[(index+1)]);
                player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:tuki_kata" + kekkizyutuObject.kata[(index+1)] + ".value"}]});
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
        const tuki = new TukiNoKataZyutu();

        try {
            switch (kata) {
                case 2 :
                    tuki.niNoKata(entity);
                break;
                case 3 :
                    tuki.sanNoKata(entity);
                break;
                case 5 :
                    tuki.goNoKata(entity);
                break;
                case 6 :
                    tuki.rokuNoKata(entity);
                break;
                case 7 :
                    tuki.shitiNoKata(entity);
                break;
                case 8 :
                    tuki.hachiNoKata(entity);
                break;
                case 9 :
                    tuki.kuNoKata(entity);
                break;
                case 10 :
                    tuki.zyuNoKata(entity);
                break;
                case 14 :
                    tuki.zyushiNoKata(entity);
                break;
                case 16 :
                    tuki.zyurokuNoKata(entity);
                break;
            }
        } catch (error: any) {
            
        }

    }

    releaseAttackZyutu(entity: Entity): void {
        const kata = entity.getProperty("kurokumaft:kekkizyutu_kata") as number;
        const tuki = new TukiNoKataZyutu();

        try {

            switch (kata) {
                case 1 :
                    tuki.ichiNoKata(entity);
                break;
            }
        } catch (error: any) {
            
        }
    }

}
