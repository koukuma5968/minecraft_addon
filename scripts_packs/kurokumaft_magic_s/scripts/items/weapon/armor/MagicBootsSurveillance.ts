import { Player, ItemStack, EntityComponentTypes, EntityEquippableComponent, EquipmentSlot, system, world, TicksPerSecond, Block} from "@minecraft/server";
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
        let equ = this.player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        let boot = equ.getEquipment(EquipmentSlot.Feet) as ItemStack;

        if (boot != null && boot.typeId == equItem.itemName) {
            this.player.setDynamicProperty("magic_boot_equ", true);
            equItem.func(this.player);
            system.runTimeout(() => {
                system.run(this.checkJob.bind(this));
            }, equItem.delay);
        } else {
            equItem.removeFunc(this.player);
            this.player.setDynamicProperty("magic_boot_equ", false);
        }
    };
}

async function lavaWalker(player:Player) {
    for (let x=-1;x<=1;x++) {
        for (let z=-1;x<=1;x++) {
            let underBlock = player.dimension.getBlock({x:player.location.x+x,y:player.location.y-1,z:player.location.z+z}) as Block;
            if (underBlock.typeId == MinecraftBlockTypes.Lava || underBlock.typeId == MinecraftBlockTypes.FlowingLava) {
                player.dimension.setBlockType({x:player.location.x+x,y:player.location.y-1,z:player.location.z+z}, MinecraftBlockTypes.Magma);
            }
        }
    }
}

async function waterSpeedUp(player:Player) {
    if (player.isInWater) {
        player.triggerEvent("kurokumaft:water_speed_walker_up");
    } else {
        player.triggerEvent("kurokumaft:water_speed_walker_down");
    }
}

async function windSpeedUp(player:Player) {
    if (!player.isInWater) {
        player.triggerEvent("kurokumaft:speed_walker_up");
    } else {
        player.triggerEvent("kurokumaft:speed_walker_down");
    }
}

async function lightningSpeedUp(player:Player) {
    player.triggerEvent("kurokumaft:speed_walker_up4");
}

async function iceWalker(player:Player) {
    for (let x=-1;x<=1;x++) {
        for (let z=-1;x<=1;x++) {
            let underBlock = player.dimension.getBlock({x:player.location.x+x,y:player.location.y-1,z:player.location.z+z}) as Block;
            if (underBlock.typeId == MinecraftBlockTypes.Water || underBlock.typeId == MinecraftBlockTypes.FlowingWater) {
                player.dimension.setBlockType({x:player.location.x+x,y:player.location.y-1,z:player.location.z+z}, MinecraftBlockTypes.PackedIce);
            }
        }
    }
}

async function lavaWalkerReset(player:Player) {
}

async function waterSpeedReset(player:Player) {
    player.triggerEvent("kurokumaft:water_speed_walker_down");
}

async function windSpeedReset(player:Player) {
    player.triggerEvent("kurokumaft:speed_walker_down");
}

async function lightningSpeedReset(player:Player) {
    player.triggerEvent("kurokumaft:speed_walker_down");
}

async function iceWalkerReset(player:Player) {
}
