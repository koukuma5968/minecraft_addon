import { system, world, WorldInitializeBeforeEvent } from "@minecraft/server";
import { TntSwordBreak } from "../items/weapons/sword/TntSwordBreak";
import { checkPlayerEquTick } from "../player/armorEquipment";
import { MagmaSwordFire } from "../items/weapons/sword/MagmaSwordFire";
import { BuleSwordIce } from "../items/weapons/sword/BuleSwordIce";
import { MithrilSword } from "../items/weapons/sword/MithrilSword";
import { EchoSword } from "../items/weapons/sword/EchoSword";
import { CherrySword } from "../items/weapons/sword/CherrySword";
import { EnderDragonSword } from "../items/weapons/sword/EnderDragonSword";
import { WitherSword } from "../items/weapons/sword/WitherSword";
import { EnderEyeSword } from "../items/weapons/sword/EnderEyeSword";
import { ThrowableSpear } from "../items/weapons/spear/ThrowableSpear";
import { BlazeSpear } from "../items/weapons/spear/BlazeSpear";
import { CherrySpear } from "../items/weapons/spear/CherrySpear";
import { MithrilSpear } from "../items/weapons/spear/MithrilSpear";
import { Sickle } from "../items/weapons/sickle/Sickle";
import { Scythe } from "../items/weapons/scythe/Scythe";
import { ShovelPavement } from "../items/shovel/ShovelPavement";
import { Gatling } from "../items/weapons/gun/Gatling";
import { ChargeKnuckle } from "../items/weapons/knuckle/ChargeKnuckle";
import { MineDurability } from "../items/tool/MineDurability";
import { FireBrand } from "../items/axe/FireBrand";
import { AxeStripped } from "../items/axe/AxeStripped";

/**
 * カスタムコンポーネントの登録
 * @param {WorldInitializeBeforeEvent} initEvent
 */
function initRegisterCustom(initEvent:WorldInitializeBeforeEvent) {

    // アイテム類
    // TNTソード
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:tnt_sword', new TntSwordBreak());
    // 溶岩剣
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:magma_sword', new MagmaSwordFire());
    // 青氷剣
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:blue_ice_sword', new BuleSwordIce());
    // ミスリルソード
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:mithril_sword', new MithrilSword());
    // 残響の剣
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:echo_sword', new EchoSword());
    // 桜の剣
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:cherry_sword', new CherrySword());
    // エンダードラゴンソード
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:ender_dragon_sword', new EnderDragonSword());
    // 呪いの剣
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:wither_sword', new WitherSword());
    // 邪眼の剣
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:ender_eye_sword', new EnderEyeSword());

    // スピアースロー
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:throwable_spear', new ThrowableSpear());
    // 桜のやり
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:cherry_spear', new CherrySpear());
    // ブレイズスピアー
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:blaze_spear', new BlazeSpear());
    // ミスリルスピアー
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:mithril_spear', new MithrilSpear());

    // シックル
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:sickle_change', new Sickle());
    // サイス
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:scythe_change', new Scythe());

    // ナックル
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:charge_knuckle', new ChargeKnuckle());

    // ガトリング
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:gatling', new Gatling());

    // シャベル
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:shovel_pavement', new ShovelPavement());

    // 斧
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:axe_stripped', new AxeStripped());

    // ファイアブランド
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:fire_brand', new FireBrand());

    // 採掘耐久減少
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:mine_durability', new MineDurability());

    // ブロック類
    // // トーチライトブロック
    // initEvent.blockComponentRegistry.registerCustomComponent('kurokumaft:torchlight_block', new TorchlightBlock());

}

/**
 * 監視スレッドの登録
 * @param {WorldInitializeBeforeEvent} initEvent
 */
function initStateChangeMonitor(initEvent:WorldInitializeBeforeEvent) {
    checkPlayerEquTick();
}

export {initRegisterCustom, initStateChangeMonitor}