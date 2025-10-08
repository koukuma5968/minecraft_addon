import { KeibouComponent } from "../item/KeibouComponent";
import { SystemBoardBlock } from "../block/SystemBoardBlock";
import { StunGunComponent } from "../item/StunGunComponent";
import { LockableBarsOn } from "../block/LockableBarsOn";
import { WrapComponent } from "../block/WrapComponent";
/**
 * カスタムコンポーネントの登録
 * @param {StartupEvent} initEvent
 */
function initRegisterDorokeiCustom(initEvent) {
    // アイテム類
    initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:keibou_component", new KeibouComponent());
    initEvent.itemComponentRegistry.registerCustomComponent("kurokumaft:stun_gun_component", new StunGunComponent());
    initEvent.blockComponentRegistry.registerCustomComponent("kurokumaft:systemboard_component", new SystemBoardBlock());
    initEvent.blockComponentRegistry.registerCustomComponent("kurokumaft:lockable_bars_on", new LockableBarsOn());
    initEvent.blockComponentRegistry.registerCustomComponent("kurokumaft:wrap_component", new WrapComponent());
}
export { initRegisterDorokeiCustom };
//# sourceMappingURL=DorokeiCustomComponentRegistry.js.map