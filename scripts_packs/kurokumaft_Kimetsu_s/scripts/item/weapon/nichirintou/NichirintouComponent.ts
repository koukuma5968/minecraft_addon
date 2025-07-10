import { ItemCustomComponent, ItemStack, ItemComponentUseEvent, Player, world, EntityComponentTypes, EntityEquippableComponent, EquipmentSlot } from "@minecraft/server";
import { KokyuObjects, KokyuObject, kokyuClassRecord } from "../NichirintouTypes";

export class NichirintouComponent implements ItemCustomComponent {

    // 右クリック
    onUse(event:ItemComponentUseEvent) {
        let player = event.source as Player;
        let itemStack = event.itemStack as ItemStack;

        if (player.isSneaking) {
            const nichirintou = player.getProperty("kurokumaft:nichirintou_type") as number;
            const object = KokyuObjects.find(ob => ob.type === nichirintou) as KokyuObject;
            const kokyuClass = kokyuClassRecord[object.className];
            const kokyuObject = new kokyuClass();
            kokyuObject.changeKata(player);
            return;
        } else {
            if (!player.getProperty("kurokumaft:kokyu_use")) {
                const equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
                const mainHand = equ.getEquipment(EquipmentSlot.Mainhand);
                if (mainHand !== undefined) {
                    const object = KokyuObjects.find(ob => ob.itemName === mainHand.typeId) as KokyuObject;
                    // const nichirintou = player.getProperty("kurokumaft:nichirintou_type") as number;
                    // const object = KokyuObjects.find(ob => ob.type === nichirintou) as KokyuObject;
                    const kokyuClass = kokyuClassRecord[object.className];
                    const kokyuObject = new kokyuClass();
                    player.setProperty("kurokumaft:kokyu_use", true);
                    player.setProperty("kurokumaft:kokyu_particle", true);
                    kokyuObject.useAttackKata(player, itemStack);
                }
            }
   
        }
    }

}
