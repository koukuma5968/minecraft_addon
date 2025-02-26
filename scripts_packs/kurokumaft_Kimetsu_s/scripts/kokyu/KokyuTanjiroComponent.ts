import { ItemStack, Player } from "@minecraft/server";
import { NichirintouUseComponent } from "./NichirintouUseComponent";
import { MizunoKata } from "./kata/MizunoKata";
import { KokyuObjects, KokyuObject } from "../item/weapon/NichirintouTypes";

/**
 * 呼吸（炭治郎）
 */
export class KokyuTanjiroComponent implements NichirintouUseComponent {
    /**
     * 呼吸型変更
     * @param {Player} player
     */
    changeKata(player:Player): void {

        let kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        let tanjiroObject = KokyuObjects[1] as KokyuObject;

        switch (kata) {
            case tanjiroObject.kata[tanjiroObject.kata.length-1] :
                player.setProperty("kurokumaft:kokyu_kata", 1);
                kata = 1;
                break;
            default :
                player.setProperty("kurokumaft:kokyu_kata", kata+1);
                kata = kata+1;
        }
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"" + tanjiroObject.kata_msg + kata + ".value\"}]}");

    }

    /**
     * 炭治郎 呼吸
     * @param {Player} player
     */
    hitAttackKata(player: Player): void {
        let kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        let tanjiroObject = KokyuObjects[1] as KokyuObject;
        let mizu = new MizunoKata();
        let usef = false;
        usef = true;

        switch (kata) {
            case 10 :
                mizu.zyunokata(player);
            break;
        }
        if (usef) {
            player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"" + tanjiroObject.kata_msg + kata + ".value\"}]}");
        }

    }

    /**
     * @param {ItemStack} itemStack
     * @param {Player} player
     */
    useAttackKata(player: Player, itemStack: ItemStack): void {

        let kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        let tanjiroObject = KokyuObjects[1] as KokyuObject;
        let mizu = new MizunoKata();
        let usef = false;

        switch (kata) {
            case 2 :
                mizu.ninokata(player);
                usef = true;
            break;
            case 3 :
                mizu.sannokata(player);
                usef = true;
            break;
            case 4 :
                mizu.shinokata(player);
                usef = true;
            break;
            case 9 :
                mizu.kunokata(player);
                usef = true;
            break;
        }
        if (usef) {
            player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"" + tanjiroObject.kata_msg + kata + ".value\"}]}");
        }
    }

    releaseAttackKata(player: Player, itemStack: ItemStack): void {
        let kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        let tanjiroObject = KokyuObjects[1] as KokyuObject;
        let mizu = new MizunoKata();
        let usef = false;

        switch (kata) {
            case 1 :
                mizu.ichinokata(player);
                usef = true;
            break;
            case 5 :
                mizu.gonokata(player);
                usef = true;
            break;
            case 6 :
                mizu.rokunokata(player);
                usef = true;
            break;
            case 7 :
                mizu.shitinokata(player);
                usef = true;
            break;
            case 8 :
                mizu.hachinokata(player);
                usef = true;
            break;
        }
        if (usef) {
            player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"" + tanjiroObject.kata_msg + kata + ".value\"}]}");
        }
    }

}
