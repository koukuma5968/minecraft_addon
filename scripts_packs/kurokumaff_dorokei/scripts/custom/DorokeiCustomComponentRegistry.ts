import { StartupEvent } from "@minecraft/server";
import { KeibouComponent } from "../item/KeibouComponent";
import { SystemBoardBlock } from "../block/SystemBoardBlock";

/**
 * カスタムコンポーネントの登録
 * @param {StartupEvent} initEvent
 */
function initRegisterDorokeiCustom(initEvent:StartupEvent) {

    // アイテム類
    initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:keibou_component", new KeibouComponent());

    initEvent.blockComponentRegistry.registerCustomComponent("kurokumaft:systemboard_component", new SystemBoardBlock());
}

export {initRegisterDorokeiCustom}
