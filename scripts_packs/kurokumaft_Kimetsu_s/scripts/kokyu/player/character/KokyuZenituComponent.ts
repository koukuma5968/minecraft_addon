import { ItemStack, Player, system, TicksPerSecond } from "@minecraft/server";
import { NichirintouUseComponent } from "../../NichirintouUseComponent";
import { KaminariNoKata } from "../../kata/KaminariNoKata";

/**
 * 呼吸（善逸）
 */
export class KokyuZenituComponent implements NichirintouUseComponent {
    /**
     * 呼吸型変更
     * @param {Player} player
     */
    changeKata(player:Player): void {

    }

    /**
     * @param {Player} player
     */
    hitAttackKata(player: Player, itemStack:ItemStack): void {
    }

    private rokuIntervalId: number =0;
    private hatiIntervalId: number =0;
    private shinsokuIntervalId: number =0;
    private ikazutiIntervalId: number =0;

    /**
     * @param {ItemStack} itemStack
     * @param {Player} player
     */
    useAttackKata(player:Player, itemStack:ItemStack): void {

        let kata = player.getProperty("kurokumaft:kokyu_kata") as number;

        switch (kata) {
            case 1 :
                player.setProperty("kurokumaft:kokyu_chage", 1);
                this.rokuIntervalId = system.runInterval(() => {
                    if (player.getProperty("kurokumaft:kokyu_chage") == 1 && player.getProperty("kurokumaft:kokyu_use")) {
                        player.setProperty("kurokumaft:kokyu_chage", 2);
                        this.hatiIntervalId = system.runInterval(() => {
                            if (player.getProperty("kurokumaft:kokyu_chage") == 2 && player.getProperty("kurokumaft:kokyu_use")) {
                                player.setProperty("kurokumaft:kokyu_chage", 3);
                                this.shinsokuIntervalId = system.runTimeout(() => {
                                    if (player.getProperty("kurokumaft:kokyu_chage") == 3 && player.getProperty("kurokumaft:kokyu_use")) {
                                        player.setProperty("kurokumaft:kokyu_chage", 5);
                                        this.ikazutiIntervalId = system.runTimeout(() => {
                                            if (player.getProperty("kurokumaft:kokyu_chage") == 5 && player.getProperty("kurokumaft:kokyu_use")) {
                                                player.setProperty("kurokumaft:kokyu_chage", 10);
                                                player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:kaminari_kata7.value\"}]}");
                                            }
                                        },5*TicksPerSecond);
                                    }
                                },4*TicksPerSecond);
                            }
                        },3*TicksPerSecond);
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
                        system.clearRun(this.rokuIntervalId);
                        system.clearRun(this.hatiIntervalId);
                        system.clearRun(this.shinsokuIntervalId);
                        system.clearRun(this.ikazutiIntervalId);
                    } else if (player.getProperty("kurokumaft:kokyu_chage") == 10) {
                        kaminari.shitiNoKata(player, itemStack);
                        system.clearRun(this.rokuIntervalId);
                        system.clearRun(this.hatiIntervalId);
                        system.clearRun(this.shinsokuIntervalId);
                        system.clearRun(this.ikazutiIntervalId);
                    } else {
                        system.clearRun(this.rokuIntervalId);
                        system.clearRun(this.hatiIntervalId);
                        system.clearRun(this.shinsokuIntervalId);
                        system.clearRun(this.ikazutiIntervalId);
                        player.setProperty("kurokumaft:kokyu_use", false);
                        kaminari.ichiNoKataRen(player, itemStack);
                    }
                }
            break;
        }
    }

}
