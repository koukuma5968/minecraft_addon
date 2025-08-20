import { ExtremelyHotSpray } from "../items/ExtremelyHotSpray";
import { PelletGrassBlock } from "../block/PelletGrass";
import { OniyonsBlock } from "../block/Oniyons";
import { StartupEvent } from "@minecraft/server";
import { GekikaraFruitEat } from "../items/GekikaraFruitEat";

/**
 * カスタムコンポーネントの登録
 * @param {StartupEvent} initEvent
 */
function initPikuminRegisterCustom(initEvent:StartupEvent) {

    // アイテム類
    // 唐辛子スプレー
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:extremely_hot_spray', new ExtremelyHotSpray());
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:gekikara_fruit_eat', new GekikaraFruitEat());

    // ブロック類
    // ペレット
    initEvent.blockComponentRegistry.registerCustomComponent('kurokumaft:pellet_grass', new PelletGrassBlock());
    // オニヨン
    initEvent.blockComponentRegistry.registerCustomComponent('kurokumaft:oniyon_block', new OniyonsBlock());

}

export {initPikuminRegisterCustom}
