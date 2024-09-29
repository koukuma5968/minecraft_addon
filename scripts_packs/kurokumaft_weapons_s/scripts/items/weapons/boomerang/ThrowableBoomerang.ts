import { ItemCustomComponent, ItemStack, Entity, system, ItemComponentUseEvent, Player, EquipmentSlot, EntityComponentTypes, EntityEquippableComponent, EntityInventoryComponent, Container, TicksPerSecond } from "@minecraft/server";
import { getDirectionVector } from "../../../common/commonUtil";
import { throwItemDurabilityDamage } from "../../../common/ItemDurabilityDamage";

interface BoomerangObject {
    itemName: string,
    throwBoomerang: string,
    damage: number
}

const BoomerangObjects = Object.freeze([
    {
        itemName: "kurokumaft:wooden_boomerang",
        throwBoomerang: "kurokumaft:thrown_wooden_boomerang",
        damage: 1
    },
    {
        itemName: "kurokumaft:stone_boomerang",
        throwBoomerang: "kurokumaft:thrown_stone_boomerang",
        damage: 2
    },
    {
        itemName: "kurokumaft:iron_boomerang",
        throwBoomerang: "kurokumaft:thrown_iron_boomerang",
        damage: 1
    },
    {
        itemName: "kurokumaft:diamond_boomerang",
        throwBoomerang: "kurokumaft:thrown_diamond_boomerang",
        damage: 5
    }

]);

/**
 * スピアースロー
 */
export class ThrowableBoomerang implements ItemCustomComponent {

    onUse(event:ItemComponentUseEvent) {
        let source = event.source as Player;
        let itemStack = event.itemStack as ItemStack;
        source.addTag("boomerangOwner");
    }
}

export async function spawnBoomerang(throwBoomerang:Entity) {

    let boomerang = BoomerangObjects.find(obj => obj.throwBoomerang == throwBoomerang.typeId) as BoomerangObject;
    if (!boomerang) {
        return;
    }
    throwBoomerang.setDynamicProperty("throwBoomerang", true);
    throwBoomerang.addTag("throwBoomerang");

}

async function stopBoomerang(player:Player) {
    player.removeTag("boomerangOwner");
}

export async function releaseBoomerang(player:Player, boomerang:ItemStack) {

    let boomerangItem = BoomerangObjects.find(obj => obj.itemName == boomerang.typeId) as BoomerangObject;

    if (!boomerangItem) {
        return;
    }

    let throwBoomerang = player.dimension.getEntities({
        tags: [
            "throwBoomerang"
        ],
        families: [
            "boomerang"
        ],
        location: player.location,
        closest: 1
    }) as Entity[];

    if (throwBoomerang.length > 0) {
        throwItemDurabilityDamage(throwBoomerang[0], boomerang, 0, undefined);
        system.runTimeout(() => {
            hitBoomerang(player, throwBoomerang[0]);
        }, TicksPerSecond * 2);
    
    }

}

async function removeBoomerang(player: Player, throwBoomerang:Entity) {

    let item = BoomerangObjects.find(obj => obj.throwBoomerang == throwBoomerang.typeId) as BoomerangObject;
    if (!item) {
        return;
    }

    if (!throwBoomerang.getDynamicProperty("throwBoomerang")) {
        return;
    }

    let invent = throwBoomerang.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
    let container = invent.container as Container;
    let boomerang = container.getItem(0) as ItemStack;

    let emptySlot = true;
    let equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
    let main = equ.getEquipment(EquipmentSlot.Mainhand) as ItemStack;
    if (main == undefined) {
        system.runTimeout(() => {
            equ.setEquipment(EquipmentSlot.Mainhand, boomerang);
        }, 2);
        emptySlot = false;
    } else {
        let invent = player.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
        let con = invent.container as Container;
        if (con.emptySlotsCount > 0){
            system.runTimeout(() => {
                con.addItem(boomerang);
            }, 2);
            emptySlot = false;
        }
    }
    if (emptySlot) {
        let dim = throwBoomerang.dimension;
        let loca = throwBoomerang.location;
        system.runTimeout(() => {
            dim.spawnItem(boomerang, loca);
        }, 2);
    }
}

async function hitBoomerang(throwEntity:Entity, throwBoomerang:Entity) {

    let item = BoomerangObjects.find(obj => obj.throwBoomerang == throwBoomerang.typeId) as BoomerangObject;
    if (!item) {
        return;
    }

    let intervalNum = system.runInterval(() => {
        if (throwBoomerang != undefined && throwBoomerang.isValid()) {
            let player = throwBoomerang.dimension.getEntities({
                families: [
                    "player"
                ],
                name: throwEntity.nameTag,
                location: throwBoomerang.location,
                maxDistance: 2,
                closest: 1
            }) as Player[];

            if (player.length > 0) {
                stopBoomerang(player[0]);
                removeBoomerang(player[0], throwBoomerang);
                throwBoomerang.remove();
            } else {
                let targetLoc = getDirectionVector(throwBoomerang.location, {x:throwEntity.location.x, y:throwEntity.location.y+1, z:throwEntity.location.z});
                let tpLoc = {
                    x:throwBoomerang.location.x+targetLoc.x,
                    y:throwBoomerang.location.y+targetLoc.y,
                    z:throwBoomerang.location.z+targetLoc.z
                }
                throwBoomerang.teleport(tpLoc, {
                    checkForBlocks: false,
                    keepVelocity: true
                });
            }
        } else {
            system.clearRun(intervalNum);
        }
    }, 1);
}