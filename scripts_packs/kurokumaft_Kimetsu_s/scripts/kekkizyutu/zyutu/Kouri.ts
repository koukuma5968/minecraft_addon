import { ItemStack, Player, system, TicksPerSecond } from "@minecraft/server";
import { ZytuComonClass } from "./ZytuComonClass";

export class Kouri extends ZytuComonClass {

    /**
     * 蓮葉氷
     */
    ichi(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_kouri1.value"}]});
        player.setProperty("kurokumaft:kokyu_use", false);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
        },6);

    }

    /**
     * 枯園垂り
     */
    niNoKata(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_kouri2.value"}]});

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },TicksPerSecond);
    }

    /**
     * 枯園垂り
     */
    sanNoKata(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_kouri3.value"}]});

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },30);

    }

    /**
     * 凍て曇
     */
    shiNoKata(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_kouri4.value"}]});

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
            player.setProperty("kurokumaft:kokyu_use", false);
        },20);
    }

    /**
     * 蔓蓮華
     */
    goNoKata(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_kouri5.value"}]});

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
            player.setProperty("kurokumaft:kokyu_use", false);
        },4);
    }

    /**
     * 寒烈の白姫
     */
    rokuNoKata(player:Player, itemStack:ItemStack) {

        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_kouri6.value"}]});

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },25);

    }

    /**
     * 冬ざれ氷柱
     */
    shitiNoKata(player:Player, itemStack:ItemStack) {

        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_kouri7.value"}]});

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },5);

    }

    /**
     * 散り蓮華
     */
    hachiNoKata(player:Player, itemStack:ItemStack) {

        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_kouri8.value"}]});

    }

    /**
     * 結晶ノ御子
     */
    kuNoKata(player:Player, itemStack:ItemStack) {

        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_kouri9.value"}]});

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },10);
    }

    /**
     * 霧氷・睡蓮菩薩
     */
    zyuNoKata(player:Player, itemStack:ItemStack) {

        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_kouri10.value"}]});
    }

}
