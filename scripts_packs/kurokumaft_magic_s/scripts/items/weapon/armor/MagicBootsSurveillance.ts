import { Player, ItemStack, EntityComponentTypes, EntityEquippableComponent, EquipmentSlot, system, world, TicksPerSecond} from "@minecraft/server";

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
    player.runCommand("/execute as @s if block ~~-1~ lava run setblock ~~-1~ magma");
    player.runCommand("/execute as @s if block ~~-1~ flowing_lava run setblock ~~-1~ magma");
}

async function waterSpeedUp(player:Player) {
    if (player.isInWater) {
        player.runCommand("/event entity @s kurokumaft:water_speed_walker_up");
    } else {
        player.runCommand("/event entity @s kurokumaft:water_speed_walker_down");
    }
}

async function windSpeedUp(player:Player) {
    if (!player.isInWater) {
        player.runCommand("/event entity @s kurokumaft:speed_walker_up");
    } else {
        player.runCommand("/event entity @s kurokumaft:speed_walker_down");
    }
}

async function lightningSpeedUp(player:Player) {
    player.runCommand("/event entity @s kurokumaft:speed_walker_up4");
}

async function iceWalker(player:Player) {
    player.runCommand("/execute as @s if block ~~-1~ water run setblock ~~-1~ packed_ice");
    player.runCommand("/execute as @s if block ~~-1~ flowing_water run setblock ~~-1~ packed_ice");
}

async function lavaWalkerReset(player:Player) {
}

async function waterSpeedReset(player:Player) {
    player.runCommand("/event entity @s kurokumaft:water_speed_walker_down");
}

async function windSpeedReset(player:Player) {
    player.runCommand("/event entity @s kurokumaft:speed_walker_down");
}

async function lightningSpeedReset(player:Player) {
    player.runCommand("/event entity @s kurokumaft:speed_walker_down");
}

async function iceWalkerReset(player:Player) {
}
