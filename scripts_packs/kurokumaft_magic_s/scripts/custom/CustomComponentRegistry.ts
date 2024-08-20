import { WorldInitializeBeforeEvent } from "@minecraft/server";
import { WandWeaponMagic } from "../weapon/wand/WandWeaponMagic";
import { ShieldMagic } from "../weapon/shield/ShieldMagic";
import { SwordWeaponMagic, SwordWeaponMagicMons } from "../weapon/sword/SwordWeaponMagic";

/**
 * カスタムコンポーネントの登録
 * @param {WorldInitializeBeforeEvent} initEvent
 */
function registerCustomComponentFunction(initEvent:WorldInitializeBeforeEvent) {

    // ワンド系
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:wand_magic', new WandWeaponMagic());

    // ソード系
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:sword_magic', new SwordWeaponMagic());
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:sword_magic_monster', new SwordWeaponMagicMons());

    // シールド
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:shield_magic', new ShieldMagic());
  
}

export {registerCustomComponentFunction}
