import { WorldInitializeBeforeEvent } from "@minecraft/server";
import { ExtremelyHotSpray } from "../items/ExtremelyHotSpray";
import { PelletGrassBlock } from "../block/PelletGrass";
import { OniyonsBlock } from "../block/Oniyons";

/**
 * カスタムコンポーネントの登録
 * @param {WorldInitializeBeforeEvent} initEvent
 */
function initPikuminRegisterCustom(initEvent:WorldInitializeBeforeEvent) {

    // アイテム類
    // 唐辛子スプレー
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:extremely_hot_spray', new ExtremelyHotSpray());

    // ブロック類
    // ペレット
    initEvent.blockComponentRegistry.registerCustomComponent('kurokumaft:pellet_grass', new PelletGrassBlock());
    // オニヨン
    initEvent.blockComponentRegistry.registerCustomComponent('kurokumaft:oniyon_block', new OniyonsBlock());

}

export {initPikuminRegisterCustom}
