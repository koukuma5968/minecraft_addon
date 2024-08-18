import { WorldInitializeBeforeEvent } from "@minecraft/server";
import { FireBallShot } from "../weapon/wand/FireMagicWand";

/**
 * カスタムコンポーネントの登録
 * @param {WorldInitializeBeforeEvent} initEvent
 */
function registerCustomComponentFunction(initEvent:WorldInitializeBeforeEvent) {

    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:fire_ball', new FireBallShot());
  
}

export {registerCustomComponentFunction}
