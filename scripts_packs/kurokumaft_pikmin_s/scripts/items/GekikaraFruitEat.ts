import { CustomComponentParameters, ItemComponentConsumeEvent, ItemCustomComponent, ItemStack, Player, TicksPerSecond } from "@minecraft/server";
import { itemCoolDown } from "../common/PikuminCommonUtil";

/**
 * 激辛の実
 */
export class GekikaraFruitEat implements ItemCustomComponent {

    onConsume(event: ItemComponentConsumeEvent, arg1: CustomComponentParameters) {
        const source = event.source as Player;
        const itemStack = event.itemStack as ItemStack;

        source.addEffect("minecraft:strength", 30*TicksPerSecond, {
            amplifier: 2,
            showParticles: true
        });
        source.addEffect("minecraft:speed", 30*TicksPerSecond, {
            amplifier: 2,
            showParticles: true
        });
        source.addEffect("minecraft:hunger", 60*TicksPerSecond, {
            amplifier: 2,
            showParticles: true
        });
        itemCoolDown(source, itemStack);
    }

}
