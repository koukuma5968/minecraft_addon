import { ItemStack, Player, EquipmentSlot, BlockCustomComponent, BlockComponentOnPlaceEvent, BlockComponentPlayerBreakEvent, BlockComponentPlayerInteractEvent, Container, EntityComponentTypes, world, EntityInventoryComponent, Block, EntityEquippableComponent, Dimension, BlockComponent, BlockComponentTypes, CustomComponentParameters } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { isGrimoireAllItemsId, getGrimoireAllObjectsId, GrimoireBook, getGrimoireObjectId, isGrimoireItemsObject, getGrimoireItemsMultiValue, isGrimoireAllItemsObject, getGrimoireAllItemsMultiValue, getGrimoireAllItemsId, getGrimoireAllItemsEvent } from "./magicLectern/GrimoireBookComponent";
import { isMagicStoneOject, getMagicStoneOjectByName, MagicStoneOjects } from "./magicLectern/MagicStoneComponet";

/**
 * 魔導書見台ブロック
 */
export class MagicLecternBlock implements BlockCustomComponent {

    onPlayerBreak(blockEvent:BlockComponentPlayerBreakEvent) {
        const block = blockEvent.block;
        const dimension = blockEvent.dimension;
        magic_lectern_break(block, dimension);
    }

    onPlayerInteract(blockEvent:BlockComponentPlayerInteractEvent) {
        const player = blockEvent.player as Player;
        world.sendMessage(player.typeId);
        const equ = player?.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        const item = equ.getEquipment(EquipmentSlot.Mainhand) as ItemStack;
        const block = blockEvent.block;
        const dimension = blockEvent.dimension;
        magic_lectern(player, item, block)
    }
}

/**
 * 魔導書見台
 * @param {Player} player
 * @param {ItemStack} item
 * @param {Block} block
 */
function magic_lectern(player:Player, item:ItemStack, block:Block) {
    const blockPer = block.permutation;

    const block_entitys = block.dimension.getEntitiesAtBlockLocation({x:block.location.x,y:block.location.y+1,z:block.location.z});
    const grimoire_entity = block_entitys.find(en => en.typeId === "kurokumaft:grimoire_book_entity");
    const magic_stone_entity = block_entitys.find(en => en.typeId === "kurokumaft:magic_stone_entity");

    world.sendMessage(""+item);
    if (item !== undefined) {
        world.sendMessage(item.typeId);
        if (isGrimoireAllItemsId(item.typeId)) {
            world.sendMessage("魔導書");
            world.sendMessage(""+grimoire_entity);
            if (grimoire_entity === undefined) {
                const grimoire_book_entity = block.dimension.spawnEntity("kurokumaft:grimoire_book_entity", {x:block.location.x+0.5,y:block.location.y+1,z:block.location.z+0.5});
                const bookObj = getGrimoireAllObjectsId(item.typeId) as GrimoireBook;
                grimoire_book_entity.triggerEvent(bookObj.event);
                const invent = grimoire_book_entity.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
                const container = invent.container as Container;
                const grimoire_empty = item.clone();
                grimoire_empty.amount = 1;
                container.addItem(grimoire_empty);

                const direction = blockPer.getState("minecraft:cardinal_direction");
                if (direction == "north") {
                    grimoire_book_entity.triggerEvent("kurokumaft:north");
                } else if (direction == "south") {
                    grimoire_book_entity.triggerEvent("kurokumaft:south");
                } else if (direction == "east") {
                    grimoire_book_entity.triggerEvent("kurokumaft:east");
                } else {
                    grimoire_book_entity.triggerEvent("kurokumaft:west");
                }

            }
        } else if (isMagicStoneOject(item.typeId)) {
            // print("魔法石");
            if (magic_stone_entity !== undefined) {
                magic_stone_entity.remove();
            }
            const new_magic_stone_entity = block.dimension.spawnEntity("kurokumaft:magic_stone_entity", {x:block.location.x+0.5,y:block.location.y+1,z:block.location.z+0.5});
            new_magic_stone_entity.setDynamicProperty("stone_life_count", 10);
            const stoneComp = getMagicStoneOjectByName(item.typeId) as MagicStoneOjects;

            new_magic_stone_entity.triggerEvent(stoneComp.event);

            const direction = blockPer.getState("minecraft:cardinal_direction");
            if (direction == "north") {
                new_magic_stone_entity.triggerEvent("kurokumaft:north");
            } else if (direction == "south") {
                new_magic_stone_entity.triggerEvent("kurokumaft:south");
            } else if (direction == "east") {
                new_magic_stone_entity.triggerEvent("kurokumaft:east");
            } else {
                new_magic_stone_entity.triggerEvent("kurokumaft:west");
            }

            const invent = new_magic_stone_entity.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
            const container = invent.container as Container;
            const magic_stone = item.clone();
            magic_stone.amount = 1;
            container.addItem(magic_stone);

        } else {
            // 魔導書セット済み
            if (grimoire_entity !== undefined) {
                const invent = grimoire_entity.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
                const container = invent.container as Container;
                const grimoire_book = container.getItem(0);
                if (grimoire_book == undefined) {
                    return;
                }

                const lore = grimoire_book.getLore();
                let remainingNum = 0;
                if (lore.length > 0) {
                    remainingNum = Number(lore[0].substring(3));
                }

                // 魔法石セット済み
                if (!block.matches(block.typeId,{"kurokumaft:stone_set": 0})) {
                    let new_grimoire_book;

                    const grimoireItemType = getGrimoireObjectId(grimoire_book.typeId);
                    // 空以外の魔導書がセットされている場合
                    if (grimoireItemType != "empty") {
                        // 魔導書に対応するアイテムでない場合は終了
                        if (!isGrimoireItemsObject(grimoireItemType, item.typeId)) {
                            noBookItem(player);
                            return;
                        }
                        const mulVal = getGrimoireItemsMultiValue(grimoireItemType, item.typeId) as number;
                        new_grimoire_book = grimoire_book;
                        if (new_grimoire_book.typeId == "kurokumaft:grimoire_music_sound") {
                            new_grimoire_book.setDynamicProperty(item.typeId, item.typeId);
                        }
                        remainingNum = remainingNum + (item.amount * mulVal);

                    // 空の魔導書の場合
                    } else {
                        // すべての魔導書に対応するアイテムでない場合は終了
                        if (!isGrimoireAllItemsObject(item.typeId)) {
                            noBookItem(player);
                            return;
                        }
                        const mulVal = getGrimoireAllItemsMultiValue(item.typeId);
                        remainingNum = remainingNum + (item.amount * mulVal);
                        const bookId = getGrimoireAllItemsId(item.typeId);
                        new_grimoire_book = new ItemStack(bookId, 1);
                        if (bookId == "kurokumaft:grimoire_music_sound") {
                            new_grimoire_book.setDynamicProperty(item.typeId, item.typeId);
                        }
                        const event = getGrimoireAllItemsEvent(bookId);
                        grimoire_entity.triggerEvent(event);
                    }
                    if (new_grimoire_book.typeId != "kurokumaft:grimoire_music_sound") {
                        new_grimoire_book.setLore(["残数：" + remainingNum]);
                    }

                    container.setItem(0, new_grimoire_book);

                    const equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
                    equ.setEquipment(EquipmentSlot.Mainhand);

                    const magic_stone_entitys = block.dimension.getEntitiesAtBlockLocation({x:block.location.x,y:block.location.y+1,z:block.location.z});
                    for (let i=0; i<magic_stone_entitys.length; i++) {
                        if (magic_stone_entitys[i].typeId == "kurokumaft:magic_stone_entity") {
                            const magic_stone_en = magic_stone_entitys[i];
                            const life = magic_stone_en.getDynamicProperty("stone_life_count") as number;
                            if(life == 1) {
                                magic_stone_en.remove();
                            } else {
                                magic_stone_en.setDynamicProperty("stone_life_count", life - 1);

                            }
                        }
                    }
                }
            }
        }
    } else {
        if (grimoire_entity !== undefined) {
            const pinvent = player.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
            const pcontainer = pinvent.container as Container;
            const invent = grimoire_entity.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
            const gcontainer = invent.container as Container;
            if (pcontainer.emptySlotsCount != 0) {
                pcontainer.setItem(player.selectedSlotIndex, gcontainer.getItem(0));
            } else {
                grimoire_entity.dimension.spawnItem(gcontainer.getItem(0)!, grimoire_entity.location);
            }
            gcontainer.clearAll();
            grimoire_entity.remove();
        } else {

            const actionForm = new ActionFormData()
            .title({ translate: "tile.kurokumaft:magic_lectern.name" })
            .body({rawtext: [
                { translate: "magic_lectern.mess.title" },
                {text : "\n\n"},
                { translate: "magic_lectern.mess.body1" },
                {text : "\n\n"},
                { translate: "magic_lectern.mess.errorInfo" },
                {text : "\n"}
            ]})
            .button({ translate: "magic_lectern.mess.confirm"});

            actionForm.show(player);

        }
    }
};

/**
 * 魔導書見台破壊
 * @param {Block} block
 * @param {Dimension} dimension
 */
export async function magic_lectern_break(block: Block, dimension: Dimension) {
    const entitys = dimension.getEntitiesAtBlockLocation({x:block.location.x, y:block.location.y+1,z:block.location.z});
    entitys.forEach(en => {
        let invent = en.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
        let item = invent.container?.getItem(0);
        if (item) {
            dimension.spawnItem(item, en.location);
        }
        en.remove();
    })

};

function noBookItem(player: Player) {
    player.onScreenDisplay.setActionBar({ translate: "magic_lectern.mess.noboobk" });
};
