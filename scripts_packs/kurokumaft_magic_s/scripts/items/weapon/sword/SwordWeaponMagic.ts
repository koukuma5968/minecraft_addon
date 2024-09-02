import { ItemCustomComponent, ItemComponentHitEntityEvent, ItemStack, Entity, world, ItemComponentUseEvent, Player, GameMode, EquipmentSlot, ItemComponentTypes, ItemCooldownComponent, ItemComponentUseOnEvent, ItemComponentCompleteUseEvent } from "@minecraft/server";
import { getRandomInRange } from "../../../common/commonUtil";
import { ItemDurabilityDamage } from "../../../common/ItemDurabilityDamage";
import { throwing } from "../../../custom/ShooterMagicEvent";

interface SwordMagicObject {
    itemName:string,
    event:string
    sendMsg:string
}

const SwordHitObjects = Object.freeze([
    {
        itemName: "kurokumaft:fire_magic_sword",
        event: "fire/fire_sword",
        sendMsg: "§cフレイムソード"
    },
    {
        itemName: "kurokumaft:water_magic_sword",
        event: "water/water_sword",
        sendMsg: "§bウォーターソード"
    },
    {
        itemName: "kurokumaft:wind_magic_sword",
        event: "wind/wind_sword",
        sendMsg: "§aウィンドソード"
    },
    {
        itemName: "kurokumaft:stone_magic_sword",
        event: "stone/stone_sword",
        sendMsg: "§7ストーンソード"
    },
    {
        itemName: "kurokumaft:thunder_magic_sword",
        event: "lightning/thunder_sword",
        sendMsg: "§6サンダーソード"
    },
    {
        itemName: "kurokumaft:ice_magic_sword",
        event: "ice/ice_sword",
        sendMsg: "§fアイスソード"
    },
    {
        itemName: "kurokumaft:dark_magic_sword",
        event: "dark/dark_sword",
        sendMsg: "§8ダークソード"
    },
    {
        itemName: "kurokumaft:holly_magic_sword",
        event: "light/holly_sword",
        sendMsg: "§eホーリーソード"
    },
    {
        itemName: "kurokumaft:rainbow_magic_sword",
        event: "rainbow/rainbow_sword",
        sendMsg: "§5レ§1イ§9ン§aボー§eソ§6ー§4ド"
    },
    {
        itemName: "kurokumaft:phoenix_sword",
        event: "fire/fire_sword",
        sendMsg: "§cフレイムソード"
    }
]);

const SwordHitMonsObjects = Object.freeze([
    {
        itemName: "kurokumaft:fire_magic_sword",
        event: "fire/fire_sword",
        sendMsg: "§cフレイムソード"
    },
    {
        itemName: "kurokumaft:water_magic_sword",
        event: "water/water_sword",
        sendMsg: "§bウォーターソード"
    },
    {
        itemName: "kurokumaft:wind_magic_sword",
        event: "wind/wind_sword",
        sendMsg: "§aウィンドソード"
    },
    {
        itemName: "kurokumaft:stone_magic_sword",
        event: "stone/stone_sword",
        sendMsg: "§7ストーンソード"
    },
    {
        itemName: "kurokumaft:thunder_magic_sword",
        event: "lightning/thunder_sword",
        sendMsg: "§6サンダーソード"
    },
    {
        itemName: "kurokumaft:ice_magic_sword",
        event: "ice/ice_sword",
        sendMsg: "§fアイスソード"
    },
    {
        itemName: "kurokumaft:dark_magic_sword",
        event: "dark/dark_sword",
        sendMsg: "§8ダークソード"
    },
    {
        itemName: "kurokumaft:holly_magic_sword",
        event: "light/holly_sword",
        sendMsg: "§eホーリーソード"
    }

]);

const SwordChargeObjects = Object.freeze([
    {
        itemName: "kurokumaft:phoenix_sword",
        event: "fire/blaze_burst",
        sendMsg: "§cブレイズバースト"
    }
]);

/**
 * ソード系魔法
 */
export class SwordWeaponMagic implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {
        let itemStack = event.itemStack as ItemStack;
        let attackEntity = event.attackingEntity as Entity;
        let hitEntity = event.hitEntity as Entity;
        let effect = event.hadEffect as boolean;

        if (!itemStack) {
            return;
        }
        let swordMagicObject = SwordHitObjects.find(obj => obj.itemName == itemStack.typeId) as SwordMagicObject;
        hitEntity.runCommand("/function magic/" + swordMagicObject.event);
        if (attackEntity instanceof Player && attackEntity.getGameMode() != GameMode.creative) {
            ItemDurabilityDamage(attackEntity, itemStack, EquipmentSlot.Mainhand);
        }

    }

    // チャージ完了
    onCompleteUse(event:ItemComponentCompleteUseEvent) {
        let itemStack = event.itemStack as ItemStack;
        let player = event.source as Player;
        if (!itemStack) {
            return;
        }
        let swordChargeMagicObject = SwordChargeObjects.find(obj => obj.itemName == itemStack.typeId) as SwordMagicObject;
        player.runCommand("/function magic/" + swordChargeMagicObject.event);
        if (player.getGameMode() != GameMode.creative) {
            ItemDurabilityDamage(player, itemStack, EquipmentSlot.Mainhand);
        }
    }

}

/**
 * ソード系魔法（モンスター）
 */
export class SwordWeaponMagicMons implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {
        let itemStack = event.itemStack as ItemStack;
        let attackEntity = event.attackingEntity as Entity;
        let hitEntity = event.hitEntity as Entity;
        let effect = event.hadEffect as boolean;

        if (!itemStack) {
            return;
        }
        let swordMagicObject = SwordHitMonsObjects.find(obj => obj.itemName == itemStack.typeId) as SwordMagicObject;
        hitEntity.runCommand("/function monster/" + swordMagicObject.event);
        attackEntity.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"text\":\"" + swordMagicObject.sendMsg + "\"}]}");
        ItemDurabilityDamage(attackEntity, itemStack, EquipmentSlot.Mainhand);

    }

    // 右クリック
    onUse(event:ItemComponentUseEvent) {
        let itemStack = event.itemStack as ItemStack;
        let player = event.source as Player;
    }

    // ブロッククリック
    onUseOn(event:ItemComponentUseOnEvent) {
    }
}