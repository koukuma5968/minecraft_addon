import { ItemStack, Player } from "@minecraft/server";
import { NichirintouUseComponent } from "../../NichirintouUseComponent";
import { KokyuObjects, KokyuObject } from "../../../item/weapon/NichirintouTypes";
import { TukiNoKata } from "../../kata/TukiNoKata";

/**
 * 呼吸（月）
 */
export class KokyuTukiComponent implements NichirintouUseComponent {
    /**
     * 呼吸型変更
     * @param {Player} player
     */
    changeKata(player:Player): void {

        let kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        let kokyuObject = KokyuObjects[27] as KokyuObject;

        switch (kata) {
            case kokyuObject.kata[kokyuObject.kata.length-1] :
                kata = kokyuObject.kata[0];
                player.setProperty("kurokumaft:kokyu_kata", kata);
                break;
            default :
                const index = kokyuObject.kata.findIndex((el) => el == kata);
                kata = kokyuObject.kata[index+1];
                player.setProperty("kurokumaft:kokyu_kata", kata);
        }
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:tuki_kata" + kata + ".value\"}]}");

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
        let tuki = new TukiNoKata();

        switch (kata) {
            case 2 :
                tuki.niNoKata(player, itemStack);
            break;
            case 3 :
                tuki.sanNoKata(player, itemStack);
            break;
            case 5 :
                tuki.goNoKata(player, itemStack);
            break;
            case 6 :
                tuki.rokuNoKata(player, itemStack);
            break;
            case 7 :
                tuki.shitiNoKata(player, itemStack);
            break;
            case 8 :
                tuki.hachiNoKata(player, itemStack);
            break;
            case 9 :
                tuki.kuNoKata(player, itemStack);
            break;
            case 10 :
                tuki.zyuNoKata(player, itemStack);
            break;
            case 14 :
                tuki.zyushiNoKata(player, itemStack);
            break;
            case 16 :
                tuki.zyurokuNoKata(player, itemStack);
            break;
        }

    }

    releaseAttackKata(player: Player, itemStack: ItemStack, duration:number): void {
        let kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        let tuki = new TukiNoKata();

        switch (kata) {
            case 1 :
                tuki.ichiNoKata(player, itemStack);
            break;
       }
    }

}
