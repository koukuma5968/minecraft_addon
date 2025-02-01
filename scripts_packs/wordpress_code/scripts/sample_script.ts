import { Entity, EntityComponentTypes, EntityInitializationCause, EntityRidingComponent, EntityTameableComponent, ItemStack, Player, system, TicksPerSecond, world } from "@minecraft/server";
import { ItemDurability } from "./item/ItemDurability";
import { FortuneDestroy } from "./block/FortuneDestroy";
import { hitSpear, releaseSpear, removeSpear, spawnSpear, stopSpear, ThrowableSpear } from "./item/ThrowableSpear";
import { MineDurability } from "./common/MineDurability";
import { TntSwordBreak } from "./item/TntSwordBreak";
import { EchoSword } from "./item/EchoSword";

// ワールド生成時
world.beforeEvents.worldInitialize.subscribe(initEvent => {
    // アイテムカスタムコンポーネントの登録
    initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:item_durability", new ItemDurability());
    // スピアー
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:throwable_spear', new ThrowableSpear());
    // 採掘耐久減少
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:mine_durability', new MineDurability());
    // TNTソード
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:tnt_sword', new TntSwordBreak());
    // 残響の剣
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:echo_sword', new EchoSword());

    // ブロックカスタムコンポーネントの登録
    initEvent.blockComponentRegistry.registerCustomComponent("kurokumaft:fortune_destroy", new FortuneDestroy());

    initEvent.blockComponentRegistry.registerCustomComponent("amw:magic_reinforcement_table", {
        onPlace(e){
            let entity = e.dimension.spawnEntity("amw:magic_reinforcement_table", { x: e.block.location.x+0.5, y: e.block.location.y+1, z: e.block.location.z+0.5 });
            entity.nameTag = "amw:magic_reinforcement_table";
        }
    });

});
// world.afterEvents.blockExplode.subscribe(event => {
//     world.sendMessage("blockExplode");
// });

// world.afterEvents.buttonPush.subscribe(event => {
//     world.sendMessage("buttonPush");
// });

// モブに定義されているeventが実行されたときに呼ばれる
world.afterEvents.dataDrivenEntityTrigger.subscribe(event => {
    // world.sendMessage("dataDrivenEntityTrigger");
    // world.sendMessage(event.eventId);
    // ライド停止イベントを検知
    if (event.eventId == "kurokumaft:stop_riding") {
        let entity = event.entity as Entity;
        // イベント送信者がフクロウの場合
        if (entity.typeId == "kurokumaft:owl") {
            let ride = entity.getComponent(EntityComponentTypes.Riding) as EntityRidingComponent;
            // フクロウがライド状態である場合
            if (ride != undefined) {
                let player = ride.entityRidingOn as Entity;
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
                        let num = system.runInterval(() => {
                            // フクロウが死亡した場合
                            if (!entity.isValid()) {
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
        let entity = event.entity as Entity;
        if (entity.typeId == "kurokumaft:owl") {
            entity.setDynamicProperty("fallingOwner", false);
        }
    }
});

// world.afterEvents.effectAdd.subscribe(event => {
//     world.sendMessage("effectAdd");
// });

// world.afterEvents.entityDie.subscribe(event => {
//     world.sendMessage("entityDie");
// });

// world.afterEvents.entityHealthChanged.subscribe(event => {
//     world.sendMessage("entityHealthChanged");
// });

// world.afterEvents.entityHitBlock.subscribe(event => {
//     world.sendMessage("entityHitBlock");
// });

// world.afterEvents.entityHitEntity.subscribe(event => {
//     world.sendMessage("entityHitEntity");
// });

// world.afterEvents.entityHurt.subscribe(event => {
//     world.sendMessage("entityHurt");
// });

// world.afterEvents.entityLoad.subscribe(event => {
//     world.sendMessage("entityLoad");
// });

// エンティティ削除前
world.beforeEvents.entityRemove.subscribe(event => {
    let removedEntity = event.removedEntity;
    removeArrow(removedEntity);
    removeSpear(removedEntity);
});

// world.afterEvents.entityRemove.subscribe(event => {
//     world.sendMessage("entityRemove");
// });

// エンティティがスポーンした時に呼ばれるイベント
world.afterEvents.entitySpawn.subscribe(event => {
    // world.sendMessage("entitySpawn");
    // スポーンしたエンティティ
    let entity = event.entity;
    // どうやってスポーンしたか
    let cause = event.cause;
    // スポーンしたエンティティをメッセージに送る（ただの文字結合でもOK、RawMessageのtranslateを使うと多言語に対応できる）
    if (cause == "Born") {
        // 繁殖によって生まれた時
        let mess = {translate : "mess.entity_spawn.Born", with: [entity.typeId]};
        // world.sendMessage(mess);
    } else if (cause == "Transformed") {
        // ドラウンドやウィッチなどに変化した時
        let mess = {translate : "mess.entity_spawn.Transformed", with: [entity.typeId]};
        // world.sendMessage(mess);
    }
    // モブの表示名を設定する
    if (entity.typeId == "kurokumaft:owl") {
        entity.nameTag = "フクロウ"
    }

    if (EntityInitializationCause.Spawned == cause) {
        spawnSpear(entity);
    }

});

// world.afterEvents.explosion.subscribe(event => {
//     world.sendMessage("explosion");
// });

// world.afterEvents.gameRuleChange.subscribe(event => {
//     world.sendMessage("gameRuleChange");
// });

// world.afterEvents.itemCompleteUse.subscribe(event => {
//     world.sendMessage("itemCompleteUse");
// });

// アイテム使用リリース
world.afterEvents.itemReleaseUse.subscribe(event => {
    // world.sendMessage("itemCompleteUse");
    let player = event.source;
    let item = event.itemStack;
    if (item != undefined) {
        if (item.typeId.indexOf("spear") != -1) {
            releaseSpear(player, item);
        }
    }
});

// world.afterEvents.itemStartUse.subscribe(event => {
//     world.sendMessage("itemStartUse");
// });

// world.afterEvents.itemStartUseOn.subscribe(event => {
//     world.sendMessage("itemStartUseOn");
// });

// アイテム使用停止
world.afterEvents.itemStopUse.subscribe(event => {
    // world.sendMessage("itemStopUse");
    let player = event.source;
    let item = event.itemStack;
    if (item != undefined) {
        if (item.typeId.indexOf("spear") != -1) {
            stopSpear(player);
        }
    }
});

// world.afterEvents.itemStopUseOn.subscribe(event => {
//     world.sendMessage("itemStopUseOn");
// });

// world.afterEvents.itemUse.subscribe(event => {
//     world.sendMessage("itemUse");
// });

// world.afterEvents.itemUseOn.subscribe(event => {
//     world.sendMessage("itemUseOn");
// });

// world.afterEvents.leverAction.subscribe(event => {
//     world.sendMessage("leverAction");
// });

// world.afterEvents.pistonActivate.subscribe(event => {
//     world.sendMessage("pistonActivate");
// });

// world.afterEvents.playerBreakBlock.subscribe(event => {
//     world.sendMessage("playerBreakBlock");
// });

// world.afterEvents.playerDimensionChange.subscribe(event => {
//     world.sendMessage("playerDimensionChange");
// });

// world.afterEvents.playerEmote.subscribe(event => {
//     world.sendMessage("playerEmote");
// });

// world.afterEvents.playerGameModeChange.subscribe(event => {
//     world.sendMessage("playerGameModeChange");
// });

// world.afterEvents.playerInputPermissionCategoryChange.subscribe(event => {
//     world.sendMessage("playerInputPermissionCategoryChange");
// });

// world.afterEvents.playerJoin.subscribe(event => {
//     world.sendMessage("playerJoin");
// });

// world.afterEvents.playerLeave.subscribe(event => {
//     world.sendMessage("playerLeave");
// });

// world.afterEvents.playerPlaceBlock.subscribe(event => {
//     world.sendMessage("playerPlaceBlock");
// });

// world.afterEvents.playerSpawn.subscribe(event => {
//     world.sendMessage("playerSpawn");
// });

// world.afterEvents.pressurePlatePop.subscribe(event => {
//     world.sendMessage("pressurePlatePop");
// });

// 遠距離ブロックhit後
world.afterEvents.projectileHitBlock.subscribe(event => {
    // world.sendMessage("projectileHitBlock");
    let projectileEn = event.projectile;
    let source = event.source as Entity
    if (source != undefined && source instanceof Player) {
        hitSpear(source, projectileEn);
    }
});

// 遠距離hit後
world.afterEvents.projectileHitEntity.subscribe(event => {
    // world.sendMessage("projectileHitEntity");
    let projectileEn = event.projectile;
    let source = event.source as Entity
    let hitEn = event.getEntityHit().entity as Entity;
    let hitVector = event.hitVector;
    if (source != undefined && source instanceof Player) {
        hitSpear(source, projectileEn);
    }
});

// world.afterEvents.targetBlockHit.subscribe(event => {
//     world.sendMessage("targetBlockHit");
// });

// world.afterEvents.tripWireTrip.subscribe(event => {
//     world.sendMessage("tripWireTrip");
// });

// world.afterEvents.weatherChange.subscribe(event => {
//     world.sendMessage("weatherChange");
// });

async function removeArrow(removedEntity:Entity) {
    if (removedEntity.typeId.indexOf("arrow") == -1) {
        return;
    }

    let dim = removedEntity.dimension;
    let loca = removedEntity.location;
    system.runTimeout(() => {
        dim.spawnItem(new ItemStack(removedEntity.typeId), loca);
    }, 2);
}

world.afterEvents.playerInteractWithEntity.subscribe(event => {
    // world.sendMessage("playerInteractWithEntity");
    let beforeItemStack = event.beforeItemStack as ItemStack;
    let target = event.target as Entity;
    // world.sendMessage(target.typeId);
});