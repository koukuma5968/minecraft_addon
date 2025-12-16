import { BlockPermutation, BlockVolume, EntityComponentTypes, EntityMovementComponent, EntityUnderwaterMovementComponent, Player, TicksPerSecond } from "@minecraft/server";
import { MinecraftBlockTypes, MinecraftEffectTypes } from "@minecraft/vanilla-data";

export async function fireAttackUpLow(player:Player) {
    player.triggerEvent("kurokumaft:attack3_up");
}

export async function fireResistanceEffect(player:Player) {
    player.addEffect(MinecraftEffectTypes.FireResistance, TicksPerSecond * 60, {
        amplifier: 5,
        showParticles: false
    });
}

export async function waterBreathingEffect(player:Player) {
    player.addEffect(MinecraftEffectTypes.WaterBreathing, TicksPerSecond * 60, {
        amplifier: 5,
        showParticles: false
    });
}

export async function resistanceEffect(player:Player) {
    player.addEffect(MinecraftEffectTypes.Resistance, TicksPerSecond * 60, {
        amplifier: 3,
        showParticles: false
    });
}

export async function nightVisionEffect(player:Player) {
    player.addEffect(MinecraftEffectTypes.NightVision, TicksPerSecond * 60, {
        amplifier: 10,
        showParticles: false
    });
}

export async function projectileInvalid(player:Player) {
    player.addTag("projectile_invalid");
}

export async function projectileInvalidReset(player:Player) {
    player.removeTag("projectile_invalid");
}

export async function fireResistanceEffectReset(player:Player) {
    player.removeEffect(MinecraftEffectTypes.FireResistance);
}

export async function waterBreathingEffectReset(player:Player) {
    player.removeEffect(MinecraftEffectTypes.WaterBreathing);
}

export async function resistanceEffectReset(player:Player) {
    player.removeEffect(MinecraftEffectTypes.Resistance);
}

export async function nightVisionEffectReset(player:Player) {
    player.removeEffect(MinecraftEffectTypes.NightVision);
}

export async function fireAttackReset(player:Player) {
    player.triggerEvent("kurokumaft:attack_down");
}

export async function fireAttackUp(player:Player) {
    player.triggerEvent("kurokumaft:attack10_up");
}

export async function waterHealthUp(player:Player) {
    player.addEffect(MinecraftEffectTypes.HealthBoost, 60*TicksPerSecond, {
        amplifier: 2,
        showParticles: true
    });
}

export async function lavaFreeze(player:Player) {
    const blockVol = new BlockVolume(
        {
            x:player.location.x-2,
            y:player.location.y-2,
            z:player.location.z-2
        },
        {
            x:player.location.x+2,
            y:player.location.y+2,
            z:player.location.z+2
        }
    );

    player.dimension.fillBlocks(blockVol, MinecraftBlockTypes.Ice, {
        blockFilter: {
            includePermutations: [
                BlockPermutation.resolve(MinecraftBlockTypes.Lava),
                BlockPermutation.resolve(MinecraftBlockTypes.Magma),
            ]
        },
        ignoreChunkBoundErrors: true
    });

}

export async function waterHealthReset(player:Player) {
}

export async function lavaFreezeReset(player:Player) {
}

export async function lavaWalker(player:Player) {

    const blockVol = new BlockVolume(
        {
            x:player.location.x-1,
            y:player.location.y-1,
            z:player.location.z-1
        },
        {
            x:player.location.x+1,
            y:player.location.y-1,
            z:player.location.z+1
        }
    );

    player.dimension.fillBlocks(blockVol, MinecraftBlockTypes.Magma, {
        blockFilter: {
            includePermutations: [
                BlockPermutation.resolve(MinecraftBlockTypes.Lava),
                BlockPermutation.resolve(MinecraftBlockTypes.FlowingLava),
            ]
        },
        ignoreChunkBoundErrors: true
    });

}

export async function waterSpeedUp(player:Player) {
    const move = player.getComponent(EntityComponentTypes.UnderwaterMovement) as EntityUnderwaterMovementComponent;
    if (player.isInWater) {
        move.setCurrentValue(0.15);
    } else {
        move.setCurrentValue(0.02);
    }
}

export async function windSpeedUp(player:Player) {
    const move = player.getComponent(EntityComponentTypes.Movement) as EntityMovementComponent;
    if (!player.isInWater) {
        move.setCurrentValue(0.2);
    } else {
        move.setCurrentValue(0.1);
    }
}

export async function stoneFallInvalid(player:Player) {
    player.addTag("fall_invalid");
}

export async function stoneFallInvalidReset(player:Player) {
    player.removeTag("fall_invalid");
}

export async function lightningSpeedUp(player:Player) {
    const move = player.getComponent(EntityComponentTypes.Movement) as EntityMovementComponent;
    if (move.currentValue != 0.4) {
        move.setCurrentValue(0.4);
    }
}

export async function iceWalker(player:Player) {
    const blockVol = new BlockVolume(
        {
            x:player.location.x-1,
            y:player.location.y-1,
            z:player.location.z-1
        },
        {
            x:player.location.x+1,
            y:player.location.y-1,
            z:player.location.z+1
        }
    );

    player.dimension.fillBlocks(blockVol, MinecraftBlockTypes.PackedIce, {
        blockFilter: {
            includePermutations: [
                BlockPermutation.resolve(MinecraftBlockTypes.Water),
                BlockPermutation.resolve(MinecraftBlockTypes.FlowingWater),
            ]
        },
        ignoreChunkBoundErrors: true
    });

}

export async function lavaWalkerReset(player:Player) {
}

export async function waterSpeedReset(player:Player) {
    const move = player.getComponent(EntityComponentTypes.UnderwaterMovement) as EntityUnderwaterMovementComponent;
    if (move.currentValue != 0.02) {
        move.setCurrentValue(0.02);
    }
}

export async function windSpeedReset(player:Player) {
    const move = player.getComponent(EntityComponentTypes.Movement) as EntityMovementComponent;
    if (move.currentValue != 0.1) {
        move.setCurrentValue(0.1);
    }

}

export async function lightningSpeedReset(player:Player) {
    const move = player.getComponent(EntityComponentTypes.Movement) as EntityMovementComponent;
    if (move.currentValue != 0.1) {
        move.setCurrentValue(0.1);
    }
}

export async function iceWalkerReset(player:Player) {
}

export async function jumpBoostEffect(player:Player) {
    player.addEffect(MinecraftEffectTypes.JumpBoost, TicksPerSecond * 60, {
        amplifier: 1,
        showParticles: false
    });
}

export async function waterRegenerationEffect(player:Player) {
    player.addEffect(MinecraftEffectTypes.Regeneration, TicksPerSecond * 60, {
        amplifier: 2,
        showParticles: false
    });
}

export async function iceResistanceEffect(player:Player) {
    player.addEffect(MinecraftEffectTypes.FireResistance, TicksPerSecond * 60, {
        amplifier: 5,
        showParticles: false
    });
}

export async function jumpBoostEffectReset(player:Player) {
    player.removeEffect(MinecraftEffectTypes.JumpBoost);
}

export async function waterRegenerationEffectReset(player:Player) {
    player.removeEffect(MinecraftEffectTypes.Regeneration);
}
export async function iceResistanceEffectReset(player:Player) {
    player.removeEffect(MinecraftEffectTypes.FireResistance);
}
