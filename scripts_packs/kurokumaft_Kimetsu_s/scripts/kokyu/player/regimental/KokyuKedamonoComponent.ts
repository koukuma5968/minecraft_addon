import { ItemStack, Player } from "@minecraft/server";
import { KokyuObjects, KokyuObject } from "../../../item/weapon/NichirintouTypes";
import { KedamonoNoKata } from "../../kata/KedamonoNoKata";
import { NichirintouUseComponent } from "../../NichirintouUseComponent";
import { NomalAttack } from "../../kata/NomalAttack";

/**
 * 呼吸（獣）
 */
export class KokyuKedamonoComponent implements NichirintouUseComponent {
    /**
     * 呼吸型変更
     * @param {Player} player
     */
    changeKata(player:Player): void {

        const kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        const kokyuObject = KokyuObjects[18] as KokyuObject;

        switch (kata) {
            case kokyuObject.kata[kokyuObject.kata.length-1] :
                player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[0]);
                player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kedamono_kata" + kokyuObject.kata[0] + ".value"}]});
                break;
            default :
                const index = kokyuObject.kata.findIndex((el) => el === kata);
                player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[(index+1)]);
                player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kedamono_kata" + kokyuObject.kata[(index+1)] + ".value"}]});
        }

    }

    /**
     * 獣 呼吸
     * @param {Player} player
     */
    hitAttackKata(player: Player, itemStack:ItemStack): void {
        const attack = new NomalAttack();
        attack.oneAttack(player, itemStack);
    }

    /**
     * @param {ItemStack} itemStack
     * @param {Player} player
     */
    useAttackKata(player: Player, itemStack: ItemStack): void {

        const kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        const kedamono = new KedamonoNoKata();

        try {

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
        } catch (error: any) {
            
        }

    }

    releaseAttackKata(player: Player, itemStack: ItemStack, duration:number): void {
    }

}
