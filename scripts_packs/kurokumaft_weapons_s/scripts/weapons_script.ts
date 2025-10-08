import { world,ItemStack, Player, Block, EquipmentSlot, Entity, EntityEquippableComponent, EntityComponentTypes, EntityInitializationCause, Dimension, EntityTypeFamilyComponent, system, TicksPerSecond, EntityRidingComponent } from "@minecraft/server";
import { explodeBedrock, WeaponGuards } from "./common/WeaponsCommonUtil";
import { shieldGuard,shieldCounter,resuscitationEquipment,glassReflection } from "./player/WeaponsShieldEvent";
import { initWeaponsRegisterCustom } from "./custom/WeaponsCustomComponentRegistry";
import { tntBreak } from "./items/weapons/sword/TntSwordBreak";
import { breakBlock } from "./common/WeaponsCommonUtil";
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
import { WeaponsArmorEquipment } from "./player/WeaponsArmorEquipment";
import { ShearsReap } from "./items/tool/ShearsReap";

// ワールド接続時
system.beforeEvents.startup.subscribe(initEvent => {
    initWeaponsRegisterCustom(initEvent);
});

world.beforeEvents.playerLeave.subscribe(leaveEvent => {
    leaveEvent.player.clearDynamicProperties();
});

world.afterEvents.playerSpawn.subscribe(event => {
    new WeaponsArmorEquipment(event.player).startMonitoring();
});

world.beforeEvents.explosion.subscribe(event => {
    const impactBLockList = event.getImpactedBlocks();
    let filterBlockList = explodeBedrock(impactBLockList);
    filterBlockList = explodeBakutikuCancel(filterBlockList);

    event.setImpactedBlocks(filterBlockList);

    explodeBakutikuChain(impactBLockList);
});

world.afterEvents.playerInteractWithEntity.subscribe(event => {

    const player = event.player;
    const target = event.target;

    if (target.typeId === "kurokumaft:bamboo_bag") {
        if (player.isSneaking) {
            const command = "ride @e[family=bamboo_bag,c=1] start_riding " + player.name;
            player.runCommand(command);
        } else {
//            target.nameTag = "entity.kurokumaft:bamboo_bag.name";
        }
    }
});

world.afterEvents.dataDrivenEntityTrigger.subscribe(event => {
    const eventId = event.eventId;
    const entity = event.entity;
    if (!entity.isValid) {
        return;
    }
    const family = entity.getComponent(EntityComponentTypes.TypeFamily) as EntityTypeFamilyComponent;
    if (family !== undefined && family.hasTypeFamily("bag")) {
        if (eventId === "kurokumaft:stay") {
            entity.runCommand("ride @s stop_riding")
        } else if (eventId === "kurokumaft:on_breaking") {
            entity.kill();
        }
    }
    // ライド停止イベントを検知
    if (event.eventId == "kurokumaft:stop_riding") {
        const entity = event.entity as Entity;
        // イベント送信者がフクロウの場合
        if (entity.typeId == "kurokumaft:owl") {
            const ride = entity.getComponent(EntityComponentTypes.Riding) as EntityRidingComponent;
            // フクロウがライド状態である場合
            if (ride != undefined) {
                const player = ride.entityRidingOn as Entity;
                // プレイヤーが落下を始めた時、かつ着地するまで
                if (player.isFalling && !entity.getDynamicProperty("fallingOwner")) {
                    // 落下中を設定
                    entity.setDynamicProperty("fallingOwner", true);
                    // 10tick後に処理を行う
                    system.runTimeout(() => {
                        // プレイヤーが落下状態のままである場合
                        if (player.isFalling) {
                            // イベント発信者であるフクロウのライドを停止する
                            event.entity.runCommand("ride @s stop_riding");
                        }
                        // 2tick間隔で処理を実行
                        const num = system.runInterval(() => {
                            // フクロウが死亡した場合
                            if (!entity.isValid) {
                                // 処理を停止する
                                system.clearRun(num);
                            // プレイヤーが着地した場合
                            } else if (player.isOnGround) {
                                // 落下中を解除する
                                entity.setDynamicProperty("fallingOwner", false);
                                // 処理を停止する
                                system.clearRun(num);
                            }
                        }, 2);
                    }, 10);
                }
            }
        }
    }
    if (event.eventId == "minecraft:on_tame") {
        const entity = event.entity as Entity;
        if (entity.typeId == "kurokumaft:owl") {
            entity.setDynamicProperty("fallingOwner", false);
        }
    }

});

// エンティティ削除前
world.beforeEvents.entityRemove.subscribe(event => {

    const removedEntity = event.removedEntity;
    removeSpear(removedEntity);
    removeHammer(removedEntity);
    if (removedEntity.getDynamicProperty("flametHrowerShot")) {
        stopFlametHrower(removedEntity as Player);
    }

});

// アイテム使用リリース
world.afterEvents.itemReleaseUse.subscribe(event => {
    const player = event.source;
    const item = event.itemStack;
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
    const player = event.source;
    const item = event.itemStack;
    if (item !== undefined) {
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
        if (item.typeId.indexOf("spear") !== -1) {
            stopSpear(player);
        }
        if (item.typeId.indexOf("hammer") !== -1) {
            releaseHammer(player, item);
        }
        if (item.typeId.indexOf("boomerang") !== -1) {
            releaseBoomerang(player, item);
        }
    }
});

// エンティティスポーン
world.afterEvents.entitySpawn.subscribe(event => {
    const cause = event.cause;
    const entity = event.entity;
    if (EntityInitializationCause.Spawned === cause && entity.isValid) {
        const family = entity.getComponent(EntityComponentTypes.TypeFamily) as EntityTypeFamilyComponent;
        if (family !== undefined && family.hasTypeFamily("energy_bullet")) {
            system.runTimeout(() => {
                if (entity.isValid) {
                    entity.remove;
                }
            }, 2*TicksPerSecond);
            return;
        }
        spawnSpear(entity);
        spawnHammer(entity);
        spawnBoomerang(entity);
    }
});

// アイテム使用前
world.beforeEvents.itemUse.subscribe(event => {
    const player = event.source;
    const item = event.itemStack;
    if (item !== undefined) {
    }
});

// アイテム使用後
world.afterEvents.itemUse.subscribe(event => {
    const player = event.source;
    const item = event.itemStack;
});

// ブロック爆破
world.afterEvents.blockExplode.subscribe(event => {
    const dimension = event.dimension as Dimension;
    const block = event.block as Block;

    if (block.typeId === "kurokumaft:tear_enchant") {
        breackTearEnchant(dimension, block);
    }
});

// ブロック設置
world.afterEvents.playerPlaceBlock.subscribe(event => {
    const block = event.block as Block;
    const dimension = event.dimension as Dimension;
    playerMithrilset(block);
});

// ブロック破壊前
world.beforeEvents.playerBreakBlock.subscribe(event => {
    const player = event.player;
    const item = event.itemStack;
    const block = event.block;
    if (item !== undefined) {
        if (item.typeId === "kurokumaft:copper_shears") {
            if (block.typeId.indexOf("leaves") !== -1 || block.typeId.indexOf("plant") !== -1 || block.typeId.indexOf("grass") !== -1) {
                event.cancel = true;
                new ShearsReap().breakReap(player, item, block);
            }
        }
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
    const damageEn = event.damagingEntity as Entity;
    const hitEn = event.hitEntity as Entity;
    if (hitEn !== undefined && hitEn instanceof Player) {
        shieldGuard(hitEn, true);
        shieldCounter(hitEn, damageEn);
    }
});

// 近接ブロックhit後
world.afterEvents.entityHitBlock.subscribe(event => {
    const damageEn = event.damagingEntity as Entity;
    const hitBlock = event.hitBlock as Block;
    // Object.entries(hitBlock.permutation.getAllStates()).forEach(value => {
    //     world.sendMessage(JSON.stringify(value));
    // });
    if (hitBlock !== undefined) {
        const equ = damageEn.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        const itemStack = equ.getEquipment(EquipmentSlot.Mainhand) as ItemStack;
        if (itemStack !== undefined) {
            if (itemStack.typeId === "kurokumaft:fire_brand") {
                fireCharcoalBlock(damageEn, itemStack, hitBlock);
            }
            if (itemStack.typeId === "kurokumaft:tnt_sword") {
                tntBreak(damageEn, itemStack, hitBlock.location);
            }
            if (itemStack.typeId === "kurokumaft:mithril_sword") {
                breakBlock(hitBlock);
            }
        }
  
    }
});

// 遠距離hit後
world.afterEvents.projectileHitEntity.subscribe(event => {
    const projectileEn = event.projectile;
    const source = event.source as Entity
    const hitEn = event.getEntityHit().entity as Entity;
    const hitVector = event.hitVector;
    if (hitEn !== undefined && hitEn instanceof Player) {
        shieldGuard(hitEn, false);
        glassReflection(hitEn, projectileEn, hitVector);
    }
    if (source !== undefined && source instanceof Player) {
        hitSpear(source, projectileEn);
    }
    if (projectileEn !== undefined && isThrowHammer(projectileEn)) {
        waveWardenHammer(source, projectileEn);
        stopHammer(projectileEn);
    }
});

// 遠距離ブロックhit後
world.afterEvents.projectileHitBlock.subscribe(event => {
    const projectileEn = event.projectile;
    const source = event.source as Entity
    if (source !== undefined && source instanceof Player) {
        hitSpear(source, projectileEn);
    }
    if (projectileEn !== undefined && isThrowHammer(projectileEn)) {
        waveWardenHammer(source, projectileEn);
        stopHammer(projectileEn);
    }
});

// ダメージ
world.afterEvents.entityHurt.subscribe(event => {
    const damage = event.damage;
    const damageSource = event.damageSource;
    const hitEn = event.hurtEntity as Player;
    if (hitEn instanceof Player && damageSource.cause !== "void") {
        if (WeaponGuards.indexOf(damageSource.cause) !== -1) {
            shieldGuard(hitEn, false);
        }
        if (hitEn.getDynamicProperty("axolotl_helmet")) {
            axolotlRegeneration(hitEn);
        }
        resuscitationEquipment(hitEn);
    }
});
