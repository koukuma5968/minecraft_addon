import { ItemCustomComponent, ItemComponentHitEntityEvent, ItemStack, Entity, ItemComponentUseEvent, Player, EquipmentSlot } from "@minecraft/server";
import { itemTans } from "../../../common/commonUtil";
import { shooting } from "../../../common/ShooterPoints";
import { slashHit } from "../../../common/SlashAttack";
import { itemDurabilityDamage } from "../../../common/ItemDurabilityDamage";

interface SickleObject {
    itemName: string,
    changeItem: string,
    throwEntity: string,
    damage: number
}

const SickleObjects = Object.freeze([
    {
        itemName: "kurokumaft:wood_sickle",
        changeItem: "kurokumaft:wood_scythe",
        throwEntity: "kurokumaft:spirit_sickle<kurokumaft:wooden_spirit_sickle>",
        damage: 1
    },
    {
        itemName: "kurokumaft:stone_sickle",
        changeItem: "kurokumaft:stone_scythe",
        throwEntity: "kurokumaft:spirit_sickle<kurokumaft:stone_spirit_sickle>",
        damage: 2
    },
    {
        itemName: "kurokumaft:iron_sickle",
        changeItem: "kurokumaft:iron_scythe",
        throwEntity: "kurokumaft:spirit_sickle<kurokumaft:iron_spirit_sickle>",
        damage: 3
    }

]);

/**
 * シックル
 */
export class Sickle implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {
        let attackEntity = event.attackingEntity as Entity;
        let hitEntity = event.hitEntity as Entity;
        let itemStack = event.itemStack as ItemStack;

        let sickle = SickleObjects.find(obj => obj.itemName == itemStack.typeId) as SickleObject;
        slashHit(attackEntity, hitEntity, sickle.damage);
    }

    onUse(event:ItemComponentUseEvent) {
        let source = event.source as Player;
        let itemStack = event.itemStack as ItemStack;
        let scytheItem = SickleObjects.find(obj => obj.itemName == itemStack.typeId) as SickleObject;
        if (source.isSneaking) {
            itemTans(source, itemStack, scytheItem.changeItem, EquipmentSlot.Mainhand);
        } else {
            spiritSickle(source, scytheItem);
            itemDurabilityDamage(source, itemStack, EquipmentSlot.Mainhand);
        }
    }
}

async function spiritSickle(player: Player, scytheItem: SickleObject) {
    shooting(player, scytheItem.throwEntity, 0, 3, undefined);
    player.runCommandAsync("/titleraw @s actionbar {\"rawtext\": [{\"translate\": \"mess.kurokumaft:spirit_sickle.shot\"}]}");
}