import { ItemStack, Player } from "@minecraft/server";
import { NichirintouUseComponent } from "./NichirintouUseComponent";
import { KokyuObjects, KokyuObject } from "../item/weapon/NichirintouTypes";
import { OtoNoKata } from "./kata/OtoNoKata";

/**
 * 呼吸（天元）
 */
export class KokyuTengenComponent implements NichirintouUseComponent {
    /**
     * 呼吸型変更
     * @param {Player} player
     */
    changeKata(player:Player): void {

        let kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        let kokyuObject = KokyuObjects[11] as KokyuObject;

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
            player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:oto_kata" + kata + ".value\"}]}");
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
        let oto = new OtoNoKata();

        player.addTag(player.id);
        switch (kata) {
            case 1 :
                oto.ichiNoKata(player, itemStack);
            break;
            case 2 :
                oto.niNoKata(player, itemStack);
            break;
            case 3 :
                oto.sanNoKata(player, itemStack);
            break;
            case 4 :
                oto.shiNoKata(player, itemStack);
            break;
            case 5 :
                oto.goNoKata(player, itemStack);
            break;
        }
        player.removeTag(player.id);

    }

    releaseAttackKata(player: Player, itemStack: ItemStack, duration:number): void {
    }

}
