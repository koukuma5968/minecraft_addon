import { Player, ItemStack, EntityComponentTypes, EntityEquippableComponent, EquipmentSlot, system, world, TicksPerSecond} from "@minecraft/server";

interface MagicChestObject {
    itemName:string,
    func: any,
    delay: number,
    removeFunc: any
}

const MagicChestObjects = Object.freeze([
    {
        itemName: "kurokumaft:fire_magic_chestplate",
        func: fireAttackUp,
        delay: TicksPerSecond,
        removeFunc: fireAttackReset
    },
    {
        itemName: "kurokumaft:water_magic_chestplate",
        func: waterHealthUp,
        delay: TicksPerSecond * 5,
        removeFunc: waterHealthReset
    },
    {
        itemName: "kurokumaft:ice_magic_chestplate",
        func: lavaFreeze,
        delay: 10,
        removeFunc: lavaFreezeReset
    },
    {
        itemName: "kurokumaft:nether_fire_magic_chestplate",
        func: fireAttackUp,
        delay: TicksPerSecond,
        removeFunc: fireAttackReset
    },
    {
        itemName: "kurokumaft:nether_water_magic_chestplate",
        func: waterHealthUp,
        delay: TicksPerSecond * 5,
        removeFunc: waterHealthReset
    },
    {
        itemName: "kurokumaft:nether_ice_magic_chestplate",
        func: lavaFreeze,
        delay: 10,
        removeFunc: lavaFreezeReset
    }

]);

/**
 * 胴装備状態チェック監視クラス
 */
export class MagicChestSurveillance {
    player: Player;
    itemStack:ItemStack;

    constructor(player: Player, itemStack:ItemStack) {
        this.player = player;
        this.itemStack = itemStack;
    }

    /**
     * 胴装備状態チェック
     */
    checkMagicChestTick() {
        this.checkJob();
    };

    private async checkJob() {

        let equItem = MagicChestObjects.find(obj => obj.itemName == this.itemStack.typeId) as MagicChestObject;
        let equ = this.player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        let chest = equ.getEquipment(EquipmentSlot.Chest) as ItemStack;

        if (chest != null && chest.typeId == equItem.itemName) {
            this.player.setDynamicProperty("magic_chest_equ", true);
            equItem.func(this.player);
            system.runTimeout(() => {
                system.run(this.checkJob.bind(this));
            }, equItem.delay);
        } else {
            equItem.removeFunc(this.player);
            this.player.setDynamicProperty("magic_Chest_equ", false);
        }
    };
}

async function fireAttackUp(player:Player) {
    player.runCommand("/event entity @s kurokumaft:attack20_up");
}

async function waterHealthUp(player:Player) {
    player.runCommand("/event entity @s kurokumaft:health40_up");
}

async function lavaFreeze(player:Player) {
    player.runCommand("/execute as @s if block ^1^1^ lava run setblock ^1^1^ air");
    player.runCommand("/execute as @s if block ^-1^1^ lava run setblock ^-1^1^ air");
    player.runCommand("/execute as @s if block ^^1^1 lava run setblock ^^1^1 air");
    player.runCommand("/execute as @s if block ^^1^-1 lava run setblock ^^1^-1 air");
    player.runCommand("/execute as @s if block ^^1^-1 lava run setblock ^^1^-1 air");
    player.runCommand("/execute as @s if block ^-1^2^ lava run setblock ^-1^2^ air");
    player.runCommand("/execute as @s if block ^^2^1 lava run setblock ^^2^1 air");
    player.runCommand("/execute as @s if block ^^2^-1 lava run setblock ^^2^-1 air");
    player.runCommand("/execute as @s if block ^^3^ lava run setblock ^^3^ air");
}

async function fireAttackReset(player:Player) {
    player.runCommand("/event entity @s kurokumaft:attack_down");
}

async function waterHealthReset(player:Player) {
    player.runCommand("/event entity @s kurokumaft:health_down");
}

async function lavaFreezeReset(player:Player) {
}