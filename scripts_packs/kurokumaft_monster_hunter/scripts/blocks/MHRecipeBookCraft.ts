import { BlockCustomComponent, CustomComponentParameters, BlockComponentPlayerInteractEvent, Player, RawMessage, EntityComponentTypes, EntityInventoryComponent, Container, ItemStack } from "@minecraft/server";
import { MHRecipeBook } from "../common/types/MHBlocksTypes";
import { ModalFormData } from "@minecraft/server-ui";
import { subtractionContainerItem } from "../common/MHCommonUtil";

type RecipeResult = {
    select: number,
    num: number
} | null

/**
 * 調合書
 */
export class MHRecipeBookCraft implements BlockCustomComponent {

    onPlayerInteract(event:BlockComponentPlayerInteractEvent, arg: CustomComponentParameters) {
        const recipe_type = arg.params as MHRecipeBook;
        const player = event.player as Player;
        loopModal(player, recipe_type);
    }

}

/**
 * 閉じるまで調合画面をループ制御
 * 
 * @param player 
 * @param recipe_type 
 */
async function loopModal(player: Player, recipe_type: MHRecipeBook) {
    let selectIndex = 0;
    let num = 1;
    while (true) {
        // 調合画面を開く
        const result = await openModal(player, recipe_type, selectIndex, num);

        // キャンセルしたら終了する
        if (result === null) {
            break;
        }

        // 選択したアイテムのインデックス
        selectIndex = result.select;
        // 選択した個数
        num = result.num;

        // クラフトに必要なアイテムをインベントリから探す
        const craftRecipe = recipeList[selectIndex];
        const itme1 = craftRecipe.item_1.id
        const itme2 = craftRecipe.item_2.id
        const inventory = player.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
        const container = inventory.container as Container;
        const itme1_find = container.find(new ItemStack(itme1));
        const itme2_find = container.find(new ItemStack(itme2));

        // クラフト用アイテムを保持しているか
        if (itme1_find !== undefined && itme2_find !== undefined) {
            // クラフト用アイテムを取得する
            const stack1 = container.getItem(itme1_find);
            const stack2 = container.getItem(itme2_find);
            if ((stack1 !== undefined && stack2 !== undefined) && (stack1.amount < num || stack2.amount < num)) {
                if (stack1.amount < stack2.amount) {
                    num = stack1.amount;
                } else {
                    num = stack2.amount;
                }
            }
            const rate = getRecipeRate(recipe_type.type, craftRecipe.rate) as number;
            for (let i = 0; num > i; i++) {
                let craftItem = new ItemStack("kurokumaft:non_combustible_waste", 1);
                if (Math.random() <= rate/100) {
                    craftItem = new ItemStack(craftRecipe.result.id, 1);
                }

                if (container.emptySlotsCount > 0) {
                    container.addItem(craftItem);
                } else {
                    player.dimension.spawnItem(craftItem, {x:player.location.x, y:player.location.y+1,z:player.location.z});
                }
            }
            subtractionContainerItem(container, itme1_find, num);
            subtractionContainerItem(container, itme2_find, num);

        } else {
            player.sendMessage({translate: "message.kurokumaft:recipe.low.item"});
            break;
        }
    }
}

/**
 * 調合画面を表示
 * 
 * @param player 
 * @param recipe_type 
 * @param selectIndex 
 * @param num 
 * @returns 
 */
function openModal(player: Player, recipe_type: MHRecipeBook, selectIndex: number, num: number): Promise<RecipeResult> {
    return new Promise((resolve) => {
        const modalForm = new ModalFormData().title({translate: "message.kurokumaft:recipe.book." + recipe_type.type +".title"});
        modalForm.dropdown(
            {translate: "message.kurokumaft:recipe.book.list.label"},
            getRecipeText(recipe_type.type),
            {
                defaultValueIndex: selectIndex
            }
        );
        modalForm.divider();
        modalForm.slider({translate: "message.kurokumaft:recipe.book.num.label"}, 1, 10, {
            defaultValue: num
        });
        modalForm.label({translate: "message.kurokumaft:recipe.book.description"});
        modalForm.submitButton({translate: "message.kurokumaft:recipe.submit.button"});
        modalForm
            .show(player)
            .then(formData => {
                if (!formData.canceled) {
                    if (formData.formValues !== undefined) {
                        resolve(
                            {
                                select: formData.formValues[0] as number,
                                num: formData.formValues[2] as number
                            }
                        );
                    } else {
                        resolve(null);
                    }
                } else {
                    resolve(null);
                }
            })
            .catch((error: Error) => {
                resolve(null);
            });
    });
}

/**
 * 調合可能レシピを取得する
 * 
 * @param recipe_type 
 * @returns 
 */
function getRecipeText(recipe_type: string) : RawMessage[] {

    const recipeText = [] as RawMessage[];
    recipeList.forEach((recipe) => {
        const rate = getRecipeRate(recipe_type, recipe.rate);
        recipeText.push(
            {rawtext:[
                {translate:recipe.result.label},
                {text: "("},
                {translate:recipe.item_1.label},
                {text: "×"},
                {translate:recipe.item_2.label},
                {text: ")"},
                {translate:rate.toString()},
                {text: "％"},
            ]}
        )
    })

    return recipeText;
}

function getRecipeRate(recipe_type: string, rate: number): number {
    switch (recipe_type) {
        case "master" :
            rate = rate + 5;
        case "advanced" :
            rate = rate + 5;
        case "intermediate" :
            rate = rate + 5;
        case "beginner" :
            rate = rate + 5;
        case "introduction" :
            rate = rate + 5;
    }
    if (rate > 100) {
        rate = 100;
    }
    return rate;
}

type recipeType = {
    id: string,
    label: string
}
const recipeList = [
    /* 回復薬 **/ 
    {
        item_1: {
            id: "kurokumaft:medicinal_plant", 
            label: "item.plants.kurokumaft:medicinal_plant.name"
        } as recipeType,
        item_2: {
            id: "kurokumaft:mushroom_blue",
            label: "item.plants.kurokumaft:mushroom_blue.name"
        } as recipeType,
        result: {
            id: "kurokumaft:healing_potion", 
            label: "item.medicine.kurokumaft:healing_potion.name"
        } as recipeType,
        rate:95
    },
    /* 回復薬G **/
    {
        item_1: {
            id: "kurokumaft:healing_potion",
            label: "item.medicine.kurokumaft:healing_potion.name"
        } as recipeType,
        item_2: {
            id: "honeycomb",
            label: "item.honeycomb.name"
        } as recipeType,
        result: {
            id: "kurokumaft:healing_potion_great", 
            label: "item.medicine.kurokumaft:healing_potion_great.name"
        } as recipeType,
        rate:90
    },
    /* 栄養剤 **/ 
    {
        item_1: {
            id: "kurokumaft:immortal_insect_item", 
            label: "item.insect.kurokumaft:immortal_insect.name"
        } as recipeType,
        item_2: {
            id: "kurokumaft:mushroom_blue",
            label: "item.plants.kurokumaft:mushroom_blue.name"
        } as recipeType,
        result: {
            id: "kurokumaft:nutritional_supplement", 
            label: "item.medicine.kurokumaft:nutritional_supplement.name"
        } as recipeType,
        rate:90
    },
    /* 栄養剤G **/
    {
        item_1: {
            id: "kurokumaft:nutritional_supplement",
            label: "item.medicine.kurokumaft:nutritional_supplement.name"
        } as recipeType,
        item_2: {
            id: "honeycomb",
            label: "item.honeycomb.name"
        } as recipeType,
        result: {
            id: "kurokumaft:nutritional_supplement_great", 
            label: "item.medicine.kurokumaft:nutritional_supplement_great.name"
        } as recipeType,
        rate:75
    },
    /* 解毒薬 **/ 
    {
        item_1: {
            id: "kurokumaft:mushroom_blue",
            label: "item.plants.kurokumaft:mushroom_blue.name"
        } as recipeType,
        item_2: {
            id: "kurokumaft:detoxifying_herb",
            label: "item.plants.kurokumaft:detoxifying_herb.name"
        } as recipeType,
        result: {
            id: "kurokumaft:antidote", 
            label: "item.medicine.kurokumaft:antidote.name"
        } as recipeType,
        rate:90
    },
    /* 漢方薬 **/ 
    {
        item_1: {
            id: "kurokumaft:bitter_bug_item",
            label: "item.insect.kurokumaft:bitter_bug.name"
        } as recipeType,
        item_2: {
            id: "kurokumaft:cactus_flower",
            label: "tile.cactus_flower.name"
        } as recipeType,
        result: {
            id: "kurokumaft:traditional_chinese_medicine", 
            label: "item.medicine.kurokumaft:traditional_chinese_medicine.name"
        } as recipeType,
        rate:90
    },
    /* 秘薬 **/ 
    {
        item_1: {
            id: "kurokumaft:mandragora",
            label: "item.plants.kurokumaft:mandragora.name"
        } as recipeType,
        item_2: {
            id: "kurokumaft:nutritional_supplement_great",
            label: "item.medicine.kurokumaft:nutritional_supplement_great.name"
        } as recipeType,
        result: {
            id: "kurokumaft:elixir", 
            label: "item.medicine.kurokumaft:elixir.name"
        } as recipeType,
        rate:65
    },
]
