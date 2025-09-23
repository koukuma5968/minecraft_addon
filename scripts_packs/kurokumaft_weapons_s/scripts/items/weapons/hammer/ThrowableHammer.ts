import { ItemCustomComponent, ItemStack, Entity, system, ItemComponentUseEvent, Player, EquipmentSlot, EntityComponentTypes, EntityEquippableComponent, EntityInventoryComponent, Container, EntityProjectileComponent } from "@minecraft/server";
import { throwItemDurabilityDamage } from "../../../common/WeaponsItemDurabilityDamage";

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
        const source = event.source as Player;
        const itemStack = event.itemStack as ItemStack;
    }
}

export async function spawnHammer(throwHammer:Entity) {

    const hammer = HammerObjects.find(obj => obj.throwHammer == throwHammer.typeId) as HammerObject;
    if (!hammer) {
        return;
    }
    throwHammer.setDynamicProperty("throwHammer", true);
    throwHammer.addTag("throwHammer");

}

export async function releaseHammer(player:Player, hammer:ItemStack) {

    const hammerItem = HammerObjects.find(obj => obj.itemName == hammer.typeId) as HammerObject;

    if (!hammerItem) {
        return;
    }

    const throwHammer = player.dimension.getEntities({
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
        const projectile = throwHammer[0].getComponent(EntityComponentTypes.Projectile) as EntityProjectileComponent;
        projectile.owner = player;
        throwItemDurabilityDamage(throwHammer[0], hammer, 0, undefined);
    }

}

export async function stopHammer(throwHammer:Entity) {
    system.runTimeout(() => {
        if (throwHammer.isValid) {
            throwHammer.triggerEvent("variant1");
        }
    },10);
}

export async function removeHammer(throwHammer:Entity) {

    const item = HammerObjects.find(obj => obj.throwHammer == throwHammer.typeId) as HammerObject;
    if (item === undefined) {
        return;
    }

    if (!throwHammer.getDynamicProperty("throwHammer")) {
        return;
    }

    const invent = throwHammer.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
    const container = invent.container as Container;
    const hammer = container.getItem(0) as ItemStack;

    const player = throwHammer.dimension.getEntities({
        families: [
            "player"
        ],
        location: throwHammer.location,
        closest: 1
    }) as Player[];

    let emptySlot = true;
    if (player.length > 0) {
        const equ = player[0].getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        const main = equ.getEquipment(EquipmentSlot.Mainhand) as ItemStack;
        if (main === undefined) {
            system.runTimeout(() => {
                equ.setEquipment(EquipmentSlot.Mainhand, hammer);
            }, 2);
            emptySlot = false;
        } else {
            const invent = player[0].getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
            const con = invent.container as Container;
            if (con.emptySlotsCount > 0){
                system.runTimeout(() => {
                    con.addItem(hammer);
                }, 2);
                emptySlot = false;
            }
        }
    }
    if (emptySlot) {
        const dim = throwHammer.dimension;
        const loca = throwHammer.location;
        system.runTimeout(() => {
            dim.spawnItem(hammer, loca);
        }, 2);
    }
}

export function isThrowHammer(throwHammer:Entity) : boolean {
   const item = HammerObjects.find(obj => obj.throwHammer == throwHammer.typeId) as HammerObject;
    return item != undefined;
}