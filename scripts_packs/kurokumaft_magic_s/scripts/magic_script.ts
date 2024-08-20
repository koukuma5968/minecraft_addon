import { world,system,EntityComponentTypes,EquipmentSlot, Entity, Player, EntityEquippableComponent, EntityDamageSource } from "@minecraft/server";
import { shieldGuard, shieldCounter } from "./shieldEvent";
import { print, playsound, durabilityDamage, breakItem } from "./common/commonUtil";
import { home_tp, homeSetDialog, torchlight_use, ignited_use_af, ignited_use_be, water_use, flower_garden_use, growth_use, mowing_use, music_sound_use, 
    grimoire_summon_use, grimoire_summon_Release } from "./magicItem";
import { magic_lectern, magic_lectern_break } from "./magicBlock";
import { magicAmor } from "./magic/magicAmorEvent";
import { fireStorm } from "./magic/imperial";
import { registerCustomComponentFunction } from "./custom/CustomComponentRegistry";

const guards = ["anvil", "blockExplosion", "entityAttack", "entityExplosion", "sonicBoom", "projectile"];

// ワールド接続時
world.beforeEvents.worldInitialize.subscribe(initEvent => {
    registerCustomComponentFunction(initEvent);
});

// エンティティを右クリック
// world.afterEvents.playerInteractWithEntity.subscribe(event => {
//     var player = event.player;
//     var target = event.target;
//     var item = event.itemStack;
//     if (item) {
//         if (item.typeId == "kurokumaft:repatriation_fruit" && target.typeId == "kurokumaft:home_gate") {
//             homeSetDialog(player, item, target);
//         }
//     }
//     if (target.typeId == "kurokumaft:fire_magic_sword") {
//         // print(target.typeId);
//     }

// });

// 近接hit後
world.afterEvents.entityHitEntity.subscribe(event => {
    var dameger = event.damagingEntity as Entity;
    var hitEn = event.hitEntity as Entity;
    if (hitEn.typeId == "minecraft:player") {
        shieldGuard(hitEn as Player, true);
        shieldCounter(hitEn as Player, dameger);
        magicAmor(hitEn as Player, dameger, undefined, undefined);
    }
    // let equ = dameger.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
    // let mainItem = equ.getEquipment(EquipmentSlot.Mainhand);
    // if (mainItem && mainItem.typeId.indexOf("magic_sword")) {

    // }

});
// 遠距離hit後
world.afterEvents.projectileHitEntity.subscribe(event => {
    var projectileEn = event.projectile;
    var hitEn = event.getEntityHit().entity as Entity;
    var dameger = event.source as Entity;
    var hitVector = event.hitVector;
    if (hitEn != undefined && hitEn.typeId == "minecraft:player") {
        shieldGuard(hitEn as Player, false);
        shieldCounter(hitEn as Player, dameger);
        magicAmor(hitEn as Player,dameger,projectileEn, hitVector);
    }
    if (projectileEn) {
        if (projectileEn.typeId == "kurokumaft:firestormmagic") {
            fireStorm(event.dimension, event.location);
        }
    }
});

// ブロックhit後
world.afterEvents.projectileHitBlock.subscribe(event => {
    var projectileEn = event.projectile;
    if (projectileEn) {
        if (projectileEn.typeId == "kurokumaft:firestormmagic") {
            fireStorm(event.dimension, event.location);
        }
    }
});

// ダメージ
world.afterEvents.entityHurt.subscribe(event => {
    var damageSource = event.damageSource as EntityDamageSource;
    var hitEn = event.hurtEntity as Entity;
    // print(hitEn, damageSource.cause + "=" + damage);
    if (hitEn != undefined && hitEn.typeId == "minecraft:player" && damageSource.cause != "void") {
        if (guards.indexOf(damageSource.cause) != -1) {
            shieldGuard(hitEn as Player, false);
        }
    }
});

// アイテム使用完了
world.afterEvents.itemCompleteUse.subscribe(event => {
    var en = event.source;
    var item = event.itemStack;
    if (en != undefined && en.typeId == "minecraft:player" && item != undefined ) {
        if (item.typeId === "kurokumaft:repatriation_fruit") {
            home_tp(en, item)
        }
    }
});

// ブロックアイテム右クリック後
// world.afterEvents.playerInteractWithBlock.subscribe(event => {
//     var player = event.player;
//     var item = event.itemStack;
//     var block = event.block;
//     // print("playerInteractWithBlock");
//     if (player != undefined) {
//         if (block.typeId == "kurokumaft:magic_lectern") {
//             magic_lectern(player, item, block);
//         }
//     }
// });

// アイテム右クリック後
world.afterEvents.itemUse.subscribe(event => {
    var player = event.source;
    var item = event.itemStack;
    // print("itemUse");
    if (item != undefined) {
        // print(item.typeId);
        if (item.typeId == "kurokumaft:grimoire_mowing") {
            mowing_use(player, item);
        } else if (item.typeId == "kurokumaft:grimoire_music_sound") {
            music_sound_use(player, item);
        } else if (item.typeId == "kurokumaft:fire_grimoire") {
            grimoire_summon_use(player, item);
        }
    }
});

// アイテム右クリックリリース後
world.afterEvents.itemReleaseUse.subscribe(event => {
    var player = event.source;
    var item = event.itemStack;
    var duration = event.useDuration;
    // print("itemReleaseUse");
    if (item != undefined) {
        // print(item.typeId);
        // print(duration);
        if (item.typeId == "kurokumaft:fire_grimoire") {
            grimoire_summon_Release(player, item, duration);
        }
    }
});

// ブロック右クリック後
world.afterEvents.itemUseOn.subscribe(event => {
    var player = event.source;
    var item = event.itemStack;
    var block = event.block;
    var blockFace = event.blockFace;
    // print("itemUseOnAf");
    // print(block.typeId);
    if (item != undefined) {
        if (item.typeId == "kurokumaft:grimoire_torchlight") {
            torchlight_use(player, block, item);
        } else if (item.typeId == "kurokumaft:grimoire_ignited") {
            ignited_use_af(player, block, blockFace, item);
        } else if (item.typeId == "kurokumaft:grimoire_water") {
            water_use(player, block, blockFace, item);
        } else if (item.typeId == "kurokumaft:grimoire_flower_garden") {
            flower_garden_use(player, block, blockFace, item);
        } else if (item.typeId == "kurokumaft:grimoire_growth") {
            growth_use(player, block, blockFace, item);
        }
    }
});

// ブロック右クリック前
world.beforeEvents.itemUseOn.subscribe(event => {
    var player = event.source;
    var item = event.itemStack;
    var block = event.block;
    var blockFace = event.blockFace;
    // print("itemUseOnBe");
    // print(block.typeId);
    // print(item.typeId);
    if (item != undefined) {
        if (block.typeId != "minecraft:tnt" && item.typeId == "kurokumaft:grimoire_ignited") {
            ignited_use_be(player, block, blockFace, item);
        }
    }
});

// ブロック破壊前
world.beforeEvents.playerBreakBlock.subscribe(event => {
    var player = event.player;
    var block = event.block;
    // print("playerBreakBlock");
    if (player != undefined) {
        // print(block.typeId);
        if (block.typeId == "kurokumaft:magic_lectern") {
            magic_lectern_break(player, block);
        }
    }
});

// エンティティ読み込み
world.afterEvents.entityLoad.subscribe(event => {
    var entity = event.entity;
});

// エンティティスポーン
world.afterEvents.entitySpawn.subscribe(event => {
    // print("entitySpawn");
    var entity = event.entity;
    var cause = event.cause;
    // print(entity.typeId);
    // print(cause);
});
