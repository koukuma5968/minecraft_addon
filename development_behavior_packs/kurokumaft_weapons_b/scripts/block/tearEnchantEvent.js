import { system,EntityComponentTypes,ItemComponentTypes,ItemStack,Block } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

const tear_enchant_blocks = [];
var encBookSetFlg = false;

/**
 * エンチャントリリース
 * @param {Player} player
 * @param {ItemStack} item
 * @param {Block} block
 */
function tearEnchantBlock(player, item, block) {
    if (block.matches("kurokumaft:tear_enchant",{"kurokumaft:isBook":1})) {

        system.runTimeout(() => {
    
            let equ = player.getComponent(EntityComponentTypes.Equippable);
            let mainhand = equ.getEquipment("Mainhand");
            // print("エンチャントリリース");
            if (item != undefined) {
                let actionForm = new ActionFormData().title({ translate: "tile.kurokumaft:tear_enchant.name" });
                let enc = mainhand.getComponent(ItemComponentTypes.Enchantable);
                if (enc != undefined) {
                    // print("エンチャントコンポーネントあり");
                    let encs = enc.getEnchantments();
                    if (encs != undefined && encs.length>0) {
                        // print("エンチャントあり");
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
                                // print("空の本を作る");
                                let encBook = new ItemStack("minecraft:enchanted_book",1);
                                let bookEncComp = encBook.getComponent(ItemComponentTypes.Enchantable);
                                // セット時に本についていたエンチャントを取る
                                for (let i=0;i<tear_enchant_blocks.length;i++) {
                                    if (tear_enchant_blocks[i].x == block.x && tear_enchant_blocks[i].y == block.y && tear_enchant_blocks[i].z == block.z) {
                                        // Array.prototype.push.apply(addencs, tear_enchant_blocks[i].enchant.getEnchantments());
                                        bookEncComp.addEnchantments(tear_enchant_blocks[i].enchant.getEnchantments());
                                        tear_enchant_blocks.splice(i, 1);
                                        break;
                                    }
                                }
                                // 右手のアイテムのエンチャント分
                                for (let i=0;i<encs.length;i++) {
                                    let repEnc = encs[i];
                                    // print("武器エンチャント" + repEnc.type.id);
                                    try {
                                        if (bookEncComp.canAddEnchantment(repEnc)) {
                                            // print("本エンチャント可能");
                                            if (bookEncComp.hasEnchantment(repEnc.type.id)) {
                                                // print("同じエンチャントあり" + repEnc.type.id);
                                                let tearEnc = bookEncComp.getEnchantment(repEnc.type.id);
                                                // 同じレベルかつ最大値以下なら＋1
                                                // print("武器レベル" + repEnc.level);
                                                if (repEnc.level == tearEnc.level && repEnc.level < repEnc.type.maxLevel) {
                                                    // print("同じかつ最大値未満");
                                                    bookEncComp.removeEnchantment(repEnc.type);
                                                    bookEncComp.addEnchantment({"level": repEnc.level+1,"type": repEnc.type});
                                                // 超えていればそのまま
                                                } else if (repEnc.level > tearEnc.level) {
                                                    // print("本よりも大きい");
                                                    bookEncComp.removeEnchantment(repEnc.type);
                                                    bookEncComp.addEnchantment({"level": repEnc.level,"type": repEnc.type});
                                                }
                                            } else {
                                                // print("同じエンチャントなし" + repEnc.type.id);
                                                bookEncComp.addEnchantment({"level": repEnc.level,"type": repEnc.type});
                                            }
                                            enc.removeEnchantment(repEnc.type);
                                        }
                                    } catch (error) { 
                                        // print("付けられない" + repEnc.type.id);
                                    }
                                }
                                equ.setEquipment("Mainhand", mainhand);
                                tear_enchant_blocks.push({"x":block.x,"y":block.y,"z":block.z,"enchant":bookEncComp});
                            } else {
                                player.sendMessage("キャンセルしました。");
                            }
                        });
                    } else {
                        // print("アイテムなし");
                        actionForm
                        .body({ translate: "tear_enchant.mess.body.notenc"})
                        .button({ translate: "tear_enchant.mess.confirm"});
                        actionForm
                            .show(player)
                            .then((formData) => {
                            })
                            .catch((error) => {
                                player.sendMessage("エラー:" + error);
                            });
                    }
                } else {
                    // print("アイテムなし");
                    actionForm
                    .body({ translate: "tear_enchant.mess.body.notenc"})
                    .button({ translate: "tear_enchant.mess.confirm"});
                    actionForm
                        .show(player)
                        .then((formData) => {
                        })
                        .catch((error) => {
                            player.sendMessage("エラー:" + error);
                        });
                }
            }
        }, 1);
    } else {
        if (item != undefined) {
            if (item.typeId == "minecraft:book") {
                // print("本");
                let equ = player.getComponent(EntityComponentTypes.Equippable);
                let mainhand = equ.getEquipment("Mainhand");
                let enc = mainhand.getComponent(ItemComponentTypes.Enchantable);
                tear_enchant_blocks.push({"x":block.x,"y":block.y,"z":block.z,"enchant":enc});
                encBookSetFlg = true;
            } else if (item.typeId == "minecraft:enchanted_book") {
                // print("エンチャント本");
                let equ = player.getComponent(EntityComponentTypes.Equippable);
                let mainhand = equ.getEquipment("Mainhand");
                let enc = mainhand.getComponent(ItemComponentTypes.Enchantable);
                tear_enchant_blocks.push({"x":block.x,"y":block.y,"z":block.z,"enchant":enc});
                encBookSetFlg = true;
                system.runTimeout(() => {
                    equ.setEquipment("Mainhand", null);
                }, 1);
            }
        }
    }
}

/**
 * エンチャントリリース
 * @param {Player} player
 * @param {ItemStack} item
 * @param {Block} block
 */
function setTearEnchantBook(player, item, block) {
    let bookflg = false;
    if (item == undefined && !encBookSetFlg) {
        let equ = player.getComponent(EntityComponentTypes.Equippable);
        for (let i=0;i<tear_enchant_blocks.length;i++) {
            if (tear_enchant_blocks[i].x == block.x && tear_enchant_blocks[i].y == block.y && tear_enchant_blocks[i].z == block.z) {
                let encBlock = tear_enchant_blocks[i].enchant.getEnchantments();
                let book;
                if (encBlock.length != 0) {
                    // print("エンチャント本を渡す");
                    book = new ItemStack("minecraft:enchanted_book",1);
                    let enc = book.getComponent(ItemComponentTypes.Enchantable);
                    enc.addEnchantments(encBlock);
                } else {
                    // print("本を渡す");
                    book = new ItemStack("minecraft:book",1);
                }
                equ.setEquipment("Mainhand", book);
                tear_enchant_blocks.splice(i, 1);
                bookflg = true;
            }
        }
    }
    encBookSetFlg = false;
    if (block.matches("kurokumaft:tear_enchant",{"kurokumaft:isBook":0})) {
        if (!bookflg) {
            // print("アイテムなし");
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
export { tearEnchantBlock,setTearEnchantBook };
