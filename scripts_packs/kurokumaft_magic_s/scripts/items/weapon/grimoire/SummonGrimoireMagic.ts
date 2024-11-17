import { EntityDamageCause, EntityQueryOptions, EquipmentSlot, GameMode, ItemComponentUseEvent, ItemCustomComponent, ItemStack, Player, system } from "@minecraft/server";
import { throwing } from "../../../common/ShooterMagicEvent";
import { SummonGrimoireDurabilityDamage } from "../../../common/ItemDurabilityDamage";
import { addTeamsTagFilter } from "../../../common/commonUtil";

interface SummonGrimoireMagicObject {
    itemName:string,
    particle:string,
    entity:string,
    sendMsg:string,
    extag:string,
    damageType:EntityDamageCause,
    damageParticle:string
}

const SummonGrimoireObjects = Object.freeze([
    {
        itemName: "kurokumaft:fire_grimoire",
        particle: "kurokumaft:fire_bread_particle",
        entity: "kurokumaft:phoenix_spear",
        sendMsg: "entity.kurokumaft:phoenix_spear.name",
        extag : "phoenix_spear_selt",
        damageType: EntityDamageCause.fire,
        damageParticle: "kurokumaft:phoenix_wall_particle"
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

    player.setDynamicProperty("summon_grimoire", true);
    player.dimension.spawnParticle(summonMagicObject.particle, {x:player.location.x,y:player.location.y+0.75,z:player.location.z});

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

        player.runCommand("/titleraw @s actionbar {\"rawtext\":[{\"translate\":\"" + summonMagicObject.sendMsg + "\"}]}");
        player.addTag(summonMagicObject.extag);
        let summonMons = player.dimension.spawnEntity(summonMagicObject.entity, {x:player.location.x, y:player.location.y+10, z:player.location.z});
        let sommonLoc = summonMons.location;

        SummonGrimoireDurabilityDamage(player, itemStack, EquipmentSlot.Mainhand);

        let intervalNum = system.runInterval(() => {
            let filterOption = {
                excludeTags: [
                    summonMagicObject.extag,
                ],
                location: sommonLoc,
                maxDistance: 25
            } as EntityQueryOptions;
    
            addTeamsTagFilter(player, filterOption);
    
            let targets = player.dimension.getEntities(filterOption);
            targets.forEach(en => {
                if (en instanceof Player) {
                    en.applyDamage(5, {
                        cause: summonMagicObject.damageType
                    });
                } else {
                    en.applyDamage(15, {
                        cause: summonMagicObject.damageType
                    });
                }
                en.dimension.spawnParticle(summonMagicObject.damageParticle,en.location);
            });
    
        }, 10);
    
        system.runTimeout(() => {
            system.clearRun(intervalNum);
            player.removeTag(summonMagicObject.extag);
            summonMons.remove();
        }, 100);
    
    }

};
