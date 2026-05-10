import { ItemStack, Player } from "@minecraft/server";
import { NichirintouUseComponent } from "../../NichirintouUseComponent";
import { KokyuObjects, KokyuObject } from "../../../item/weapon/NichirintouTypes";
import { KedamonoNoKata } from "../../kata/KedamonoNoKata";
import { NomalAttack } from "../../kata/NomalAttack";

/**
 * 呼吸（伊之助）
 */
export class KokyuInosukeComponent implements NichirintouUseComponent {
    /**
     * 呼吸型変更
     * @param {Player} player
     */
    changeKata(player:Player): void {

        const kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        const kokyuObject = KokyuObjects[3] as KokyuObject;

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

    attack = new NomalAttack();
    /**
     * 伊之助 呼吸
     * @param {Player} player
     */
    hitAttackKata(player: Player, itemStack:ItemStack): void {
        this.attack.oneAttack(player, itemStack);

    }

    kedamono = new KedamonoNoKata();
    /**
     * @param {ItemStack} itemStack
     * @param {Player} player
     */
    useAttackKata(player: Player, itemStack: ItemStack): void {

        const kata = player.getProperty("kurokumaft:kokyu_kata") as number;

        switch (kata) {
            case 1 :
                this.kedamono.ichiNoKata(player, itemStack);
            break;
            case 2 :
                this.kedamono.niNoKata(player, itemStack);
            break;
            case 3 :
                this.kedamono.sanNoKata(player, itemStack);
            break;
            case 4 :
                this.kedamono.shiNoKata(player, itemStack);
            break;
            case 5 :
                this.kedamono.goNoKata(player, itemStack);
            break;
            case 6 :
                this.kedamono.rokuNoKata(player, itemStack);
            break;
            case 7 :
                this.kedamono.shitiNoKata(player, itemStack);
            break;
            case 8 :
                this.kedamono.hachiNoKata(player, itemStack);
            break;
            case 9 :
                this.kedamono.kuNoKata(player, itemStack);
            break;
            case 10 :
                this.kedamono.zyuNoKata(player, itemStack);
            break;
        }

    }

    releaseAttackKata(player: Player, itemStack: ItemStack, duration:number): void {
    }

}
