import { WorldInitializeBeforeEvent } from "@minecraft/server";
import { NichirintouComponent } from "../item/weapon/nichirintou/NichirintouComponent";
import { BloodDrinking } from "../item/tool/BloodDrinking";
import { KekkizyutuComponent } from "../item/weapon/kekkizyutu/KekkizyutuComponent";

/**
 * カスタムコンポーネントの登録
 * @param {WorldInitializeBeforeEvent} initEvent
 */
function initRegisterKimetuCustom(initEvent:WorldInitializeBeforeEvent) {

    // アイテム類
    // 日輪刀
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:nichirintou_component', new NichirintouComponent());
    // 血飲み
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:blood_drinking', new BloodDrinking());

    // 血気術
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:kekkizyutu_component', new KekkizyutuComponent());

    // ブロック類
//    initEvent.blockComponentRegistry.registerCustomComponent('kurokumaft:torchlight_block', new TorchlightBlock());

}

export {initRegisterKimetuCustom}
