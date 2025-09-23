import { ItemCustomComponent, ItemComponentHitEntityEvent, ItemStack, Entity, ItemComponentUseEvent, Player, EquipmentSlot, ItemComponentTypes, ItemCooldownComponent } from "@minecraft/server";
import { itemDurabilityMagicDamage } from "../../../common/MagicItemDurabilityDamage";
import { crimsonBread, flamingDesires } from "./FireMagicBread";
import { aquaDesires, mercurySmash } from "./WaterMagicBread";
import { windBarkSlash, windDesires } from "./WindMagicBread";
import { breakRockSlash, stoneDesires } from "./StoneMagicBread";
import { raizinBread, thunderDesires } from "./ThunderMagicBread";
import { iceDesires, syusetuBread } from "./IceMagicBread";

interface BreadMagicObject {
    itemName:string,
    sendMsg:string,
    func: any
}

const BreadHitObjects = Object.freeze([
    {
        itemName: "kurokumaft:fire_magic_bread",
        func: flamingDesires,
        sendMsg: "magic.kurokumaft:flamingDesires.translate"
    },
    {
        itemName: "kurokumaft:water_magic_bread",
        func: aquaDesires,
        sendMsg: "magic.kurokumaft:aquaDesires.translate"
    },
    {
        itemName: "kurokumaft:wind_magic_bread",
        func: windDesires,
        sendMsg: "magic.kurokumaft:windDesires.translate"
    },
    {
        itemName: "kurokumaft:stone_magic_bread",
        func: stoneDesires,
        sendMsg: "magic.kurokumaft:stoneDesires.translate"
    },
    {
        itemName: "kurokumaft:thunder_magic_bread",
        func: thunderDesires,
        sendMsg: "magic.kurokumaft:thunderDesires.translate"
    },
    {
        itemName: "kurokumaft:ice_magic_bread",
        func: iceDesires,
        sendMsg: "magic.kurokumaft:iceDesires.translate"
    }
]);

const BreadShotObjects = Object.freeze([
    {
        itemName: "kurokumaft:fire_magic_bread",
        func: crimsonBread,
        sendMsg: "magic.kurokumaft:crimsonBread.translate"
    },
    {
        itemName: "kurokumaft:water_magic_bread",
        func: mercurySmash,
        sendMsg: "magic.kurokumaft:mercurySmash.translate"
    },
    {
        itemName: "kurokumaft:wind_magic_bread",
        func: windBarkSlash,
        sendMsg: "magic.kurokumaft:windBarkSlash.translate"
    },
    {
        itemName: "kurokumaft:stone_magic_bread",
        func: breakRockSlash,
        sendMsg: "magic.kurokumaft:breakRockSlash.translate"
    },
    {
        itemName: "kurokumaft:thunder_magic_bread",
        func: raizinBread,
        sendMsg: "magic.kurokumaft:raizinBread.translate"
    },
    {
        itemName: "kurokumaft:ice_magic_bread",
        func: syusetuBread,
        sendMsg: "magic.kurokumaft:syusetuBread.translate"
    }

]);

/**
 * 刀系魔法
 */
export class BreadWeaponMagic implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {
        const itemStack = event.itemStack as ItemStack;
        const attackEntity = event.attackingEntity as Player;
        const hitEntity = event.hitEntity as Entity;
        const effect = event.hadEffect as boolean;

        if (!itemStack) {
            return;
        }
        const breadMagicObject = BreadHitObjects.find(obj => obj.itemName == itemStack.typeId) as BreadMagicObject;
        breadMagicObject.func(hitEntity);
        attackEntity.onScreenDisplay.setActionBar({rawtext:[{translate:breadMagicObject.sendMsg}]});
        itemDurabilityMagicDamage(attackEntity, itemStack, EquipmentSlot.Mainhand);

    }

    // 右クリック
    onUse(event:ItemComponentUseEvent) {
        const itemStack = event.itemStack as ItemStack;
        const player = event.source as Player;

        if (!itemStack) {
            return;
        }
        const breadShotObject = BreadShotObjects.find(obj => obj.itemName == itemStack.typeId) as BreadMagicObject;
        breadShotObject.func(player);
        player.onScreenDisplay.setActionBar({rawtext:[{translate:breadShotObject.sendMsg}]});
        itemDurabilityMagicDamage(player, itemStack, EquipmentSlot.Mainhand);
        const cool = itemStack.getComponent(ItemComponentTypes.Cooldown) as ItemCooldownComponent;
        cool.startCooldown(player);
    }

}
