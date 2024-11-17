import { world,Entity, Player, EntityDamageSource, ItemComponent, Block, Direction, system, TicksPerSecond, ScriptEventSource, ObjectiveSortOrder, DisplaySlotId } from "@minecraft/server";
import { shieldGuard, shieldCounter, shieldKnockback } from "./items/weapon/shield/shieldEvent";
import { hitMagicAmor } from "./items/weapon/armor/magicAmorHitEvent";
import { initRegisterCustom, initStateChangeMonitor } from "./custom/CustomComponentRegistry";
import { checkArrowProjectile, hitArrowEvent, magicBowShot } from "./items/weapon/bow/BowWeaponMagic";
import { grimoire_summon_Release } from "./items/weapon/grimoire/SummonGrimoireMagic";
import { checkWandProjectile, hitProjectileEvent } from "./items/weapon/wand/WandWeaponMagic";
import { checkShellProjectile, hitShellEvent } from "./items/weapon/bazooka/BazookaWeaponMagic";
import { waterCauldron } from "./items/weapon/grimoire/WaterGrimoireMagic";
import { magic_lectern_break } from "./block/MagicLecternBlock";
import { portalGateBreak } from "./block/PortalBlock";
import { explodeBedrock } from "./common/commonUtil";
import { isChargeed } from "./items/weapon/gun/GunWeaponMagic";
import { MagicBrewingStand } from "./block/MagicBrewingStand";
import { MinecraftBlockTypes } from "@minecraft/vanilla-data";

const guards = ["anvil", "blockExplosion", "entityAttack", "entityExplosion", "sonicBoom", "projectile"];

// ワールド接続時
world.beforeEvents.worldInitialize.subscribe(initEvent => {
    initRegisterCustom(initEvent);
    initStateChangeMonitor(initEvent);
});
world.beforeEvents.playerLeave.subscribe(leaveEvent => {
    leaveEvent.player.clearDynamicProperties();
});

world.afterEvents.dataDrivenEntityTrigger.subscribe(event => {
    let entity = event.entity;
    if (event.eventId == "kurokumaft:explosion_guard_knockback") {
        shieldKnockback(entity);
    // } else if (event.eventId == "kurokumaft:attack_event") {
    //     world.sendMessage(event.eventId);
    // } else if (event.eventId == "kurokumaft:jump_event") {
    //     world.sendMessage(event.eventId);
    // } else if (event.eventId == "kurokumaft:two_jump_event") {
    //     world.sendMessage(event.eventId);
    //     entity.applyKnockback(0, 1, 0, 0.8);
    // } else if (event.eventId == "kurokumaft:on_ground_event") {
    //     world.sendMessage(event.eventId);
    }
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
            hitShellEvent(projectileEn, dameger);
        }
    }
});

// ブロックhit後
world.afterEvents.projectileHitBlock.subscribe(event => {
    let projectileEn = event.projectile;
    let dameger = event.source as Entity;
    if (projectileEn) {
        if (checkWandProjectile(projectileEn.typeId)) {
            hitProjectileEvent(projectileEn);
        }
        if (checkShellProjectile(projectileEn.typeId)) {
            hitShellEvent(projectileEn, dameger);
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
        isChargeed(player, item);
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

world.beforeEvents.explosion.subscribe(event => {
    let impactBLockList = event.getImpactedBlocks();
    let filterBlockList = explodeBedrock(impactBLockList);

    event.setImpactedBlocks(filterBlockList);

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
    if (entity.typeId == "kurokumaft:magic_brewing_stand") {
        let brewing_block = entity.dimension.getBlock(entity.location) as Block;
        new MagicBrewingStand(entity, brewing_block).checkPosionBrewTick();
    }
});

// エンティティスポーン
world.afterEvents.entitySpawn.subscribe(event => {
    let entity = event.entity;
    let cause = event.cause;
});

world.afterEvents.buttonPush.subscribe(event => {
    let entity = event.source;
    let block = event.block;

    A:
    for (let y=-1; y<=1; y++) {
        for (let x=-1; x<=1; x++) {
            for (let z=-1; z<=1; z++) {
                let nearLoc = {x:block.location.x+x,y:block.location.y+y,z:block.location.z+z};
                let nearblock = event.dimension.getBlock(nearLoc) as Block;
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
    let id = event.id;
    let message = event.message;
    let initiator = event.initiator;
    if (initiator != undefined) {
    }
    let sourceType = event.sourceType;
    if (sourceType == ScriptEventSource.Block) {
        let sourceBlock = event.sourceBlock;
        if (sourceBlock != undefined && sourceBlock.typeId == MinecraftBlockTypes.CommandBlock) {
            if (id == "kk:teamtag") {
                let players = sourceBlock.dimension.getPlayers({
                    location: sourceBlock.location,
                    maxDistance: 2
                });
                players.forEach(player => {
                    if(player.getDynamicProperty("teamCommandSet")) {
                        let params = message.split(" ");
                        if (params[0] == "add") {
                            let tags = player.getTags();
                            tags.forEach(tag => {
                                if (tag.indexOf("team") != -1) {
                                    player.removeTag(tag);
                                    world.sendMessage({ translate: "mess.kurokumaft:team_name.remove", with: [tag.substring(4)]});
                                }
                            });
                            player.addTag("team"+params[1]);
                            world.sendMessage({ translate: "mess.kurokumaft:team_name.add", with: [params[1]]});
                            // let scoreObject =  world.scoreboard.getObjective("team"+params[1]);
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
                            let tags = player.getTags();
                            tags.forEach(tag => {
                                if (tag.indexOf("team") != -1) {
                                    player.removeTag(tag);
                                    world.sendMessage({ translate: "mess.kurokumaft:team_name.remove", with: [tag.substring(4)]});
                                }
                            });
                            // let scoreObject =  world.scoreboard.getObjective("team"+params[1]);
                            // if (scoreObject != undefined) {
                            //     scoreObject.removeParticipant(player.scoreboardIdentity!);
                            //     let scoreboardIdentity = world.scoreboard.getParticipants();
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
        let sourceEntity = event.sourceEntity;
        if (sourceEntity != undefined) {
            if (id == "kk:teamtag") {
                let params = message.split(" ");
                if (params[0] == "add") {
                    let tags = sourceEntity.getTags();
                    tags.forEach(tag => {
                        if (tag.indexOf("team") != -1) {
                            sourceEntity.removeTag(tag);
                            world.sendMessage({ translate: "mess.kurokumaft:team_name.remove", with: [tag.substring(4)]});
                        }
                    });
                    sourceEntity.addTag("team"+params[1]);
                    world.sendMessage({ translate: "mess.kurokumaft:team_name.add", with: [params[1]]});
                    // let scoreObject =  world.scoreboard.getObjective("team"+params[1]);
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
                    let tags = sourceEntity.getTags();
                    tags.forEach(tag => {
                        if (tag.indexOf("team") != -1) {
                            sourceEntity.removeTag(tag);
                            world.sendMessage({ translate: "mess.kurokumaft:team_name.remove", with: [tag.substring(4)]});
                        }
                    });
                    // let scoreObject =  world.scoreboard.getObjective("team"+params[1]);
                    // if (scoreObject != undefined) {
                    //     scoreObject.removeParticipant(sourceEntity.scoreboardIdentity!);
                    //     let scoreboardIdentity = world.scoreboard.getParticipants();
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