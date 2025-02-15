import { system,EntityComponentTypes,ItemComponentTypes,ItemStack,Block, Player, EntityEquippableComponent, EquipmentSlot, ItemEnchantableComponent, Enchantment, BlockCustomComponent, BlockComponentPlayerInteractEvent, BlockPermutation, world, EntityInventoryComponent, Container, Entity, BlockComponentPlayerDestroyEvent, Dimension } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

export class TearEnchant implements BlockCustomComponent {

    onPlayerDestroy(event:BlockComponentPlayerDestroyEvent) {
        let block = event.block as Block;
        let dimension = event.dimension as Dimension;
        breackTearEnchant(dimension, block);
    }

    onPlayerInteract(event:BlockComponentPlayerInteractEvent) {
        let player = event.player as Player;
        let block = event.block as Block;
        let equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        let itemStack = equ.getEquipment(EquipmentSlot.Mainhand) as ItemStack;
        if (block.matches("kurokumaft:tear_enchant",{"kurokumaft:isBook":1})) {
            tearEnchantBlock(player, itemStack, block);
        } else {
            setTearEnchantBook(player, itemStack, block);
        }
    }
}

export async function breackTearEnchant(dimension:Dimension, block:Block) {
    let book_entity = dimension.getEntities({
        families: [
            "tear_enchant_book"
        ],
        location: {x:block.location.x+0.5,y:block.location.y+1,z:block.location.z+0.5},
        closest: 1
    }) as Entity[];

    if (book_entity.length > 0) {
        let bookInvent = book_entity[0].getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
        let container = bookInvent.container as Container;
        let setBook = container.getItem(0) as ItemStack;
    
        dimension.spawnItem(setBook,block.location);
    }
    book_entity[0].remove();
}

/**
 * エンチャントリリース
 * @param {Player} player
 * @param {ItemStack} item
 * @param {Block} block
 */
async function tearEnchantBlock(player: Player, item: ItemStack | undefined, block: Block) {

    let equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
    let mainhand = equ.getEquipment(EquipmentSlot.Mainhand) as ItemStack;
    // world.sendMessage("エンチャントリリース");
    if (item != undefined) {
        let actionForm = new ActionFormData().title({ translate: "tile.kurokumaft:tear_enchant.name" });
        let enc = mainhand.getComponent(ItemComponentTypes.Enchantable) as ItemEnchantableComponent;
        if (enc != undefined) {
            // world.sendMessage("エンチャントコンポーネントあり");
            let encs = enc.getEnchantments();
            if (encs != undefined && encs.length>0) {
                // world.sendMessage("エンチャントあり");
                actionForm
                .body({rawtext : [
                    {translate: "tear_enchant.mess.body"},
                    {text : "\n\n"},
                    { translate: "tear_enchant.mess.body.kome1" },
                    {text : "\n"},
                    { translate: "tear_enchant.mess.body.kome2" }
                ]})
                .button({ translate: "tear_enchant.mess.ok" })
                .button({ translate: "tear_enchant.mess.cancel" });
                actionForm.show(player).then(formData => {
                    if (formData.selection == 0) {
                        // world.sendMessage("空の本を作る");
                        // セット時に本についていたエンチャントを取る
                        let book_entity = block.dimension.getEntities({
                            families: [
                                "tear_enchant_book"
                            ],
                            location: {x:block.location.x+0.5,y:block.location.y+1,z:block.location.z+0.5},
                            closest: 1
                        }) as Entity[];
                        let bookInvent = book_entity[0].getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
                        let container = bookInvent.container as Container;
                        let setBook = container.getItem(0) as ItemStack;
                        let setBookEnc = setBook.getComponent(ItemComponentTypes.Enchantable) as ItemEnchantableComponent;

                        // 右手のアイテムのエンチャント分
                        for (let i=0;i<encs.length;i++) {
                            let repEnc = encs[i];
                            // world.sendMessage("武器エンチャント" + repEnc.type.id);
                            try {
                                if (setBookEnc.canAddEnchantment(repEnc)) {
                                    // world.sendMessage("本エンチャント可能");
                                    if (setBookEnc.hasEnchantment(repEnc.type.id)) {
                                        // world.sendMessage("同じエンチャントあり" + repEnc.type.id);
                                        let tearEnc = setBookEnc.getEnchantment(repEnc.type.id) as Enchantment;
                                        // 同じレベルかつ最大値以下なら＋1
                                        // world.sendMessage("武器レベル" + repEnc.level);
                                        if (repEnc.level == tearEnc.level && repEnc.level < repEnc.type.maxLevel) {
                                            // world.sendMessage("同じかつ最大値未満");
                                            setBookEnc.removeEnchantment(repEnc.type);
                                            setBookEnc.addEnchantment({"level": repEnc.level+1,"type": repEnc.type});
                                        // 超えていればそのまま
                                        } else if (repEnc.level > tearEnc.level) {
                                            // world.sendMessage("本よりも大きい");
                                            setBookEnc.removeEnchantment(repEnc.type);
                                            setBookEnc.addEnchantment({"level": repEnc.level,"type": repEnc.type});
                                        }
                                    } else {
                                        // world.sendMessage("同じエンチャントなし" + repEnc.type.id);
                                        setBookEnc.addEnchantment({"level": repEnc.level,"type": repEnc.type});
                                    }
                                    enc.removeEnchantment(repEnc.type);
                                }
                            } catch (error) {
                                world.sendMessage({ translate: "tear_enchant.mess.notenchant", with: [repEnc.type.id]});
                            }
                        }
                        let reenc = mainhand.getComponent(ItemComponentTypes.Enchantable) as ItemEnchantableComponent;
                        if (mainhand.typeId == "minecraft:enchanted_book" && (reenc == undefined || reenc.getEnchantments().length == 0)) {
                            let newmainhand = new ItemStack("minecraft:book",1);
                            equ.setEquipment(EquipmentSlot.Mainhand, newmainhand);
                        } else {
                            equ.setEquipment(EquipmentSlot.Mainhand, mainhand);
                        }
                        if (setBookEnc.getEnchantments().length == 1) {
                            let newBook = new ItemStack("minecraft:enchanted_book",1);
                            let newBookEnc = newBook.getComponent(ItemComponentTypes.Enchantable) as ItemEnchantableComponent;
                            newBookEnc.addEnchantments(setBookEnc.getEnchantments());
                            container.setItem(0, newBook);
                        } else {
                            container.setItem(0, setBook);
                        }
                    } else {
                        player.sendMessage({ translate: "tear_enchant.mess.cancelsend" });
                    }
                });
            } else {
                // world.sendMessage("アイテムなし");
                actionForm
                .body({ translate: "tear_enchant.mess.body.notenc"})
                .button({ translate: "tear_enchant.mess.confirm"});
                actionForm
                    .show(player)
                    .then((formData) => {
                    })
                    .catch((error) => {
                        // player.sendMessage("エラー:" + error);
                    });
            }
        } else {
            // world.sendMessage("アイテムなし");
            actionForm
            .body({ translate: "tear_enchant.mess.body.notenc"})
            .button({ translate: "tear_enchant.mess.confirm"});
            actionForm
                .show(player)
                .then((formData) => {
                })
                .catch((error) => {
                    // player.sendMessage("エラー:" + error);
                });
        }
    } else {

        let book_entity = block.dimension.getEntities({
            families: [
                "tear_enchant_book"
            ],
            location: {x:block.location.x+0.5,y:block.location.y+1,z:block.location.z+0.5},
            closest: 1
        }) as Entity[];
        let bookInvent = book_entity[0].getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
        let container = bookInvent.container as Container;

        let equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        equ.setEquipment(EquipmentSlot.Mainhand, container.getItem(0));

        book_entity[0].remove();
        block.setPermutation(block.permutation.withState("kurokumaft:isBook", 0));

    }
}

/**
 * エンチャントリリース
 * @param {Player} player
 * @param {ItemStack} item
 * @param {Block} block
 */
async function setTearEnchantBook(player: Player, item: ItemStack, block: Block) {

    if (block.matches("kurokumaft:tear_enchant",{"kurokumaft:isBook":0})) {
        if (item != undefined) {
            if (item.typeId == "minecraft:book" || item.typeId == "minecraft:enchanted_book") {
                let book_entity = block.dimension.spawnEntity("kurokumaft:tear_enchant_book_entity", {x:block.location.x+0.5,y:block.location.y+1,z:block.location.z+0.5});
                let bookInvent = book_entity.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
                let container = bookInvent.container as Container;
        
                // world.sendMessage("本");
                let equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
                let mainhand = equ.getEquipment(EquipmentSlot.Mainhand) as ItemStack;
                let clone = mainhand.clone();
                clone.amount = clone.amount-(clone.amount-1);

                container.setItem(0, clone);

                block.setPermutation(block.permutation.withState("kurokumaft:isBook", 1));
                system.runTimeout(() => {
                    if (mainhand.amount == 1) {
                        equ.setEquipment(EquipmentSlot.Mainhand, undefined);
                    } else {
                        mainhand.amount--;
                        equ.setEquipment(EquipmentSlot.Mainhand, mainhand);
                    }
                }, 1);
            }
        } else {
            // world.sendMessage("アイテムなし");
            system.runTimeout(() => {
                let actionForm = new ActionFormData()
                .title({ translate: "tile.kurokumaft:tear_enchant.name" })
                .body({rawtext: [
                    { translate: "tear_enchant.mess.body.notbook" },
                    {text : "\n\n"},
                    { translate: "tear_enchant.mess.body.notbook_kome1" },
                    {text : "\n\n"},
                    { translate: "tear_enchant.mess.body.notbook_kome2" },
                    {text : "\n\n"},
                    { translate: "tear_enchant.mess.body.notbook_kome3" },
                    {text : "\n\n"},
                    { translate: "tear_enchant.mess.body.kome1" },
                    {text : "\n"},
                    { translate: "tear_enchant.mess.body.kome2" }
                ]})
                .button({ translate: "tear_enchant.mess.confirm"});

                actionForm.show(player);
            }, 1);
        }
    }

}
