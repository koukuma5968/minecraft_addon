import { ItemStack, Player, TicksPerSecond, world } from "@minecraft/server";
import { NichirintouUseComponent } from "../../NichirintouUseComponent";
import { MizuNoKata } from "../../kata/MizuNoKata";
import { KokyuObjects, KokyuObject } from "../../../item/weapon/NichirintouTypes";
import { HiNoKata } from "../../kata/HiNoKata";
import { NomalAttack } from "../../kata/NomalAttack";

/**
 * 呼吸（炭治郎）
 */
export class KokyuTanjiroComponent implements NichirintouUseComponent {
    /**
     * 呼吸型変更
     * @param {Player} player
     */
    changeKata(player:Player): void {

        const kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        const kokyuObject = KokyuObjects[1] as KokyuObject;

        switch (kata) {
            case kokyuObject.kata[kokyuObject.kata.length-1] :
                player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[0]);
                player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:mizu_kata1.value"}]});
                break;
            default :
                const index = kokyuObject.kata.findIndex((el) => el === kata);
                player.setProperty("kurokumaft:kokyu_kata", kokyuObject.kata[index+1]);
                if (kokyuObject.kata[index+1] < 11) {
                    player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:mizu_kata" + (kata+1) + ".value"}]});
                } else {
                    player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hinokami_kata" + (kata+1) + ".value"}]});
                }
            }

    }

    attack = new NomalAttack();
    /**
     * @param {Player} player
     */
    hitAttackKata(player: Player, itemStack:ItemStack): void {
        this.attack.oneAttack(player, itemStack);
    }

    mizu = new MizuNoKata();
    hi = new HiNoKata();
    /**
     * @param {ItemStack} itemStack
     * @param {Player} player
     */
    useAttackKata(player: Player, itemStack: ItemStack): void {

        const kata = player.getProperty("kurokumaft:kokyu_kata") as number;

        switch (kata) {
            case 2 :
                this.mizu.niNoKata(player, itemStack);
            break;
            case 3 :
                this.mizu.sanNoKata(player, itemStack);
            break;
            case 4 :
                this.mizu.shiNoKata(player, itemStack);
            break;
            case 9 :
                this.mizu.kuNoKata(player, itemStack);
            break;
            case 10 :
                this.mizu.zyuNoKata(player, itemStack);
            break;
            case 12 :
                this.hi.niNoKata(player, itemStack);
            break;
            case 13 :
                this.hi.sanNoKata(player, itemStack);
            break;
            case 14 :
                this.hi.shiNoKata(player, itemStack);
            break;
            case 16 :
                this.hi.rokuNoKata(player, itemStack);
            break;
            case 17 :
                this.hi.shitiNoKata(player, itemStack);
            break;
            case 18 :
                this.hi.hachiNoKata(player, itemStack);
            break;
            case 19 :
                this.hi.kuNoKata(player, itemStack);
            break;
            case 20 :
                this.hi.zyuNoKata(player, itemStack);
            break;
            case 21 :
                this.hi.zyuichiNoKata(player, itemStack);
            break;
            case 22 :
                this.hi.zyuniNoKata(player, itemStack);
            break;
        }

    }

    releaseAttackKata(player: Player, itemStack: ItemStack, duration:number): void {
        const kata = player.getProperty("kurokumaft:kokyu_kata") as number;

        switch (kata) {
            case 1 :
                this.mizu.ichiNoKata(player, itemStack);
            break;
            case 5 :
                this.mizu.goNoKata(player, itemStack);
            break;
            case 6 :
                this.mizu.rokuNoKata(player, itemStack);
            break;
            case 7 :
                this.mizu.shitiNoKata(player, itemStack);
            break;
            case 8 :
                this.mizu.hachiNoKata(player, itemStack);
            break;
            case 11 :
                const chage = (duration / TicksPerSecond);
                if (chage > 997) {
                    this.hi.ichiNoKata(player, itemStack);
                } else {
                    this.hi.ichiNoKataIssen(player, itemStack);
                }

            break;
            case 15 :
                this.hi.goNoKata(player, itemStack);
            break;
       }
    }

}
