import { ItemCustomComponent, Player, ItemComponentConsumeEvent, TicksPerSecond, ItemStack } from "@minecraft/server";
import { OgreEatCommon } from "./OgreEatCommon";

export class MeatEating implements ItemCustomComponent {

    onConsume (event: ItemComponentConsumeEvent) {

        const item = event.itemStack as ItemStack;
        const player = event.source as Player;
        const rank = player.getProperty("kurokumaft:ogre_rank") as string;
        let becoming = player.getProperty("kurokumaft:ogre_becoming") as number;
        if (item.typeId === "kurokumaft:meat_chunk") {
            becoming = becoming + 10;
        } else if (item.typeId === "kurokumaft:rare_blood") {
            becoming = becoming + 100;
        }

        if ("none" === rank) {
            player.addEffect("minecraft:hunger", 15*TicksPerSecond, {
                amplifier : 5,
                showParticles: false
            });
            player.addEffect("minecraft:nausea", 10*TicksPerSecond, {
                amplifier : 1,
                showParticles: false
            });
        } else {
            new OgreEatCommon().upRankCheck(rank, player, becoming);
        }
    };

}
