import { ItemStack, Player } from "@minecraft/server";
import { NichirintouUseComponent } from "../../NichirintouUseComponent";
import { KokyuObjects, KokyuObject } from "../../../item/weapon/NichirintouTypes";
import { KazeNoKata } from "../../kata/KazeNoKata";

/**
 * 呼吸（実弥）
 */
export class KokyuSanemiComponent implements NichirintouUseComponent {
    /**
     * 呼吸型変更
     * @param {Player} player
     */
    changeKata(player:Player): void {

        let kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        let kokyuObject = KokyuObjects[8] as KokyuObject;

        switch (kata) {
            case kokyuObject.kata[kokyuObject.kata.length-1] :
                kata = kokyuObject.kata[0];
                player.setProperty("kurokumaft:kokyu_kata", kata);
                break;
            default :
                let index = kokyuObject.kata.findIndex((el) => el == kata);
                kata = kokyuObject.kata[index+1];
                player.setProperty("kurokumaft:kokyu_kata", kata);
            }
            player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kaze_kata" + kata + ".value\"}]}");
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

        let kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        let kaze = new KazeNoKata();

        switch (kata) {
            case 2 :
                kaze.niNoKata(player, itemStack);
            break;
            case 3 :
                kaze.sanNoKata(player, itemStack);
            break;
            case 4 :
                kaze.shiNoKata(player, itemStack);
            break;
            case 5 :
                kaze.goNoKata(player, itemStack);
            break;
            case 6 :
                kaze.rokuNoKata(player, itemStack);
            break;
            case 7 :
                kaze.shitiNoKata(player, itemStack);
            break;
            case 8 :
                kaze.hachiNoKata(player, itemStack);
            break;
            case 9 :
                kaze.kuNoKata(player, itemStack);
            break;
        }

    }

    releaseAttackKata(player: Player, itemStack: ItemStack, duration:number): void {
        let kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        let kaze = new KazeNoKata();

        switch (kata) {
            case 1 :
                kaze.ichiNoKata(player, itemStack);
            break;
       }
    }

}
