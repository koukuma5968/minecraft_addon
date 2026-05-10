import { StartupEvent } from "@minecraft/server";
import { MHUseItemEffect } from "../items/MHUseItemEffectComponents";
import { MHWeaponsItem } from "../items/weapons/MHWeaponsItemComponents";
import { MHArmorsItem } from "../items/armor/MHArmorsItemComponents";
import { MHMeatRoast } from "../items/other/MHMeatRoastComponent";
import { MHPlantsGrowth } from "../blocks/MHPlantsGrowth";
import { MHRecipeBookCraft } from "../blocks/MHRecipeBookCraft";

/**
 * カスタムコンポーネントの登録
 * @param {StartupEvent} initEvent
 */
function MHCustomComponentRegistry(initEvent:StartupEvent) {

    // アイテム類
    // 効果付与
    initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:mh_use_item_effect", new MHUseItemEffect());
    // 肉焼き
    initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:mh_meat_roast", new MHMeatRoast());

    // 武器
    initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:mh_wepons_custom", new MHWeaponsItem());

    // 防具
    initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:mh_armors_custom", new MHArmorsItem());

    // ブロック類
    // 調合書
    initEvent.blockComponentRegistry.registerCustomComponent("kurokumaft:recipe_book_craft", new MHRecipeBookCraft());
    // 植物成長
    initEvent.blockComponentRegistry.registerCustomComponent("kurokumaft:plants_growth", new MHPlantsGrowth());

}

export {MHCustomComponentRegistry}
