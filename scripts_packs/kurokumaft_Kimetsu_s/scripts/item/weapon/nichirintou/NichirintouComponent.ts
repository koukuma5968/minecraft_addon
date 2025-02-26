import { ItemCustomComponent, ItemStack, ItemComponentUseEvent, Player, world } from "@minecraft/server";
import { KokyuObjects, KokyuObject, kokyuClassRecord } from "../NichirintouTypes";

export class NichirintouComponent implements ItemCustomComponent {

    // 右クリック
    onUse(event:ItemComponentUseEvent) {
        world.sendMessage("kokyu_use");
        let player = event.source as Player;
        let itemStack = event.itemStack as ItemStack;
        player.setProperty("kurokumaft:kokyu_use", true);

        let nichirintou = player.getProperty("kurokumaft:nichirintou_type");
        let object = KokyuObjects.find(ob => ob.type == nichirintou) as KokyuObject;
        let kokyuClass = kokyuClassRecord[object.className];
        let kokyuObject = new kokyuClass();
        kokyuObject.useAttackKata(player, itemStack);
    }

}
