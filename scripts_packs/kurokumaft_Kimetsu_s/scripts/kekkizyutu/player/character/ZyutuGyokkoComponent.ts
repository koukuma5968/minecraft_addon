import { Entity, Player } from "@minecraft/server";
import { KekkizyutuUseComponent } from "../../KekkizyutuUseComponent";
import { KekkizyutuObject, KekkizyutuObjects } from "../../../item/weapon/KekkizyutuTypes";
import { Tubo } from "../../zyutu/Tubo";

/**
 * 血気術（玉壺）
 */
export class ZyutuGyokkoComponent implements KekkizyutuUseComponent {

    tubo = new Tubo();
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

        try {
            switch (kata) {
                case 1 :
                    this.tubo.suigokubati(entity);
                break;
                case 2 :
                    this.tubo.senbonbarigyosatu(entity);
                break;
                case 3 :
                    this.tubo.takotubozigoku(entity);
                break;
                case 4 :
                    this.tubo.itimankakkuunengyo(entity);
                break;
                case 5 :
                    this.tubo.sakanasyoukan(entity);
                break;
                case 6 :
                    this.tubo.zinsatugyorin(entity);
                break;
            }
        } catch (error: any) {
            
        }

    }

    releaseAttackZyutu(entity: Entity): void {
    }

}
