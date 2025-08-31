import { ItemCustomComponent, Player, ItemComponentConsumeEvent, TicksPerSecond, ItemStack, system, EntityComponentTypes, EntityInventoryComponent } from "@minecraft/server";
import { kekkizyutuLists } from "../../common/KimetuConst";

export class DemonizationReversal implements ItemCustomComponent {

    onConsume (event: ItemComponentConsumeEvent) {

        const player = event.source as Player;
        const rank = player.getProperty("kurokumaft:ogre_rank") as string;

        if ("none" !== rank) {
            player.addEffect("minecraft:hunger", 60*TicksPerSecond, {
                amplifier : 5,
                showParticles: false
            });
            player.addEffect("minecraft:weakness", 60*TicksPerSecond, {
                amplifier : 5,
                showParticles: false
            });
            player.addEffect("minecraft:nausea", 30*TicksPerSecond, {
                amplifier : 1,
                showParticles: false
            });
            player.addEffect("minecraft:wither", 60*TicksPerSecond, {
                amplifier : 10,
                showParticles: false
            });
            system.waitTicks(60*TicksPerSecond).then(() => {
                player.setProperty("kurokumaft:ogre_rank", "none");
                player.setProperty("kurokumaft:ogre_becoming", 0);
                player.removeEffect("minecraft:regeneration");
                system.runTimeout(() => {
                    player.triggerEvent("kurokumaft:ogre_rank_change");
                    player.triggerEvent("kurokumaft:kaikyu_change");
                }, 2);
                const Inventory = player.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
                const container = Inventory.container;
                if (container !== undefined) {
                    const itemstack = container.getItem(0) as ItemStack;
                    const kekkizyutu = kekkizyutuLists.find(items => items.item === itemstack.typeId);
                    if (kekkizyutu !== undefined) {
                        container.setItem(0, undefined);
                    }
                }
            });
        }
    };

}
