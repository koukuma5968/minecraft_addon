import { Entity, Player } from "@minecraft/server";
import { KekkizyutuUseComponent } from "../../KekkizyutuUseComponent";
import { KekkizyutuObject, KekkizyutuObjects } from "../../../item/weapon/KekkizyutuTypes";
import { Tubo } from "../../zyutu/Tubo";

/**
 * 血気術（玉壺）
 */
export class ZyutuGyokkoComponent implements KekkizyutuUseComponent {
    /**
     * 呼吸型変更
     * @param {Player} player
     */
    changeZyutu(player: Player): void {

        const kata = player.getProperty("kurokumaft:kekkizyutu_kata") as number;
        const kekkizyutuObject = KekkizyutuObjects[13] as KekkizyutuObject;

        switch (kata) {
            case kekkizyutuObject.kata[kekkizyutuObject.kata.length-1] :
                player.setProperty("kurokumaft:kekkizyutu_kata", kekkizyutuObject.kata[0]);
                player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_tubo" + kekkizyutuObject.kata[0] + ".value"}]});
                break;
            default :
                const index = kekkizyutuObject.kata.findIndex((el) => el === kata);
                player.setProperty("kurokumaft:kekkizyutu_kata", kekkizyutuObject.kata[(index+1)]);
                player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_tubo" + kekkizyutuObject.kata[(index+1)] + ".value"}]});
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
        const tubo = new Tubo();

        try {
            switch (kata) {
                case 1 :
                    tubo.suigokubati(entity);
                break;
                case 2 :
                    tubo.senbonbarigyosatu(entity);
                break;
                case 3 :
                    tubo.takotubozigoku(entity);
                break;
                case 4 :
                    tubo.itimankakkuunengyo(entity);
                break;
                case 5 :
                    tubo.sakanasyoukan(entity);
                break;
                case 6 :
                    tubo.zinsatugyorin(entity);
                break;
            }
        } catch (error: any) {
            
        }

    }

    releaseAttackZyutu(entity: Entity): void {
    }

}
