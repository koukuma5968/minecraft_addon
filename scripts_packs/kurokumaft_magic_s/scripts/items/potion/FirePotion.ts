import { Player, TicksPerSecond } from "@minecraft/server";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

/**
 * 火の秘薬
 */
export async function firePotionStrengthUp(player:Player) {
    try {
        player.addEffect(MinecraftEffectTypes.Strength, 600*TicksPerSecond, {
            amplifier: 6
        });
    } catch(error) {
    }
}
