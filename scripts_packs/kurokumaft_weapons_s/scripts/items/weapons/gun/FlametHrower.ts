import { ItemCustomComponent, ItemComponentHitEntityEvent, ItemStack, Entity, system, ItemComponentUseEvent, Player, EquipmentSlot, EntityDamageCause } from "@minecraft/server";
import { getLookPoints } from "../../../common/WeaponsCommonUtil";
import { itemDurabilityDamage } from "../../../common/WeaponsItemDurabilityDamage";
import { getAdjacentSphericalPoints } from "../../../common/WeaponsShooterPoints";

/**
 * 火炎放射器
 */
export class FlametHrower implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {
        let attackEntity = event.attackingEntity as Entity;
        let hitEntity = event.hitEntity as Entity;
        let itemStack = event.itemStack as ItemStack;
    }

    onUse(event:ItemComponentUseEvent) {
        let source = event.source as Player;
        let itemStack = event.itemStack as ItemStack;
        shotFlametHrower(source, itemStack);
    }
}

/**
 * 火炎放射器発射
 * @param {Player} player
 * @param {ItemStack} item
 */
async function shotFlametHrower(player: Player, item: ItemStack) {

    player.setDynamicProperty("flametHrowerShot", true);
    player.addTag("flametHrowerSelf");
    let dimension = player.dimension;
    let count = 0;
    let intervalNum = system.runInterval(() => {

        for (let i=1;i<=5;i++) {
            let loock = getLookPoints(player.getRotation(), player.location, i);
            let loockpoint = getAdjacentSphericalPoints(player.getRotation(), loock);
            player.dimension.spawnParticle("kurokumaft:flamethrower_fire", {x:loockpoint.xlocation!, y:loockpoint.ylocation!-1, z:loockpoint.zlocation!});

            let target = dimension.getEntities({
                excludeTags: [
                    "flametHrowerSelf"
                ],
                excludeTypes: [
                    "item"
                ],
                location: {x:loockpoint.xlocation!, y:loockpoint.ylocation!-0.5, z:loockpoint.zlocation!},
                maxDistance: 2
            }) as Entity[];
        
            target.forEach(en => {
                en.applyDamage(4, {
                    cause: EntityDamageCause.fire
                })
            })
            if (count % 4 === 0) {
                itemDurabilityDamage(player, item, EquipmentSlot.Mainhand);
            }
        }

        count = count + 1;
    }, 4);
    player.setDynamicProperty("flametHrowerEventNum", intervalNum);

}

/**
 * 火炎放射器停止
 * @param {Player} player
 */
export async function stopFlametHrower(player: Player) {

    let eventNum = player.getDynamicProperty("flametHrowerEventNum") as number;
    player.setDynamicProperty("flametHrowerShot", undefined);
    player.setDynamicProperty("flametHrowerEventNum", undefined);
    player.removeTag("flametHrowerSelf");
    system.clearRun(eventNum);

}

