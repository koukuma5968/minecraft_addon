import { ItemCustomComponent, ItemStack, ItemComponentUseEvent, Player } from "@minecraft/server";
import { KekkizyutuClassRecord, KekkizyutuObject, KekkizyutuObjects } from "../KekkizyutuTypes";

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
                const kekkizyutu = player.getProperty("kurokumaft:kekkizyutu_type") as number;
                const object = KekkizyutuObjects.find(ob => ob.type == kekkizyutu) as KekkizyutuObject;
                const kekkizyutuClass = KekkizyutuClassRecord[object.className];
                const kekkizyutuObject = new kekkizyutuClass();
                player.setProperty("kurokumaft:kokyu_use", true);
                player.setProperty("kurokumaft:kokyu_particle", true);
                kekkizyutuObject.useAttackZyutu(player);
            }
        }
    }

}
