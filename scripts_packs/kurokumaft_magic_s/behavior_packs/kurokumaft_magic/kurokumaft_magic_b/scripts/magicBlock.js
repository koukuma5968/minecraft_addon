import { system,world,Player,Entity,EntityComponentTypes,EntityInventoryComponent,ItemStack,Block,Dimension,BlockPermutation } from "@minecraft/server";
import { print, playsound, durabilityDamage, breakItem } from "./common";
import { getGrimoireObjectId, isGrimoireItemsObject, isGrimoireAllItemsObject, getGrimoireItemsMultiValue, 
    getGrimoireAllItemsMultiValue, getGrimoireAllItemsId, isGrimoireAllItemsId, getGrimoireAllObjectsId, getGrimoireAllItemsEvent } from "./magic/GrimoireBookComponent";
import { getMagicStoneOjectByName, isMagicStoneOject } from "./magic/MagicStoneComponet";
import { ActionFormData } from "@minecraft/server-ui";

// 魔導書見台
/**
 * @param {Player} player
 * @param {ItemStack} item
 * @param {Block} block
 */
function magic_lectern(player, item, block) {
    let blockPer = block.permutation;
    // print("book_set:" + blockPer.getState("kurokumaft:book_set"));
    // print("stone_set:" + blockPer.getState("kurokumaft:stone_set"));
    if (item != undefined) {
        // print("アイテムあり");
        // print(item.typeId);
        if (isGrimoireAllItemsId(item.typeId)) {
            // print("魔導書");
            if (block.matches(block.typeId,{"kurokumaft:book_set":0})) {
                block.setPermutation(blockPer.withState("kurokumaft:book_set", 1));
                let grimoire_book_entity = block.dimension.spawnEntity("kurokumaft:grimoire_book_entity", {x:block.location.x+0.5,y:block.location.y+1,z:block.location.z+0.5});
                let bookObj = getGrimoireAllObjectsId(item.typeId);
                grimoire_book_entity.triggerEvent(bookObj.event);
                let invent = grimoire_book_entity.getComponent(EntityComponentTypes.Inventory);
                let container = invent.container;
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
                    magic_stone_entitys[i].triggerEvent("on_breaking");
                }
            }
            let magic_stone_entity = block.dimension.spawnEntity("kurokumaft:magic_stone_entity", {x:block.location.x+0.5,y:block.location.y+1,z:block.location.z+0.5});
            let stoneComp = getMagicStoneOjectByName(item.typeId);

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

            let invent = magic_stone_entity.getComponent(EntityComponentTypes.Inventory);
            let container = invent.container;
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
                let invent = grimoire_entity.getComponent(EntityComponentTypes.Inventory);
                let container = invent.container;
                let grimoire_book = container.getItem(0);
                if (grimoire_book == undefined) {
                    return;
                }
                grimoire_entity.triggerEvent("on_breaking");

                let new_grimoire_book_entity = block.dimension.spawnEntity("kurokumaft:grimoire_book_entity", {x:block.location.x+0.5,y:block.location.y+1,z:block.location.z+0.5});
                let new_invent = new_grimoire_book_entity.getComponent(EntityComponentTypes.Inventory);
                let new_container = new_invent.container;
                let direction = blockPer.getState("minecraft:cardinal_direction");
                if (direction == "north") {
                    new_grimoire_book_entity.triggerEvent("kurokumaft:north");
                } else if (direction == "south") {
                    new_grimoire_book_entity.triggerEvent("kurokumaft:south");
                } else if (direction == "east") {
                    new_grimoire_book_entity.triggerEvent("kurokumaft:east");
                } else {
                    new_grimoire_book_entity.triggerEvent("kurokumaft:west");
                }

                let new_grimoire_book;

                let lore = grimoire_book.getLore();
                let remainingNum = 0;
                if (lore.length > 0) {
                    remainingNum = Number(lore[0].substr(3));
                }

                // 魔法石セット済み
                if (!block.matches(block.typeId,{"kurokumaft:stone_set": 0})) {
                    let grimoireObject = getGrimoireObjectId(grimoire_book.typeId);
                    // 空以外の魔導書がセットされている場合
                    if (grimoireObject != undefined) {
                        let grimoireItems = grimoireObject["items"];
                        // 魔導書に対応するアイテムでない場合は終了
                        if (!isGrimoireItemsObject(grimoireItems, item.typeId)) {
                            noBookItem();
                            return;
                        }
                        let mulVal = getGrimoireItemsMultiValue(grimoireItems, item.typeId);
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
                        let event = getGrimoireAllItemsEvent(bookId);
                        new_grimoire_book_entity.triggerEvent(event);
                    }

                    new_grimoire_book.setLore(["残数：" + remainingNum]);

                    new_container.setItem(0, new_grimoire_book);

                    let equ = player.getComponent(EntityComponentTypes.Equippable);
                    equ.setEquipment("Mainhand", null);

                    let magic_stone_entitys = block.dimension.getEntitiesAtBlockLocation({x:block.location.x,y:block.location.y+1,z:block.location.z});
                    for (let i=0; i<magic_stone_entitys.length; i++) {
                        if (magic_stone_entitys[i].typeId == "kurokumaft:magic_stone_entity") {
                            let magic_stone_en = magic_stone_entitys[i];
                            let sotne_health = magic_stone_en.getComponent(EntityComponentTypes.Health);
                            if(sotne_health.currentValue == 1) {
                                magic_stone_en.triggerEvent("on_breaking");
                            } else {
                                magic_stone_en.applyDamage(1,{"cause":"none"});
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
                    let pinvent = player.getComponent(EntityComponentTypes.Inventory);
                    let pcontainer = pinvent.container;
                    let invent = grimoire_book_entity[i].getComponent(EntityComponentTypes.Inventory);
                    let gcontainer = invent.container;
                    pcontainer.setItem(player.selectedSlotIndex, gcontainer.getItem(0));
                    gcontainer.clearAll();
                    // print(grimoire_book_entity[i].typeId);
                    grimoire_book_entity[i].triggerEvent("on_breaking");
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

// 魔導書見台破壊
/**
 * @param {Player} player
 * @param {Block} block
 */
function magic_lectern_break(player, block) {
    let intervalNum = system.runInterval(() => {
        let lectern_entity = block.dimension.getEntitiesAtBlockLocation({x:block.location.x,y:block.location.y+1,z:block.location.z});
        for (let i=0; i<lectern_entity.length; i++) {
            if (lectern_entity[i].typeId == "kurokumaft:grimoire_book_entity") {
                lectern_entity[i].runCommand("kill @s");
            }
            if (lectern_entity[i].typeId == "kurokumaft:magic_stone_entity") {
                lectern_entity[i].triggerEvent("on_breaking");
            }
        }
    }, 2);
    system.runTimeout(() => {
        system.clearRun(intervalNum);
    }, 4);

};

function noBookItem() {
    world.sendMessage("このアイテムは対応していません");
};

export { magic_lectern, magic_lectern_break };
