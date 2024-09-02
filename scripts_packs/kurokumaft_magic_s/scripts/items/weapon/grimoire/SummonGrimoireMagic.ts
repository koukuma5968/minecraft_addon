import { Container, Entity, EntityComponentTypes, EntityInventoryComponent, EquipmentSlot, GameMode, ItemComponent, ItemComponentCompleteUseEvent, ItemComponentHitEntityEvent, ItemComponentTypes, ItemComponentUseEvent, ItemComponentUseOnEvent, ItemCooldownComponent, ItemCustomComponent, ItemDurabilityComponent, ItemStack, Player, system, world } from "@minecraft/server";
import { shooting, throwing } from "../../../custom/ShooterMagicEvent";
import { print, getRandomInRange } from "../../../common/commonUtil";
import { ItemDurabilityDamage, SummonGrimoireDurabilityDamage } from "../../../common/ItemDurabilityDamage";

interface SummonGrimoireMagicObject {
    itemName:string,
    particle:string
    sendMsg:string
}

const SummonGrimoireObjects = Object.freeze([
    {
        itemName: "kurokumaft:fire_grimoire",
        particle: "kurokumaft:fire_bread_particle",
        sendMsg: "§c魔炎鳥"
    }

]);

/**
 * 召喚系魔導書
 */
export class SummonGrimoireMagic implements ItemCustomComponent {

    // 右クリック
    onUse(event:ItemComponentUseEvent) {
        let itemStack = event.itemStack as ItemStack;
        let player = event.source as Player;

        let summonMagicObject = SummonGrimoireObjects.find(obj => obj.itemName == itemStack.typeId) as SummonGrimoireMagicObject;
        if (summonMagicObject) {
            grimoire_summon_use(player, itemStack, summonMagicObject);
        }
    }

}

// 魔導書（召喚）使用開始
/**
 * @param {Player} player
 * @param {ItemStack} item
 */
async function grimoire_summon_use(player: Player, item: ItemStack, summonMagicObject: SummonGrimoireMagicObject) {

    player.runCommand("particle " + summonMagicObject.particle + " ~~0.75~");

};

// 魔導書（召喚）使用解放
/**
 * @param {Player} player
 * @param {ItemStack} itemStack
 * @param {number} duration
 */
export async function grimoire_summon_Release(player:Player, itemStack:ItemStack, duration:number) {

    player.setDynamicProperty("summon_grimoire", undefined);

    if (-duration >= 25) {
        let summonMagicObject = SummonGrimoireObjects.find(obj => obj.itemName == itemStack.typeId) as SummonGrimoireMagicObject;

        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"text\":\"" + summonMagicObject.sendMsg + "\"}]}");
    
        if (player.getGameMode() != GameMode.creative) {
            SummonGrimoireDurabilityDamage(player, itemStack, EquipmentSlot.Mainhand);
        }
    }

};
