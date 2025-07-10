import { ItemStack, Player } from "@minecraft/server";
import { NichirintouUseComponent } from "../../NichirintouUseComponent";
import { KokyuObjects, KokyuObject } from "../../../item/weapon/NichirintouTypes";
import { HonoNoKata } from "../../kata/HonoNoKata";

/**
 * 呼吸（煉獄）
 */
export class KokyuKyouzyuroComponent implements NichirintouUseComponent {
    /**
     * 呼吸型変更
     * @param {Player} player
     */
    changeKata(player:Player): void {

        let kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        const kokyuObject = KokyuObjects[7] as KokyuObject;

        switch (kata) {
            case kokyuObject.kata[kokyuObject.kata.length-1] :
                kata = kokyuObject.kata[0];
                player.setProperty("kurokumaft:kokyu_kata", kata);
                break;
            default :
                const index = kokyuObject.kata.findIndex((el) => el === kata);
                kata = kokyuObject.kata[index+1];
                player.setProperty("kurokumaft:kokyu_kata", kata);
            }
            player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:hono_kata" + kata + ".value\"}]}");

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

        const kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        const hono = new HonoNoKata();

        switch (kata) {
            case 2 :
                hono.niNoKata(player, itemStack);
            break;
            case 3 :
                hono.sanNoKata(player, itemStack);
            break;
            case 4 :
                hono.shiNoKata(player, itemStack);
            break;
            case 5 :
                hono.goNoKata(player, itemStack);
            break;
        }

    }

    releaseAttackKata(player: Player, itemStack: ItemStack, duration:number): void {
        const kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        const hono = new HonoNoKata();

        switch (kata) {
            case 1 :
                hono.ichiNoKata(player, itemStack);
            break;
            case 9 :
                hono.kuNoKata(player, itemStack);
            break;
       }
    }

}
