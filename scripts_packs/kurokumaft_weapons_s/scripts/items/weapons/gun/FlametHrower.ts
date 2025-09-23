import { ItemCustomComponent, ItemComponentHitEntityEvent, ItemStack, Entity, system, ItemComponentUseEvent, Player, EquipmentSlot, EntityDamageCause, CustomComponentParameters, ItemComponentBeforeDurabilityDamageEvent, ItemComponentTypes, ItemDurabilityComponent } from "@minecraft/server";
import { getLookPoints } from "../../../common/WeaponsCommonUtil";
import { itemDurabilityDamage } from "../../../common/WeaponsItemDurabilityDamage";
import { getAdjacentSphericalPoints } from "../../../common/WeaponsShooterPoints";

/**
 * 火炎放射器
 */
export class FlametHrower implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {
        const attackEntity = event.attackingEntity as Entity;
        const hitEntity = event.hitEntity as Entity;
        const itemStack = event.itemStack as ItemStack;
    }

    onUse(event:ItemComponentUseEvent) {
        const source = event.source as Player;
        const itemStack = event.itemStack as ItemStack;
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
    const dimension = player.dimension;
    let count = 0;
    const intervalNum = system.runInterval(() => {

        try {
            for (let i=1;i<=5;i++) {
                const loock = getLookPoints(player.getRotation(), player.location, i);
                const loockpoint = getAdjacentSphericalPoints(player.getRotation(), loock);
                player.dimension.spawnParticle("kurokumaft:flamethrower_fire", {x:loockpoint.xlocation!, y:loockpoint.ylocation!-1, z:loockpoint.zlocation!});

                const target = dimension.getEntities({
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
                    const durability = item.getComponent(ItemComponentTypes.Durability) as ItemDurabilityComponent;
                    if (item === undefined || durability.damage === 0) {
                        stopFlametHrower(player);
                        return;
                    }
                }
            }
            count = count + 1;
        } catch (error:any) {
            stopFlametHrower(player);
        }

    }, 4);
    player.setDynamicProperty("flametHrowerEventNum", intervalNum);

}

/**
 * 火炎放射器停止
 * @param {Player} player
 */
export async function stopFlametHrower(player: Player) {

    const eventNum = player.getDynamicProperty("flametHrowerEventNum") as number;
    player.setDynamicProperty("flametHrowerShot", undefined);
    player.setDynamicProperty("flametHrowerEventNum", undefined);
    player.removeTag("flametHrowerSelf");
    system.clearRun(eventNum);

}

