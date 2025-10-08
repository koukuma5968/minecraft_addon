import { StartupEvent } from "@minecraft/server";
import { CaneComponent } from "../items/CaneComponent";

/**
 * カスタムコンポーネントの登録
 * @param {StartupEvent} initEvent
 */
function initRegisterMashleCustom(initEvent:StartupEvent) {
    // 杖
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:cane_component', new CaneComponent());

}

export {initRegisterMashleCustom}
