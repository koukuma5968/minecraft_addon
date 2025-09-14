import { ItemStack, Player } from "@minecraft/server";
import { NichirintouUseComponent } from "../../NichirintouUseComponent";
import { KokyuObjects, KokyuObject } from "../../../item/weapon/NichirintouTypes";
import { KoiNoKata } from "../../kata/KoiNoKata";
import { NomalAttack } from "../../kata/NomalAttack";

/**
 * 呼吸（恋）
 */
export class KokyuKoiComponent implements NichirintouUseComponent {
    /**
     * 呼吸型変更
     * @param {Player} player
     */
    changeKata(player:Player): void {

        const kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        const kokyuObject = KokyuObjects[24] as KokyuObject;

        switch (kata) {
            case kokyuObject.kata[kokyuObject.kata.length-1] :
                player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[0]);
                player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:koi_kata" + kokyuObject.kata[0] + ".value"}]});
                break;
            default :
                const index = kokyuObject.kata.findIndex((el) => el === kata);
                player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[(index+1)]);
                player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:koi_kata" + kokyuObject.kata[(index+1)] + ".value"}]});
        }

    }

    /**
     * @param {Player} player
     */
    hitAttackKata(player: Player, itemStack:ItemStack): void {
        const attack = new NomalAttack();
        attack.oneAttack(player, itemStack);
    }

    /**
     * @param {ItemStack} itemStack
     * @param {Player} player
     */
    useAttackKata(player: Player, itemStack: ItemStack): void {

        const kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        const koi = new KoiNoKata();

        try {

            switch (kata) {
                case 2 :
                    koi.niNoKata(player, itemStack);
                break;
                case 3 :
                    koi.sanNoKata(player, itemStack);
                break;
                case 5 :
                    koi.goNoKata(player, itemStack);
                break;
                case 6 :
                    koi.rokuNoKata(player, itemStack);
                break;
            }
        } catch (error: any) {
            
        }

    }

    releaseAttackKata(player: Player, itemStack: ItemStack, duration:number): void {

        const kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        const koi = new KoiNoKata();

        try {

            switch (kata) {
                case 1 :
                    koi.ichiNoKata(player, itemStack);
                break;
            }
        } catch (error: any) {
            
        }

    }

}
