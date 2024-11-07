import { Player, TicksPerSecond } from "@minecraft/server";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

/**
 * 魔炎樹の木の実
 */
export async function windPotionJumpBoost(player:Player) {
    try {
        player.addEffect(MinecraftEffectTypes.JumpBoost, 600*TicksPerSecond, {
            amplifier: 6
        });
    } catch(error) {
    }
}
