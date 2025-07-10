import { ItemComponentConsumeEvent, ItemCustomComponent, ItemStack, Player } from "@minecraft/server";
import { firePotionStrengthUp } from "./FirePotion";
import { icePotionAbsorption } from "./IcePotion";
import { lightningPotionSpeedUp } from "./LightningPotion";
import { stonePotionResistance } from "./StonePotion";
import { waterPotionHealthBoost } from "./WaterPotion";
import { windPotionJumpBoost } from "./WindPotion";

interface MagicPotionObject {
    itemName:string,
    func:CallableFunction
}

const MagicPotionObjects = Object.freeze([
    {
        itemName: "kurokumaft:fire_strengt_potion",
        func: firePotionStrengthUp
    },
    {
        itemName: "kurokumaft:water_healthboost_potion",
        func: waterPotionHealthBoost
    },
    {
        itemName: "kurokumaft:wind_jumpboost_potion",
        func: windPotionJumpBoost
    },
    {
        itemName: "kurokumaft:stone_resistance_potion",
        func: stonePotionResistance
    },
    {
        itemName: "kurokumaft:lightning_speedup_potion",
        func: lightningPotionSpeedUp
    },
    {
        itemName: "kurokumaft:ice_absorption_potion",
        func: icePotionAbsorption
    }

]);

/**
 * 魔法薬
 */
export class MagicPotionDrink implements ItemCustomComponent {

    onConsume(event:ItemComponentConsumeEvent) {
        const itemStack = event.itemStack as ItemStack;
        const player = event.source as Player;
        const nut = MagicPotionObjects.find(obj => obj.itemName == itemStack.typeId) as MagicPotionObject;
        nut.func(player);
    }

}
