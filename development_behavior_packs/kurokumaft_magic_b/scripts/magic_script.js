import { world,system,EntityComponentTypes,BlockComponentTypes,ItemComponentTypes } from "@minecraft/server";
import { shieldGuard, shieldCounter } from "./shieldEvent";
import { print, playsound, durabilityDamage, breakItem } from "./common";
import { home_tp, homeSetDialog, torchlight_use, ignited_use_af, ignited_use_be, water_use, flower_garden_use, growth_use, mowing_use, music_sound_use } from "./magicItem";
import { magic_lectern, magic_lectern_break } from "./magicBlock";
import { magicAmor } from "./magic/magicAmorEvent";
import { fireStorm } from "./magic/imperial";

const guards = ["anvil", "blockExplosion", "entityAttack", "entityExplosion", "sonicBoom", "projectile"];

// 近接hit後
world.afterEvents.entityHitEntity.subscribe(event => {
    var dameger = event.damagingEntity;
    var hitEn = event.hitEntity;
    if (hitEn.typeId == "minecraft:player") {
        shieldGuard(hitEn, true);
        shieldCounter(hitEn, dameger);
        magicAmor(hitEn, dameger);
    }
});
// エンティティを右クリック
world.afterEvents.playerInteractWithEntity.subscribe(event => {
    var player = event.player;
    var target = event.target;
    var item = event.itemStack;
    if (item) {
        if (item.typeId == "kurokumaft:repatriation_fruit" && target.typeId == "kurokumaft:home_gate") {
            homeSetDialog(player, item, target);
        }
    }
    if (target.typeId == "kurokumaft:lightning_hornet") {
        // print(target.typeId);
    }

});

// 遠距離hit後
world.afterEvents.projectileHitEntity.subscribe(event => {
    var projectileEn = event.projectile;
    var hitEn = event.getEntityHit().entity;
    var dameger = event.source;
    var hitVector = event.hitVector;
    if (hitEn != undefined && hitEn.typeId == "minecraft:player") {
        shieldGuard(hitEn, false);
        shieldCounter(hitEn, dameger);
        magicAmor(hitEn,dameger,projectileEn, hitVector);
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
    var damage = event.damage;
    var damageSource = event.damageSource;
    var hitEn = event.hurtEntity;
    // print(hitEn, damageSource.cause + "=" + damage);
    if (hitEn != undefined && hitEn.typeId == "minecraft:player" && damageSource.cause != "void") {
        if (guards.indexOf(damageSource.cause) != -1) {
            shieldGuard(hitEn, false);
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
world.afterEvents.playerInteractWithBlock.subscribe(event => {
    var player = event.player;
    var item = event.itemStack;
    var block = event.block;
    // print("playerInteractWithBlock");
    if (player != undefined) {
        if (block.typeId == "kurokumaft:magic_lectern") {
            magic_lectern(player, item, block);
        }
    }
});

// アイテム右クリック後
world.afterEvents.itemUse.subscribe(event => {
    var player = event.source;
    var item = event.itemStack;
    // print("itemUse");
    if (item != undefined) {
        if (item.typeId == "kurokumaft:grimoire_mowing") {
            mowing_use(player, item);
        } else if (item.typeId == "kurokumaft:grimoire_music_sound") {
            music_sound_use(player, item);
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
