import { ItemStack, Player, TicksPerSecond } from "@minecraft/server";
import { NichirintouUseComponent } from "../../NichirintouUseComponent";
import { MizuNoKata } from "../../kata/MizuNoKata";
import { KokyuObjects, KokyuObject } from "../../../item/weapon/NichirintouTypes";
import { HiNoKata } from "../../kata/HiNoKata";

/**
 * 呼吸（炭治郎）
 */
export class KokyuTanjiroComponent implements NichirintouUseComponent {
    /**
     * 呼吸型変更
     * @param {Player} player
     */
    changeKata(player:Player): void {

        const kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        const kokyuObject = KokyuObjects[1] as KokyuObject;

        switch (kata) {
            case kokyuObject.kata[kokyuObject.kata.length-1] :
                player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[0]);
                player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:mizu_kata1.value"}]});
                break;
            default :
                const index = kokyuObject.kata.findIndex((el) => el === kata);
                player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[index+1]);
                if (kokyuObject.kata[index+1] < 11) {
                    player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:mizu_kata" + (kata+1) + ".value"}]});
                } else {
                    player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hinokami_kata" + (kata+1) + ".value"}]});
                }
            }

    }

    /**
     * @param {Player} player
     */
    hitAttackKata(player: Player, itemStack:ItemStack): void {
        const kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        const mizu = new MizuNoKata();

        switch (kata) {
            case 10 :
                mizu.zyuNoKata(player, itemStack);
            break;
        }

    }

    /**
     * @param {ItemStack} itemStack
     * @param {Player} player
     */
    useAttackKata(player: Player, itemStack: ItemStack): void {

        const kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        const mizu = new MizuNoKata();
        const hi = new HiNoKata();

        switch (kata) {
            case 2 :
                mizu.niNoKata(player, itemStack);
            break;
            case 3 :
                mizu.sanNoKata(player, itemStack);
            break;
            case 4 :
                mizu.shiNoKata(player, itemStack);
            break;
            case 9 :
                mizu.kuNoKata(player, itemStack);
            break;
            case 10 :
                mizu.zyuNoKataShot(player, itemStack);
            break;
            case 12 :
                hi.niNoKata(player, itemStack);
            break;
            case 13 :
                hi.sanNoKata(player, itemStack);
            break;
            case 14 :
                hi.shiNoKata(player, itemStack);
            break;
            case 16 :
                hi.rokuNoKata(player, itemStack);
            break;
            case 17 :
                hi.shitiNoKata(player, itemStack);
            break;
            case 18 :
                hi.hachiNoKata(player, itemStack);
            break;
            case 19 :
                hi.kuNoKata(player, itemStack);
            break;
            case 20 :
                hi.zyuNoKata(player, itemStack);
            break;
            case 21 :
                hi.zyuichiNoKata(player, itemStack);
            break;
            case 22 :
                hi.zyuniNoKata(player, itemStack);
            break;
        }

    }

    releaseAttackKata(player: Player, itemStack: ItemStack, duration:number): void {
        const kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        const mizu = new MizuNoKata();
        const hi = new HiNoKata();

        switch (kata) {
            case 1 :
                mizu.ichiNoKata(player, itemStack);
            break;
            case 5 :
                mizu.goNoKata(player, itemStack);
            break;
            case 6 :
                mizu.rokuNoKata(player, itemStack);
            break;
            case 7 :
                mizu.shitiNoKata(player, itemStack);
            break;
            case 8 :
                mizu.hachiNoKata(player, itemStack);
            break;
            case 11 :
                const chage = (duration / TicksPerSecond);
                if (chage > 997) {
                    hi.ichiNoKata(player, itemStack);
                } else {
                    hi.ichiNoKataIssen(player, itemStack);
                }

            break;
            case 15 :
                hi.goNoKata(player, itemStack);
            break;
       }
    }

}
