import { ItemStack, Player } from "@minecraft/server";
import { NichirintouUseComponent } from "../../NichirintouUseComponent";
import { KokyuObjects, KokyuObject } from "../../../item/weapon/NichirintouTypes";
import { HiNoKata } from "../../kata/HiNoKata";

/**
 * 呼吸（日）
 */
export class KokyuHiComponent implements NichirintouUseComponent {
    /**
     * 呼吸型変更
     * @param {Player} player
     */
    changeKata(player:Player): void {

        const kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        const kokyuObject = KokyuObjects[16] as KokyuObject;

        switch (kata) {
            case kokyuObject.kata[kokyuObject.kata.length-1] :
                player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[0]);
                player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hi_kata" + kokyuObject.kata[0] + ".value"}]});
                break;
            default :
                const index = kokyuObject.kata.findIndex((el) => el === kata);
                player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[(index+1)]);
                player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hi_kata" + kokyuObject.kata[(index+1)] + ".value"}]});
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
        const hi = new HiNoKata();

        try {

            switch (kata) {
                case 1 :
                    hi.ichiNoKata(player, itemStack);
                break;
                case 2 :
                    hi.niNoKata(player, itemStack);
                break;
                case 3 :
                    hi.sanNoKata(player, itemStack);
                break;
                case 4 :
                    hi.shiNoKata(player, itemStack);
                break;
                case 6 :
                    hi.rokuNoKata(player, itemStack);
                break;
                case 7 :
                    hi.shitiNoKata(player, itemStack);
                break;
                case 8 :
                    hi.hachiNoKata(player, itemStack);
                break;
                case 9 :
                    hi.kuNoKata(player, itemStack);
                break;
                case 10 :
                    hi.zyuNoKata(player, itemStack);
                break;
                case 11 :
                    hi.zyuichiNoKata(player, itemStack);
                break;
                case 12 :
                    hi.zyuniNoKata(player, itemStack);
                break;
            }
        } catch (error: any) {
            
        }

    }

    releaseAttackKata(player: Player, itemStack: ItemStack, duration:number): void {
        const kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        const hi = new HiNoKata();

        try {

            switch (kata) {
                case 5 :
                    hi.goNoKata(player, itemStack);
                break;
            }
        } catch (error: any) {
            
        }
    }

}
