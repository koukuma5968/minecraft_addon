import { ItemCustomComponent, ItemStack, ItemComponentUseEvent, Player, EquipmentSlot, Entity, world, TicksPerSecond } from "@minecraft/server";
import { clamp } from "../../../common/MagicCommonUtil";
import { itemDurabilityDamage } from "../../../common/MagicItemDurabilityDamage";
import { shooting } from "../../../common/MagicShooterMagicEvent";
import { fireArrow } from "./FireArrowMagic";
import { waterArrow, waterArrowHoming } from "./WaterArrowMagic";
import { windArrow, windArrowShot } from "./WindArrowMagic";
import { stoneArrow } from "./StoneArrowMagic";
import { lightningArrow } from "./LightningArrowMagic";
import { iceArrow } from "./IceArrowMagic";
import { darkArrow } from "./DarkArrowMagic";
import { hollyArrow } from "./HollyArrowMagic";

interface BowMagicObject {
    itemName:string,
    event:string
    sendMsg:string,
    func:any,
    maxduration:number,
    addition:number
}

const BowChargeObjects = Object.freeze([
    {
        itemName: "kurokumaft:fire_magic_bow",
        event: "kurokumaft:fire_magic_arrow",
        sendMsg: "entity.kurokumaft:fire_magic_arrow.name",
        maxduration: 1000,
        addition: 1.0
    },
    {
        itemName: "kurokumaft:water_magic_bow",
        event: "kurokumaft:water_magic_arrow",
        sendMsg: "entity.kurokumaft:water_magic_arrow.name",
        maxduration: 1000,
        addition: 1.5
    },
    {
        itemName: "kurokumaft:wind_magic_bow",
        event: "kurokumaft:wind_magic_arrow",
        sendMsg: "entity.kurokumaft:wind_magic_arrow.name",
        maxduration: 5000,
        addition: 2.0
    },
    {
        itemName: "kurokumaft:stone_magic_bow",
        event: "kurokumaft:stone_magic_arrow",
        sendMsg: "entity.kurokumaft:stone_magic_arrow.name",
        maxduration: 1000,
        addition: 0.75
    },
    {
        itemName: "kurokumaft:lightning_magic_bow",
        event: "kurokumaft:lightning_magic_arrow",
        sendMsg: "entity.kurokumaft:lightning_magic_arrow.name",
        maxduration: 1000,
        addition: 2.0
    },
    {
        itemName: "kurokumaft:ice_magic_bow",
        event: "kurokumaft:ice_magic_arrow",
        sendMsg: "entity.kurokumaft:ice_magic_arrow.name",
        maxduration: 1000,
        addition: 1.5
    },
    {
        itemName: "kurokumaft:dark_magic_bow",
        event: "kurokumaft:dark_magic_arrow",
        sendMsg: "entity.kurokumaft:dark_magic_arrow.name",
        maxduration: 1000,
        addition: 1.5
    },
    {
        itemName: "kurokumaft:holly_magic_bow",
        event: "kurokumaft:holly_magic_arrow",
        sendMsg: "entity.kurokumaft:holly_magic_arrow.name",
        maxduration: 1000,
        addition: 1.5
    }
]);

/**
 * 弓系魔法
 */
export class BowShotMagic implements ItemCustomComponent {

    // 右クリック
    onUse(event:ItemComponentUseEvent) {
        let itemStack = event.itemStack as ItemStack;
        let player = event.source as Player;

        if (!itemStack) {
            return;
        }
        player.setDynamicProperty("BowShotMagicCharge", true);
    }

}

/**
 * 右クリックリリース後に矢を発射する
 * 
 * @param {Player} player
 * @param {ItemStack} itemStack
 * @param {number} duration
 */
async function magicBowShot(player:Player, itemStack:ItemStack, duration:number) {

    player.setDynamicProperty("BowShotMagicCharge", false);

    let bowMagicObject = BowChargeObjects.find(obj => obj.itemName == itemStack.typeId) as BowMagicObject;
    if (bowMagicObject) {
        let speed = Math.ceil(clamp((bowMagicObject.maxduration - duration/TicksPerSecond), 0.0, 5.0) * bowMagicObject.addition);
        if (itemStack.typeId == "kurokumaft:wind_magic_bow") {
            windArrowShot(player, bowMagicObject.event, 2, speed);
        } else if (itemStack.typeId == "kurokumaft:water_magic_bow") {
            waterArrowHoming(player, bowMagicObject.event, 0, speed);
        } else {
            shooting(player, bowMagicObject.event, 0, speed, undefined);
        }
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"" + bowMagicObject.sendMsg + "\"}]}");
        itemDurabilityDamage(player, itemStack, EquipmentSlot.Mainhand);
    }

}

const BowCProjectilehargeObjects = Object.freeze([
    {
        itemName: "kurokumaft:fire_magic_arrow",
        func: fireArrow
    },
    {
        itemName: "kurokumaft:water_magic_arrow",
        func: waterArrow
    },
    {
        itemName: "kurokumaft:wind_magic_arrow",
        func: windArrow
    },
    {
        itemName: "kurokumaft:stone_magic_arrow",
        func: stoneArrow
    },
    {
        itemName: "kurokumaft:lightning_magic_arrow",
        func: lightningArrow
    },
    {
        itemName: "kurokumaft:ice_magic_arrow",
        func: iceArrow
    },
    {
        itemName: "kurokumaft:dark_magic_arrow",
        func: darkArrow
    },
    {
        itemName: "kurokumaft:holly_magic_arrow",
        func: hollyArrow
    }
]);

export function checkArrowProjectile(projectileName:string) {
    return BowCProjectilehargeObjects.some(obj => obj.itemName == projectileName);
}

export function hitArrowEvent(projectile:Entity, target:Entity) {
    let proje = BowCProjectilehargeObjects.find(obj => obj.itemName == projectile.typeId) as BowMagicObject;
    try {
        proje.func(target);
    } catch (error) {
    }
}

export {magicBowShot}
