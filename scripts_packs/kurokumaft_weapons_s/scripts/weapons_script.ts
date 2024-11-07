import { world,ItemStack, Player, Block, EquipmentSlot, Entity, EntityEquippableComponent, EntityComponentTypes, EntityInitializationCause, Dimension } from "@minecraft/server";
import { explodeBedrock, guards } from "./common/commonUtil";
import { shieldGuard,shieldCounter,resuscitationEquipment,glassReflection } from "./player/shieldEvent";
import { initRegisterCustom, initStateChangeMonitor } from "./custom/CustomComponentRegistry";
import { tntBreak } from "./items/weapons/sword/TntSwordBreak";
import { breakBlock } from "./common/commonUtil";
import { hitSpear, releaseSpear, removeSpear, spawnSpear, stopSpear } from "./items/weapons/spear/ThrowableSpear";
import { stopGatling } from "./items/weapons/gun/Gatling";
import { fireCharcoalBlock } from "./items/axe/FireBrand";
import { stopMachineGun } from "./items/weapons/gun/MachineGun";
import { stopFlametHrower } from "./items/weapons/gun/FlametHrower";
import { stopSniper } from "./items/weapons/gun/SniperRifle";
import { isThrowHammer, releaseHammer, removeHammer, spawnHammer, stopHammer } from "./items/weapons/hammer/ThrowableHammer";
import { waveWardenHammer } from "./items/weapons/hammer/WardenHammer";
import { releaseBoomerang, spawnBoomerang } from "./items/weapons/boomerang/ThrowableBoomerang";
import { axolotlRegeneration } from "./items/armor/HelmetSurveillance";
import { playerMithrilset } from "./block/mithril/MithrilBlock";
import { breackTearEnchant } from "./block/TearEnchant";
import { stopSniperBow } from "./items/weapons/bow/SniperSteelBow";
import { explodeBakutikuCancel, explodeBakutikuChain } from "./block/bom/BakutikuFlint";

// ワールド接続時
world.beforeEvents.worldInitialize.subscribe(initEvent => {
    initRegisterCustom(initEvent);
    initStateChangeMonitor(initEvent);
});

world.beforeEvents.playerLeave.subscribe(leaveEvent => {
    leaveEvent.player.clearDynamicProperties();
});

// アイテムブロック使用前
world.beforeEvents.itemUseOn.subscribe(event => {
    let player = event.source as Player;
    let item = event.itemStack as ItemStack;
    let block = event.block as Block;
});
// アイテムブロック使用後
world.afterEvents.itemUseOn.subscribe(event => {
    let player = event.source;
    let item = event.itemStack;
    let block = event.block;
});

world.beforeEvents.explosion.subscribe(event => {
    let impactBLockList = event.getImpactedBlocks();
    let filterBlockList = explodeBedrock(impactBLockList);
    filterBlockList = explodeBakutikuCancel(filterBlockList);

    event.setImpactedBlocks(filterBlockList);

    explodeBakutikuChain(impactBLockList);
});

// // プレイヤーがブロックをクリック
// world.afterEvents.playerInteractWithBlock.subscribe(event => {
//     let block = event.block;
//     let item = event.itemStack;
//     let player = event.player;
//     if (block.typeId == "kurokumaft:tear_enchant") {
//         setTearEnchantBook(player, item, block);
//     }
// });
// アイテム使用開始
world.afterEvents.itemStartUse.subscribe(event => {
    let player = event.source;
    let item = event.itemStack;
});

// エンティティ削除前
world.beforeEvents.entityRemove.subscribe(event => {

    let removedEntity = event.removedEntity;
    removeSpear(removedEntity);
    removeHammer(removedEntity);

});

// アイテム使用リリース
world.afterEvents.itemReleaseUse.subscribe(event => {
    let player = event.source;
    let item = event.itemStack;
    if (item != undefined) {
        if (player.getDynamicProperty("gatlingShot")) {
            stopGatling(player);
        }
        if (player.getDynamicProperty("machineGunShot")) {
            stopMachineGun(player);
        }
        if (player.getDynamicProperty("flametHrowerShot")) {
            stopFlametHrower(player);
        }
        if (player.getDynamicProperty("SniperRifleShot")) {
            stopSniper(player);
        }
        if (player.getDynamicProperty("SniperSteelBowShot")) {
            stopSniperBow(player);
        }
        if (item.typeId.indexOf("spear") != -1) {
            releaseSpear(player, item);
        }
        if (item.typeId.indexOf("hammer") != -1) {
            releaseHammer(player, item);
        }
        if (item.typeId.indexOf("boomerang") != -1) {
            releaseBoomerang(player, item);
        }
    }
});

// アイテム使用停止
world.afterEvents.itemStopUse.subscribe(event => {
    let player = event.source;
    let item = event.itemStack;
    if (item != undefined) {
        if (player.getDynamicProperty("gatlingShot")) {
            stopGatling(player);
        }
        if (player.getDynamicProperty("machinegunShot")) {
            stopMachineGun(player);
        }
        if (player.getDynamicProperty("flametHrowerShot")) {
            stopFlametHrower(player);
        }
        if (player.getDynamicProperty("SniperRifleShot")) {
            stopSniper(player);
        }
        if (player.getDynamicProperty("SniperSteelBowShot")) {
            stopSniperBow(player);
        }
        if (item.typeId.indexOf("spear") != -1) {
            stopSpear(player);
        }
        if (item.typeId.indexOf("hammer") != -1) {
            releaseHammer(player, item);
        }
        if (item.typeId.indexOf("boomerang") != -1) {
            releaseBoomerang(player, item);
        }
    }
});

// エンティティスポーン
world.afterEvents.entitySpawn.subscribe(event => {
    let cause = event.cause;
    let entity = event.entity;
    if (EntityInitializationCause.Spawned == cause) {
        spawnSpear(entity);
        spawnHammer(entity);
        spawnBoomerang(entity);
    }
});

// アイテム使用前
world.beforeEvents.itemUse.subscribe(event => {
    let player = event.source;
    let item = event.itemStack;
    if (item != undefined) {
    }
});

// アイテム使用後
world.afterEvents.itemUse.subscribe(event => {
    let player = event.source;
    let item = event.itemStack;
});

// ブロック爆破
world.afterEvents.blockExplode.subscribe(event => {
    let dimension = event.dimension as Dimension;
    let block = event.block as Block;

    if (block.typeId == "kurokumaft:tear_enchant") {
        breackTearEnchant(dimension, block);
    }
});

// ブロック設置
world.afterEvents.playerPlaceBlock.subscribe(event => {
    let block = event.block as Block;
    let dimension = event.dimension as Dimension;
    playerMithrilset(block);
});

// ブロック破壊前
world.beforeEvents.playerBreakBlock.subscribe(event => {
    let player = event.player;
    let item = event.itemStack;
    let block = event.block;
    if (item != undefined) {
    }
    // if (silkType.indexOf(block.typeId) != -1) {
    //     event.cancel = true;
    //     system.runTimeout(() => {
    //         world.sendMessage(block.typeId);
    //         block.dimension.setBlockType(block.location, MinecraftBlockTypes.Air);
    //         block.dimension.spawnItem(new ItemStack(block.typeId, 1), block.location);
    //     },1);
    // }
});

// 近接hit後
world.afterEvents.entityHitEntity.subscribe(event => {
    let damageEn = event.damagingEntity as Entity;
    let hitEn = event.hitEntity as Entity;
    if (hitEn != undefined && hitEn instanceof Player) {
        shieldGuard(hitEn, true);
        shieldCounter(hitEn, damageEn);
    }
});

// 近接ブロックhit後
world.afterEvents.entityHitBlock.subscribe(event => {
    let damageEn = event.damagingEntity as Entity;
    let hitBlock = event.hitBlock as Block;
    if (hitBlock != undefined) {
        let equ = damageEn.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        let itemStack = equ.getEquipment(EquipmentSlot.Mainhand) as ItemStack;
        if (itemStack != undefined) {
            if (itemStack.typeId == "kurokumaft:fire_brand") {
                fireCharcoalBlock(damageEn, itemStack, hitBlock);
            }
            if (itemStack.typeId == "kurokumaft:tnt_sword") {
                tntBreak(damageEn, itemStack, hitBlock.location);
            }
            if (itemStack.typeId == "kurokumaft:mithril_sword") {
                breakBlock(hitBlock);
            }
        }
  
    }
});

// 遠距離hit後
world.afterEvents.projectileHitEntity.subscribe(event => {
    let projectileEn = event.projectile;
    let source = event.source as Entity
    let hitEn = event.getEntityHit().entity as Entity;
    let hitVector = event.hitVector;
    if (hitEn != undefined && hitEn instanceof Player) {
        shieldGuard(hitEn, false);
        glassReflection(hitEn, projectileEn, hitVector);
    }
    if (source != undefined && source instanceof Player) {
        hitSpear(source, projectileEn);
    }
    if (projectileEn && isThrowHammer(projectileEn)) {
        waveWardenHammer(source, projectileEn);
        stopHammer(projectileEn);
    }
});

// 遠距離ブロックhit後
world.afterEvents.projectileHitBlock.subscribe(event => {
    let projectileEn = event.projectile;
    let source = event.source as Entity
    if (source != undefined && source instanceof Player) {
        hitSpear(source, projectileEn);
    }
    if (projectileEn && isThrowHammer(projectileEn)) {
        waveWardenHammer(source, projectileEn);
        stopHammer(projectileEn);
    }
});

// ダメージ
world.afterEvents.entityHurt.subscribe(event => {
    let damage = event.damage;
    let damageSource = event.damageSource;
    let hitEn = event.hurtEntity as Player;
    if (hitEn instanceof Player && damageSource.cause != "void") {
        if (guards.indexOf(damageSource.cause) != -1) {
            shieldGuard(hitEn, false);
        }
        if (hitEn.getDynamicProperty("axolotl_helmet")) {
            axolotlRegeneration(hitEn);
        }
        resuscitationEquipment(hitEn);
    }
});
