import { ItemCustomComponent, ItemStack, ItemComponentUseEvent, Player, world, EntityEquippableComponent, EntityComponentTypes, EquipmentSlot } from "@minecraft/server";
import { KokyuObject, KokyuObjects } from "../NichirintouTypes";

const kokyu = Object.freeze([
    "msg.kurokumaft:mizu_kokyu1.name",
    "msg.kurokumaft:mizu_kokyu2.name",
    "msg.kurokumaft:mizu_kokyu3.name",
    "msg.kurokumaft:mizu_kokyu4.name",
    "msg.kurokumaft:mizu_kokyu5.name",
    "msg.kurokumaft:mizu_kokyu6.name",
    "msg.kurokumaft:mizu_kokyu7.name",
    "msg.kurokumaft:mizu_kokyu8.name",
    "msg.kurokumaft:mizu_kokyu9.name",
    "msg.kurokumaft:mizu_kokyu10.name",
    "msg.kurokumaft:hi_kokyu1.name",
    "msg.kurokumaft:hi_kokyu2.name",
    "msg.kurokumaft:hi_kokyu3.name",
    "msg.kurokumaft:hi_kokyu4.name",
    "msg.kurokumaft:hi_kokyu5.name",
    "msg.kurokumaft:hi_kokyu6.name",
    "msg.kurokumaft:hi_kokyu7.name",
    "msg.kurokumaft:hi_kokyu8.name",
    "msg.kurokumaft:hi_kokyu9.name",
    "msg.kurokumaft:hi_kokyu10.name",
    "msg.kurokumaft:hi_kokyu11.name",
    "msg.kurokumaft:hi_kokyu12.name"
]);

/**
 * 日輪刀（炭治郎）
 */
export class NichirintouTanjiro implements ItemCustomComponent {

    // 右クリック
    onUse(event:ItemComponentUseEvent) {
        let player = event.source as Player;
        player.setDynamicProperty("kokyu", true);
        player.setProperty("kurokumaft:kokyu_use", true);
    }

}

/**
 * 炭治郎 呼吸変更
 * @param {Player} player
 */
export async function changeTanjiro(player:Player) {

    let kata = player.getProperty("kurokumaft:kokyu_kata");
    let object = KokyuObjects[1] as KokyuObject;
    let index = object.kata.findIndex(num => num == kata);
    if (index != -1) {
        if (index < object.kata.length - 1) {
            player.setProperty("kurokumaft:kokyu_kata", object.kata[index + 1]);
            player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:tanjiro_kata" + object.kata[index + 1] + ".name\"}]}");
        } else {
            player.setProperty("kurokumaft:kokyu_kata", object.kata[0]);
            player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"msg.kurokumaft:tanjiro_kata1.name\"}]}");
        }
    }
}

/**
 * 炭治郎 呼吸
 * @param {ItemStack} itemStack
 * @param {Player} player
 */
export async function kokyuTanjiro(itemStack:ItemStack, player:Player) {

    let kata = player.getProperty("kurokumaft:kokyu_kata") as number;

    switch (kata) {
        case 1 :
            break;
        case 2 :
            break;
    }
    world.sendMessage(kata+"");
    player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"" + kokyu[kata-1] + "\"}]}");
}
