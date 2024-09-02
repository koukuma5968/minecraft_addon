import { Entity, EquipmentSlot, GameMode, ItemComponent, ItemComponentHitEntityEvent, ItemComponentTypes, ItemComponentUseEvent, ItemComponentUseOnEvent, ItemCooldownComponent, ItemCustomComponent, ItemStack, Player, system, world } from "@minecraft/server";
import { shooting, throwing } from "../../../custom/ShooterMagicEvent";
import { print, getRandomInRange, clamp } from "../../../common/commonUtil";
import { ItemDurabilityDamage } from "../../../common/ItemDurabilityDamage";
import { aquaShot, tidalWave } from "./WaterCurrentMagic";
import { atmosphere } from "./AtmosphereMagic";
import { gravityField } from "./EarthMagic";
import { lightningStrike } from "./LightningStrikeMagic";
import { blackHole } from "./JetBlackMagic";
import { hollyField } from "./SparkleMagic";

interface StickMagicObject {
    itemName:string,
    event:string
    sendMsg:string,
    addition:number,
    func: any
}

const StickHitObjects = Object.freeze([
    {
        itemName: "kurokumaft:blaze_stick",
        event: "fire/flame_shock",
        sendMsg: "§cフレイムショック"
    },
    {
        itemName: "kurokumaft:watercurrent_stick",
        event: "water/splash",
        sendMsg: "§bスプラッシュ"
    },
    {
        itemName: "kurokumaft:atmosphere_stick",
        event: "wind/storm_shock",
        sendMsg: "§aストームショック"
    },
    {
        itemName: "kurokumaft:earth_stick",
        event: "stone/earth_shock",
        sendMsg: "§7アースショック"
    },
    {
        itemName: "kurokumaft:lightningstrike_stick",
        event: "lightning/spark_shock",
        sendMsg: "§6スパークショック"
    },
    {
        itemName: "kurokumaft:blockice_stick",
        event: "ice/powdered_snow",
        sendMsg: "§fアイスショック"
    },
    {
        itemName: "kurokumaft:jetblack_stick",
        event: "dark/jetblack_shock",
        sendMsg: "§8ジェットブラック"
    },
    {
        itemName: "kurokumaft:sparkle_stick",
        event: "light/sparkle_light",
        sendMsg: "§eスパークルライト"
    }

]);

const StickShotMagicObjects = Object.freeze([
    {
        itemName: "kurokumaft:blaze_stick",
        event: "kurokumaft:valleleflairmagic",
        sendMsg: "§cヴァルフレア",
        addition: 2
    },
    {
        itemName: "kurokumaft:atmosphere_stick",
        event: "kurokumaft:storm_cutter_magic",
        sendMsg: "§aストームカッター",
        addition: 5
    },
    {
        itemName: "kurokumaft:earth_stick",
        event: "kurokumaft:stone_edge_magic",
        sendMsg: "§7ストーンエッジ",
        addition: 2
    },
    {
        itemName: "kurokumaft:lightningstrike_stick",
        event: "kurokumaft:thunder_lance_magic",
        sendMsg: "§6サンダーランス",
        addition: 6
    },
    {
        itemName: "kurokumaft:blockice_stick",
        event: "kurokumaft:ice_lance_magic",
        sendMsg: "§fアイスランス",
        addition: 4
    },
    {
        itemName: "kurokumaft:jetblack_stick",
        event: "kurokumaft:dark_lance_magic",
        sendMsg: "§8ダークランス",
        addition: 4
    },
    {
        itemName: "kurokumaft:sparkle_stick",
        event: "kurokumaft:holly_lance_magic",
        sendMsg: "§eホーリーランス",
        addition: 4
    }

]);

const StickRightOneMagicObjects = Object.freeze([
    {
        itemName: "kurokumaft:watercurrent_stick",
        func: aquaShot,
        sendMsg: "§bアクアショット"
    }

]);

const StickRightEventMagicObjects = Object.freeze([
    {
        itemName: "kurokumaft:blaze_stick",
        event: "fire/blastbomb",
        sendMsg: "§cブラストボム"
    },
    {
        itemName: "kurokumaft:blockice_stick",
        event: "ice/ice_block",
        sendMsg: "§fアイスブロック"
    }

]);

const StickRightFuncMagicObjects = Object.freeze([
    {
        itemName: "kurokumaft:watercurrent_stick",
        func: tidalWave,
        sendMsg: "§bタイダルウェイブ"
    },
    {
        itemName: "kurokumaft:atmosphere_stick",
        func: atmosphere,
        sendMsg: "§aアトモスフィア"
    },
    {
        itemName: "kurokumaft:earth_stick",
        func: gravityField,
        sendMsg: "§7グラビティフィールド"
    },
    {
        itemName: "kurokumaft:lightningstrike_stick",
        func: lightningStrike,
        sendMsg: "§6ライトニングストライク"
    },
    {
        itemName: "kurokumaft:jetblack_stick",
        func: blackHole,
        sendMsg: "§8ブラックホール"
    },
    {
        itemName: "kurokumaft:sparkle_stick",
        func: hollyField,
        sendMsg: "§eホーリーフィールド"
    }

]);

/**
 * スティック系魔法
 */
export class StickWeaponMagic implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {
        let itemStack = event.itemStack as ItemStack;
        let attackEntity = event.attackingEntity as Entity;
        let hitEntity = event.hitEntity as Entity;
        let effect = event.hadEffect as boolean;

        if (!itemStack || (hitEntity instanceof Player && !world.gameRules.pvp)) {
            return;
        }
        let wandMagicObject = StickHitObjects.find(obj => obj.itemName == itemStack.typeId) as StickMagicObject;
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
                let stickEventMagicObject = StickRightEventMagicObjects.find(obj => obj.itemName == itemStack.typeId) as StickMagicObject;
                if (stickEventMagicObject) {
                    player.runCommand("/function magic/" + stickEventMagicObject.event);
                    player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"text\":\"" + stickEventMagicObject.sendMsg + "\"}]}");
                }
                let stickFuncMagicObject = StickRightFuncMagicObjects.find(obj => obj.itemName == itemStack.typeId) as StickMagicObject;
                if (stickFuncMagicObject) {
                    player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"text\":\"" + stickFuncMagicObject.sendMsg + "\"}]}");
                    stickFuncMagicObject.func(player);
                }
            } else {
                let stickShotMagicObject = StickShotMagicObjects.find(obj => obj.itemName == itemStack.typeId) as StickMagicObject;
                if (stickShotMagicObject) {
                    let xran = parseFloat(getRandomInRange(-0.1, 0.5).toFixed(3));
                    let yran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
                    let zran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));

                    if (itemStack.typeId == "kurokumaft:atmosphere_stick") {
                        let intervalNum = system.runInterval(() => {
                            xran = parseFloat(getRandomInRange(-0.5, 0.5).toFixed(3));
                            yran = parseFloat(getRandomInRange(-0.5, 0.5).toFixed(3));
                            zran = parseFloat(getRandomInRange(-0.5, 0.5).toFixed(3));
        
                            shooting(player, stickShotMagicObject.event, {x:xran,y:yran,z:zran}, stickShotMagicObject.addition, undefined);
                        }, 4);
                        system.runTimeout(() => {
                            system.clearRun(intervalNum);
                        }, 16);
                    } else {
                        shooting(player, stickShotMagicObject.event, {x:xran,y:yran,z:zran}, stickShotMagicObject.addition, undefined);
                    }
                    player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"text\":\"" + stickShotMagicObject.sendMsg + "\"}]}");
                }
                let stickRightOneMagicObject = StickRightOneMagicObjects.find(obj => obj.itemName == itemStack.typeId) as StickMagicObject;
                if (stickRightOneMagicObject) {
                    player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"text\":\"" + stickRightOneMagicObject.sendMsg + "\"}]}");
                    stickRightOneMagicObject.func(player);
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