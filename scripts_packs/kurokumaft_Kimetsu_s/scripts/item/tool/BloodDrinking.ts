import { ItemCustomComponent, ItemStack, ItemComponentUseEvent, Player, world, ItemComponentCompleteUseEvent, ItemComponentConsumeEvent, system } from "@minecraft/server";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

export class BloodDrinking implements ItemCustomComponent {

    onConsume (event: ItemComponentConsumeEvent) {

        const item = event.itemStack as ItemStack;
        const player = event.source as Player;
        const lores = item.getLore();
        const rank = player.getProperty("kurokumaft:ogre_rank");
        let becoming = player.getProperty("kurokumaft:ogre_becoming") as number;
        if (lores != undefined && lores.length > 0) {
            switch (lores[0]) {
                case "Lv 5" :
                    becoming = becoming + 30;
                case "Lv 4" :
                    becoming = becoming + 25;
                case "Lv 3" :
                    becoming = becoming + 20;
                case "Lv 2" :
                    becoming = becoming + 15;
                case "Lv 1" :
                    becoming = becoming + 10;
                break;
            }
        } else {
            becoming = becoming + 10;
        }

        if ("none" == rank) {
            if (becoming >= 100) {
                player.setProperty("kurokumaft:ogre_rank", "low");
                player.setProperty("kurokumaft:ogre_becoming", 0);
                system.runTimeout(() => {
                    player.triggerEvent("kurokumaft:ogre_rank_change");
                }, 2);
            } else {
                player.setProperty("kurokumaft:ogre_becoming", becoming);
                player.addEffect(MinecraftEffectTypes.Hunger, 20, {
                    amplifier : 10,
                    showParticles: false
                });
                player.addEffect(MinecraftEffectTypes.Wither, 20, {
                    amplifier : 5,
                    showParticles: false
                });
            }
        } else {
            if (becoming >= 100) {
                switch (rank) {
                    case "low" :
                        player.setProperty("kurokumaft:ogre_rank", "unusual");
                    break;
                    case "unusual" :
                        player.setProperty("kurokumaft:ogre_rank", "quarter");
                    break;
                    case "quarter" :
                        const moon1 = player.getProperty("kurokumaft:ogre_moon") as number;
                        if (moon1 == 1) {
                            player.setProperty("kurokumaft:ogre_moon", 6);
                            player.setProperty("kurokumaft:ogre_rank", "crescent");
                        } else {
                            player.setProperty("kurokumaft:ogre_moon", moon1-1);
                        }
                    break;
                    case "crescent" :
                        const moon2 = player.getProperty("kurokumaft:ogre_moon") as number;
                        if (moon2 == 1) {
                            player.setProperty("kurokumaft:ogre_rank", "king");
                        } else {
                            player.setProperty("kurokumaft:ogre_moon", moon2-1);
                        }
                    break;
                }
                player.setProperty("kurokumaft:ogre_becoming", 0);
                system.runTimeout(() => {
                    player.triggerEvent("kurokumaft:ogre_rank_change");
                }, 2);
            } else {
                player.setProperty("kurokumaft:ogre_becoming", becoming);
            }
        }
    };

}
