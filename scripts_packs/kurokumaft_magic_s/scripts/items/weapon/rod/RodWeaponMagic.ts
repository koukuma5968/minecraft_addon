import { Entity, EquipmentSlot, GameMode, ItemComponent, ItemComponentHitEntityEvent, ItemComponentTypes, ItemComponentUseEvent, ItemComponentUseOnEvent, ItemCooldownComponent, ItemCustomComponent, ItemStack, Player, system, world } from "@minecraft/server";
import { shooting, throwing } from "../../../custom/ShooterMagicEvent";
import { print, getRandomInRange, clamp } from "../../../common/commonUtil";
import { ItemDurabilityDamage } from "../../../common/ItemDurabilityDamage";
import { burstflare, flarecircle } from "./FlameMagic";
import { waterjail, waterwave } from "./WaterWaveMagic";
import { aerobomb, storm } from "./StormMagic";
import { greybomb, rockbreak } from "./RockMagic";
import { thunderclap, thunderjail } from "./ThunderclapMagic";
import { freezConclusion } from "./FreezeMagic";
import { brushash, summonSkeleton } from "./DarknessMagic";
import { areaheel, summonGolem } from "./BrightnessMagic";

interface RodMagicObject {
    itemName:string,
    event:string
    sendMsg:string,
    addition:number,
    func: any
}

const RodHitObjects = Object.freeze([
    {
        itemName: "kurokumaft:flame_rod",
        event: "fire/bumrod",
        sendMsg: "§cバムロッド"
    },
    {
        itemName: "kurokumaft:waterwave_rod",
        event: "water/watercutter",
        sendMsg: "§bウォータカッター"
    },
    {
        itemName: "kurokumaft:storm_rod",
        event: "wind/storm_bread",
        sendMsg: "§aストームブレード"
    },
    {
        itemName: "kurokumaft:rock_rod",
        event: "stone/stone_bread",
        sendMsg: "§7ストーンブレード"
    },
    {
        itemName: "kurokumaft:thunderclap_rod",
        event: "lightning/lightning_bread",
        sendMsg: "§6ライトニングブレード"
    },
    {
        itemName: "kurokumaft:freeze_rod",
        event: "ice/ice_bread",
        sendMsg: "§fアイスブレード"
    },
    {
        itemName: "kurokumaft:darkness_rod",
        event: "dark/dark_fang",
        sendMsg: "§8ダークファング"
    },
    {
        itemName: "kurokumaft:brightness_rod",
        event: "light/light_fang",
        sendMsg: "§eライトファング"
    }

]);

const RodShotMagicObjects = Object.freeze([
    {
        itemName: "kurokumaft:freeze_rod",
        event: "kurokumaft:ice_barrette_magic",
        sendMsg: "§fアイスバレット",
        addition: 4
    }

]);

const RodRightOneMagicObjects = Object.freeze([
    {
        itemName: "kurokumaft:flame_rod",
        func: flarecircle,
        sendMsg: "§cフレイムサークル"
    },
    {
        itemName: "kurokumaft:waterwave_rod",
        func: waterwave,
        sendMsg: "§bウォーターウェーブ"
    },
    {
        itemName: "kurokumaft:storm_rod",
        func: storm,
        sendMsg: "§aストーム"
    },
    {
        itemName: "kurokumaft:rock_rod",
        func: rockbreak,
        sendMsg: "§7ロックブレイク"
    },
    {
        itemName: "kurokumaft:thunderclap_rod",
        func: thunderclap,
        sendMsg: "§6サンダークラップ"
    },
    {
        itemName: "kurokumaft:darkness_rod",
        func: brushash,
        sendMsg: "§8ブラストアッシュ"
    },
    {
        itemName: "kurokumaft:brightness_rod",
        func: areaheel,
        sendMsg: "§eエリアヒール"
    }

]);

const RodRightFuncMagicObjects = Object.freeze([
    {
        itemName: "kurokumaft:flame_rod",
        func: burstflare,
        sendMsg: "§cバーストフレア"
    },
    {
        itemName: "kurokumaft:waterwave_rod",
        func: waterjail,
        sendMsg: "§bウォータジェイル"
    },
    {
        itemName: "kurokumaft:storm_rod",
        func: aerobomb,
        sendMsg: "§aエアロボム"
    },
    {
        itemName: "kurokumaft:rock_rod",
        func: greybomb,
        sendMsg: "§7グレイボム"
    },
    {
        itemName: "kurokumaft:thunderclap_rod",
        func: thunderjail,
        sendMsg: "§6サンダージェイル"
    },
    {
        itemName: "kurokumaft:freeze_rod",
        func: freezConclusion,
        sendMsg: "§fフリーズコフィン"
    },
    {
        itemName: "kurokumaft:darkness_rod",
        func: summonSkeleton,
        sendMsg: "§8ダークスケルトン召喚"
    },
    {
        itemName: "kurokumaft:brightness_rod",
        func: summonGolem,
        sendMsg: "§eブライトゴーレム召喚"
    }

]);

/**
 * ロッド系魔法
 */
export class RodWeaponMagic implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {
        let itemStack = event.itemStack as ItemStack;
        let attackEntity = event.attackingEntity as Entity;
        let hitEntity = event.hitEntity as Entity;
        let effect = event.hadEffect as boolean;

        if (!itemStack || (hitEntity instanceof Player && !world.gameRules.pvp)) {
            return;
        }
        let wandMagicObject = RodHitObjects.find(obj => obj.itemName == itemStack.typeId) as RodMagicObject;
        attackEntity.runCommand("/function magic/" + wandMagicObject.event);
        attackEntity.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"text\":\"" + wandMagicObject.sendMsg + "\"}]}");

    }

    // 右クリック
    onUse(event:ItemComponentUseEvent) {
        let itemStack = event.itemStack as ItemStack;
        let player = event.source as Player;

        // pvp用
        if (world.gameRules.pvp) {
            if (player.isSneaking) {
                let rodFuncMagicObject = RodRightFuncMagicObjects.find(obj => obj.itemName == itemStack.typeId) as RodMagicObject;
                if (rodFuncMagicObject) {
                    player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"text\":\"" + rodFuncMagicObject.sendMsg + "\"}]}");
                    rodFuncMagicObject.func(player);
                }
            } else {
                let rodShotMagicObject = RodShotMagicObjects.find(obj => obj.itemName == itemStack.typeId) as RodMagicObject;
                if (rodShotMagicObject) {
                    let xran = parseFloat(getRandomInRange(-0.1, 0.5).toFixed(3));
                    let yran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
                    let zran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));

                    shooting(player, rodShotMagicObject.event, {x:xran,y:yran,z:zran}, rodShotMagicObject.addition, undefined);
                    player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"text\":\"" + rodShotMagicObject.sendMsg + "\"}]}");
                }
                let rodRightOneMagicObject = RodRightOneMagicObjects.find(obj => obj.itemName == itemStack.typeId) as RodMagicObject;
                if (rodRightOneMagicObject) {
                    player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"text\":\"" + rodRightOneMagicObject.sendMsg + "\"}]}");
                    rodRightOneMagicObject.func(player);
                }
            }
        } else {
        }

        if (player.getGameMode() != GameMode.creative) {
            ItemDurabilityDamage(player, itemStack, EquipmentSlot.Mainhand);
        }

        let cool = itemStack.getComponent(ItemComponentTypes.Cooldown) as ItemCooldownComponent;
        cool.startCooldown(player);

    }

    // ブロッククリック
    onUseOn(event:ItemComponentUseOnEvent) {
    }
}