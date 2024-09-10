import { world,Entity, Player, EntityDamageSource } from "@minecraft/server";
import { shieldGuard, shieldCounter } from "./items/weapon/shield/shieldEvent";
import { hitMagicAmor } from "./items/weapon/armor/magicAmorHitEvent";
import { initRegisterCustom, initStateChangeMonitor } from "./custom/CustomComponentRegistry";
import { checkArrowProjectile, hitArrowEvent, magicBowShot } from "./items/weapon/bow/BowWeaponMagic";
import { grimoire_summon_Release } from "./items/weapon/grimoire/SummonGrimoireMagic";
import { checkWandProjectile, hitProjectileEvent } from "./items/weapon/wand/WandWeaponMagic";
import { checkShellProjectile, hitShellEvent } from "./items/weapon/bazooka/BazookaWeaponMagic";
import { waterCauldron } from "./items/weapon/grimoire/WaterGrimoireMagic";
import { magic_lectern_break } from "./block/MagicLecternBlock";
import { portalGateBreak } from "./block/PortalBlock";

const guards = ["anvil", "blockExplosion", "entityAttack", "entityExplosion", "sonicBoom", "projectile"];

// ワールド接続時
world.beforeEvents.worldInitialize.subscribe(initEvent => {
    initRegisterCustom(initEvent);
    initStateChangeMonitor(initEvent);
});
world.beforeEvents.playerLeave.subscribe(leaveEvent => {
    leaveEvent.player.clearDynamicProperties();
});

// 近接hit後
world.afterEvents.entityHitEntity.subscribe(event => {
    let dameger = event.damagingEntity as Entity;
    let hitEn = event.hitEntity as Entity;
    if (hitEn.typeId == "minecraft:player") {
        shieldGuard(hitEn as Player, true);
        shieldCounter(hitEn as Player, dameger);
        hitMagicAmor(hitEn as Player, dameger, undefined, undefined);
    }
});

// 遠距離hit後
world.afterEvents.projectileHitEntity.subscribe(event => {
    let projectileEn = event.projectile;
    let hitEn = event.getEntityHit().entity as Entity;
    let dameger = event.source as Entity;
    let hitVector = event.hitVector;
    if (hitEn != undefined && hitEn.typeId == "minecraft:player") {
        shieldGuard(hitEn as Player, false);
        shieldCounter(hitEn as Player, dameger);
        hitMagicAmor(hitEn as Player,dameger,projectileEn, hitVector);
    }
    if (projectileEn) {
        if (checkWandProjectile(projectileEn.typeId)) {
            hitProjectileEvent(projectileEn);
        }
        if (checkArrowProjectile(projectileEn.typeId)) {
            hitArrowEvent(projectileEn, hitEn);
        }
        if (checkShellProjectile(projectileEn.typeId)) {
            hitShellEvent(projectileEn);
        }
    }
});

// ブロックhit後
world.afterEvents.projectileHitBlock.subscribe(event => {
    let projectileEn = event.projectile;
    if (projectileEn) {
        if (checkWandProjectile(projectileEn.typeId)) {
            hitProjectileEvent(projectileEn);
        }
        if (checkShellProjectile(projectileEn.typeId)) {
            hitShellEvent(projectileEn);
        }
    }
});

// ダメージ
world.afterEvents.entityHurt.subscribe(event => {
    let damageSource = event.damageSource as EntityDamageSource;
    let hitEn = event.hurtEntity as Entity;
    if (hitEn != undefined && hitEn.typeId == "minecraft:player" && damageSource.cause != "void") {
        if (guards.indexOf(damageSource.cause) != -1) {
            shieldGuard(hitEn as Player, false);
        }
    }
});

// アイテム右クリックリリース後
world.afterEvents.itemReleaseUse.subscribe(event => {
    let player = event.source;
    let item = event.itemStack;
    let duration = event.useDuration;
    if (item != undefined) {
        if (player.getDynamicProperty("summon_grimoire")) {
            grimoire_summon_Release(player, item, duration);
        }
        if (player.getDynamicProperty("BowShotMagicCharge")) {
            magicBowShot(player, item, duration);
        }
        if (player.getDynamicProperty("gunCharge") == "full") {
            player.setDynamicProperty("gunCharge", "release");
        }
    }

});

// ブロック右クリック後
world.afterEvents.itemUseOn.subscribe(event => {
    let player = event.source;
    let item = event.itemStack;
    let block = event.block;
    let blockFace = event.blockFace;

    if (item != undefined && item.typeId == "kurokumaft:grimoire_water") {
        waterCauldron(event);
    }

});

// ブロック右クリック前
world.beforeEvents.itemUseOn.subscribe(event => {
    let player = event.source;
    let item = event.itemStack;
    let block = event.block;
    let blockFace = event.blockFace;

});

// ブロック爆発後
world.afterEvents.blockExplode.subscribe(event => {
    let block = event.block;
    if (block.typeId == "kurokumaft:magic_lectern") {
        magic_lectern_break(block, block.dimension);
    }
    if (block.typeId == "kurokumaft:magma_portal_x" || block.typeId == "kurokumaft:magma_portal_z") {
        portalGateBreak(block, event.explodedBlockPermutation);
    }
});

// ブロック破壊前
world.beforeEvents.playerBreakBlock.subscribe(event => {
    let player = event.player;
    let block = event.block;
    if (player != undefined) {
    }
});

// エンティティ読み込み
world.afterEvents.entityLoad.subscribe(event => {
    let entity = event.entity;
});

// エンティティスポーン
world.afterEvents.entitySpawn.subscribe(event => {
    let entity = event.entity;
    let cause = event.cause;
});

