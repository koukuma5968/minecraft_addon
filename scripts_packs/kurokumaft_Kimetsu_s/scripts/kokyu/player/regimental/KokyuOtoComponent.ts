import { ItemStack, Player } from "@minecraft/server";
import { NichirintouUseComponent } from "../../NichirintouUseComponent";
import { KokyuObjects, KokyuObject } from "../../../item/weapon/NichirintouTypes";
import { OtoNoKata } from "../../kata/OtoNoKata";

/**
 * 呼吸（音）
 */
export class KokyuOtoComponent implements NichirintouUseComponent {
    /**
     * 呼吸型変更
     * @param {Player} player
     */
    changeKata(player:Player): void {

        const kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        const kokyuObject = KokyuObjects[22] as KokyuObject;

        switch (kata) {
            case kokyuObject.kata[kokyuObject.kata.length-1] :
                player.setProperty("kurokumaft:kokyu_kata", 0);
                player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:oto_kata" + kokyuObject.kata[0] + ".value"}]});
                break;
            default :
                const index = kokyuObject.kata.findIndex((el) => el === kata);
                player.setProperty("kurokumaft:kokyu_kata", (index+1));
                player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:oto_kata" + kokyuObject.kata[(index+1)] + ".value"}]});
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
        const oto = new OtoNoKata();

        try {

            switch (kata) {
                case 1 :
                    oto.ichiNoKata(player, itemStack);
                break;
                case 2 :
                    oto.niNoKata(player, itemStack);
                break;
                case 4 :
                    oto.shiNoKata(player, itemStack);
                break;
                case 5 :
                    oto.goNoKata(player, itemStack);
                break;
            }

        } catch (error: any) {
            
        }
    }

    releaseAttackKata(player: Player, itemStack: ItemStack, duration:number): void {
        const kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        const oto = new OtoNoKata();

        try {

            switch (kata) {
                case 3 :
                    oto.sanNoKata(player, itemStack);
                break;
            }
        } catch (error: any) {
            
        }

    }

}
