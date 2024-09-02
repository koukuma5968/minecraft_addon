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

/**
 * カスタムコンポーネントの登録
 * @param {WorldInitializeBeforeEvent} initEvent
 */
function initRegisterCustom(initEvent:WorldInitializeBeforeEvent) {

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

    // 魔導書
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:summon_grimoire', new SummonGrimoireMagic());

}

/**
 * 監視スレッドの登録
 * @param {WorldInitializeBeforeEvent} initEvent
 */
function initStateChangeMonitor(initEvent:WorldInitializeBeforeEvent) {
    checkPlayerEquTick();
}

export {initRegisterCustom, initStateChangeMonitor}