import { Container, Entity, EntityComponentTypes, EntityEquippableComponent, EntityInventoryComponent, EquipmentSlot, ItemStack, Player, system, world } from "@minecraft/server";
import { ItemDurability } from "./item/ItemDurability";
import { FortuneDestroy } from "./block/FortuneDestroy";

// ワールド生成時
world.beforeEvents.worldInitialize.subscribe(initEvent => {
    // アイテムカスタムコンポーネントの登録
    initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:item_durability", new ItemDurability());
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

world.beforeEvents.entityRemove.subscribe(event => {
    let removedEntity = event.removedEntity;
    removeArrow(removedEntity);

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