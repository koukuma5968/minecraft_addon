import { ItemCustomComponent, ItemStack, ItemComponentUseEvent, Player, EntityComponentTypes, EntityEquippableComponent, EquipmentSlot } from "@minecraft/server";
import { KekkizyutuClassRecord, KekkizyutuObject, KekkizyutuObjects } from "../KekkizyutuTypes";
import { KokyuObject } from "../NichirintouTypes";

export class KekkizyutuComponent implements ItemCustomComponent {

    // 右クリック
    onUse(event:ItemComponentUseEvent) {
        let player = event.source as Player;
        let itemStack = event.itemStack as ItemStack;

        if (player.isSneaking) {
            const kekkizyutu = player.getProperty("kurokumaft:kekkizyutu_type") as number;
            const object = KekkizyutuObjects.find(ob => ob.type == kekkizyutu) as KekkizyutuObject;
            const kekkizyutuClass = KekkizyutuClassRecord[object.className];
            const kekkizyutuObject = new kekkizyutuClass();
            kekkizyutuObject.changeZyutu(player);
            return;
        } else {
            if (!player.getProperty("kurokumaft:kokyu_use")) {
                const equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
                const mainHand = equ.getEquipment(EquipmentSlot.Mainhand);
                if (mainHand != undefined) {
                    const object = KekkizyutuObjects.find(ob => ob.itemName == mainHand.typeId) as KekkizyutuObject;
                    const kekkizyutuClass = KekkizyutuClassRecord[object.className];
                    const kekkizyutuObject = new kekkizyutuClass();
                    player.setProperty("kurokumaft:kokyu_use", true);
                    player.setProperty("kurokumaft:kokyu_particle", true);
                    kekkizyutuObject.useAttackZyutu(player);
                }
            }
        }
    }

}
