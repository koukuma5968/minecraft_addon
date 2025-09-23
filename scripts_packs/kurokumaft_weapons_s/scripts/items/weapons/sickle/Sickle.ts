import { ItemCustomComponent, ItemComponentHitEntityEvent, ItemStack, Entity, ItemComponentUseEvent, Player, EquipmentSlot } from "@minecraft/server";
import { itemTans } from "../../../common/WeaponsCommonUtil";
import { shooting } from "../../../common/WeaponsShooterPoints";
import { slashHit } from "../../../common/WeaponsSlashAttack";
import { itemDurabilityDamage } from "../../../common/WeaponsItemDurabilityDamage";

interface SickleObject {
    itemName: string,
    changeItem: string,
    throwEntity: string,
    event: string,
    damage: number
}

const SickleObjects = Object.freeze([
    {
        itemName: "kurokumaft:wood_sickle",
        changeItem: "kurokumaft:wood_scythe",
        throwEntity: "kurokumaft:spirit_sickle",
        event: "kurokumaft:wooden_spirit_sickle",
        damage: 1
    },
    {
        itemName: "kurokumaft:stone_sickle",
        changeItem: "kurokumaft:stone_scythe",
        throwEntity: "kurokumaft:spirit_sickle",
        event: "kurokumaft:stone_spirit_sickle",
        damage: 2
    },
    {
        itemName: "kurokumaft:iron_sickle",
        changeItem: "kurokumaft:iron_scythe",
        throwEntity: "kurokumaft:spirit_sickle",
        event: "kurokumaft:iron_spirit_sickle",
        damage: 3
    }

]);

/**
 * シックル
 */
export class Sickle implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {
        const attackEntity = event.attackingEntity as Entity;
        const hitEntity = event.hitEntity as Entity;
        const itemStack = event.itemStack as ItemStack;

        const sickle = SickleObjects.find(obj => obj.itemName == itemStack.typeId) as SickleObject;
        slashHit(attackEntity, hitEntity, sickle.damage);
    }

    onUse(event:ItemComponentUseEvent) {
        const source = event.source as Player;
        const itemStack = event.itemStack as ItemStack;
        const scytheItem = SickleObjects.find(obj => obj.itemName == itemStack.typeId) as SickleObject;
        if (source.isSneaking) {
            itemTans(source, itemStack, scytheItem.changeItem, EquipmentSlot.Mainhand);
        } else {
            spiritSickle(source, scytheItem);
            itemDurabilityDamage(source, itemStack, EquipmentSlot.Mainhand);
        }
    }
}

async function spiritSickle(player: Player, scytheItem: SickleObject) {
    shooting(player, scytheItem.throwEntity, 0, 3, scytheItem.event);
    player.onScreenDisplay.setActionBar({translate:"mess.kurokumaft:spirit_sickle.shot"});
}