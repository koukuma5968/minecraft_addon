import { ItemStack, Player, system, TicksPerSecond } from "@minecraft/server";
import { addRegimentalFilter} from "../../common/KimetuCommonUtil";
import { ZytuComonClass } from "./ZytuComonClass";

export class Tigama extends ZytuComonClass {

    /**
     * 飛び血鎌
     */
    ichi(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_tigama1.value"}]});

        player.setProperty("kurokumaft:kokyu_use", false);
        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_particle", false);
        },6);

    }

    /**
     * 跋扈跳梁
     */
    niNoKata(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_tigama2.value"}]});

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },TicksPerSecond);
    }

    /**
     * 円斬旋回・飛び血鎌
     */
    sanNoKata(player:Player, itemStack:ItemStack) {
        player.onScreenDisplay.setActionBar({rawtext:[{translate:"msg.kurokumaft:kekkizyutu_tigama3.value"}]});

        system.runTimeout(() => {
            player.setProperty("kurokumaft:kokyu_use", false);
            player.setProperty("kurokumaft:kokyu_particle", false);
        },30);
    }

}
