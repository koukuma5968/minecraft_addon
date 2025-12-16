import { Player, ItemStack, EntityComponentTypes, EntityEquippableComponent, EquipmentSlot, system, TicksPerSecond} from "@minecraft/server";
import { fireAttackReset, fireAttackUpLow, fireResistanceEffect, fireResistanceEffectReset, nightVisionEffect, nightVisionEffectReset, projectileInvalid, projectileInvalidReset, resistanceEffect, resistanceEffectReset, waterBreathingEffect, waterBreathingEffectReset } from "./MagicFunctionCommon";

interface MagicHelmetObject {
    itemName:string,
    func: any,
    delay: number,
    removeFunc: any
}

const MagicHelmetObjects = Object.freeze([
    {
        itemName: "kurokumaft:fire_chicken_helmet",
        func: fireAttackUpLow,
        delay: TicksPerSecond,
        removeFunc: fireAttackReset
    },
    {
        itemName: "kurokumaft:fire_magic_helmet",
        func: fireResistanceEffect,
        delay: TicksPerSecond * 10,
        removeFunc: fireResistanceEffectReset
    },
    {
        itemName: "kurokumaft:water_magic_helmet",
        func: waterBreathingEffect,
        delay: TicksPerSecond * 10,
        removeFunc: waterBreathingEffectReset
    },
    {
        itemName: "kurokumaft:wind_magic_helmet",
        func: projectileInvalid,
        delay: TicksPerSecond * 1,
        removeFunc: projectileInvalidReset
    },
    {
        itemName: "kurokumaft:lightning_magic_helmet",
        func: projectileInvalid,
        delay: TicksPerSecond * 1,
        removeFunc: projectileInvalidReset
    },
    {
        itemName: "kurokumaft:stone_magic_helmet",
        func: resistanceEffect,
        delay: TicksPerSecond * 10,
        removeFunc: resistanceEffectReset
    },
    {
        itemName: "kurokumaft:ice_magic_helmet",
        func: nightVisionEffect,
        delay: TicksPerSecond * 10,
        removeFunc: nightVisionEffectReset
    },
    {
        itemName: "kurokumaft:nether_fire_magic_helmet",
        func: fireResistanceEffect,
        delay: TicksPerSecond * 10,
        removeFunc: fireResistanceEffectReset
    },
    {
        itemName: "kurokumaft:nether_water_magic_helmet",
        func: waterBreathingEffect,
        delay: TicksPerSecond * 10,
        removeFunc: waterBreathingEffectReset
    },
    {
        itemName: "kurokumaft:nether_wind_magic_helmet",
        func: projectileInvalid,
        delay: TicksPerSecond * 1,
        removeFunc: projectileInvalidReset
    },
    {
        itemName: "kurokumaft:nether_lightning_magic_helmet",
        func: projectileInvalid,
        delay: TicksPerSecond * 1,
        removeFunc: projectileInvalidReset
    },
    {
        itemName: "kurokumaft:nether_stone_magic_helmet",
        func: resistanceEffect,
        delay: TicksPerSecond * 10,
        removeFunc: resistanceEffectReset
    },
    {
        itemName: "kurokumaft:nether_ice_magic_helmet",
        func: nightVisionEffect,
        delay: TicksPerSecond * 10,
        removeFunc: nightVisionEffectReset
    }

]);

/**
 * 頭装備状態チェック監視クラス
 */
export class MagicHelmetSurveillance {
    player: Player;
    itemStack:ItemStack;

    constructor(player: Player, itemStack:ItemStack) {
        this.player = player;
        this.itemStack = itemStack;
    }

    /**
     * 頭装備状態チェック
     */
    checkMagicHelmetTick() {
        this.checkJob();
    };

    private async checkJob() {

        const equItem = MagicHelmetObjects.find(obj => obj.itemName == this.itemStack.typeId) as MagicHelmetObject;
        if (equItem == undefined) {
            return;
        }
        const equ = this.player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        const head = equ.getEquipment(EquipmentSlot.Head) as ItemStack;

        if (head != null && head.typeId == equItem.itemName) {
            this.player.setDynamicProperty("magic_helmet_equ", true);
            equItem.func(this.player);
            system.runTimeout(() => {
                system.run(this.checkJob.bind(this));
            }, equItem.delay);
        } else {
            // equItem.removeFunc(this.player);
            this.player.setDynamicProperty("magic_helmet_equ", false);
        }
    };
}

