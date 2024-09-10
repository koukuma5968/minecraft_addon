import { system, world, WorldInitializeBeforeEvent } from "@minecraft/server";
import { WandWeaponMagic } from "../items/weapon/wand/WandWeaponMagic";
import { ShieldMagic } from "../items/weapon/shield/ShieldMagic";
import { SwordWeaponMagic, SwordWeaponMagicMons } from "../items/weapon/sword/SwordWeaponMagic";
import { BowShotMagic } from "../items/weapon/bow/BowWeaponMagic";
import { checkPlayerEquTick } from "../player/armorEquipment";
import { StickWeaponMagic } from "../items/weapon/stick/StickWeaponMagic";
import { RodWeaponMagic } from "../items/weapon/rod/RodWeaponMagic";
import { StaffWeaponMagic } from "../items/weapon/staff/StaffWeaponMagic";
import { BreadWeaponMagic } from "../items/weapon/bread/BreadWeaponMagic";
import { BazookaShotMagic } from "../items/weapon/bazooka/BazookaWeaponMagic";
import { GunShotMagic } from "../items/weapon/gun/GunWeaponMagic";
import { SummonGrimoireMagic } from "../items/weapon/grimoire/SummonGrimoireMagic";
import { TorchlightBlock } from "../block/TorchlightBlock";
import { LifeGrimoireBlockMagic, LifeGrimoireUseMagic } from "../items/weapon/grimoire/LifeGrimoireMagic";
import { SummonStoneMagic } from "../items/SummonStoneMagic";
import { MagicLecternBlock } from "../block/MagicLecternBlock";
import { WallBlock } from "../block/WallBlock";
import { FlagStoneMagic } from "../items/FlagStoneMagic";
import { BossSummonBlock } from "../block/BossSummonBlock";
import { PortalGateBlock } from "../block/PortalGateBlock";
import { PortalBlock } from "../block/PortalBlock";
import { RepatriationFruitMagic } from "../items/food/RepatriationFruitMagic";

/**
 * カスタムコンポーネントの登録
 * @param {WorldInitializeBeforeEvent} initEvent
 */
function initRegisterCustom(initEvent:WorldInitializeBeforeEvent) {

    // アイテム類
    // ワンド系
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:wand_magic', new WandWeaponMagic());
    // ロッド系
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:rod_magic', new RodWeaponMagic());
    // スティック系
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:stick_magic', new StickWeaponMagic());
    // スティック系
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:staff_magic', new StaffWeaponMagic());

    // ソード系
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:sword_magic', new SwordWeaponMagic());
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:sword_magic_monster', new SwordWeaponMagicMons());

    // 刀系
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:bread_magic', new BreadWeaponMagic());

    // シールド
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:shield_magic', new ShieldMagic());

    // 弓
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:bow_magic', new BowShotMagic());
    // 銃
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:gun_magic', new GunShotMagic());
    // バズーカ
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:bazooka_magic', new BazookaShotMagic());

    // 打ちがね
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:magic_flagstone', new FlagStoneMagic());

    // 魔導書
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:summon_grimoire', new SummonGrimoireMagic());
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:life_grimoire_block', new LifeGrimoireBlockMagic());
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:life_grimoire_item', new LifeGrimoireUseMagic());

    // 帰還の実
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:repatriation_fruit', new RepatriationFruitMagic());

    // 召喚石
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:summon_stone', new SummonStoneMagic());

    // ブロック類
    // トーチライトブロック
    initEvent.blockComponentRegistry.registerCustomComponent('kurokumaft:torchlight_block', new TorchlightBlock());

    // 魔導書見台ブロック
    initEvent.blockComponentRegistry.registerCustomComponent('kurokumaft:magic_lectern', new MagicLecternBlock());

    // ウォールブロック
    initEvent.blockComponentRegistry.registerCustomComponent('kurokumaft:wall_block', new WallBlock());

    // ボス召喚ブロック
    initEvent.blockComponentRegistry.registerCustomComponent('kurokumaft:boss_summon_block', new BossSummonBlock());

    // ポータルゲートブロック
    initEvent.blockComponentRegistry.registerCustomComponent('kurokumaft:portal_gate', new PortalGateBlock());
    initEvent.blockComponentRegistry.registerCustomComponent('kurokumaft:portal', new PortalBlock());

}

/**
 * 監視スレッドの登録
 * @param {WorldInitializeBeforeEvent} initEvent
 */
function initStateChangeMonitor(initEvent:WorldInitializeBeforeEvent) {
    checkPlayerEquTick();
}

export {initRegisterCustom, initStateChangeMonitor}