import { ItemStack, Entity, Player } from "@minecraft/server";
import { KekkizyutuUseComponent } from "../../KekkizyutuUseComponent";
import { KekkizyutuObject, KekkizyutuObjects } from "../../../item/weapon/KekkizyutuTypes";
import { Obi } from "../../zyutu/Obi";

/**
 * 血気術（堕姫）
 */
export class ZyutuDakiComponent implements KekkizyutuUseComponent {
    /**
     * 変更
     * @param {Player} player
     */
    changeZyutu(player:Player): void {

        let kata = player.getProperty("kurokumaft:kekkizyutu_kata") as number;
        const kekkizyutuObject = KekkizyutuObjects[3] as KekkizyutuObject;

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
            player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_obi" + kata + ".value"}]});

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
        const obi = new Obi();

        switch (kata) {
            case 1 :
                obi.yokonagi(entity);
            break;
            case 2 :
                obi.barrage(entity);
            break;
            case 3 :
                obi.shot(entity);
            break;
            case 4 :
                obi.yaeobigiri(entity);
            break;
        }

    }

    releaseAttackZyutu(entity: Entity): void {
    }

}
