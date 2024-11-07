import { Player, TicksPerSecond } from "@minecraft/server";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

/**
 * 魔炎樹の木の実
 */
export async function waterPotionHealthBoost(player:Player) {
    try {
        player.addEffect(MinecraftEffectTypes.HealthBoost, 600*TicksPerSecond, {
            amplifier: 10
        });
        player.addEffect(MinecraftEffectTypes.InstantHealth, 1*TicksPerSecond, {
            amplifier: 20
        });
    } catch(error) {
    }
}
