import { Player, ItemStack, EntityComponentTypes, EntityEquippableComponent, EquipmentSlot, system, world, TicksPerSecond, Block, EntityUnderwaterMovementComponent, EntityMovementComponent, BlockPermutation, BlockVolume} from "@minecraft/server";
import { MinecraftBlockTypes } from "@minecraft/vanilla-data";

interface MagicBootsObject {
    itemName:string,
    func: any,
    delay: number,
    removeFunc: any
}

const MagicBootsObjects = Object.freeze([
    {
        itemName: "kurokumaft:fire_magic_boots",
        func: lavaWalker,
        delay: 1,
        removeFunc: lavaWalkerReset
    },
    {
        itemName: "kurokumaft:water_magic_boots",
        func: waterSpeedUp,
        delay: TicksPerSecond * 1,
        removeFunc: waterSpeedReset
    },
    {
        itemName: "kurokumaft:wind_magic_boots",
        func: windSpeedUp,
        delay: TicksPerSecond * 1,
        removeFunc: windSpeedReset
    },
    {
        itemName: "kurokumaft:stone_magic_boots",
        func: stoneFallInvalid,
        delay: TicksPerSecond * 1,
        removeFunc: stoneFallInvalidReset
    },
    {
        itemName: "kurokumaft:lightning_magic_boots",
        func: lightningSpeedUp,
        delay: TicksPerSecond * 1,
        removeFunc: lightningSpeedReset
    },
    {
        itemName: "kurokumaft:ice_magic_boots",
        func: iceWalker,
        delay: 5,
        removeFunc: iceWalkerReset
    },
    {
        itemName: "kurokumaft:nether_fire_magic_boots",
        func: lavaWalker,
        delay: 1,
        removeFunc: lavaWalkerReset
    },
    {
        itemName: "kurokumaft:nether_water_magic_boots",
        func: waterSpeedUp,
        delay: TicksPerSecond * 1,
        removeFunc: waterSpeedReset
    },
    {
        itemName: "kurokumaft:nether_wind_magic_boots",
        func: windSpeedUp,
        delay: TicksPerSecond * 1,
        removeFunc: windSpeedReset
    },
    {
        itemName: "kurokumaft:nether_stone_magic_boots",
        func: stoneFallInvalid,
        delay: TicksPerSecond * 1,
        removeFunc: stoneFallInvalidReset
    },
    {
        itemName: "kurokumaft:nether_lightning_magic_boots",
        func: lightningSpeedUp,
        delay: TicksPerSecond * 1,
        removeFunc: lightningSpeedReset
    },
    {
        itemName: "kurokumaft:nether_ice_magic_boots",
        func: iceWalker,
        delay: 5,
        removeFunc: iceWalkerReset
    }

]);

/**
 * 胴装備状態チェック監視クラス
 */
export class MagicBootsSurveillance {
    player: Player;
    itemStack:ItemStack;

    constructor(player: Player, itemStack:ItemStack) {
        this.player = player;
        this.itemStack = itemStack;
    }

    /**
     * 胴装備状態チェック
     */
    checkMagicBootsTick() {
        this.checkJob();
    };

    private async checkJob() {

        let equItem = MagicBootsObjects.find(obj => obj.itemName == this.itemStack.typeId) as MagicBootsObject;
        if (equItem == undefined) {
            return;
        }
        let equ = this.player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        let boot = equ.getEquipment(EquipmentSlot.Feet) as ItemStack;

        if (boot != null && boot.typeId == equItem.itemName) {
            this.player.setDynamicProperty("magic_boot_equ", true);
            equItem.func(this.player);
            system.runTimeout(() => {
                system.run(this.checkJob.bind(this));
            }, equItem.delay);
        } else {
            // equItem.removeFunc(this.player);
            this.player.setDynamicProperty("magic_boot_equ", false);
        }
    };
}

async function lavaWalker(player:Player) {

    let blockVol = new BlockVolume(
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

async function waterSpeedUp(player:Player) {
    let move = player.getComponent(EntityComponentTypes.UnderwaterMovement) as EntityUnderwaterMovementComponent;
    if (player.isInWater) {
        move.setCurrentValue(0.15);
    } else {
        move.setCurrentValue(0.02);
    }
}

async function windSpeedUp(player:Player) {
    let move = player.getComponent(EntityComponentTypes.Movement) as EntityMovementComponent;
    if (!player.isInWater) {
        move.setCurrentValue(0.2);
    } else {
        move.setCurrentValue(0.1);
    }
}

async function stoneFallInvalid(player:Player) {
    player.addTag("fall_invalid");
}

async function stoneFallInvalidReset(player:Player) {
    player.removeTag("fall_invalid");
}

async function lightningSpeedUp(player:Player) {
    let move = player.getComponent(EntityComponentTypes.Movement) as EntityMovementComponent;
    if (move.currentValue != 0.4) {
        move.setCurrentValue(0.4);
    }
}

async function iceWalker(player:Player) {
    let blockVol = new BlockVolume(
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

async function lavaWalkerReset(player:Player) {
}

async function waterSpeedReset(player:Player) {
    let move = player.getComponent(EntityComponentTypes.UnderwaterMovement) as EntityUnderwaterMovementComponent;
    if (move.currentValue != 0.02) {
        move.setCurrentValue(0.02);
    }
}

async function windSpeedReset(player:Player) {
    let move = player.getComponent(EntityComponentTypes.Movement) as EntityMovementComponent;
    if (move.currentValue != 0.1) {
        move.setCurrentValue(0.1);
    }

}

async function lightningSpeedReset(player:Player) {
    let move = player.getComponent(EntityComponentTypes.Movement) as EntityMovementComponent;
    if (move.currentValue != 0.1) {
        move.setCurrentValue(0.1);
    }
}

async function iceWalkerReset(player:Player) {
}
