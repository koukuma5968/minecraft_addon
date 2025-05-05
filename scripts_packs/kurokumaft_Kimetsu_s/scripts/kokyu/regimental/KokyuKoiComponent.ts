import { ItemStack, Player } from "@minecraft/server";
import { NichirintouUseComponent } from "../NichirintouUseComponent";
import { KokyuObjects, KokyuObject } from "../../item/weapon/NichirintouTypes";
import { KoiNoKata } from "../kata/KoiNoKata";

/**
 * 呼吸（恋）
 */
export class KokyuKoiComponent implements NichirintouUseComponent {
    /**
     * 呼吸型変更
     * @param {Player} player
     */
    changeKata(player:Player): void {

        let kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        let kokyuObject = KokyuObjects[24] as KokyuObject;

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
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:koi_kata" + kata + ".value\"}]}");

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
        let koi = new KoiNoKata();

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

    }

    releaseAttackKata(player: Player, itemStack: ItemStack, duration:number): void {

        let kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        let koi = new KoiNoKata();

        switch (kata) {
            case 1 :
                koi.ichiNoKata(player, itemStack);
            break;
        }

    }

}
