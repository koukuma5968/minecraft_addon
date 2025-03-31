import { ItemCustomComponent, ItemStack, ItemComponentUseEvent, Player, world } from "@minecraft/server";
import { KokyuObjects, KokyuObject, kokyuClassRecord } from "../NichirintouTypes";

export class NichirintouComponent implements ItemCustomComponent {

    // 右クリック
    onUse(event:ItemComponentUseEvent) {
        let player = event.source as Player;
        let itemStack = event.itemStack as ItemStack;

        if (!player.getProperty("kurokumaft:kokyu_use")) {
            let nichirintou = player.getProperty("kurokumaft:nichirintou_type");
            let object = KokyuObjects.find(ob => ob.type == nichirintou) as KokyuObject;
            let kokyuClass = kokyuClassRecord[object.className];
            let kokyuObject = new kokyuClass();
            player.setProperty("kurokumaft:kokyu_use", true);
            player.setProperty("kurokumaft:kokyu_particle", true);
            kokyuObject.useAttackKata(player, itemStack);
        }
    }

}
