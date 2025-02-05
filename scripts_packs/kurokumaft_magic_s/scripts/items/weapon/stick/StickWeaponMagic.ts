import { Entity, EquipmentSlot, ItemComponentHitEntityEvent, ItemComponentTypes, ItemComponentUseEvent, ItemCooldownComponent, ItemCustomComponent, ItemStack, Player, system, world } from "@minecraft/server";
import { shooting } from "../../../common/ShooterMagicEvent";
import { itemDurabilityDamage } from "../../../common/ItemDurabilityDamage";
import { aquaShock, aquaShot, tidalWave } from "./WaterCurrentMagic";
import { atmosphere, stormShock } from "./AtmosphereMagic";
import { earthShock, gravityField } from "./EarthMagic";
import { lightningStrike, sparkShock } from "./LightningStrikeMagic";
import { blackHole, jetblackShock } from "./JetBlackMagic";
import { hollyField, sparkleShock } from "./SparkleMagic";
import { blastbomb, flameShock } from "./BlazeMagic";
import { iceBlock, iceShock } from "./BlockiceMagic";

interface StickFuncMagicObject {
    itemName:string,
    sendMsg:string,
    func: CallableFunction
}

interface StickMagicObject {
    itemName:string,
    event:string
    sendMsg:string,
    addition:number
}

const StickHitObjects = Object.freeze([
    {
        itemName: "kurokumaft:blaze_stick",
        func: flameShock,
        sendMsg: "magic.kurokumaft:flameShock.translate"
    },
    {
        itemName: "kurokumaft:watercurrent_stick",
        func: aquaShock,
        sendMsg: "magic.kurokumaft:aquaShock.translate"
    },
    {
        itemName: "kurokumaft:atmosphere_stick",
        func: stormShock,
        sendMsg: "magic.kurokumaft:stormShock.translate"
    },
    {
        itemName: "kurokumaft:earth_stick",
        func: earthShock,
        sendMsg: "magic.kurokumaft:earthShock.translate"
    },
    {
        itemName: "kurokumaft:lightningstrike_stick",
        func: sparkShock,
        sendMsg: "magic.kurokumaft:sparkShock.translate"
    },
    {
        itemName: "kurokumaft:blockice_stick",
        func: iceShock,
        sendMsg: "magic.kurokumaft:iceShock.translate"
    },
    {
        itemName: "kurokumaft:jetblack_stick",
        func: jetblackShock,
        sendMsg: "magic.kurokumaft:jetblackShock.translate"
    },
    {
        itemName: "kurokumaft:sparkle_stick",
        func: sparkleShock,
        sendMsg: "magic.kurokumaft:sparkleShock.translate"
    }

]);

const StickShotMagicObjects = Object.freeze([
    {
        itemName: "kurokumaft:blaze_stick",
        event: "kurokumaft:valleleflairmagic",
        sendMsg: "magic.kurokumaft:valleleflair.translate",
        addition: 5
    },
    {
        itemName: "kurokumaft:atmosphere_stick",
        event: "kurokumaft:storm_cutter_magic",
        sendMsg: "magic.kurokumaft:storm_cutter.translate",
        addition: 6
    },
    {
        itemName: "kurokumaft:earth_stick",
        event: "kurokumaft:stone_edge_magic",
        sendMsg: "magic.kurokumaft:stone_edge.translate",
        addition: 4
    },
    {
        itemName: "kurokumaft:lightningstrike_stick",
        event: "kurokumaft:thunder_lance_magic",
        sendMsg: "magic.kurokumaft:thunder_lance.translate",
        addition: 7
    },
    {
        itemName: "kurokumaft:blockice_stick",
        event: "kurokumaft:ice_lance_magic",
        sendMsg: "magic.kurokumaft:ice_lance.translate",
        addition: 6
    },
    {
        itemName: "kurokumaft:jetblack_stick",
        event: "kurokumaft:dark_lance_magic",
        sendMsg: "magic.kurokumaft:dark_lance.translate",
        addition: 5
    },
    {
        itemName: "kurokumaft:sparkle_stick",
        event: "kurokumaft:holly_lance_magic",
        sendMsg: "magic.kurokumaft:holly_lance.translate",
        addition: 5
    }

]);

const StickRightOneMagicObjects = Object.freeze([
    {
        itemName: "kurokumaft:watercurrent_stick",
        func: aquaShot,
        sendMsg: "magic.kurokumaft:aquaShot.translate"
    }

]);

const StickRightFuncMagicObjects = Object.freeze([
    {
        itemName: "kurokumaft:blaze_stick",
        func: blastbomb,
        sendMsg: "magic.kurokumaft:blastbomb.translate"
    },
    {
        itemName: "kurokumaft:watercurrent_stick",
        func: tidalWave,
        sendMsg: "magic.kurokumaft:tidalWave.translate"
    },
    {
        itemName: "kurokumaft:atmosphere_stick",
        func: atmosphere,
        sendMsg: "magic.kurokumaft:atmosphere.translate"
    },
    {
        itemName: "kurokumaft:earth_stick",
        func: gravityField,
        sendMsg: "magic.kurokumaft:gravityField.translate"
    },
    {
        itemName: "kurokumaft:lightningstrike_stick",
        func: lightningStrike,
        sendMsg: "magic.kurokumaft:lightningStrike.translate"
    },
    {
        itemName: "kurokumaft:blockice_stick",
        func: iceBlock,
        sendMsg: "magic.kurokumaft:iceBlock.translate"
    },
    {
        itemName: "kurokumaft:jetblack_stick",
        func: blackHole,
        sendMsg: "magic.kurokumaft:blackHole.translate"
    },
    {
        itemName: "kurokumaft:sparkle_stick",
        func: hollyField,
        sendMsg: "magic.kurokumaft:hollyField.translate"
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
        let stickMagicObject = StickHitObjects.find(obj => obj.itemName == itemStack.typeId) as StickFuncMagicObject;
        stickMagicObject.func(attackEntity, hitEntity);
        attackEntity.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"" + stickMagicObject.sendMsg + "\"}]}");

    }

    // 右クリック
    onUse(event:ItemComponentUseEvent) {
        let itemStack = event.itemStack as ItemStack;
        let player = event.source as Player;

        if (player.isSneaking) {
            let stickFuncMagicObject = StickRightFuncMagicObjects.find(obj => obj.itemName == itemStack.typeId) as StickFuncMagicObject;
            if (stickFuncMagicObject) {
                player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"" + stickFuncMagicObject.sendMsg + "\"}]}");
                stickFuncMagicObject.func(player);
            }
        } else {
            let stickShotMagicObject = StickShotMagicObjects.find(obj => obj.itemName == itemStack.typeId) as StickMagicObject;
            if (stickShotMagicObject) {

                if (itemStack.typeId == "kurokumaft:atmosphere_stick") {
                    let intervalNum = system.runInterval(() => {
                        shooting(player, stickShotMagicObject.event, 1, stickShotMagicObject.addition, undefined);
                    }, 4);
                    system.runTimeout(() => {
                        system.clearRun(intervalNum);
                    }, 16);
                } else {
                    shooting(player, stickShotMagicObject.event, 0, stickShotMagicObject.addition, undefined);
                }
                player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"" + stickShotMagicObject.sendMsg + "\"}]}");
            }
            let stickRightOneMagicObject = StickRightOneMagicObjects.find(obj => obj.itemName == itemStack.typeId) as StickFuncMagicObject;
            if (stickRightOneMagicObject) {
                player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"" + stickRightOneMagicObject.sendMsg + "\"}]}");
                stickRightOneMagicObject.func(player);
            }
        }

        itemDurabilityDamage(player, itemStack, EquipmentSlot.Mainhand);

        let cool = itemStack.getComponent(ItemComponentTypes.Cooldown) as ItemCooldownComponent;
        cool.startCooldown(player);

    }

}