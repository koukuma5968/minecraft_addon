import { TntSwordBreak } from "../items/weapons/sword/TntSwordBreak";
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
import { WeaponMineDurability } from "../items/tool/WeaponMineDurability";
import { FireBrand } from "../items/axe/FireBrand";
import { AxeStripped } from "../items/axe/AxeStripped";
import { FlametHrower } from "../items/weapons/gun/FlametHrower";
import { MachineGun } from "../items/weapons/gun/MachineGun";
import { SniperRifle } from "../items/weapons/gun/SniperRifle";
import { ThrowableHammer } from "../items/weapons/hammer/ThrowableHammer";
import { HammerAttack } from "../items/weapons/hammer/HammerAttack";
import { WardenHammer } from "../items/weapons/hammer/WardenHammer";
import { ShellShot } from "../items/weapons/fort/ShellShot";
import { BaristaShot } from "../items/weapons/fort/BaristaShot";
import { ThrowableBoomerang } from "../items/weapons/boomerang/ThrowableBoomerang";
import { ChocolateCakeBlock } from "../block/ChocolateCakeBlock";
import { BuddingMithril } from "../block/mithril/BuddingMithril";
import { MithrilBlock } from "../block/mithril/MithrilBlock";
import { MithrilBudGrowth } from "../block/mithril/MithrilBudGrowth";
import { FortuneDestroy } from "../block/FortuneDestroy";
import { HoeFarming } from "../items/hoe/HoeFarming";
import { PlantsGrowth } from "../block/plants/PlantsGrowth";
import { GrowthMeal } from "../items/meal/GrowthMeal";
import { PotionEffect } from "../items/potion/PotionEffect";
import { BakutikuFlint } from "../block/bom/BakutikuFlint";
import { BakutikuFire } from "../block/bom/BakutikuFire";
import { TearEnchant } from "../block/TearEnchant";
import { SniperSteelBow } from "../items/weapons/bow/SniperSteelBow";
import { Battleaxe } from "../items/weapons/battleaxe/Battleaxe";
import { CrossBone } from "../items/weapons/battleaxe/CrossBone";
import { CopperBucket } from "../items/bucket/CopperBucket";
import { CopperBucketLava } from "../items/bucket/CopperBucketLava";
import { CopperBucketMilk } from "../items/bucket/CopperBucketMilk";
import { CopperBucketWater } from "../items/bucket/CopperBucketWater";
import { OliveGrowth } from "../block/plants/OliveGrowth";
import { Fryer } from "../block/Fryer";
import { AxeBatchDestruction } from "../items/axe/AxeBatchDestruction";
import { HoeBatchDestruction } from "../items/hoe/HoeBatchDestruction";
import { StraightDownHole } from "../items/shovel/StraightDownHole";
import { PicRangeDestruction } from "../items/pickaxe/PicRangeDestruction";
import { StartupEvent } from "@minecraft/server";

/**
 * カスタムコンポーネントの登録
 * @param {StartupEvent} initEvent
 */
function initWeaponsRegisterCustom(initEvent:StartupEvent) {

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

    // ハンマースロー
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:thrown_hammer', new ThrowableHammer());
    // ハンマーアタック
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:hammer_attack', new HammerAttack());
    // ウォーデンハンマー
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:warden_hammer', new WardenHammer());

    // バリスタ
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:barista_shot', new BaristaShot());
    // 戦車砲弾
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:shell_shot', new ShellShot());

    // ブーメランスロー
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:throwable_boomerang', new ThrowableBoomerang());

    // シックル
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:sickle_change', new Sickle());
    // サイス
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:scythe_change', new Scythe());

    // バトルアックス
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:battleaxe_slash', new Battleaxe());
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:cross_bone', new CrossBone());

    // ナックル
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:charge_knuckle', new ChargeKnuckle());

    // ガトリング
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:gatling', new Gatling());
    // マシンガン
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:machine_gun', new MachineGun());
    // 火炎放射器
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:flamethrower', new FlametHrower());
    // スナイパーライフル
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:sniper_rifle', new SniperRifle());

    // スナイパーボウ
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:sniper_steel_bow', new SniperSteelBow());

    // ピッケル
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:pic_range_destruction', new PicRangeDestruction());

    // シャベル
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:shovel_pavement', new ShovelPavement());
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:straight_down_hole', new StraightDownHole());

    // 斧
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:axe_stripped', new AxeStripped());
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:batch_destruction', new AxeBatchDestruction());

    // くわ
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:hoe_farming', new HoeFarming());
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:batch_destruction_hoe', new HoeBatchDestruction());

    // ファイアブランド
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:fire_brand', new FireBrand());

    // 採掘耐久減少
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:weapon_mine_durability', new WeaponMineDurability());

    // 植物成長
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:growth_meal', new GrowthMeal());

    // ポーション
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:potion_effect', new PotionEffect());

    // 銅のバケツ
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:copper_bucket', new CopperBucket());
    // 銅の水バケツ
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:copper_bucket_water', new CopperBucketWater());
    // 銅のマグマバケツ
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:copper_bucket_lava', new CopperBucketLava());
    // 銅の牛乳バケツ
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:copper_bucket_milk', new CopperBucketMilk());

    // ブロック類
    // チョコレートケーキブロック
    initEvent.blockComponentRegistry.registerCustomComponent('kurokumaft:chocolate_cake_eat', new ChocolateCakeBlock());
    // ミスリルブロック
    initEvent.blockComponentRegistry.registerCustomComponent('kurokumaft:mithril_block', new MithrilBlock());
    initEvent.blockComponentRegistry.registerCustomComponent('kurokumaft:budding_mithril', new BuddingMithril());
    initEvent.blockComponentRegistry.registerCustomComponent('kurokumaft:mithril_bud_growth', new MithrilBudGrowth());

    // 幸運エンチャント
    initEvent.blockComponentRegistry.registerCustomComponent('kurokumaft:fortune_destroy', new FortuneDestroy());

    // 植物成長
    initEvent.blockComponentRegistry.registerCustomComponent('kurokumaft:plants_growth', new PlantsGrowth());
    initEvent.blockComponentRegistry.registerCustomComponent('kurokumaft:olive_growth', new OliveGrowth());

    // 爆竹
    initEvent.blockComponentRegistry.registerCustomComponent('kurokumaft:bakutiku_flint', new BakutikuFlint());
    initEvent.blockComponentRegistry.registerCustomComponent('kurokumaft:bakutiku_fire', new BakutikuFire());

    // エンチャントリリース
    initEvent.blockComponentRegistry.registerCustomComponent('kurokumaft:tear_enchant', new TearEnchant());

    // フライヤー
    initEvent.blockComponentRegistry.registerCustomComponent('kurokumaft:fryer', new Fryer());

}

export {initWeaponsRegisterCustom}
