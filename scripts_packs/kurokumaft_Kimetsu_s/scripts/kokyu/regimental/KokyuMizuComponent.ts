import { ItemStack, Player } from "@minecraft/server";
import { NichirintouUseComponent } from "../NichirintouUseComponent";
import { MizuNoKata } from "../kata/MizuNoKata";
import { KokyuObjects, KokyuObject } from "../../item/weapon/NichirintouTypes";

/**
 * 呼吸（水）
 */
export class KokyuMizuComponent implements NichirintouUseComponent {
    /**
     * 呼吸型変更
     * @param {Player} player
     */
    changeKata(player:Player): void {

        let kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        let kokyuObject = KokyuObjects[14] as KokyuObject;

        switch (kata) {
            case kokyuObject.kata[kokyuObject.kata.length-1] :
                player.setProperty("kurokumaft:kokyu_kata", 1);
                kata = kokyuObject.kata[0];
                break;
            default :
                player.setProperty("kurokumaft:kokyu_kata", kata+1);
                kata = kata+1;
            }
            player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:mizu_kata" + kata + ".value\"}]}");

    }

    /**
     * @param {Player} player
     */
    hitAttackKata(player: Player, itemStack:ItemStack): void {
        let kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        let mizu = new MizuNoKata();

        player.addTag(player.id);
        switch (kata) {
            case 10 :
                mizu.zyuNoKata(player, itemStack);
            break;
        }
        player.removeTag(player.id);

    }

    /**
     * @param {ItemStack} itemStack
     * @param {Player} player
     */
    useAttackKata(player: Player, itemStack: ItemStack): void {

        let kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        let mizu = new MizuNoKata();

        player.addTag(player.id);
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
        }
        player.removeTag(player.id);

    }

    releaseAttackKata(player: Player, itemStack: ItemStack, duration:number): void {
        let kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        let mizu = new MizuNoKata();

        player.addTag(player.id);
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
       }
       player.removeTag(player.id);
    }

}
