import { Entity, EquipmentSlot, GameMode, ItemComponent, ItemComponentHitEntityEvent, ItemComponentTypes, ItemComponentUseEvent, ItemComponentUseOnEvent, ItemCooldownComponent, ItemCustomComponent, ItemStack, Player, system, world } from "@minecraft/server";
import { shooting, throwing } from "../../../custom/ShooterMagicEvent";
import { print, getRandomInRange, clamp } from "../../../common/commonUtil";
import { ItemDurabilityDamage } from "../../../common/ItemDurabilityDamage";
import { bramFang } from "./FirestormMagic";
import { explosion } from "./ExplosionMagic";
import { flameSpark } from "./FlameSparkMagic";
import { mailstrom } from "./MailstromMagic";

interface StaffMagicObject {
    itemName:string,
    event:string
    sendMsg:string,
    addition:number,
    func: any
}

const StaffHitObjects = Object.freeze([
    {
        itemName: "kurokumaft:explosion_staff",
        event: "fire/mega_brand",
        sendMsg: "§7メガ・ブランド"
    },
    {
        itemName: "kurokumaft:firestorm_staff",
        func: bramFang,
        sendMsg: "§aブラム・ファング"
    },
    {
        itemName: "kurokumaft:flamespark_staff",
        event: "lightning/dig_vault",
        sendMsg: "§6ディグ・ヴォルト"
    },
    {
        itemName: "kurokumaft:mailstrom_staff",
        event: "wind/sonic_slicer",
        sendMsg: "§aソニックスライサー"
    }

]);

const StaffRightOneMagicObjects = Object.freeze([
    {
        itemName: "kurokumaft:firestorm_staff",
        func: flameSpark,
        sendMsg: "§cファイアストーム"
    },
    {
        itemName: "kurokumaft:explosion_staff",
        func: explosion,
        sendMsg: "§cエクスプロージョン"
    },
    {
        itemName: "kurokumaft:flamespark_staff",
        func: flameSpark,
        sendMsg: "§6フレイムスパーク"
    },
    {
        itemName: "kurokumaft:mailstrom_staff",
        func: mailstrom,
        sendMsg: "§bメイルシュトローム"
    }

]);
/**
 * スタッフ系魔法
 */
export class StaffWeaponMagic implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {
        let itemStack = event.itemStack as ItemStack;
        let attackEntity = event.attackingEntity as Entity;
        let hitEntity = event.hitEntity as Entity;
        let effect = event.hadEffect as boolean;

        if (!itemStack || (hitEntity instanceof Player && !world.gameRules.pvp)) {
            return;
        }
        let staffMagicObject = StaffHitObjects.find(obj => obj.itemName == itemStack.typeId) as StaffMagicObject;
        if (staffMagicObject.event) {
            attackEntity.runCommand("/function magic/" + staffMagicObject.event);
        } else {
            staffMagicObject.func(attackEntity);
        }
        attackEntity.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"text\":\"" + staffMagicObject.sendMsg + "\"}]}");

    }

    // 右クリック
    onUse(event:ItemComponentUseEvent) {
        let itemStack = event.itemStack as ItemStack;
        let player = event.source as Player;

        // pvp用
        if (world.gameRules.pvp) {
            let staffRightOneMagicObject = StaffRightOneMagicObjects.find(obj => obj.itemName == itemStack.typeId) as StaffMagicObject;
            if (staffRightOneMagicObject) {
                player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"text\":\"" + staffRightOneMagicObject.sendMsg + "\"}]}");
                staffRightOneMagicObject.func(player);
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