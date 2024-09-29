import { ItemStack, Player, TicksPerSecond } from "@minecraft/server";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

/**
 * ラージスコープ
 * @param {Player} player
 */
export async function lageScope(player:Player) {
    player.addEffect(MinecraftEffectTypes.Slowness, 1000*TicksPerSecond, {
        amplifier: 10,
        showParticles: false
    });
}

/**
 * ミドルスコープ
 * @param {Player} player
 */
export async function middleScope(player:Player) {
    player.addEffect(MinecraftEffectTypes.Slowness, 1000*TicksPerSecond, {
        amplifier: 6,
        showParticles: false
    });
}

/**
 * スモールスコープ
 * @param {Player} player
 */
export async function smallScope(player:Player) {
    player.addEffect(MinecraftEffectTypes.Slowness, 1000*TicksPerSecond, {
        amplifier: 4,
        showParticles: false
    });
}

/**
 * クリアスコープ
 * @param {Player} player
 */
export async function clearScope(player:Player) {
    player.removeEffect(MinecraftEffectTypes.Slowness);
}
