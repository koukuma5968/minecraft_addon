import { world } from "@minecraft/server";
export class KeibouComponent {
    // 攻撃ヒット
    onHitEntity(event) {
        const hitEntity = event.hitEntity;
        const tp_point = world.getDynamicProperty("tp_point");
        if (tp_point !== undefined) {
            hitEntity.setDynamicProperty("ensure", true);
            hitEntity.teleport(tp_point);
        }
    }
}
//# sourceMappingURL=KeibouComponent.js.map