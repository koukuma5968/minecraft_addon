import { Entity, Player, world } from "@minecraft/server";
import { KekkizyutuUseComponent } from "../../KekkizyutuUseComponent";
import { Kokurai } from "../../zyutu/Kokurai";
import { KekkizyutuObject, KekkizyutuObjects } from "../../../item/weapon/KekkizyutuTypes";

/**
 * 呼吸（雷）
 */
export class ZyutuKaigakuComponent implements KekkizyutuUseComponent {
    /**
     * 呼吸型変更
     * @param {Player} player
     */
    changeZyutu(player: Player): void {

        const kata = player.getProperty("kurokumaft:kekkizyutu_kata") as number;
        const kekkizyutuObject = KekkizyutuObjects[12] as KekkizyutuObject;

        switch (kata) {
            case kekkizyutuObject.kata[kekkizyutuObject.kata.length-1] :
                player.setProperty("kurokumaft:kekkizyutu_kata", kekkizyutuObject.kata[0]);
                player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaminari_kata" + kekkizyutuObject.kata[0] + ".value"}]});
                break;
            default :
                const index = kekkizyutuObject.kata.findIndex((el) => el === kata);
                player.setProperty("kurokumaft:kekkizyutu_kata", kekkizyutuObject.kata[(index+1)]);
                player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaminari_kata" + kekkizyutuObject.kata[(index+1)] + ".value"}]});
        }

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
        const kokurai = new Kokurai();

        try {

            switch (kata) {
                case 2 :
                    kokurai.niNoKata(entity);
                break;
                case 3 :
                    kokurai.sanNoKata(entity);
                break;
                case 5 :
                    kokurai.goNoKata(entity);
                break;
                case 6 :
                    kokurai.rokuNoKata(entity);
                break;
            }
        } catch (error: any) {
        }

    }

    releaseAttackZyutu(entity: Entity): void {
        const kata = entity.getProperty("kurokumaft:kekkizyutu_kata") as number;
        const kokurai = new Kokurai();

        try {

            switch (kata) {
                case 4 :
                    kokurai.shiNoKata(entity);
                break;
            }
        } catch (error: any) {
            
        }
    }

}
