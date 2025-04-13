import { ItemStack, Player } from "@minecraft/server";
import { NichirintouUseComponent } from "../NichirintouUseComponent";
import { KokyuObjects, KokyuObject } from "../../item/weapon/NichirintouTypes";
import { KasumiNoKata } from "../kata/KasumiNoKata";

/**
 * 呼吸（無一郎）
 */
export class KokyuMuitiroComponent implements NichirintouUseComponent {
    /**
     * 呼吸型変更
     * @param {Player} player
     */
    changeKata(player:Player): void {

        let kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        let kokyuObject = KokyuObjects[10] as KokyuObject;

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
            player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kasumi_kata" + kata + ".value\"}]}");
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
        let kasumi = new KasumiNoKata();

        player.addTag(player.id);
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
        player.removeTag(player.id);

    }

    releaseAttackKata(player: Player, itemStack: ItemStack, duration:number): void {
        let kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        let kasumi = new KasumiNoKata();

        player.addTag(player.id);
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
        player.removeTag(player.id);
    }

}
