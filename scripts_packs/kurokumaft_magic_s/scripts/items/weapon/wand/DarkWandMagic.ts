import { EffectType, EffectTypes, EntityDamageCause, Player, system, TicksPerSecond } from "@minecraft/server";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

/**
 * アブソープション
 */
export async function absorption(player:Player) {
    player.addEffect(MinecraftEffectTypes.Absorption, 10*TicksPerSecond, {
        amplifier: 1
    });
}

/**
 * インビジブル
 */
export async function invisibility(player:Player) {
    player.addEffect(MinecraftEffectTypes.Invisibility, 20*TicksPerSecond, {
        amplifier: 5
    });
}