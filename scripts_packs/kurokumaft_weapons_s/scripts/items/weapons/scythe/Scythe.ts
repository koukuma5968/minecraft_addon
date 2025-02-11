import { ItemCustomComponent, ItemComponentHitEntityEvent, ItemStack, Entity, ItemComponentUseEvent, Player, EquipmentSlot } from "@minecraft/server";
import { itemTans } from "../../../common/WeaponsCommonUtil";
import { shooting } from "../../../common/WeaponsShooterPoints";
import { sweepHit } from "../../../common/WeaponsSweepAttack";
import { itemDurabilityDamage } from "../../../common/WeaponsItemDurabilityDamage";

interface ScytheObject {
    itemName: string,
    changeItem: string,
    throwEntity: string,
    damage: number
}

const ScytheObjects = Object.freeze([
    {
        itemName: "kurokumaft:wood_scythe",
        changeItem: "kurokumaft:wood_sickle",
        throwEntity: "kurokumaft:roar_scythe<kurokumaft:wood_scythe_roar>",
        damage: 1
    },
    {
        itemName: "kurokumaft:stone_sickle",
        changeItem: "kurokumaft:stone_scythe",
        throwEntity: "kurokumaft:roar_scythe<kurokumaft:stone_scythe_roar>",
        damage: 2
    },
    {
        itemName: "kurokumaft:iron_sickle",
        changeItem: "kurokumaft:iron_scythe",
        throwEntity: "kurokumaft:roar_scythe<kurokumaft:iron_scythe_roar>",
        damage: 3
    }

]);

/**
 * サイス
 */
export class Scythe implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {
        let attackEntity = event.attackingEntity as Entity;
        let hitEntity = event.hitEntity as Entity;
        let itemStack = event.itemStack as ItemStack;

        let sickle = ScytheObjects.find(obj => obj.itemName == itemStack.typeId) as ScytheObject;
        sweepHit(attackEntity, hitEntity, sickle.damage);

    }

    onUse(event:ItemComponentUseEvent) {
        let source = event.source as Player;
        let itemStack = event.itemStack as ItemStack;
        let scytheItem = ScytheObjects.find(obj => obj.itemName == itemStack.typeId) as ScytheObject;
        if (source.isSneaking) {
            itemTans(source, itemStack, scytheItem.changeItem, EquipmentSlot.Mainhand);
        } else {
            roarScythe(source, scytheItem);
            itemDurabilityDamage(source, itemStack, EquipmentSlot.Mainhand);
        }
    }
}

async function roarScythe(player: Player, scytheItem: ScytheObject) {
    shooting(player, scytheItem.throwEntity, 0, 1, undefined);
    player.runCommandAsync("/titleraw @s actionbar {\"rawtext\": [{\"translate\": \"mess.kurokumaft:roar_scythe.shot\"}]}");
}