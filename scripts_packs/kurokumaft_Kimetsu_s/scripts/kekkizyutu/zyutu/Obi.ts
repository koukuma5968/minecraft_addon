import { ItemStack, Player, system, TicksPerSecond } from "@minecraft/server";
import { ZytuComonClass } from "./ZytuComonClass";

export class Obi extends ZytuComonClass {

    /**
     * 薙ぎ払い
     */
    ichi(player:Player, itemStack:ItemStack) {
        player.setProperty("kurokumaft:kokyu_use", false);

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
        },6);

    }

    /**
     * 連撃
     */
    ni(player:Player, itemStack:ItemStack) {
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },TicksPerSecond);
    }

    /**
     * 連撃
     */
    san(player:Player, itemStack:ItemStack) {

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },TicksPerSecond);
    }

    /**
     * 八重帯斬り
     */
    shi(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_obi1.value"}]});

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },30);
    }

}
