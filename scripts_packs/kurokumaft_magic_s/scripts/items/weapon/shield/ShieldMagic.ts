import { Entity, ItemComponent, ItemComponentBeforeDurabilityDamageEvent, ItemComponentHitEntityEvent, ItemComponentTypes, ItemComponentUseEvent, ItemCooldownComponent, ItemCustomComponent, ItemStack, Player } from "@minecraft/server";
import { throwing } from "../../../custom/ShooterMagicEvent";
import { print, getRandomInRange } from "../../../common/commonUtil";
import { ItemDurabilityDamage } from "../../../common/ItemDurabilityDamage";

interface ShieldMagicObject {
    itemName:string,
    event:string
    sendMsg:string
}

const ShieldMagicObjects = Object.freeze([
    {
        itemName: "kurokumaft:fire_wand",
        event: "kurokumaft:fireballmagic",
        sendMsg: "§cファイヤーボール"
    },
    {
        itemName: "kurokumaft:water_wand",
        event: "kurokumaft:waterballmagic",
        sendMsg: "§bウォーターボール"
    },
    {
        itemName: "kurokumaft:wind_wand",
        event: "kurokumaft:windcuttermagic",
        sendMsg: "§aウィンドカッター"
    },
    {
        itemName: "kurokumaft:stone_wand",
        event: "kurokumaft:stonebarrettemagic",
        sendMsg: "§7ストーンバレット"
    },
    {
        itemName: "kurokumaft:lightning_wand",
        event: "kurokumaft:lightningboltmagic",
        sendMsg: "§6ライトニングボルト"
    }

]);

/**
 * シールド
 */
export class ShieldMagic implements ItemCustomComponent {

    // 通常攻撃
    onBeforeDurabilityDamage(event:ItemComponentBeforeDurabilityDamageEvent) {
        print("onBeforeDurabilityDamage");
        let attackEntity = event.attackingEntity as Entity;
        let damage = event.durabilityDamage as number;
        let itemStack = event.itemStack as ItemStack;
        let hitEntity = event.hitEntity as Entity;

    }

}