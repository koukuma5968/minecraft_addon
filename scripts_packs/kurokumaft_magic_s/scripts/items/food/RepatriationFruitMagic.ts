import { Block, EntityComponentTypes, EntityInventoryComponent, ItemComponentConsumeEvent, ItemComponentUseOnEvent, ItemCustomComponent, ItemStack, Player, world } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";

/**
 * 帰還のみ
 */
export class RepatriationFruitMagic implements ItemCustomComponent {

    onConsume(event:ItemComponentConsumeEvent) {
        const itemStack = event.itemStack as ItemStack;
        const player = event.source as Player;
        home_tp(player, itemStack);
    }
    onUseOn(event:ItemComponentUseOnEvent) {
        const player = event.source as Player;
        const itemStack = event.itemStack as ItemStack;
        const block = event.block as Block;
        if (block.typeId == "kurokumaft:home_gate") {
            homeSetDialog(player, itemStack, block);
        }
    }

}

/**
 * ホームゲートに転移場所設定
 * @param {Player} player
 * @param {ItemStack} item
 * @param {Block} block
 */
function homeSetDialog(player:Player, item:ItemStack, block:Block) {

    const modalForm = new ModalFormData().title({ translate: "mess.kurokumaft:homegate.title" });
    modalForm.textField({ translate: "mess.kurokumaft:homegate.textLabel" }, '');
    modalForm
        .show(player)
        .then(formData => {
            if (!formData.formValues) {
                return;
            }
            item.setLore(["base:" + formData.formValues[0],
                "x:"+block.location.x,"y:"+block.location.y,"x:"+block.location.z,
                block.dimension.id
            ]);
            const inventory = player.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
            if (inventory && inventory.container) {
                inventory.container.setItem(player.selectedSlotIndex, item);
                player.sendMessage({ translate: "mess.kurokumaft:homegate.commit" })
            }
        })
        .catch((error) => {
            return -1;
        });
};


/**
 * 帰還の実で転移
 * @param {Player} player
 * @param {ItemStack} item
 */
async function home_tp(player:Player, item:ItemStack) {
    const lores = item.getLore();
    if (lores.length > 0 && lores[0].length > 0) {
        const blockx = lores[1].substring(2);
        const blocky = lores[2].substring(2);
        const blockz = lores[3].substring(2);
        let homeDim;
        try {
            homeDim = world.getDimension(lores[4]);
        } catch (error) {
            homeDim = player.dimension;
        }
        // const home = homeDim.getBlock({x:Number(blockx),y:Number(blocky),z:Number(blockz)});
        // if (home != undefined && home.typeId == "kurokumaft:home_gate") {
            player.teleport({x:Number(blockx),y:Number(blocky)+1,z:Number(blockz)}, {
                dimension: homeDim
            });
        // } else {
        //     player.sendMessage({ translate: "mess.kurokumaft:homegate.lost"});
        // }
    }
};
