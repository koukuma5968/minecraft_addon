import { ItemStack, Player } from "@minecraft/server";
import { KokyuObjects, KokyuObject } from "../../item/weapon/NichirintouTypes";
import { KedamonoNoKata } from "../kata/KedamonoNoKata";
import { NichirintouUseComponent } from "../NichirintouUseComponent";

/**
 * 呼吸（獣）
 */
export class KokyuKedamonoComponent implements NichirintouUseComponent {
    /**
     * 呼吸型変更
     * @param {Player} player
     */
    changeKata(player:Player): void {

        let kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        const kokyuObject = KokyuObjects[18] as KokyuObject;

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
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kedamono_kata" + kata + ".value\"}]}");

    }

    /**
     * 獣 呼吸
     * @param {Player} player
     */
    hitAttackKata(player: Player, itemStack:ItemStack): void {
        const kata = player.getProperty("kurokumaft:kokyu_kata") as number;

        switch (kata) {
        }

    }

    /**
     * @param {ItemStack} itemStack
     * @param {Player} player
     */
    useAttackKata(player: Player, itemStack: ItemStack): void {

        const kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        const kedamono = new KedamonoNoKata();

        switch (kata) {
            case 1 :
                kedamono.ichiNoKata(player, itemStack);
            break;
            case 2 :
                kedamono.niNoKata(player, itemStack);
            break;
            case 3 :
                kedamono.sanNoKata(player, itemStack);
            break;
            case 4 :
                kedamono.shiNoKata(player, itemStack);
            break;
            case 5 :
                kedamono.goNoKata(player, itemStack);
            break;
            case 6 :
                kedamono.rokuNoKata(player, itemStack);
            break;
            case 7 :
                kedamono.shitiNoKata(player, itemStack);
            break;
            case 8 :
                kedamono.hachiNoKata(player, itemStack);
            break;
            case 9 :
                kedamono.kuNoKata(player, itemStack);
            break;
            case 10 :
                kedamono.zyuNoKata(player, itemStack);
            break;
        }

    }

    releaseAttackKata(player: Player, itemStack: ItemStack, duration:number): void {
        const kata = player.getProperty("kurokumaft:kokyu_kata") as number;

        switch (kata) {
        }
    }

}
