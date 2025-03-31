import { ItemStack, Player } from "@minecraft/server";
import { NichirintouUseComponent } from "./NichirintouUseComponent";
import { KokyuObjects, KokyuObject } from "../item/weapon/NichirintouTypes";
import { HebiNoKata } from "./kata/HebiNoKata";

/**
 * 呼吸（小芭内）
 */
export class KokyuObanaiComponent implements NichirintouUseComponent {
    /**
     * 呼吸型変更
     * @param {Player} player
     */
    changeKata(player:Player): void {

        let kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        let kokyuObject = KokyuObjects[12] as KokyuObject;

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
            player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:hebi_kata" + kata + ".value\"}]}");
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
        let hebi = new HebiNoKata();

        player.addTag(player.id);
        switch (kata) {
            case 1 :
                hebi.ichiNoKata(player, itemStack);
            break;
            case 2 :
                hebi.niNoKata(player, itemStack);
            break;
            case 3 :
                hebi.sanNoKata(player, itemStack);
            break;
            case 4 :
                hebi.shiNoKata(player, itemStack);
            break;
            case 5 :
                hebi.goNoKata(player, itemStack);
            break;
        }
        player.removeTag(player.id);

    }

    releaseAttackKata(player: Player, itemStack: ItemStack, duration:number): void {
    }

}
