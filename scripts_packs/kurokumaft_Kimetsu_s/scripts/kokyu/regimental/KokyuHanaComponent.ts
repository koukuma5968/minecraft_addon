import { ItemStack, Player, system, TicksPerSecond } from "@minecraft/server";
import { NichirintouUseComponent } from "../NichirintouUseComponent";
import { KokyuObjects, KokyuObject } from "../../item/weapon/NichirintouTypes";
import { KedamonoNoKata } from "../kata/KedamonoNoKata";

/**
 * 呼吸（花）
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
                player.setProperty("kurokumaft:kokyu_kata", 1);
                kata = kokyuObject.kata[0];
                break;
            default :
                player.setProperty("kurokumaft:kokyu_kata", kata+1);
                kata = kata+1;
        }
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:hana_kata" + kata + ".value\"}]}");

    }

    /**
     * @param {Player} player
     */
    hitAttackKata(player: Player, itemStack:ItemStack): void {
        let kata = player.getProperty("kurokumaft:kokyu_kata") as number;

        player.addTag(player.id);
        switch (kata) {
        }
        player.removeTag(player.id);

    }

    /**
     * @param {ItemStack} itemStack
     * @param {Player} player
     */
    useAttackKata(player: Player, itemStack: ItemStack): void {

        let kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        let kedamono = new KedamonoNoKata();

        player.addTag(player.id);
        switch (kata) {
            case 2 :
                kedamono.niNoKata(player, itemStack);
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
        }
        player.removeTag(player.id);

    }

    releaseAttackKata(player: Player, itemStack: ItemStack, duration:number): void {
        let kata = player.getProperty("kurokumaft:kokyu_kata") as number;

        player.addTag(player.id);
        switch (kata) {
       }
       player.removeTag(player.id);
    }

}
