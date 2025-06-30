import { ItemCustomComponent, ItemComponentHitEntityEvent, world} from "@minecraft/server";

export class KeibouComponent implements ItemCustomComponent {

    // 攻撃ヒット
    onHitEntity(event:ItemComponentHitEntityEvent) {
        const hitEntity = event.hitEntity;
        world.sendMessage(hitEntity.typeId);
    }

}
