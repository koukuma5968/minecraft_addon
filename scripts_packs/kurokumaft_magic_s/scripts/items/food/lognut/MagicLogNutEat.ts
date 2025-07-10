import { ItemComponentConsumeEvent, ItemCustomComponent, ItemStack, Player } from "@minecraft/server";
import { fireNutStrengthUp } from "./FireLogNut";
import { waterNutHealthBoost } from "./WaterLogNut";
import { windNutJumpBoost } from "./WindLogNut";
import { stoneNutResistance } from "./StoneLogNut";
import { iceNutAbsorption } from "./IceLogNut";
import { lightningNutSpeedUp } from "./LightningLogNut";

interface MagicLogNutObject {
    itemName:string,
    func:CallableFunction
}

const MagicLogNutObjects = Object.freeze([
    {
        itemName: "kurokumaft:fire_log_nut",
        func: fireNutStrengthUp
    },
    {
        itemName: "kurokumaft:water_log_nut",
        func: waterNutHealthBoost
    },
    {
        itemName: "kurokumaft:wind_log_nut",
        func: windNutJumpBoost
    },
    {
        itemName: "kurokumaft:stone_log_nut",
        func: stoneNutResistance
    },
    {
        itemName: "kurokumaft:lightning_log_nut",
        func: lightningNutSpeedUp
    },
    {
        itemName: "kurokumaft:ice_log_nut",
        func: iceNutAbsorption
    }

]);

/**
 * 魔樹の実
 */
export class MagicLogNutEat implements ItemCustomComponent {

    onConsume(event:ItemComponentConsumeEvent) {
        const itemStack = event.itemStack as ItemStack;
        const player = event.source as Player;
        const nut = MagicLogNutObjects.find(obj => obj.itemName == itemStack.typeId) as MagicLogNutObject;
        nut.func(player);
    }

}
