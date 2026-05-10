import { ItemCustomComponent, ItemStack, ItemComponentUseEvent, Player, world, EntityComponentTypes, EntityEquippableComponent, EquipmentSlot } from "@minecraft/server";
import { KokyuObjects, KokyuObject, changeKokyuKata, useAttackKokyuKata, releaseAttackKata } from "../NichirintouTypes";

export class NichirintouComponent implements ItemCustomComponent {

    // 右クリック
    onUse(event:ItemComponentUseEvent) {
        const player = event.source as Player;
        const itemStack = event.itemStack as ItemStack;

        if (player.isSneaking) {
            const nichirintou = player.getProperty("kurokumaft:nichirintou_type") as number;
            const object = KokyuObjects.find(ob => ob.type === nichirintou) as KokyuObject;
            changeKokyuKata(player, object.className);
            return;
        } else {
            if (!player.getProperty("kurokumaft:kokyu_use")) {
                const equippable = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
                const mainHand = equippable.getEquipment(EquipmentSlot.Mainhand);
                if (mainHand !== undefined) {
                    const object = KokyuObjects.find(ob => ob.itemName === itemStack.typeId) as KokyuObject;
                    useAttackKokyuKata(player, itemStack, object.className);
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
    const nichirintou = player.getProperty("kurokumaft:nichirintou_type");
    if (item !== undefined && nichirintou !== undefined && nichirintou !== 0) {
        if (player.getProperty("kurokumaft:kokyu_use")) {
            const object = KokyuObjects.find(ob => ob.type === nichirintou) as KokyuObject;
            releaseAttackKata(player, item, duration, object.className);
        }
    }
});

