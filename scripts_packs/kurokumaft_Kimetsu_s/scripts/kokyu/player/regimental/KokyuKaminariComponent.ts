import { ItemStack, Player } from "@minecraft/server";
import { NichirintouUseComponent } from "../../NichirintouUseComponent";
import { KokyuObjects, KokyuObject } from "../../../item/weapon/NichirintouTypes";
import { KaminariNoKata } from "../../kata/KaminariNoKata";

/**
 * 呼吸（雷）
 */
export class KokyuKaminariComponent implements NichirintouUseComponent {
    /**
     * 呼吸型変更
     * @param {Player} player
     */
    changeKata(player:Player): void {

        const kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        const kokyuObject = KokyuObjects[15] as KokyuObject;

        switch (kata) {
            case kokyuObject.kata[kokyuObject.kata.length-1] :
                player.setProperty("kurokumaft:kokyu_kata", 0);
                player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaminari_kata" + kokyuObject.kata[0] + ".value"}]});
                break;
            default :
                const index = kokyuObject.kata.findIndex((el) => el === kata);
                player.setProperty("kurokumaft:kokyu_kata", (index+1));
                player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kaminari_kata" + kokyuObject.kata[(index+1)] + ".value"}]});
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
        const kaminari = new KaminariNoKata();

        try {

            switch (kata) {
                case 2 :
                    kaminari.niNoKata(player, itemStack);
                break;
                case 3 :
                    kaminari.sanNoKata(player, itemStack);
                break;
                case 5 :
                    kaminari.goNoKata(player, itemStack);
                break;
                case 6 :
                    kaminari.rokuNoKata(player, itemStack);
                break;
            }
        } catch (error: any) {
            
        }

    }

    releaseAttackKata(player: Player, itemStack: ItemStack, duration:number): void {
        const kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        const kaminari = new KaminariNoKata();

        try {

            switch (kata) {
                case 1 :
                    kaminari.ichiNoKata(player, itemStack);
                break;
                case 4 :
                    kaminari.shiNoKata(player, itemStack);
                break;
            }
        } catch (error: any) {
            
        }
    }

}
