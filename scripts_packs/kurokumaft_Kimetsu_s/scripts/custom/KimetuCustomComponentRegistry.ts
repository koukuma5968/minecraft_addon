import { WorldInitializeBeforeEvent } from "@minecraft/server";
import { Nichirintou } from "../item/weapon/nichirintou/Nichirintou";
import { NichirintouTanjiro } from "../item/weapon/nichirintou/NichirintouTanjiro";
import { NichirintouGenya } from "../item/weapon/nichirintou/NichirintouGenya";
import { NichirintouGiyu } from "../item/weapon/nichirintou/NichirintouGiyu";
import { NichirintouGyoumei } from "../item/weapon/nichirintou/NichirintouGyoumei";
import { NichirintouHana } from "../item/weapon/nichirintou/NichirintouHana";
import { NichirintouHi } from "../item/weapon/nichirintou/NichirintouHi";
import { NichirintouHono } from "../item/weapon/nichirintou/NichirintouHono";
import { NichirintouInosuke } from "../item/weapon/nichirintou/NichirintouInosuke";
import { NichirintouKaminari } from "../item/weapon/nichirintou/NichirintouKaminari";
import { NichirintouKanawo } from "../item/weapon/nichirintou/NichirintouKanawo";
import { NichirintouKaze } from "../item/weapon/nichirintou/NichirintouKaze";
import { NichirintouKoi } from "../item/weapon/nichirintou/NichirintouKoi";
import { NichirintouKyouzyuro } from "../item/weapon/nichirintou/NichirintouKyouzyuro";
import { NichirintouMituri } from "../item/weapon/nichirintou/NichirintouMituri";
import { NichirintouMizu } from "../item/weapon/nichirintou/NichirintouMizu";
import { NichirintouMuitiro } from "../item/weapon/nichirintou/NichirintouMuitiro";
import { NichirintouMushi } from "../item/weapon/nichirintou/NichirintouMushi";
import { NichirintouObanai } from "../item/weapon/nichirintou/NichirintouObanai";
import { NichirintouOto } from "../item/weapon/nichirintou/NichirintouOto";
import { NichirintouSanemi } from "../item/weapon/nichirintou/NichirintouSanemi";
import { NichirintouShinobu } from "../item/weapon/nichirintou/NichirintouShinobu";
import { NichirintouTengen } from "../item/weapon/nichirintou/NichirintouTengen";
import { NichirintouZenitu } from "../item/weapon/nichirintou/NichirintouZenitu";
import { KekkizyutuBakketu } from "../item/weapon/kekkizyutu/KekkizyutuBakketu";
import { KekkizyutuHakaisatu } from "../item/weapon/kekkizyutu/KekkizyutuHakaisatu";
import { KekkizyutuKoushi } from "../item/weapon/kekkizyutu/KekkizyutuKoushi";
import { KekkizyutuTigama } from "../item/weapon/kekkizyutu/KekkizyutuTigama";
import { KekkizyutuUltrasonic } from "../item/weapon/kekkizyutu/KekkizyutuUltrasonic";
import { checkPlayerKimetuEquTick } from "../player/KimetuEquipmentTick";

/**
 * カスタムコンポーネントの登録
 * @param {WorldInitializeBeforeEvent} initEvent
 */
function initRegisterKimetuCustom(initEvent:WorldInitializeBeforeEvent) {

    // アイテム類
    // 日輪刀
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:nichirintou', new Nichirintou());
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:nichirintou_tanjiro', new NichirintouTanjiro());
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:nichirintou_zenitu', new NichirintouZenitu());
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:nichirintou_inosuke', new NichirintouInosuke());
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:nichirintou_kanawo', new NichirintouKanawo());
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:nichirintou_genya', new NichirintouGenya());
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:nichirintou_giyu', new NichirintouGiyu());
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:nichirintou_shinobu', new NichirintouShinobu());
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:nichirintou_kyouzyuro', new NichirintouKyouzyuro());
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:nichirintou_tengen', new NichirintouTengen());
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:nichirintou_obanai', new NichirintouObanai());
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:nichirintou_sanemi', new NichirintouSanemi());
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:nichirintou_mituri', new NichirintouMituri());
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:nichirintou_muitiro', new NichirintouMuitiro());
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:nichirintou_gyoumei', new NichirintouGyoumei());
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:nichirintou_mizu', new NichirintouMizu());
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:nichirintou_hi', new NichirintouHi());
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:nichirintou_kaminari', new NichirintouKaminari());
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:nichirintou_hono', new NichirintouHono());
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:nichirintou_mushi', new NichirintouMushi());
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:nichirintou_hana', new NichirintouHana());
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:nichirintou_koi', new NichirintouKoi());
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:nichirintou_oto', new NichirintouOto());
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:nichirintou_kaze', new NichirintouKaze());
    
    // 血気術
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:kekkizyutu_bakketu', new KekkizyutuBakketu());
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:kekkizyutu_tigama', new KekkizyutuTigama());
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:kekkizyutu_hakaisatu', new KekkizyutuHakaisatu());
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:kekkizyutu_koushi', new KekkizyutuKoushi());
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:kekkizyutu_ultrasonic', new KekkizyutuUltrasonic());

    // ブロック類
//    initEvent.blockComponentRegistry.registerCustomComponent('kurokumaft:torchlight_block', new TorchlightBlock());

}

/**
 * 監視スレッドの登録
 * @param {WorldInitializeBeforeEvent} initEvent
 */
function initStateChangeKimetuMonitor(initEvent:WorldInitializeBeforeEvent) {
    checkPlayerKimetuEquTick();
}

export {initRegisterKimetuCustom, initStateChangeKimetuMonitor}
