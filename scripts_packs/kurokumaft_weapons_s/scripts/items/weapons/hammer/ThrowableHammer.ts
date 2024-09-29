import { ItemCustomComponent, ItemComponentHitEntityEvent, ItemStack, Entity, system, ItemComponentUseEvent, Player, EquipmentSlot, EntityComponentTypes, EntityEquippableComponent, EntityInventoryComponent, Container, EntityDamageCause, world } from "@minecraft/server";
import { getLookPoints } from "../../../common/commonUtil";
import { throwItemDurabilityDamage } from "../../../common/ItemDurabilityDamage";
import { shooting } from "../../../common/ShooterPoints";

interface HammerObject {
    itemName: string,
    throwHammer: string
}

const HammerObjects = Object.freeze([
    {
        itemName: "kurokumaft:wooden_hammer",
        throwHammer: "kurokumaft:thrown_wooden_hammer"
    },
    {
        itemName: "kurokumaft:stone_hammer",
        throwHammer: "kurokumaft:thrown_stone_hammer"
    },
    {
        itemName: "kurokumaft:iron_hammer",
        throwHammer: "kurokumaft:thrown_iron_hammer"
    },
    {
        itemName: "kurokumaft:golden_hammer",
        throwHammer: "kurokumaft:thrown_golden_hammer"
    },
    {
        itemName: "kurokumaft:diamond_hammer",
        throwHammer: "kurokumaft:thrown_diamond_hammer"
    },
    {
        itemName: "kurokumaft:netherite_hammer",
        throwHammer: "kurokumaft:thrown_netherite_hammer"
    },
    {
        itemName: "kurokumaft:warden_hammer",
        throwHammer: "kurokumaft:thrown_warden_hammer"
    }
]);

/**
 * ハンマースロー
 */
export class ThrowableHammer implements ItemCustomComponent {

    onUse(event:ItemComponentUseEvent) {
        let source = event.source as Player;
        let itemStack = event.itemStack as ItemStack;
    }
}

export async function spawnHammer(throwHammer:Entity) {

    let hammer = HammerObjects.find(obj => obj.throwHammer == throwHammer.typeId) as HammerObject;
    if (!hammer) {
        return;
    }
    throwHammer.setDynamicProperty("throwHammer", true);
    throwHammer.addTag("throwHammer");

}

export async function releaseHammer(player:Player, hammer:ItemStack) {

    let hammerItem = HammerObjects.find(obj => obj.itemName == hammer.typeId) as HammerObject;

    if (!hammerItem) {
        return;
    }

    let throwHammer = player.dimension.getEntities({
        tags: [
            "throwHammer"
        ],
        families: [
            "hammer"
        ],
        location: player.location,
        closest: 1
    }) as Entity[];

    if (throwHammer.length > 0) {
        throwItemDurabilityDamage(throwHammer[0], hammer, 0, undefined);
    }

}

export async function stopHammer(throwHammer:Entity) {
    system.runTimeout(() => {
        throwHammer.triggerEvent("variant1");
    },10);
}

export async function removeHammer(throwHammer:Entity) {

    let item = HammerObjects.find(obj => obj.throwHammer == throwHammer.typeId) as HammerObject;
    if (!item) {
        return;
    }

    if (!throwHammer.getDynamicProperty("throwHammer")) {
        return;
    }

    let invent = throwHammer.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
    let container = invent.container as Container;
    let hammer = container.getItem(0) as ItemStack;

    let player = throwHammer.dimension.getEntities({
        families: [
            "player"
        ],
        location: throwHammer.location,
        closest: 1
    }) as Player[];

    let emptySlot = true;
    if (player) {
        let equ = player[0].getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        let main = equ.getEquipment(EquipmentSlot.Mainhand) as ItemStack;
        if (main == undefined) {
            system.runTimeout(() => {
                equ.setEquipment(EquipmentSlot.Mainhand, hammer);
            }, 2);
            emptySlot = false;
        } else {
            let invent = player[0].getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
            let con = invent.container as Container;
            if (con.emptySlotsCount > 0){
                system.runTimeout(() => {
                    con.addItem(hammer);
                }, 2);
                emptySlot = false;
            }
        }
    }
    if (emptySlot) {
        let dim = throwHammer.dimension;
        let loca = throwHammer.location;
        system.runTimeout(() => {
            dim.spawnItem(hammer, loca);
        }, 2);
    }
}

export function isThrowHammer(throwHammer:Entity) : boolean {
   let item = HammerObjects.find(obj => obj.throwHammer == throwHammer.typeId) as HammerObject;
    return item != undefined;
}