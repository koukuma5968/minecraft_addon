import { ItemStack, Player, system, TicksPerSecond } from "@minecraft/server";
import { NichirintouUseComponent } from "./NichirintouUseComponent";
import { KokyuObjects, KokyuObject } from "../item/weapon/NichirintouTypes";
import { KaminariNoKata } from "./kata/KaminariNoKata";

/**
 * 呼吸（善逸）
 */
export class KokyuZenituComponent implements NichirintouUseComponent {
    /**
     * 呼吸型変更
     * @param {Player} player
     */
    changeKata(player:Player): void {

        let kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        let kokyuObject = KokyuObjects[2] as KokyuObject;

    }

    /**
     * @param {Player} player
     */
    hitAttackKata(player: Player, itemStack:ItemStack): void {
        let kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        let kaminari = new KaminariNoKata();

        switch (kata) {
            case 1 :
                if (player.getDynamicProperty("kurokumaft:attack_count") != undefined) {
                    let chage = player.getDynamicProperty("kurokumaft:attack_count") as number;
                    player.setDynamicProperty("kurokumaft:attack_count", chage+1);
                    kaminari.ichiAttack(player, itemStack);
                }
            break;
        }

    }

    private shinsokuIntervalId: number =0;
    private ikazutiIntervalId: number =0;

    /**
     * @param {ItemStack} itemStack
     * @param {Player} player
     */
    useAttackKata(player:Player, itemStack:ItemStack): void {

        let kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        let kaminari = new KaminariNoKata();

        switch (kata) {
            case 1 :
                player.setProperty("kurokumaft:kokyu_chage", 1);
                this.shinsokuIntervalId = system.runTimeout(() => {
                    if (player.getProperty("kurokumaft:kokyu_use")) {
                        player.setProperty("kurokumaft:kokyu_chage", 5);
                        this.ikazutiIntervalId = system.runTimeout(() => {
                            if (player.getProperty("kurokumaft:kokyu_chage") == 5 && player.getProperty("kurokumaft:kokyu_use")) {
                                player.setProperty("kurokumaft:kokyu_chage", 10);
                                player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kaminari_kata7.value\"}]}");
                            }
                        },5*TicksPerSecond);
                    }
                },3*TicksPerSecond);
            break;
        }

    }

    releaseAttackKata(player: Player, itemStack: ItemStack, duration:number): void {
        let kata = player.getProperty("kurokumaft:kokyu_kata") as number;
        let kaminari = new KaminariNoKata();

        switch (kata) {
            case 1 :
                if (player.getDynamicProperty("kurokumaft:chage_type") == undefined) {
                    player.setDynamicProperty("kurokumaft:chage_type", true);
                    if (player.getProperty("kurokumaft:kokyu_chage") == 5) {
                        kaminari.ichiNoKataShinsoku(player, itemStack);
                        system.clearRun(this.shinsokuIntervalId);
                        system.clearRun(this.ikazutiIntervalId);
                    } else if (player.getProperty("kurokumaft:kokyu_chage") == 10) {
                        kaminari.shitiNoKata(player, itemStack);
                        system.clearRun(this.shinsokuIntervalId);
                        system.clearRun(this.ikazutiIntervalId);
                    } else {
                        system.clearRun(this.shinsokuIntervalId);
                        system.clearRun(this.ikazutiIntervalId);
                        player.setProperty("kurokumaft:kokyu_use", false);
                        player.setProperty("kurokumaft:kokyu_chage", 2);
                        kaminari.ichiNoKataRen(player, itemStack);
                    }
                }
            break;
        }
    }

}
