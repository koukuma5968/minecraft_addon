import { ItemCustomComponent, ItemStack, Player, ItemComponentConsumeEvent, TicksPerSecond, world } from "@minecraft/server";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

interface PotionEffectType {
    effect: string,
    duration: number,
    amplifier: number
}

interface PotionObject {
    itemName: string,
    effects: PotionEffectType[]
}

const PotionObjects = Object.freeze([
    {
        itemName: "kurokumaft:milk_chocolate",
        effects: [],
    },
    {
        itemName: "kurokumaft:green_soybean",
        effects: [
            {
                effect: MinecraftEffectTypes.NightVision,
                duration: 60,
                amplifier: 1
            }
        ],
    },
    {
        itemName: "kurokumaft:medicinal_plant",
        effects: [
            {
                effect: MinecraftEffectTypes.Regeneration,
                duration: 1,
                amplifier: 2.5
            },
            {
                effect: MinecraftEffectTypes.Hunger,
                duration: 10,
                amplifier: 1
            }
        ],
    },
    {
        itemName: "kurokumaft:poisonous_plant",
        effects: [
            {
                effect: MinecraftEffectTypes.Poison,
                duration: 10,
                amplifier: 1
            },
            {
                effect: MinecraftEffectTypes.Hunger,
                duration: 10,
                amplifier: 1
            }
        ],
    },
    {
        itemName: "kurokumaft:hiheal_potion",
        effects: [
            {
                effect: MinecraftEffectTypes.InstantHealth,
                duration: 1,
                amplifier: 5
            },
            {
                effect: MinecraftEffectTypes.Regeneration,
                duration: 30,
                amplifier: 3
            }
        ],
    },
    {
        itemName: "kurokumaft:histurdiness_potion",
        effects: [
            {
                effect: MinecraftEffectTypes.Resistance,
                duration: 180,
                amplifier: 5
            },
            {
                effect: MinecraftEffectTypes.FireResistance,
                duration: 180,
                amplifier: 5
            }
        ],
    },
    {
        itemName: "kurokumaft:hidamageboost_potion",
        effects: [
            {
                effect: MinecraftEffectTypes.Strength,
                duration: 180,
                amplifier: 5
            }
        ],
    },
    {
        itemName: "kurokumaft:hipoison_potion",
        effects: [
            {
                effect: MinecraftEffectTypes.Poison,
                duration: 60,
                amplifier: 5
            }
        ],
    },
    {
        itemName: "kurokumaft:himovespeed_potion",
        effects: [
            {
                effect: MinecraftEffectTypes.Speed,
                duration: 90,
                amplifier: 5
            },
            {
                effect: MinecraftEffectTypes.JumpBoost,
                duration: 90,
                amplifier: 5
            }
        ],
    }

]);

/**
 * ポーション
 */
export class PotionEffect implements ItemCustomComponent {

    onConsume(event:ItemComponentConsumeEvent) {
        const source = event.source as Player;
        const itemStack = event.itemStack as ItemStack;
        const potionItem = PotionObjects.find(obj => obj.itemName === itemStack.typeId) as PotionObject;
        addEffectPotion(source, potionItem);
    }
}

async function addEffectPotion(player: Player, potionItem: PotionObject) {
    const effects = potionItem.effects;
    if (effects.length === 0) {
        player.runCommand("/effect @s clear")
    } else {
        effects.forEach(effectType => {
            player.addEffect(effectType.effect, effectType.duration * TicksPerSecond, {
                amplifier: effectType.amplifier
            });
        });
    
    }
}