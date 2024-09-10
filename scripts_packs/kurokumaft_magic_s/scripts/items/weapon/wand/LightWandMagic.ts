import { EffectType, EffectTypes, EntityDamageCause, Player, system, TicksPerSecond, world } from "@minecraft/server";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

/**
 * ヒーリング
 */
export async function healing(player:Player) {
    player.addEffect(MinecraftEffectTypes.InstantHealth, 1*TicksPerSecond, {
        amplifier: 1
    });
}

/**
 * リカバリー
 */
export async function recovery(player:Player) {
    player.runCommand("/effect " + player.nameTag + " clear");
}