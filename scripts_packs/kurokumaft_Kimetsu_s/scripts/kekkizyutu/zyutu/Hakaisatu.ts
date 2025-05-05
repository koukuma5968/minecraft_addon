import { ItemStack, Player, system, TicksPerSecond } from "@minecraft/server";
import { ZytuComonClass } from "./ZytuComonClass";

export class Hakaisatu extends ZytuComonClass {

    /**
     * 破壊殺・羅針
     */
    ichi(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_hakai1.value"}]});
        player.setProperty("kurokumaft:kokyu_use", false);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
        },6);
    }

    /**
     * 破壊殺・空式
     */
    niNo(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_hakai2.value"}]});

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },TicksPerSecond);
    }

    /**
     * 破壊殺・乱式
     */
    sanNo(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_hakai3.value"}]});

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },30);
    }

    /**
     * 破壊殺・滅式
     */
    shiNo(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_hakai4.value"}]});

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
            player.setProperty("kurokumaft:kokyu_use", false);
        },20);
    }

    /**
     * 破壊殺・脚式 冠先割
     */
    goNo(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_hakai5.value"}]});

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
            player.setProperty("kurokumaft:kokyu_use", false);
        },4);
    }

    /**
     * 破壊殺・脚式 流閃群光
     */
    rokuNo(player:Player, itemStack:ItemStack) {

        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_hakai6.value"}]});

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },25);

    }

    /**
     * 破壊殺・脚式 飛遊星千輪
     */
    shitiNo(player:Player, itemStack:ItemStack) {

        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_hakai7.value"}]});

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },5);

    }

    /**
     * 破壊殺・砕式 万葉閃柳
     */
    hachiNo(player:Player, itemStack:ItemStack) {

        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_hakai8.value"}]});
    }

    /**
     * 破壊殺・鬼芯八重芯
     */
    kuNo(player:Player, itemStack:ItemStack) {

        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_hakai9.value"}]});
    }

    /**
     * 終式・青銀乱残光
     */
    zyuNo(player:Player, itemStack:ItemStack) {

        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_hakai10.value"}]});
    }

}
