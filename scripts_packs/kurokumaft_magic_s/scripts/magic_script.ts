import { world,Entity, Player, EntityDamageSource, Block, system, TicksPerSecond, ScriptEventSource, EntityInitializationCause, EntityEquippableComponent, EntityComponentTypes, EquipmentSlot, ItemStack, EntityTypeFamilyComponent } from "@minecraft/server";
import { magicShieldGuard, magicShieldCounter, MagicShieldKnockback } from "./items/weapon/shield/MagicShieldEvent";
import { hitMagicAmor } from "./items/weapon/armor/MagicAmorHitEvent";
import { initRegisterMagicCustom, initMagicStateChangeMonitor } from "./custom/MagicCustomComponentRegistry";
import { checkArrowProjectile, hitArrowEvent, magicBowShot } from "./items/weapon/bow/BowWeaponMagic";
import { checkWandProjectile, hitWandProjectileEvent } from "./items/weapon/wand/WandWeaponMagic";
import { checkShellProjectile, hitShellEvent } from "./items/weapon/bazooka/BazookaWeaponMagic";
import { waterCauldron } from "./items/weapon/grimoire/WaterGrimoireMagic";
import { magic_lectern_break } from "./block/MagicLecternBlock";
import { portalGateBreak } from "./block/PortalBlock";
import { explodeBedrock } from "./common/MagicCommonUtil";
import { isChargeed } from "./items/weapon/gun/GunWeaponMagic";
import { MagicBrewingStand } from "./block/MagicBrewingStand";
import { MinecraftBlockTypes } from "@minecraft/vanilla-data";
import { fireChickenAttack } from "./mob/animal/FireChicken";
import { flamePorcupineGuard } from "./mob/animal/FlamePorcupine";
import { aquaJackalAttack } from "./mob/animal/AquaJackal";
import { snowWolfAttack } from "./mob/animal/SnowWolf";
import { earthRhinoKnockback } from "./mob/animal/EarthRhino";
import { BossActionClassRecord, BossActionObject, BossActionObjects } from "./mob/boos/mover/BossActionInterface";

const guards = ["anvil", "blockExplosion", "entityAttack", "entityExplosion", "sonicBoom", "projectile"];

// ワールド接続時
world.beforeEvents.worldInitialize.subscribe(initEvent => {
    initRegisterMagicCustom(initEvent);
    initMagicStateChangeMonitor(initEvent);
});
world.beforeEvents.playerLeave.subscribe(leaveEvent => {
    leaveEvent.player.clearDynamicProperties();
});

world.afterEvents.dataDrivenEntityTrigger.subscribe(event => {
    const entity = event.entity;
    if (event.eventId == "kurokumaft:explosion_guard_knockback") {
        MagicShieldKnockback(entity);
    // } else if (event.eventId == "kurokumaft:attack_event") {
    //     world.sendMessage(event.eventId);
    // } else if (event.eventId == "kurokumaft:jump_event") {
    //     world.sendMessage(event.eventId);
    // } else if (event.eventId == "kurokumaft:two_jump_event") {
    //     world.sendMessage(event.eventId);
    //     entity.applyKnockback(0, 1, 0, 0.8);
    // } else if (event.eventId == "kurokumaft:on_ground_event") {
    //     world.sendMessage(event.eventId);
    } else if (event.eventId == "kurokumaft:moniter_boss_event") {
        const object = BossActionObjects.find(ob => ob.entityName == entity.typeId) as BossActionObject;
        if (object != undefined) {
            const actionClass = BossActionClassRecord[object.className];
            const actionObject = new actionClass(entity);

            actionObject.startMoniter();
        }
    }
});

// 近接hit後
world.afterEvents.entityHitEntity.subscribe(event => {
    const dameger = event.damagingEntity as Entity;
    const hitEn = event.hitEntity as Entity;
    if (hitEn.typeId == "minecraft:player") {
        magicShieldGuard(hitEn as Player, true);
        magicShieldCounter(hitEn as Player, dameger);
        hitMagicAmor(hitEn as Player, dameger, undefined, undefined);
    } 
    if (dameger.typeId == "kurokumaft:fire_chicken") {
        fireChickenAttack(hitEn);
    } else if (dameger.typeId == "kurokumaft:aqua_jackal") {
        aquaJackalAttack(hitEn);
    } else if (dameger.typeId == "kurokumaft:snow_wolf") {
        snowWolfAttack(hitEn);
    } else if (dameger.typeId == "kurokumaft:earth_rhino") {
        earthRhinoKnockback(hitEn);
    }

    if (hitEn.typeId == "kurokumaft:flame_porcupine") {
        flamePorcupineGuard(dameger);
    }
});

// 遠距離hit後
world.afterEvents.projectileHitEntity.subscribe(event => {
    const projectileEn = event.projectile;
    const hitEn = event.getEntityHit().entity as Entity;
    const dameger = event.source as Entity;
    const hitVector = event.hitVector;
    if (hitEn != undefined && hitEn.typeId == "minecraft:player") {
        magicShieldGuard(hitEn as Player, false);
        magicShieldCounter(hitEn as Player, dameger);
        hitMagicAmor(hitEn as Player,dameger,projectileEn, hitVector);
    }
    if (projectileEn != undefined) {
        if (checkWandProjectile(projectileEn.typeId)) {
            hitWandProjectileEvent(projectileEn);
        }
        if (checkArrowProjectile(projectileEn.typeId)) {
            hitArrowEvent(projectileEn, hitEn);
        }
        if (checkShellProjectile(projectileEn.typeId)) {
            hitShellEvent(projectileEn, dameger);
        }
    }
});

// ブロックhit後
world.afterEvents.entityHitBlock.subscribe(event => {
    const block = event.hitBlock as Block;
    const entity = event.damagingEntity as Entity;

});

// 遠距離ブロックhit後
world.afterEvents.projectileHitBlock.subscribe(event => {
    const projectileEn = event.projectile;
    const dameger = event.source as Entity;
    if (projectileEn != undefined) {
        if (checkWandProjectile(projectileEn.typeId)) {
            hitWandProjectileEvent(projectileEn);
        }
        if (checkShellProjectile(projectileEn.typeId)) {
            hitShellEvent(projectileEn, dameger);
        }
    }
});

// ダメージ
world.afterEvents.entityHurt.subscribe(event => {
    const damageSource = event.damageSource as EntityDamageSource;
    const hitEn = event.hurtEntity as Entity;
    if (hitEn != undefined && hitEn.typeId == "minecraft:player" && damageSource.cause != "void") {
        if (guards.indexOf(damageSource.cause) != -1) {
            magicShieldGuard(hitEn as Player, false);
        }
    }
});

// アイテム右クリックリリース後
world.afterEvents.itemReleaseUse.subscribe(event => {
    const player = event.source;
    const item = event.itemStack;
    const duration = event.useDuration;
    if (item != undefined) {
        if (player.getDynamicProperty("BowShotMagicCharge")) {
            magicBowShot(player, item, duration);
        }
        isChargeed(player, item);
    }

});

// ブロック右クリック後
world.afterEvents.itemUseOn.subscribe(event => {
    const player = event.source;
    const item = event.itemStack;
    const block = event.block;
    const blockFace = event.blockFace;

    if (item != undefined && item.typeId == "kurokumaft:grimoire_water") {
        waterCauldron(event);
    }

});

// ブロック右クリック前
world.beforeEvents.itemUseOn.subscribe(event => {
    const player = event.source;
    const item = event.itemStack;
    const block = event.block;
    const blockFace = event.blockFace;
});

// ブロック爆発後
world.afterEvents.blockExplode.subscribe(event => {
    const block = event.block;
    if (block.typeId == "kurokumaft:magic_lectern") {
        magic_lectern_break(block, block.dimension);
    }
    if (block.typeId == "kurokumaft:magma_portal_x" || block.typeId == "kurokumaft:magma_portal_z") {
        portalGateBreak(block, event.explodedBlockPermutation);
    }
});

world.beforeEvents.explosion.subscribe(event => {
    const impactBLockList = event.getImpactedBlocks();
    const filterBlockList = explodeBedrock(impactBLockList);

    if (filterBlockList != undefined) {
        event.setImpactedBlocks(filterBlockList);
    }

});

// ブロック破壊前
world.beforeEvents.playerBreakBlock.subscribe(event => {
    const player = event.player;
    const block = event.block;
    if (player != undefined) {
    }
});

// エンティティ読み込み
world.afterEvents.entityLoad.subscribe(event => {
    const entity = event.entity;
    if (entity.typeId == "kurokumaft:magic_brewing_stand") {
        const brewing_block = entity.dimension.getBlock(entity.location) as Block;
        new MagicBrewingStand(entity, brewing_block).checkPosionBrewTick();
    }
});

// エンティティスポーン
world.afterEvents.entitySpawn.subscribe(event => {
    const entity = event.entity;
    const cause = event.cause;

    if (cause == EntityInitializationCause.Spawned){
        if (entity.typeId == "kurokumaft:dolphin_ultrasonic") {
            world.playSound("mob.dolphin.death", entity.location, {
                pitch:1,
                volume:2
            });
        } else if (entity.typeId == "kurokumaft:bat_ultrasonic") {
            world.playSound("mob.bat.death", entity.location, {
                pitch:1,
                volume:2
            });
        }
    }
});

world.afterEvents.buttonPush.subscribe(event => {
    const entity = event.source;
    const block = event.block;

    A:
    for (let y=-1; y<=1; y++) {
        for (let x=-1; x<=1; x++) {
            for (let z=-1; z<=1; z++) {
                const nearLoc = {x:block.location.x+x,y:block.location.y+y,z:block.location.z+z};
                const nearblock = event.dimension.getBlock(nearLoc) as Block;
                if (nearblock.typeId == MinecraftBlockTypes.CommandBlock) {
                    entity.setDynamicProperty("teamCommandSet", true);
                    system.runTimeout(() => {
                        entity.setDynamicProperty("teamCommandSet", undefined);
                    }, TicksPerSecond*2);
                    break A;
                }
            
            }
        }
    }
});

system.afterEvents.scriptEventReceive.subscribe(event => {
    const id = event.id;
    const message = event.message;
    const initiator = event.initiator;
    if (initiator != undefined) {
    }
    const sourceType = event.sourceType;
    if (sourceType == ScriptEventSource.Block) {
        const sourceBlock = event.sourceBlock;
        if (sourceBlock != undefined && sourceBlock.typeId == MinecraftBlockTypes.CommandBlock) {
            if (id == "kk:teamtag") {
                const players = sourceBlock.dimension.getPlayers({
                    location: sourceBlock.location,
                    maxDistance: 2
                });
                players.forEach(player => {
                    if(player.getDynamicProperty("teamCommandSet")) {
                        const params = message.split(" ");
                        if (params[0] == "add") {
                            const tags = player.getTags();
                            tags.forEach(tag => {
                                if (tag.indexOf("team") != -1) {
                                    player.removeTag(tag);
                                    world.sendMessage({ translate: "mess.kurokumaft:team_name.remove", with: [tag.substring(4)]});
                                }
                            });
                            player.addTag("team"+params[1]);
                            world.sendMessage({ translate: "mess.kurokumaft:team_name.add", with: [params[1]]});
                            // const scoreObject =  world.scoreboard.getObjective("team"+params[1]);
                            // if (scoreObject != undefined) {
                            //     scoreObject.setScore(player.scoreboardIdentity!, 0);
                            // } else {
                            //     scoreObject =  world.scoreboard.addObjective("team"+params[1], "team : "+params[1]);
                            // }
                            // scoreObject.setScore(player.scoreboardIdentity!, 0);
                            // world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, {
                            //     objective: scoreObject,
                            //     sortOrder: ObjectiveSortOrder.Descending,
                            // });
                        } else if (params[0] == "remove") {
                            const tags = player.getTags();
                            tags.forEach(tag => {
                                if (tag.indexOf("team") != -1) {
                                    player.removeTag(tag);
                                    world.sendMessage({ translate: "mess.kurokumaft:team_name.remove", with: [tag.substring(4)]});
                                }
                            });
                            // const scoreObject =  world.scoreboard.getObjective("team"+params[1]);
                            // if (scoreObject != undefined) {
                            //     scoreObject.removeParticipant(player.scoreboardIdentity!);
                            //     const scoreboardIdentity = world.scoreboard.getParticipants();
                            //     world.sendMessage(""+scoreboardIdentity.length);
                            //     if (scoreboardIdentity.length == 0) {
                            //         world.scoreboard.removeObjective("team"+params[1]);
                            //     }
                            // }
                        }
                    }
                });
            }
        }
    } else if (sourceType == ScriptEventSource.Entity) {
        const sourceEntity = event.sourceEntity;
        if (sourceEntity != undefined) {
            if (id == "kk:teamtag") {
                const params = message.split(" ");
                if (params[0] == "add") {
                    const tags = sourceEntity.getTags();
                    tags.forEach(tag => {
                        if (tag.indexOf("team") != -1) {
                            sourceEntity.removeTag(tag);
                            world.sendMessage({ translate: "mess.kurokumaft:team_name.remove", with: [tag.substring(4)]});
                        }
                    });
                    sourceEntity.addTag("team"+params[1]);
                    world.sendMessage({ translate: "mess.kurokumaft:team_name.add", with: [params[1]]});
                    // const scoreObject =  world.scoreboard.getObjective("team"+params[1]);
                    // if (scoreObject != undefined) {
                    //     scoreObject.setScore(sourceEntity.scoreboardIdentity!, 0);
                    // } else {
                    //     scoreObject =  world.scoreboard.addObjective("team"+params[1], "team : "+params[1]);
                    // }
                    // scoreObject.setScore(sourceEntity.scoreboardIdentity!, 0);
                    // world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, {
                    //     objective: scoreObject,
                    //     sortOrder: ObjectiveSortOrder.Descending,
                    // });
                } else if (params[0] == "remove") {
                    const tags = sourceEntity.getTags();
                    tags.forEach(tag => {
                        if (tag.indexOf("team") != -1) {
                            sourceEntity.removeTag(tag);
                            world.sendMessage({ translate: "mess.kurokumaft:team_name.remove", with: [tag.substring(4)]});
                        }
                    });
                    // const scoreObject =  world.scoreboard.getObjective("team"+params[1]);
                    // if (scoreObject != undefined) {
                    //     scoreObject.removeParticipant(sourceEntity.scoreboardIdentity!);
                    //     const scoreboardIdentity = world.scoreboard.getParticipants();
                    //     if (scoreboardIdentity.length == 0) {
                    //         world.scoreboard.removeObjective("team"+params[1]);
                    //     }
                    // }
                }
            }
        }
    }
}, {
    namespaces: [
        "kk"
    ]
});