import { ItemStack, Player, EquipmentSlot, BlockCustomComponent, BlockComponentOnPlaceEvent, BlockComponentPlayerDestroyEvent, BlockComponentPlayerInteractEvent, Container, EntityComponentTypes, world, EntityInventoryComponent, Block, EntityEquippableComponent, Dimension, BlockComponent, BlockComponentTypes } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { isGrimoireAllItemsId, getGrimoireAllObjectsId, GrimoireBook, getGrimoireObjectId, isGrimoireItemsObject, getGrimoireItemsMultiValue, isGrimoireAllItemsObject, getGrimoireAllItemsMultiValue, getGrimoireAllItemsId, getGrimoireAllItemsEvent } from "./magicLectern/GrimoireBookComponent";
import { isMagicStoneOject, getMagicStoneOjectByName, MagicStoneOjects } from "./magicLectern/MagicStoneComponet";

/**
 * 魔導書見台ブロック
 */
export class MagicLecternBlock implements BlockCustomComponent {

    onPlace(blockEvent:BlockComponentOnPlaceEvent) {
        let block = blockEvent.block;
        let dimension = blockEvent.dimension;
    }

    onPlayerDestroy(blockEvent:BlockComponentPlayerDestroyEvent) {
        let block = blockEvent.block;
        let dimension = blockEvent.dimension;
        magic_lectern_break(block, dimension);
    }

    onPlayerInteract(blockEvent:BlockComponentPlayerInteractEvent) {
        let player = blockEvent.player as Player;
        let equ = player?.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        let item = equ.getEquipment(EquipmentSlot.Mainhand) as ItemStack;
        let block = blockEvent.block;
        let dimension = blockEvent.dimension;
        world.sendMessage("onPlayerInteract");
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
    let blockPer = block.permutation;

    if (item != undefined) {
        if (isGrimoireAllItemsId(item.typeId)) {
            // print("魔導書");
            if (block.matches(block.typeId,{"kurokumaft:book_set":0})) {
                block.setPermutation(blockPer.withState("kurokumaft:book_set", 1));
                let grimoire_book_entity = block.dimension.spawnEntity("kurokumaft:grimoire_book_entity", {x:block.location.x+0.5,y:block.location.y+1,z:block.location.z+0.5});
                let bookObj = getGrimoireAllObjectsId(item.typeId) as GrimoireBook;
                grimoire_book_entity.triggerEvent(bookObj.event);
                let invent = grimoire_book_entity.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
                let container = invent.container as Container;
                let grimoire_empty = item.clone();
                grimoire_empty.amount = 1;
                container.addItem(grimoire_empty);

                let direction = blockPer.getState("minecraft:cardinal_direction");
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
            let magic_stone_entitys = block.dimension.getEntitiesAtBlockLocation({x:block.location.x,y:block.location.y+1,z:block.location.z});
            for (let i=0; i<magic_stone_entitys.length; i++) {
                if (magic_stone_entitys[i].typeId == "kurokumaft:magic_stone_entity") {
                    magic_stone_entitys[i].remove();
                }
            }
            let magic_stone_entity = block.dimension.spawnEntity("kurokumaft:magic_stone_entity", {x:block.location.x+0.5,y:block.location.y+1,z:block.location.z+0.5});
            magic_stone_entity.setDynamicProperty("stone_life_count", 10);
            let stoneComp = getMagicStoneOjectByName(item.typeId) as MagicStoneOjects;

            block.setPermutation(blockPer.withState("kurokumaft:stone_set", stoneComp.state));
            // print("stoneState:" + stoneComp.state);
            // print("stoneEvent:" + stoneComp.event);
            magic_stone_entity.triggerEvent(stoneComp.event);

            let direction = blockPer.getState("minecraft:cardinal_direction");
            if (direction == "north") {
                magic_stone_entity.triggerEvent("kurokumaft:north");
            } else if (direction == "south") {
                magic_stone_entity.triggerEvent("kurokumaft:south");
            } else if (direction == "east") {
                magic_stone_entity.triggerEvent("kurokumaft:east");
            } else {
                magic_stone_entity.triggerEvent("kurokumaft:west");
            }

            let invent = magic_stone_entity.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
            let container = invent.container as Container;
            let magic_stone = item.clone();
            magic_stone.amount = 1;
            container.addItem(magic_stone);

        } else {
            // 魔導書セット済み
            if (!block.matches(block.typeId,{"kurokumaft:book_set":0})) {
                let grimoire_entity;
                let block_entitys = block.dimension.getEntitiesAtBlockLocation({x:block.location.x,y:block.location.y+1,z:block.location.z});
                for (let i=0; i<block_entitys.length; i++) {
                    if (block_entitys[i].typeId == "kurokumaft:grimoire_book_entity") {
                        grimoire_entity = block_entitys[i];
                        break;
                    }
                }
                if (grimoire_entity == undefined) {
                    // print("grimoire_entityなし");
                    return;
                }
                let invent = grimoire_entity.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
                let container = invent.container as Container;
                let grimoire_book = container.getItem(0);
                if (grimoire_book == undefined) {
                    return;
                }
                // grimoire_entity.triggerEvent("on_breaking");

                // let new_grimoire_book_entity = block.dimension.spawnEntity("kurokumaft:grimoire_book_entity", {x:block.location.x+0.5,y:block.location.y+1,z:block.location.z+0.5});
                // let new_invent = new_grimoire_book_entity.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
                // let new_container = new_invent.container as Container;
                // let direction = blockPer.getState("minecraft:cardinal_direction");
                // if (direction == "north") {
                //     new_grimoire_book_entity.triggerEvent("kurokumaft:north");
                // } else if (direction == "south") {
                //     new_grimoire_book_entity.triggerEvent("kurokumaft:south");
                // } else if (direction == "east") {
                //     new_grimoire_book_entity.triggerEvent("kurokumaft:east");
                // } else {
                //     new_grimoire_book_entity.triggerEvent("kurokumaft:west");
                // }

                let new_grimoire_book;

                let lore = grimoire_book.getLore();
                let remainingNum = 0;
                if (lore.length > 0) {
                    remainingNum = Number(lore[0].substring(3));
                }

                // 魔法石セット済み
                if (!block.matches(block.typeId,{"kurokumaft:stone_set": 0})) {
                    let grimoireItemType = getGrimoireObjectId(grimoire_book.typeId);
                    // 空以外の魔導書がセットされている場合
                    if (grimoireItemType != "empty") {
                        // 魔導書に対応するアイテムでない場合は終了
                        if (!isGrimoireItemsObject(grimoireItemType, item.typeId)) {
                            noBookItem();
                            return;
                        }
                        let mulVal = getGrimoireItemsMultiValue(grimoireItemType, item.typeId) as number;
                        new_grimoire_book = grimoire_book;
                        if (new_grimoire_book.typeId == "kurokumaft:grimoire_music_sound") {
                            new_grimoire_book.setDynamicProperty(item.typeId, item.typeId);
                        }
                        remainingNum = remainingNum + (item.amount * mulVal);

                    // 空の魔導書の場合
                    } else {
                        // すべての魔導書に対応するアイテムでない場合は終了
                        if (!isGrimoireAllItemsObject(item.typeId)) {
                            noBookItem();
                            return;
                        }
                        let mulVal = getGrimoireAllItemsMultiValue(item.typeId);
                        remainingNum = remainingNum + (item.amount * mulVal);
                        let bookId = getGrimoireAllItemsId(item.typeId);
                        new_grimoire_book = new ItemStack(bookId, 1);
                        if (bookId == "kurokumaft:grimoire_music_sound") {
                            new_grimoire_book.setDynamicProperty(item.typeId, item.typeId);
                        }
                        let event = getGrimoireAllItemsEvent(bookId);
                        grimoire_entity.triggerEvent(event);
                    }
                    if (new_grimoire_book.typeId == "kurokumaft:grimoire_music_sound") {
                        new_grimoire_book.setLore(["残数：" + remainingNum]);
                    }

                    container.setItem(0, new_grimoire_book);

                    let equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
                    equ.setEquipment(EquipmentSlot.Mainhand);

                    let magic_stone_entitys = block.dimension.getEntitiesAtBlockLocation({x:block.location.x,y:block.location.y+1,z:block.location.z});
                    for (let i=0; i<magic_stone_entitys.length; i++) {
                        if (magic_stone_entitys[i].typeId == "kurokumaft:magic_stone_entity") {
                            let magic_stone_en = magic_stone_entitys[i];
                            let life = magic_stone_en.getDynamicProperty("stone_life_count") as number;
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
        if (blockPer.getState("kurokumaft:book_set") == 1) {
            let grimoire_book_entity = block.dimension.getEntitiesAtBlockLocation({x:block.location.x,y:block.location.y+1,z:block.location.z});
            for (let i=0; i<grimoire_book_entity.length; i++) {
                if (grimoire_book_entity[i].typeId == "kurokumaft:grimoire_book_entity") {
                    block.setPermutation(blockPer.withState("kurokumaft:book_set", 0));
                    let pinvent = player.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
                    let pcontainer = pinvent.container as Container;
                    let invent = grimoire_book_entity[i].getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
                    let gcontainer = invent.container as Container;
                    if (pcontainer.emptySlotsCount != 0) {
                        pcontainer.setItem(player.selectedSlotIndex, gcontainer.getItem(0));
                    } else {
                        grimoire_book_entity[i].dimension.spawnItem(gcontainer.getItem(0)!, grimoire_book_entity[i].location);
                    }
                    gcontainer.clearAll();
                    // print(grimoire_book_entity[i].typeId);
                    grimoire_book_entity[i].remove();
                    break;
                }
            }
        } else {

            let actionForm = new ActionFormData()
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
        // if (blockPer.getState("kurokumaft:stone_set") != 0) {
        //     let magic_stone = block.dimension.getEntitiesAtBlockLocation({x:block.location.x,y:block.location.y+1,z:block.location.z});
        //     for (let i=0; i<magic_stone.length; i++) {
        //         if (magic_stone[i].typeId == "kurokumaft:magic_stone_entity") {
        //             let intervalNum = system.runInterval(() => {
        //                 block.setPermutation(blockPer.withState("kurokumaft:stone_set", 0));
        //                 let pinvent = player.getComponent(EntityComponentTypes.Inventory);
        //                 let pcontainer = pinvent.container;
        //                 let invent = magic_stone[i].getComponent(EntityComponentTypes.Inventory);
        //                 let container = invent.container;
        //                 //pcontainer.setItem(player.selectedSlot, container.getItem(0));
        //                 print(magic_stone[i].typeId);
        //                 magic_stone[i].kill();
        //             }, 2);
        //             system.runTimeout(() => {
        //                 system.clearRun(intervalNum);
        //             }, 3);
        //             break;
        //         }
        //     }
        // }
    }
};

/**
 * 魔導書見台破壊
 * @param {Block} block
 * @param {Dimension} dimension
 */
export async function magic_lectern_break(block: Block, dimension: Dimension) {
    let entitys = dimension.getEntitiesAtBlockLocation({x:block.location.x, y:block.location.y+1,z:block.location.z});
    entitys.forEach(en => {
        let invent = en.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
        let item = invent.container?.getItem(0);
        if (item) {
            dimension.spawnItem(item, en.location);
        }
        en.remove();
    })

};

function noBookItem() {
    world.sendMessage("このアイテムは対応していません");
};
