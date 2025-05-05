import { ItemStack, Player, system } from "@minecraft/server";
import { ZytuComonClass } from "./ZytuComonClass";

export class Bunretu extends ZytuComonClass {

    /**
     * 超音波
     */
    ki(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hana_kokyu2.value"}]});

        player.setProperty("kurokumaft:kokyu_use", false);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
        },6);
    }

    /**
     * 雷
     */
    do(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hana_kokyu2.value"}]});
        player.setProperty("kurokumaft:kokyu_use", false);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
        },6);
    }

    /**
     * 激涙刺突
     */
    ai(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hana_kokyu2.value"}]});
        player.setProperty("kurokumaft:kokyu_use", false);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
        },6);

    }

    /**
     * 突風
     */
    raku(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hana_kokyu2.value"}]});
        player.setProperty("kurokumaft:kokyu_use", false);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
        },6);
    }

    /**
     * 狂圧鳴波
     */
    zouIchi(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hana_kokyu2.value"}]});
        player.setProperty("kurokumaft:kokyu_use", false);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
        },6);
    }

    /**
     * 無間業樹
     */
    zouNi(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hana_kokyu2.value"}]});
        player.setProperty("kurokumaft:kokyu_use", false);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
        },6);
    }

    /**
     * 狂鳴雷殺
     */
    zouSan(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:hana_kokyu2.value"}]});
        player.setProperty("kurokumaft:kokyu_use", false);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
        },6);
    }
}
