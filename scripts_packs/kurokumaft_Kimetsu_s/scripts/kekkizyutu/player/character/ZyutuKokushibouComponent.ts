import { Entity, Player } from "@minecraft/server";
import { TukiNoKataZyutu } from "../../zyutu/TukiNoKataZyutu";
import { KekkizyutuUseComponent } from "../../KekkizyutuUseComponent";
import { KekkizyutuObject, KekkizyutuObjects } from "../../../item/weapon/KekkizyutuTypes";
import { NomalAttack } from "../../../kokyu/kata/NomalAttack";

/**
 * 血気術（黒死牟）
 */
export class ZyutuKokushibouComponent implements KekkizyutuUseComponent {

    tuki = new TukiNoKataZyutu();
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
     * @param {Player} player
     */
    hitAttackZyutu(player: Player): void {
        const attack = new NomalAttack();
        attack.oneAttack(player, undefined);
    }

    /**
     * @param {Entity} entity
     */
    useAttackZyutu(entity: Entity): void {

        const kata = entity.getProperty("kurokumaft:kekkizyutu_kata") as number;

        try {
            switch (kata) {
                case 2 :
                    this.tuki.niNoKata(entity);
                break;
                case 3 :
                    this.tuki.sanNoKata(entity);
                break;
                case 5 :
                    this.tuki.goNoKata(entity);
                break;
                case 6 :
                    this.tuki.rokuNoKata(entity);
                break;
                case 7 :
                    this.tuki.shitiNoKata(entity);
                break;
                case 8 :
                    this.tuki.hachiNoKata(entity);
                break;
                case 9 :
                    this.tuki.kuNoKata(entity);
                break;
                case 10 :
                    this.tuki.zyuNoKata(entity);
                break;
                case 14 :
                    this.tuki.zyushiNoKata(entity);
                break;
                case 16 :
                    this.tuki.zyurokuNoKata(entity);
                break;
            }
        } catch (error: any) {
            
        }

    }

    releaseAttackZyutu(entity: Entity): void {
        const kata = entity.getProperty("kurokumaft:kekkizyutu_kata") as number;

        try {

            switch (kata) {
                case 1 :
                    this.tuki.ichiNoKata(entity);
                break;
            }
        } catch (error: any) {
            
        }
    }

}
