import { Player, ItemStack, EntityComponentTypes, EntityEquippableComponent, EquipmentSlot, system, world, BlockPermutation, ButtonPushAfterEvent, DimensionLocation, TicksPerSecond} from "@minecraft/server";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

interface MagicHelmetObject {
    itemName:string,
    func: any,
    delay: number,
    removeFunc: any
}

const MagicHelmetObjects = Object.freeze([
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

        let equItem = MagicHelmetObjects.find(obj => obj.itemName == this.itemStack.typeId) as MagicHelmetObject;
        if (equItem == undefined) {
            return;
        }
        let equ = this.player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        let head = equ.getEquipment(EquipmentSlot.Head) as ItemStack;

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

async function fireResistanceEffect(player:Player) {
    player.addEffect(MinecraftEffectTypes.FireResistance, TicksPerSecond * 60, {
        amplifier: 5,
        showParticles: false
    });
}

async function waterBreathingEffect(player:Player) {
    player.addEffect(MinecraftEffectTypes.WaterBreathing, TicksPerSecond * 60, {
        amplifier: 5,
        showParticles: false
    });
}

async function resistanceEffect(player:Player) {
    player.addEffect(MinecraftEffectTypes.Resistance, TicksPerSecond * 60, {
        amplifier: 3,
        showParticles: false
    });
}

async function nightVisionEffect(player:Player) {
    player.addEffect(MinecraftEffectTypes.NightVision, TicksPerSecond * 60, {
        amplifier: 10,
        showParticles: false
    });
}

async function projectileInvalid(player:Player) {
    player.addTag("projectile_invalid");
}

async function projectileInvalidReset(player:Player) {
    player.removeTag("projectile_invalid");
}

async function fireResistanceEffectReset(player:Player) {
    player.removeEffect(MinecraftEffectTypes.FireResistance);
}

async function waterBreathingEffectReset(player:Player) {
    player.removeEffect(MinecraftEffectTypes.WaterBreathing);
}

async function resistanceEffectReset(player:Player) {
    player.removeEffect(MinecraftEffectTypes.Resistance);
}

async function nightVisionEffectReset(player:Player) {
    player.removeEffect(MinecraftEffectTypes.NightVision);
}
