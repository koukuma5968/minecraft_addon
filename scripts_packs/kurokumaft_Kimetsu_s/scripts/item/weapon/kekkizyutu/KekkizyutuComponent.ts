import { ItemCustomComponent, ItemComponentUseEvent, Player, EntityComponentTypes, EntityEquippableComponent, EquipmentSlot, world } from "@minecraft/server";
import { KekkizyutuClassRecord, KekkizyutuObject, KekkizyutuObjects } from "../KekkizyutuTypes";

export class KekkizyutuComponent implements ItemCustomComponent {

    // 右クリック
    onUse(event:ItemComponentUseEvent) {
        const player = event.source as Player;

        if (player.isSneaking) {
            const kekkizyutu = player.getProperty("kurokumaft:kekkizyutu_type") as number;
            const object = KekkizyutuObjects.find(ob => ob.type === kekkizyutu) as KekkizyutuObject;
            const kekkizyutuClass = KekkizyutuClassRecord.get(object.className);
            if (kekkizyutuClass !== undefined) {
                kekkizyutuClass.changeZyutu(player);
            }
            return;
        } else {
            if (!player.getProperty("kurokumaft:kokyu_use")) {
                const equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
                const mainHand = equ.getEquipment(EquipmentSlot.Mainhand);
                if (mainHand !== undefined) {
                    const object = KekkizyutuObjects.find(ob => ob.itemName === mainHand.typeId) as KekkizyutuObject;
                    const kekkizyutuClass = KekkizyutuClassRecord.get(object.className);
                    if (kekkizyutuClass !== undefined) {
                        player.setProperty("kurokumaft:kokyu_use", true);
                        player.setProperty("kurokumaft:kokyu_particle", true);
                        kekkizyutuClass.useAttackZyutu(player);
                    }
                }
            }
        }
    }

}

// アイテム右クリックリリース後
world.afterEvents.itemReleaseUse.subscribe(event => {
    const player = event.source;
    const item = event.itemStack;
    const duration = event.useDuration;
    const kekkizyutu = player.getProperty("kurokumaft:kekkizyutu_type");
    if (item !== undefined && kekkizyutu !== undefined && kekkizyutu !== 0) {
        if (player.getProperty("kurokumaft:kokyu_use")) {
            const object = KekkizyutuObjects.find(ob => ob.type === kekkizyutu) as KekkizyutuObject;
            const kekkizyutuClass = KekkizyutuClassRecord.get(object.className);
            if (kekkizyutuClass !== undefined) {
                kekkizyutuClass.releaseAttackZyutu(player);
            }
        }
    }
});
