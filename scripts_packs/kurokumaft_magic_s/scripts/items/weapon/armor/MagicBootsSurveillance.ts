import { Player, ItemStack, EntityComponentTypes, EntityEquippableComponent, EquipmentSlot, system, TicksPerSecond} from "@minecraft/server";
import { lavaWalker, lavaWalkerReset, waterSpeedUp, waterSpeedReset, windSpeedUp, windSpeedReset, stoneFallInvalid, stoneFallInvalidReset, lightningSpeedUp, lightningSpeedReset, iceWalker, iceWalkerReset } from "./MagicFunctionCommon";

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

        const equItem = MagicBootsObjects.find(obj => obj.itemName == this.itemStack.typeId) as MagicBootsObject;
        if (equItem == undefined) {
            return;
        }
        const equ = this.player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        const boot = equ.getEquipment(EquipmentSlot.Feet) as ItemStack;

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

