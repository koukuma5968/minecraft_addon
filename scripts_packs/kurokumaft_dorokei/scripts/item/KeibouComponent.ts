import { ItemCustomComponent, ItemComponentHitEntityEvent, Vector3, world} from "@minecraft/server";

export class KeibouComponent implements ItemCustomComponent {

    // 攻撃ヒット
    onHitEntity(event:ItemComponentHitEntityEvent) {
        const hitEntity = event.hitEntity;
        const tp_point = world.getDynamicProperty("tp_point") as Vector3;
        if (tp_point !== undefined) {
            hitEntity.setDynamicProperty("ensure", true);
            hitEntity.teleport(tp_point);
        }
    }

}
