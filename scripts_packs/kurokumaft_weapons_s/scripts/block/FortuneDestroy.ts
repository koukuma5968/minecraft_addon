import { Block, BlockComponentPlayerDestroyEvent, BlockCustomComponent, BlockPermutation, Enchantment, EntityComponentTypes, EntityEquippableComponent, EquipmentSlot, ItemComponentTypes, ItemEnchantableComponent, ItemStack, Player } from "@minecraft/server";
import { MinecraftEnchantmentTypes } from "@minecraft/vanilla-data";

interface CustomBlock {
    block: string,
    item: string
}
// 複数のブロックに対応するように対象ブロックをリストで定義
const CustomBlocks = Object.freeze([
    {
        block: "kurokumaft:chromium_ore",
        item: "kurokumaft:chromium_nugget"
    },
    {
        block: "kurokumaft:mithril_cluster",
        item: "kurokumaft:mithril_shard"
    },
    {
        block: "kurokumaft:orichalcum_ore",
        item: "kurokumaft:orichalcum"
    },
    {
        block: "kurokumaft:deepslate_orichalcum_ore",
        item: "kurokumaft:orichalcum"
    },
    {
        block: "kurokumaft:deepslate_chromium_ore",
        item: "kurokumaft:chromium_nugget"
    },
    {
        block: "kurokumaft:chromium_ore",
        item: "kurokumaft:chromium_nugget"
    }
]);

export class FortuneDestroy implements BlockCustomComponent {
    // プレイヤーがブロックを破壊した時のイベント
    onPlayerDestroy(event:BlockComponentPlayerDestroyEvent) {
        // 破壊したしたプレイヤー
        let player = event.player as Player;
        // 破壊後のブロック
        let block = event.block as Block;
        // 破壊されたブロック情報
        let blockPermutation = event.destroyedBlockPermutation as BlockPermutation;
        fortuneDestroy(player, block, blockPermutation);
    }
}

/**
 * 幸運エンチャントが付与されていたらドロップ数数をランダムで増やす
 * @param {Player} player
 * @param {Block} block
 * @param {BlockPermutation} blockPermutation
 */
async function fortuneDestroy(player:Player, block:Block, blockPermutation:BlockPermutation) {
    // プレイヤーの装備スロットを取得
    let equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
    // 右手のアイテムを取得
    let itemStack = equ.getEquipment(EquipmentSlot.Mainhand) as ItemStack;
    // アイテムを持っていれば
    if (itemStack) {
        // エンチャントを取得
        let enc = itemStack.getComponent(ItemComponentTypes.Enchantable) as ItemEnchantableComponent;
        // エンチャントコンポーネントを持っている
        if (enc) {
            // 幸運エンチャントが付与されている
            if(enc.hasEnchantment(MinecraftEnchantmentTypes.Fortune)) {
                // 幸運エンチャントを取得
                let fortune = enc.getEnchantment(MinecraftEnchantmentTypes.Fortune) as Enchantment
                // 破壊されたブロックの定義取得
                let customBlock = CustomBlocks.find(obj => obj.block == blockPermutation.type.id) as CustomBlock;
                // 0~エンチャントレベルまでの値で追加
                let count = getRandomInRange(0, fortune.level);
                for (let i=0; i<count; i++) {
                    // 破壊されたブロックがある場所に対象のアイテムをスポーンさせる
                    block.dimension.spawnItem(new ItemStack(customBlock.item), block.location);
                }
            }
        }
    }
}

/**
 * 最小から最大の間の乱数を取って、整数値に四捨五入
 * @param {number} min
 * @param {number} max
 */
function getRandomInRange(min:number, max:number) {
    return Math.round(Math.random() * (max - min) + min);
}