import { EntityDamageCause, EntityQueryOptions, EquipmentSlot, ItemComponentUseEvent, ItemCustomComponent, ItemStack, Player, system, TicksPerSecond } from "@minecraft/server";
import { summonGrimoireDurabilityDamage } from "../../../common/MagicItemDurabilityDamage";
import { addTeamsTagFilter, getLookRotaionPointsV2 } from "../../../common/MagicCommonUtil";

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
        const itemStack = event.itemStack as ItemStack;
        const player = event.source as Player;

        const summonMagicObject = SummonGrimoireObjects.find(obj => obj.itemName == itemStack.typeId) as SummonGrimoireMagicObject;
        if (summonMagicObject) {
            grimoire_summon_Release(player, itemStack);
        }
    }

}

// // 魔導書（召喚）使用開始
// /**
//  * @param {Player} player
//  * @param {ItemStack} item
//  */
// async function grimoire_summon_use(player: Player, item: ItemStack, summonMagicObject: SummonGrimoireMagicObject) {

//     player.setDynamicProperty("summon_grimoire", true);
//     player.dimension.spawnParticle(summonMagicObject.particle, {x:player.location.x,y:player.location.y+0.75,z:player.location.z});

// };

// 魔導書（召喚）使用解放
/**
 * @param {Player} player
 * @param {ItemStack} itemStack
 * @param {number} duration
 */
export async function grimoire_summon_Release(player:Player, itemStack:ItemStack) {

    const summonMagicObject = SummonGrimoireObjects.find(obj => obj.itemName == itemStack.typeId) as SummonGrimoireMagicObject;

    player.dimension.spawnParticle(summonMagicObject.particle, {x:player.location.x,y:player.location.y+0.75,z:player.location.z});
    player.onScreenDisplay.setActionBar({rawtext:[{translate:"summonMagicObject.sendMsg"}]});
    player.addTag(summonMagicObject.extag);

    const point = getLookRotaionPointsV2(player.getRotation(), 8, 0);
    const summonMons = player.dimension.spawnEntity(summonMagicObject.entity, {x:player.location.x+point.x, y:player.location.y+4, z:player.location.z+point.z});
    const sommonLoc = summonMons.location;

    summonGrimoireDurabilityDamage(player, itemStack, EquipmentSlot.Mainhand);

    const intervalNum = system.runInterval(() => {
        const filterOption = {
            excludeTags: [
                summonMagicObject.extag,
            ],
            location: sommonLoc,
            maxDistance: 25
        } as EntityQueryOptions;

        addTeamsTagFilter(player, filterOption);

        const targets = player.dimension.getEntities(filterOption);
        targets.forEach(en => {
            if (!en.isValid()) {
                return;
            }
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


};
