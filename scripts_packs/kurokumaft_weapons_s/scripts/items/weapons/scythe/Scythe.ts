import { ItemCustomComponent, ItemComponentHitEntityEvent, ItemStack, Entity, ItemComponentUseEvent, Player, EquipmentSlot } from "@minecraft/server";
import { itemTans } from "../../../common/WeaponsCommonUtil";
import { sweepHit } from "../../../common/WeaponsSweepAttack";
import { itemDurabilityDamage } from "../../../common/WeaponsItemDurabilityDamage";

interface ScytheObject {
    itemName: string,
    changeItem: string,
    throwEntity: string,
    event: string,
    damage: number
}

const ScytheObjects = Object.freeze([
    {
        itemName: "kurokumaft:wood_scythe",
        changeItem: "kurokumaft:wood_sickle",
        throwEntity: "kurokumaft:roar_scythe",
        event: "kurokumaft:wood_scythe_roar",
        damage: 1
    },
    {
        itemName: "kurokumaft:stone_scythe",
        changeItem: "kurokumaft:stone_sickle",
        throwEntity: "kurokumaft:roar_scythe",
        event: "kurokumaft:stone_scythe_roar",
        damage: 2
    },
    {
        itemName: "kurokumaft:iron_scythe",
        changeItem: "kurokumaft:iron_sickle",
        throwEntity: "kurokumaft:roar_scythe",
        event: "kurokumaft:iron_scythe_roar",
        damage: 3
    }

]);

/**
 * サイス
 */
export class Scythe implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {
        const attackEntity = event.attackingEntity as Entity;
        const hitEntity = event.hitEntity as Entity;
        const itemStack = event.itemStack as ItemStack;

        const sickle = ScytheObjects.find(obj => obj.itemName == itemStack.typeId) as ScytheObject;
        sweepHit(attackEntity, hitEntity, sickle.damage);

    }

    onUse(event:ItemComponentUseEvent) {
        const source = event.source as Player;
        const itemStack = event.itemStack as ItemStack;
        const scytheItem = ScytheObjects.find(obj => obj.itemName == itemStack.typeId) as ScytheObject;
        if (source.isSneaking) {
            itemTans(source, itemStack, scytheItem.changeItem, EquipmentSlot.Mainhand);
        } else {
            roarScythe(source, scytheItem);
            itemDurabilityDamage(source, itemStack, EquipmentSlot.Mainhand);
        }
    }
}

async function roarScythe(player: Player, scytheItem: ScytheObject) {
    player.dimension.spawnEntity(scytheItem.throwEntity, player.getHeadLocation(), {
        spawnEvent: scytheItem.event
    });
    player.onScreenDisplay.setActionBar({translate:"mess.kurokumaft:roar_scythe.shot"});
}