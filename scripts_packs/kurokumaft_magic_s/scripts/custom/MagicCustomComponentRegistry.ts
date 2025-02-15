import { WorldInitializeBeforeEvent } from "@minecraft/server";
import { WandWeaponMagic } from "../items/weapon/wand/WandWeaponMagic";
import { SwordWeaponMagic, SwordWeaponMagicMons } from "../items/weapon/sword/SwordWeaponMagic";
import { BowShotMagic } from "../items/weapon/bow/BowWeaponMagic";
import { checkMagicPlayerEquTick } from "../player/MagicArmorEquipment";
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
import { MagicLogNutEat } from "../items/food/lognut/MagicLogNutEat";
import { DiamondBottle } from "../items/potion/DiamondBottle";
import { MagicBrewingStandBlock } from "../block/MagicBrewingStand";
import { MagicPotionDrink } from "../items/potion/MagicPotionDrink";
import { MagicMineDurability } from "../items/tool/MagicMineDurability";
import { PicMagicAttack, PicMagicTool } from "../items/pickaxe/MagicPickaxe";

/**
 * カスタムコンポーネントの登録
 * @param {WorldInitializeBeforeEvent} initEvent
 */
function initRegisterMagicCustom(initEvent:WorldInitializeBeforeEvent) {

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

    // 魔樹の実
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:magic_log_nut', new MagicLogNutEat());

    // ダイヤモンドの瓶
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:diamond_bottle', new DiamondBottle());

    // 魔法薬
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:magic_potion', new MagicPotionDrink());

    // 召喚石
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:summon_stone', new SummonStoneMagic());

    // 採掘耐久減少
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:mine_durability', new MagicMineDurability());

    // 魔法のピッケル
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:pic_magic_attack', new PicMagicAttack());
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:pic_magic_tool', new PicMagicTool());

    // ブロック類
    // トーチライトブロック
    initEvent.blockComponentRegistry.registerCustomComponent('kurokumaft:torchlight_block', new TorchlightBlock());

    // 魔導書見台ブロック
    initEvent.blockComponentRegistry.registerCustomComponent('kurokumaft:magic_lectern', new MagicLecternBlock());

    // 秘薬台ブロック
    initEvent.blockComponentRegistry.registerCustomComponent('kurokumaft:magic_brewing', new MagicBrewingStandBlock());

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
function initMagicStateChangeMonitor(initEvent:WorldInitializeBeforeEvent) {
    checkMagicPlayerEquTick();
}

export {initRegisterMagicCustom, initMagicStateChangeMonitor}