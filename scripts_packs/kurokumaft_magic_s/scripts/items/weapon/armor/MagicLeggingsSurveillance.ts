import { Player, ItemStack, EntityComponentTypes, EntityEquippableComponent, EquipmentSlot, system, world, TicksPerSecond} from "@minecraft/server";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

interface MagicLeggingsObject {
    itemName:string,
    func: any,
    delay: number,
    removeFunc: any
}

const MagicLeggingsObjects = Object.freeze([
    {
        itemName: "kurokumaft:fire_magic_leggings",
        func: jumpBoostEffect,
        delay: TicksPerSecond * 10,
        removeFunc: jumpBoostEffectReset
    },
    {
        itemName: "kurokumaft:water_magic_leggings",
        func: waterRegenerationEffect,
        delay: TicksPerSecond * 10,
        removeFunc: waterRegenerationEffectReset
    },
    {
        itemName: "kurokumaft:ice_magic_leggings",
        func: iceResistanceEffect,
        delay: TicksPerSecond * 10,
        removeFunc: iceResistanceEffectReset
    },
    {
        itemName: "kurokumaft:nether_fire_magic_leggings",
        func: jumpBoostEffect,
        delay: TicksPerSecond * 10,
        removeFunc: jumpBoostEffectReset
    },
    {
        itemName: "kurokumaft:nether_water_magic_leggings",
        func: waterRegenerationEffect,
        delay: TicksPerSecond * 10,
        removeFunc: waterRegenerationEffectReset
    },
    {
        itemName: "kurokumaft:nether_ice_magic_leggings",
        func: iceResistanceEffect,
        delay: TicksPerSecond * 10,
        removeFunc: iceResistanceEffectReset
    }

]);

/**
 * 胴装備状態チェック監視クラス
 */
export class MagicLeggingsSurveillance {
    player: Player;
    itemStack:ItemStack;

    constructor(player: Player, itemStack:ItemStack) {
        this.player = player;
        this.itemStack = itemStack;
    }

    /**
     * 胴装備状態チェック
     */
    checkMagicLeggingsTick() {
        this.checkJob();
    };

    private async checkJob() {

        let equItem = MagicLeggingsObjects.find(obj => obj.itemName == this.itemStack.typeId) as MagicLeggingsObject;
        if (equItem == undefined) {
            return;
        }
        let equ = this.player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        let leg = equ.getEquipment(EquipmentSlot.Legs) as ItemStack;

        if (leg != null && leg.typeId == equItem.itemName) {
            this.player.setDynamicProperty("magic_leg_equ", true);
            equItem.func(this.player);
            system.runTimeout(() => {
                system.run(this.checkJob.bind(this));
            }, equItem.delay);
        } else {
            // equItem.removeFunc(this.player);
            this.player.setDynamicProperty("magic_leg_equ", false);
        }
    };
}

async function jumpBoostEffect(player:Player) {
    player.addEffect(MinecraftEffectTypes.JumpBoost, TicksPerSecond * 60, {
        amplifier: 1,
        showParticles: false
    });
}

async function waterRegenerationEffect(player:Player) {
    player.addEffect(MinecraftEffectTypes.Regeneration, TicksPerSecond * 60, {
        amplifier: 2,
        showParticles: false
    });
}

async function iceResistanceEffect(player:Player) {
    player.addEffect(MinecraftEffectTypes.FireResistance, TicksPerSecond * 60, {
        amplifier: 5,
        showParticles: false
    });
}

async function jumpBoostEffectReset(player:Player) {
    player.removeEffect(MinecraftEffectTypes.JumpBoost);
}

async function waterRegenerationEffectReset(player:Player) {
    player.removeEffect(MinecraftEffectTypes.Regeneration);
}
async function iceResistanceEffectReset(player:Player) {
    player.removeEffect(MinecraftEffectTypes.FireResistance);
}
