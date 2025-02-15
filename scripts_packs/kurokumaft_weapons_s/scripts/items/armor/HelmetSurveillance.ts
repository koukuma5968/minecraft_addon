import { Player, ItemStack, EntityComponentTypes, EntityEquippableComponent, EquipmentSlot, system, TicksPerSecond, EntityHealthComponent, ItemDurabilityComponent, ItemComponentTypes, world} from "@minecraft/server";
import { playsound } from "../../common/WeaponsCommonUtil";
import { itemDurabilityDamageFixed } from "../../common/WeaponsItemDurabilityDamage";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

/**
 * 頭装備状態チェック監視クラス
 */
export class HelmetSurveillance {
    player: Player;
    itemStack:ItemStack;

    constructor(player: Player, itemStack:ItemStack) {
        this.player = player;
        this.itemStack = itemStack;
    }

    /**
     * 頭装備状態チェック
     */
    checkHelmetTick() {
        this.checkJob();
    };

    private async checkJob() {

        let equ = this.player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        let head = equ.getEquipment(EquipmentSlot.Head) as ItemStack;

        if (head != null && head.typeId == this.itemStack.typeId) {
            this.player.setDynamicProperty("helmet_equ", this.itemStack.typeId);
            head.getTags().forEach(tag => {
                if ("axolotl_helmet" == tag) {
                    this.player.setDynamicProperty("axolotl_helmet", true);
                } else if ("chicken_helmet" == tag) {
                    chickenSlowFalling(this.player);
                } else if ("fox_helmet" == tag) {
                    foxSpeedBoost(this.player);
                } else if ("rabbit_helmet" == tag) {
                    rabbitJumpBoost(this.player);
                } else if ("wolf_helmet" == tag) {
                    wolfPowerBoost(this.player);
                }
            });

            system.runTimeout(() => {
                system.run(this.checkJob.bind(this));
            }, TicksPerSecond * 5);
        } else {
            this.player.setDynamicProperty("helmet_equ", undefined);
            this.player.setDynamicProperty("axolotl_helmet", false);
            // resetSlowFalling(this.player);
            // resetSpeedBoost(this.player);
            // resetJumpBoost(this.player);
            // resetPowerBoost(this.player);
        }
    };
}

export async function axolotlRegeneration(player:Player) {

    let health = player.getComponent(EntityComponentTypes.Health) as EntityHealthComponent;

    if (health.currentValue <= 4) {
        health.setCurrentValue(health.defaultValue);
        let equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        let head = equ.getEquipment(EquipmentSlot.Head) as ItemStack;
        let itemDur = head.getComponent(ItemComponentTypes.Durability) as ItemDurabilityComponent;
        playsound(player, "random.totem");

        itemDurabilityDamageFixed(player, head, EquipmentSlot.Head, itemDur.maxDurability/3);

    }
}

async function chickenSlowFalling(player:Player) {
    player.addEffect(MinecraftEffectTypes.SlowFalling, TicksPerSecond * 30, {
        amplifier: 2,
        showParticles: false
    });
}

async function resetSlowFalling(player:Player) {
    player.removeEffect(MinecraftEffectTypes.SlowFalling);
}

async function foxSpeedBoost(player:Player) {
    player.addEffect(MinecraftEffectTypes.Speed, TicksPerSecond * 30, {
        amplifier: 2,
        showParticles: false
    });
}

async function resetSpeedBoost(player:Player) {
    player.removeEffect(MinecraftEffectTypes.Speed);
}

async function rabbitJumpBoost(player:Player) {
    player.addEffect(MinecraftEffectTypes.JumpBoost, TicksPerSecond * 30, {
        amplifier: 2,
        showParticles: false
    });
}

async function resetJumpBoost(player:Player) {
    player.removeEffect(MinecraftEffectTypes.JumpBoost);
}

async function wolfPowerBoost(player:Player) {
    player.addEffect(MinecraftEffectTypes.Strength, TicksPerSecond * 30, {
        amplifier: 2,
        showParticles: false
    });
}

async function resetPowerBoost(player:Player) {
    player.removeEffect(MinecraftEffectTypes.Strength);
}
