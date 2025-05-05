import { WorldInitializeBeforeEvent } from "@minecraft/server";
import { NichirintouComponent } from "../item/weapon/nichirintou/NichirintouComponent";
import { KekkizyutuBakketu } from "../item/weapon/kekkizyutu/KekkizyutuBakketu";
import { KekkizyutuHakaisatu } from "../item/weapon/kekkizyutu/KekkizyutuHakaisatu";
import { KekkizyutuKoushi } from "../item/weapon/kekkizyutu/KekkizyutuKoushi";
import { KekkizyutuTigama } from "../item/weapon/kekkizyutu/KekkizyutuTigama";
import { KekkizyutuUltrasonic } from "../item/weapon/kekkizyutu/KekkizyutuUltrasonic";
import { BloodDrinking } from "../item/tool/BloodDrinking";

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
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:kekkizyutu_bakketu', new KekkizyutuBakketu());
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:kekkizyutu_tigama', new KekkizyutuTigama());
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:kekkizyutu_hakaisatu', new KekkizyutuHakaisatu());
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:kekkizyutu_koushi', new KekkizyutuKoushi());
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:kekkizyutu_ultrasonic', new KekkizyutuUltrasonic());

    // ブロック類
//    initEvent.blockComponentRegistry.registerCustomComponent('kurokumaft:torchlight_block', new TorchlightBlock());

}

export {initRegisterKimetuCustom}
