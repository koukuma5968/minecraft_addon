import { ItemStack, Player } from "@minecraft/server";
import { NichirintouUseComponent } from "../../NichirintouUseComponent";
import { KokyuObjects, KokyuObject } from "../../../item/weapon/NichirintouTypes";
import { KasumiNoKata } from "../../kata/KasumiNoKata";

/**
 * 呼吸（霞）
 */
export class KokyuKasumiComponent implements NichirintouUseComponent {
    /**
     * 呼吸型変更
     * @param {Player} player
     */
    changeKata(player:Player): void {

        const kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        const kokyuObject = KokyuObjects[21] as KokyuObject;

        switch (kata) {
            case kokyuObject.kata[kokyuObject.kata.length-1] :
                player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[0]);
                player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kasumi_kata" + kokyuObject.kata[0] + ".value"}]});
                break;
            default :
                const index = kokyuObject.kata.findIndex((el) => el === kata);
                player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[(index+1)]);
                player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kasumi_kata" + kokyuObject.kata[(index+1)] + ".value"}]});
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
        const kasumi = new KasumiNoKata();

        try {

            switch (kata) {
                case 2 :
                    kasumi.niNoKata(player, itemStack);
                break;
                case 5 :
                    kasumi.goNoKata(player, itemStack);
                break;
                case 6 :
                    kasumi.rokuNoKata(player, itemStack);
                break;
                case 7 :
                    kasumi.shitiNoKata(player, itemStack);
                break;
            }
        } catch (error: any) {
            
        }

    }

    releaseAttackKata(player: Player, itemStack: ItemStack, duration:number): void {
        const kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        const kasumi = new KasumiNoKata();

        try {

            switch (kata) {
                case 1 :
                    kasumi.ichiNoKata(player, itemStack);
                break;
                case 3 :
                    kasumi.sanNoKata(player, itemStack);
                break;
                case 4 :
                    kasumi.shiNoKata(player, itemStack);
                break;
            }
        } catch (error: any) {
            
        }
    }
}
