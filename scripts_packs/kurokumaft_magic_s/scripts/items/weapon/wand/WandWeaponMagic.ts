import { Entity, EquipmentSlot, GameMode, ItemComponent, ItemComponentHitEntityEvent, ItemComponentTypes, ItemComponentUseEvent, ItemComponentUseOnEvent, ItemCooldownComponent, ItemCustomComponent, ItemStack, Player, world } from "@minecraft/server";
import { throwing } from "../../../custom/ShooterMagicEvent";
import { print, getRandomInRange } from "../../../common/commonUtil";
import { ItemDurabilityDamage } from "../../../common/ItemDurabilityDamage";

interface WandMagicObject {
    itemName:string,
    event:string
    sendMsg:string
}

const WandHitObjects = Object.freeze([
    {
        itemName: "kurokumaft:fire_wand",
        event: "fire/burst_rondo",
        sendMsg: "§cバーストロンド"
    },
    {
        itemName: "kurokumaft:water_wand",
        event: "water/splash",
        sendMsg: "§bスプラッシュ"
    },
    {
        itemName: "kurokumaft:wind_wand",
        event: "wind/wind_edge",
        sendMsg: "§aウィンドエッジ"
    },
    {
        itemName: "kurokumaft:stone_wand",
        event: "stone/sand_blast",
        sendMsg: "§7サンドブラスト"
    },
    {
        itemName: "kurokumaft:lightning_wand",
        event: "lightning/spark",
        sendMsg: "§6スパーク"
    },
    {
        itemName: "kurokumaft:snow_wand",
        event: "ice/powdered_snow",
        sendMsg: "§fパウダースノー"
    },
    {
        itemName: "kurokumaft:dark_wand",
        event: "dark/dark_bread",
        sendMsg: "§8ダークブレード"
    },
    {
        itemName: "kurokumaft:light_wand",
        event: "light/light_bread",
        sendMsg: "§eライトブレード"
    }

]);

const BallMagicObjects = Object.freeze([
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

const WallMagicObjects = Object.freeze([
    {
        itemName: "kurokumaft:fire_wand",
        event: "fire/firewall",
        sendMsg: "§cファイアウォール"
    },
    {
        itemName: "kurokumaft:water_wand",
        event: "water/waterwall",
        sendMsg: "§bウォーターウォール"
    },
    {
        itemName: "kurokumaft:wind_wand",
        event: "wind/windwall",
        sendMsg: "§aウィンドウォール"
    },
    {
        itemName: "kurokumaft:stone_wand",
        event: "stone/stonewall",
        sendMsg: "§7ストーンウォール"
    },
    {
        itemName: "kurokumaft:lightning_wand",
        event: "lightning/lightningwall",
        sendMsg: "§6ライトニングウォール"
    }

]);

const OtherUpMagicObjects = Object.freeze([
    {
        itemName: "kurokumaft:snow_wand",
        event: "ice/deep_snow",
        sendMsg: "§fディープスノー"
    },
    {
        itemName: "kurokumaft:dark_wand",
        event: "dark/absorption",
        sendMsg: "§8アブソープション"
    },
    {
        itemName: "kurokumaft:light_wand",
        event: "light/healing",
        sendMsg: "§eヒーリング"
    }

]);

const OtherDownMagicObjects = Object.freeze([
    {
        itemName: "kurokumaft:snow_wand",
        event: "ice/deep_snow",
        sendMsg: "§fディープスノー"
    },
    {
        itemName: "kurokumaft:dark_wand",
        event: "dark/invisibility",
        sendMsg: "§8インビジブル"
    },
    {
        itemName: "kurokumaft:light_wand",
        event: "light/recovery",
        sendMsg: "§eリカバリー"
    }

]);

/**
 * ワンド系魔法
 */
export class WandWeaponMagic implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {
        let itemStack = event.itemStack as ItemStack;
        let attackEntity = event.attackingEntity as Entity;
        let hitEntity = event.hitEntity as Entity;
        let effect = event.hadEffect as boolean;

        if (!itemStack || (hitEntity instanceof Player && !world.gameRules.pvp)) {
            return;
        }
        let wandMagicObject = WandHitObjects.find(obj => obj.itemName == itemStack.typeId) as WandMagicObject;
        attackEntity.runCommand("/function magic/" + wandMagicObject.event);
        attackEntity.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"text\":\"" + wandMagicObject.sendMsg + "\"}]}");

    }

    // 右クリック
    onUse(event:ItemComponentUseEvent) {
        let itemStack = event.itemStack as ItemStack;
        let player = event.source as Player;

        let xran = parseFloat(getRandomInRange(-0.1, 0.5).toFixed(3));
        let yran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));
        let zran = parseFloat(getRandomInRange(-0.1, 0.1).toFixed(3));

        if (player.getGameMode() != GameMode.creative) {
            ItemDurabilityDamage(player, itemStack, EquipmentSlot.Mainhand);
        }

        // pvp用
        if (world.gameRules.pvp) {
            let ballMagicObject = BallMagicObjects.find(obj => obj.itemName == itemStack.typeId) as WandMagicObject;
            if (ballMagicObject) {
                throwing(player, itemStack, ballMagicObject.event, {x:xran,y:yran,z:zran});
                player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"text\":\"" + ballMagicObject.sendMsg + "\"}]}");
            } else {
                if (player.isSneaking) {
                    let otherDownMagicObject = OtherDownMagicObjects.find(obj => obj.itemName == itemStack.typeId) as WandMagicObject;
                    if (otherDownMagicObject) {
                        player.runCommand("/function magic/" + otherDownMagicObject.event);
                        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"text\":\"" + otherDownMagicObject.sendMsg + "\"}]}");
                    }
                } else {
                    let otherUpMagicObject = OtherUpMagicObjects.find(obj => obj.itemName == itemStack.typeId) as WandMagicObject;
                    if (otherUpMagicObject) {
                        player.runCommand("/function magic/" + otherUpMagicObject.event);
                        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"text\":\"" + otherUpMagicObject.sendMsg + "\"}]}");
                    } 
                }
            }

        } else {
            let ballMagicObject = BallMagicObjects.find(obj => obj.itemName == itemStack.typeId) as WandMagicObject;
            if (ballMagicObject) {
                throwing(player, itemStack, ballMagicObject.event, {x:xran,y:yran,z:zran});
                player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"text\":\"" + ballMagicObject.sendMsg + "\"}]}");
            } else {
                if (player.isSneaking) {
                    let otherDownMagicObject = OtherDownMagicObjects.find(obj => obj.itemName == itemStack.typeId) as WandMagicObject;
                    if (otherDownMagicObject) {
                        player.runCommand("/function magic/" + otherDownMagicObject.event);
                        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"text\":\"" + otherDownMagicObject.sendMsg + "\"}]}");
                    }
                } else {
                    let otherUpMagicObject = OtherUpMagicObjects.find(obj => obj.itemName == itemStack.typeId) as WandMagicObject;
                    if (otherUpMagicObject) {
                        player.runCommand("/function magic/" + otherUpMagicObject.event);
                        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"text\":\"" + otherUpMagicObject.sendMsg + "\"}]}");
                    } 
                }
            }
   
        }
        let cool = itemStack.getComponent(ItemComponentTypes.Cooldown) as ItemCooldownComponent;
        cool.startCooldown(player);
    }

}