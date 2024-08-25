import { ItemCustomComponent, ItemStack, ItemComponentUseEvent, Player, GameMode, EquipmentSlot, ItemComponentUseOnEvent, system } from "@minecraft/server";
import { getRandomInRange, clamp } from "../../common/commonUtil";
import { ItemDurabilityDamageEvent } from "../../common/ItemDurabilityDamage";
import { shooting } from "../../custom/ShooterMagicEvent";

interface BowMagicObject {
    itemName:string,
    event:string
    sendMsg:string,
    maxduration:number,
    addition:number
}

const BowChargeObjects = Object.freeze([
    {
        itemName: "kurokumaft:fire_magic_bow",
        event: "kurokumaft:fire_magic_arrow",
        sendMsg: "§cフレイムアロー",
        maxduration: 30,
        addition: 1.5
    },
    {
        itemName: "kurokumaft:water_magic_bow",
        event: "kurokumaft:water_magic_arrow",
        sendMsg: "§bウォーターアロー",
        maxduration: 10,
        addition: 1.5
    },
    {
        itemName: "kurokumaft:wind_magic_bow",
        event: "kurokumaft:wind_magic_arrow",
        sendMsg: "§aウィンドアロー",
        maxduration: 1,
        addition: 2.5
    },
    {
        itemName: "kurokumaft:stone_magic_bow",
        event: "kurokumaft:stone_magic_arrow",
        sendMsg: "§7ロックアロー",
        maxduration: 20,
        addition: 0.75
    },
    {
        itemName: "kurokumaft:lightning_magic_bow",
        event: "kurokumaft:lightning_magic_arrow",
        sendMsg: "§6ライトニングアロー",
        maxduration: 20,
        addition: 2.0
    },
    {
        itemName: "kurokumaft:ice_magic_bow",
        event: "kurokumaft:ice_magic_arrow",
        sendMsg: "§fアイスアロー",
        maxduration: 15,
        addition: 1.5
    },
    {
        itemName: "kurokumaft:dark_magic_bow",
        event: "kurokumaft:dark_magic_arrow",
        sendMsg: "§8ダークアロー",
        maxduration: 10,
        addition: 1.5
    },
    {
        itemName: "kurokumaft:holly_magic_bow",
        event: "kurokumaft:holly_magic_arrow",
        sendMsg: "§eホーリーアロー",
        maxduration: 10,
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
        player.playAnimation("animation.magic_bow.frame", {
            stopExpression: "!query.is_using_item"
        });
    }

    // ブロッククリック
    onUseOn(event:ItemComponentUseOnEvent) {
    }
}

/**
 * 右クリックリリース後に矢を発射する
 * 
 * @param {Player} player
 * @param {ItemStack} itemStack
 * @param {number} duration
 */
function magicBowShot(player:Player, itemStack:ItemStack, duration:number) {

    player.setDynamicProperty("BowShotMagicCharge", false);

    let bowMagicObject = BowChargeObjects.find(obj => obj.itemName == itemStack.typeId) as BowMagicObject;
    if (bowMagicObject) {

        let xran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
        let yran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
        let zran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));

        let speed = Math.ceil(clamp((-duration) / bowMagicObject.maxduration, 0.0, 3.0) * bowMagicObject.addition);
        if (itemStack.typeId == "kurokumaft:wind_magic_bow") {
            let intervalNum = system.runInterval(() => {
                shooting(player, itemStack, bowMagicObject.event, {x:xran,y:yran,z:zran}, speed);
            }, 2);
            system.runTimeout(() => {
                system.clearRun(intervalNum);
            }, 10);
        } else {
            shooting(player, itemStack, bowMagicObject.event, {x:xran,y:yran,z:zran}, speed);
        }
        if (player.getGameMode() != GameMode.creative) {
            ItemDurabilityDamageEvent(player, itemStack, EquipmentSlot.Mainhand);
        }
    }

}

export {magicBowShot}
