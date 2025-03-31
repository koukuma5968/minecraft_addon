import { ItemStack, Player } from "@minecraft/server";
import { NichirintouUseComponent } from "./NichirintouUseComponent";
import { KokyuObjects, KokyuObject } from "../item/weapon/NichirintouTypes";
import { HanaNoKata } from "./kata/HanaNoKata";

/**
 * 呼吸（カナヲ）
 */
export class KokyuKanawoComponent implements NichirintouUseComponent {
    /**
     * 呼吸型変更
     * @param {Player} player
     */
    changeKata(player:Player): void {

        let kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        let kokyuObject = KokyuObjects[4] as KokyuObject;

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
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:hana_kata" + kata + ".value\"}]}");

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
        let hana = new HanaNoKata();

        player.addTag(player.id);
        switch (kata) {
            case 2 :
                hana.niNoKata(player, itemStack);
            break;
            case 4 :
                hana.shiNoKata(player, itemStack);
            break;
            case 5 :
                hana.goNoKata(player, itemStack);
            break;
            case 6 :
                hana.rokuNoKata(player, itemStack);
            break;
            case 7 :
                hana.shitiNoKata(player, itemStack);
            break;
        }
        player.removeTag(player.id);

    }

    releaseAttackKata(player: Player, itemStack: ItemStack, duration:number): void {
    }

}
