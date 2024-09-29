import { ItemCustomComponent, ItemComponentHitEntityEvent, ItemStack, Entity, system, ItemComponentUseEvent, Player, EquipmentSlot, EntityDamageCause } from "@minecraft/server";
import { getLookPoints } from "../../../common/commonUtil";
import { ItemDurabilityDamage } from "../../../common/ItemDurabilityDamage";

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
            player.dimension.spawnParticle("kurokumaft:flamethrower_fire", {x:loock.x, y:loock.y-0.5, z:loock.z});

            let target = dimension.getEntities({
                excludeTags: [
                    "flametHrowerSelf"
                ],
                excludeTypes: [
                    "item"
                ],
                location: loock
            }) as Entity[];
        
            target.forEach(en => {
                en.applyDamage(2, {
                    cause: EntityDamageCause.fire
                })
            })
            if (count % 4 === 0) {
                ItemDurabilityDamage(player, item, EquipmentSlot.Mainhand, undefined);
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

