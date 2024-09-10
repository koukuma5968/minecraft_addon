import { ItemCustomComponent, ItemComponentHitEntityEvent, ItemStack, Entity, ItemComponentUseEvent, Player, GameMode, EquipmentSlot, ItemComponentUseOnEvent, ItemComponentCompleteUseEvent, ItemComponentTypes, ItemCooldownComponent } from "@minecraft/server";
import { ItemDurabilityDamage } from "../../../common/ItemDurabilityDamage";
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
        sendMsg: "§c焔裂き(ほむらざき)"
    },
    {
        itemName: "kurokumaft:water_magic_bread",
        func: aquaDesires,
        sendMsg: "§b蒼破斬(そうはざん)"
    },
    {
        itemName: "kurokumaft:wind_magic_bread",
        func: windDesires,
        sendMsg: "§a烈風刃(れっぷうじん)"
    },
    {
        itemName: "kurokumaft:stone_magic_bread",
        func: stoneDesires,
        sendMsg: "§7岩割刃(がんかつじん)"
    },
    {
        itemName: "kurokumaft:thunder_magic_bread",
        func: thunderDesires,
        sendMsg: "§6雷斬(らいきり)"
    },
    {
        itemName: "kurokumaft:ice_magic_bread",
        func: iceDesires,
        sendMsg: "§f斬雪(ざんせつ)"
    }
]);

const BreadShotObjects = Object.freeze([
    {
        itemName: "kurokumaft:fire_magic_bread",
        func: crimsonBread,
        sendMsg: "§c紅蓮剣(ぐれんけん)"
    },
    {
        itemName: "kurokumaft:water_magic_bread",
        func: mercurySmash,
        sendMsg: "§b水星砕き(すいせいくだき)"
    },
    {
        itemName: "kurokumaft:wind_magic_bread",
        func: windBarkSlash,
        sendMsg: "§a風鳴切(かなきり)"
    },
    {
        itemName: "kurokumaft:stone_magic_bread",
        func: breakRockSlash,
        sendMsg: "§7破岩衝(はがんしょう)"
    },
    {
        itemName: "kurokumaft:thunder_magic_bread",
        func: raizinBread,
        sendMsg: "§6雷神剣(らいじんけん)"
    },
    {
        itemName: "kurokumaft:ice_magic_bread",
        func: syusetuBread,
        sendMsg: "§f終雪氷晶(しゅうせつひょうしょう)"
    }

]);

/**
 * 刀系魔法
 */
export class BreadWeaponMagic implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {
        let itemStack = event.itemStack as ItemStack;
        let attackEntity = event.attackingEntity as Entity;
        let hitEntity = event.hitEntity as Entity;
        let effect = event.hadEffect as boolean;

        if (!itemStack) {
            return;
        }
        let breadMagicObject = BreadHitObjects.find(obj => obj.itemName == itemStack.typeId) as BreadMagicObject;
        breadMagicObject.func(hitEntity);
        attackEntity.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"text\":\"" + breadMagicObject.sendMsg + "\"}]}");
        if (attackEntity instanceof Player && attackEntity.getGameMode() != GameMode.creative) {
            ItemDurabilityDamage(attackEntity, itemStack, EquipmentSlot.Mainhand);
        }

    }

    // チャージ完了
    onCompleteUse(event:ItemComponentCompleteUseEvent) {
        let itemStack = event.itemStack as ItemStack;
        let player = event.source as Player;
    }

    // 右クリック
    onUse(event:ItemComponentUseEvent) {
        let itemStack = event.itemStack as ItemStack;
        let player = event.source as Player;

        if (!itemStack) {
            return;
        }
        let breadShotObject = BreadShotObjects.find(obj => obj.itemName == itemStack.typeId) as BreadMagicObject;
        breadShotObject.func(player);
        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"text\":\"" + breadShotObject.sendMsg + "\"}]}");
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
