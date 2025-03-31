import { ItemStack, Player } from "@minecraft/server";
import { NichirintouUseComponent } from "../NichirintouUseComponent";
import { KokyuObjects, KokyuObject } from "../../item/weapon/NichirintouTypes";
import { KoiNoKata } from "../kata/KoiNoKata";

/**
 * 呼吸（恋）
 */
export class KokyuHebiComponent implements NichirintouUseComponent {
    /**
     * 呼吸型変更
     * @param {Player} player
     */
    changeKata(player:Player): void {

        let kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        let kokyuObject = KokyuObjects[22] as KokyuObject;

        switch (kata) {
            case kokyuObject.kata[kokyuObject.kata.length-1] :
                player.setProperty("kurokumaft:kokyu_kata", 1);
                kata = kokyuObject.kata[0];
                break;
            default :
                player.setProperty("kurokumaft:kokyu_kata", kata+1);
                kata = kata+1;
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

        player.addTag(player.id);
        switch (kata) {
            case 1 :
                koi.ichiNoKata(player, itemStack);
            break;
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
        player.removeTag(player.id);

    }

    releaseAttackKata(player: Player, itemStack: ItemStack, duration:number): void {
    }

}
