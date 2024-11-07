import { Player, TicksPerSecond } from "@minecraft/server";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

/**
 * 魔炎樹の木の実
 */
export async function waterNutHealthBoost(player:Player) {
    try {
        player.addEffect(MinecraftEffectTypes.HealthBoost, 10*TicksPerSecond, {
            amplifier: 20
        });
        player.addEffect(MinecraftEffectTypes.InstantHealth, 1*TicksPerSecond, {
            amplifier: 20
        });
        player.addEffect(MinecraftEffectTypes.Hunger, 30*TicksPerSecond, {
            amplifier: 5
        });
        player.addEffect(MinecraftEffectTypes.Poison, 15*TicksPerSecond, {
            amplifier: 5
        });
    } catch(error) {
    }
}
