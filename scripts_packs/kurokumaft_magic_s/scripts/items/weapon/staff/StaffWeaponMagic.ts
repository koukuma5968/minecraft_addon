import { Entity, EquipmentSlot, GameMode, ItemComponent, ItemComponentHitEntityEvent, ItemComponentTypes, ItemComponentUseEvent, ItemComponentUseOnEvent, ItemCooldownComponent, ItemCustomComponent, ItemStack, Player, system, world } from "@minecraft/server";
import { shooting, throwing } from "../../../common/ShooterMagicEvent";
import { print, getRandomInRange, clamp } from "../../../common/commonUtil";
import { ItemDurabilityDamage } from "../../../common/ItemDurabilityDamage";
import { bramFang, fireStorm } from "./FirestormMagic";
import { explosion, megaBrand } from "./ExplosionMagic";
import { digVault, flameSpark } from "./FlameSparkMagic";
import { mailstrom, sonicSlicer } from "./MailstromMagic";

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
        func: megaBrand,
        sendMsg: "magic.kurokumaft:megaBrand.translate"
    },
    {
        itemName: "kurokumaft:firestorm_staff",
        func: bramFang,
        sendMsg: "magic.kurokumaft:bramFang.translate"
    },
    {
        itemName: "kurokumaft:flamespark_staff",
        func: digVault,
        sendMsg: "magic.kurokumaft:digVault.translate"
    },
    {
        itemName: "kurokumaft:mailstrom_staff",
        func: sonicSlicer,
        sendMsg: "magic.kurokumaft:sonicSlicer.translate"
    }

]);

const StaffRightOneMagicObjects = Object.freeze([
    {
        itemName: "kurokumaft:firestorm_staff",
        func: fireStorm,
        sendMsg: "magic.kurokumaft:fireStorm.translate"
    },
    {
        itemName: "kurokumaft:explosion_staff",
        func: explosion,
        sendMsg: "magic.kurokumaft:explosion.translate"
    },
    {
        itemName: "kurokumaft:flamespark_staff",
        func: flameSpark,
        sendMsg: "magic.kurokumaft:flameSpark.translate"
    },
    {
        itemName: "kurokumaft:mailstrom_staff",
        func: mailstrom,
        sendMsg: "magic.kurokumaft:mailstrom.translate"
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

        if (!itemStack) {
            return;
        }
        let staffMagicObject = StaffHitObjects.find(obj => obj.itemName == itemStack.typeId) as StaffMagicObject;
        staffMagicObject.func(attackEntity);
        attackEntity.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"" + staffMagicObject.sendMsg + "\"}]}");

    }

    // 右クリック
    onUse(event:ItemComponentUseEvent) {
        let itemStack = event.itemStack as ItemStack;
        let player = event.source as Player;

        let staffRightOneMagicObject = StaffRightOneMagicObjects.find(obj => obj.itemName == itemStack.typeId) as StaffMagicObject;
        if (staffRightOneMagicObject) {
            player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"" + staffRightOneMagicObject.sendMsg + "\"}]}");
            staffRightOneMagicObject.func(player);
        }

        ItemDurabilityDamage(player, itemStack, EquipmentSlot.Mainhand);

        let cool = itemStack.getComponent(ItemComponentTypes.Cooldown) as ItemCooldownComponent;
        cool.startCooldown(player);

    }

    // ブロッククリック
    onUseOn(event:ItemComponentUseOnEvent) {
    }
}