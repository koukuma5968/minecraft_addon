import { ItemCustomComponent, ItemStack, Player, ItemComponentConsumeEvent, system, TicksPerSecond } from "@minecraft/server";
import { OgreEatCommon } from "./OgreEatCommon";

export class BloodDrinking implements ItemCustomComponent {

    onConsume (event: ItemComponentConsumeEvent) {

        const item = event.itemStack as ItemStack;
        const player = event.source as Player;
        const lores = item.getLore();
        const rank = player.getProperty("kurokumaft:ogre_rank") as string;
        let becoming = player.getProperty("kurokumaft:ogre_becoming") as number;
        if (lores !== undefined && lores.length > 0) {
            switch (lores[0]) {
                case "Lv 5" :
                    becoming = becoming + 30;
                    break;
                case "Lv 4" :
                    becoming = becoming + 25;
                    break;
                case "Lv 3" :
                    becoming = becoming + 20;
                    break;
                case "Lv 2" :
                    becoming = becoming + 15;
                    break;
                case "Lv 1" :
                    becoming = becoming + 10;
                    break;
                break;
            }
        } else {
            becoming = becoming + 10;
        }

        if ("none" === rank) {
            if (becoming >= 100) {
                player.setProperty("kurokumaft:ogre_rank", "low");
                player.setProperty("kurokumaft:ogre_becoming", 0);
                system.runTimeout(() => {
                    player.triggerEvent("kurokumaft:ogre_rank_change");
                }, 4);
            } else {
                player.setProperty("kurokumaft:ogre_becoming", becoming);
                player.addEffect("minecraft:hunger", 10*TicksPerSecond, {
                    amplifier : 5,
                    showParticles: false
                });
                player.addEffect("minecraft:wither", 10*TicksPerSecond, {
                    amplifier : 5,
                    showParticles: false
                });
            }
        } else {
            new OgreEatCommon().upRankCheck(rank, player, becoming);
        }
    };

}
