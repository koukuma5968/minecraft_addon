import { Entity, EntityInitializationCause, ItemStack, Player, system, world } from "@minecraft/server";
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
});

// エンティティがスポーンした時に呼ばれるイベント
world.afterEvents.entitySpawn.subscribe(event => {
    // スポーンしたエンティティ
    let entity = event.entity;
    // どうやってスポーンしたか
    let cause = event.cause;
    // スポーンしたエンティティをメッセージに送る（ただの文字結合でもOK、RawMessageのtranslateを使うと多言語に対応できる）
    if (cause == "Born") {
        // 繁殖によって生まれた時
        let mess = {translate : "mess.entity_spawn.Born", with: [entity.typeId]};
        world.sendMessage(mess);
    } else if (cause == "Transformed") {
        // ドラウンドやウィッチなどに変化した時
        let mess = {translate : "mess.entity_spawn.Transformed", with: [entity.typeId]};
        world.sendMessage(mess);
    }
});

// エンティティ削除前
world.beforeEvents.entityRemove.subscribe(event => {
    let removedEntity = event.removedEntity;
    removeArrow(removedEntity);
    removeSpear(removedEntity);
});

// アイテム使用リリース
world.afterEvents.itemReleaseUse.subscribe(event => {
    let player = event.source;
    let item = event.itemStack;
    if (item != undefined) {
        if (item.typeId.indexOf("spear") != -1) {
            releaseSpear(player, item);
        }
    }
});

// アイテム使用停止
world.afterEvents.itemStopUse.subscribe(event => {
    let player = event.source;
    let item = event.itemStack;
    if (item != undefined) {
        if (item.typeId.indexOf("spear") != -1) {
            stopSpear(player);
        }
    }
});

// エンティティスポーン
world.afterEvents.entitySpawn.subscribe(event => {
    let cause = event.cause;
    let entity = event.entity;
    if (EntityInitializationCause.Spawned == cause) {
        spawnSpear(entity);
    }
});

// 遠距離hit後
world.afterEvents.projectileHitEntity.subscribe(event => {
    let projectileEn = event.projectile;
    let source = event.source as Entity
    let hitEn = event.getEntityHit().entity as Entity;
    let hitVector = event.hitVector;
    if (source != undefined && source instanceof Player) {
        hitSpear(source, projectileEn);
    }
});

// 遠距離ブロックhit後
world.afterEvents.projectileHitBlock.subscribe(event => {
    let projectileEn = event.projectile;
    let source = event.source as Entity
    if (source != undefined && source instanceof Player) {
        hitSpear(source, projectileEn);
    }
});

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