import { ItemStack, Player } from "@minecraft/server";
import { NichirintouUseComponent } from "../../NichirintouUseComponent";
import { KokyuObjects, KokyuObject } from "../../../item/weapon/NichirintouTypes";
import { MushiNoKata } from "../../kata/MushiNoKata";

/**
 * 呼吸（しのぶ）
 */
export class KokyuShinobuComponent implements NichirintouUseComponent {
    /**
     * 呼吸型変更
     * @param {Player} player
     */
    changeKata(player:Player): void {

        const kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        const kokyuObject = KokyuObjects[6] as KokyuObject;

        switch (kata) {
            case kokyuObject.kata[kokyuObject.kata.length-1] :
                player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[0]);
                player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:mushi_kata" + kokyuObject.kata[0] + ".value"}]});
                break;
            default :
                const index = kokyuObject.kata.findIndex((el) => el === kata);
                player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[(index+1)]);
                player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:mushi_kata" + kokyuObject.kata[(index+1)] + ".value"}]});
        }

    }

    /**
     * @param {Player} player
     */
    hitAttackKata(player: Player, itemStack:ItemStack): void {
    }

    /**
     * @param {ItemStack} itemStack
     * @param {Player} player
     */
    useAttackKata(player: Player, itemStack: ItemStack): void {

        const kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        const mushi = new MushiNoKata();

        switch (kata) {
            case 1 :
                mushi.ichiNoKata(player, itemStack);
            break;
            case 2 :
                mushi.niNoKata(player, itemStack);
            break;
            case 3 :
                mushi.sanNoKata(player, itemStack);
            break;
            case 4 :
                mushi.shiNoKata(player, itemStack);
            break;
        }

    }

    releaseAttackKata(player: Player, itemStack: ItemStack, duration:number): void {
    }

}
