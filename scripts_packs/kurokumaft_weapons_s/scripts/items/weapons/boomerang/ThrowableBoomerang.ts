import { ItemCustomComponent, ItemStack, Entity, system, ItemComponentUseEvent, Player, EquipmentSlot, EntityComponentTypes, EntityEquippableComponent, EntityInventoryComponent, Container, TicksPerSecond } from "@minecraft/server";
import { getDirectionVector } from "../../../common/WeaponsCommonUtil";
import { throwItemDurabilityDamage } from "../../../common/WeaponsItemDurabilityDamage";

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
        const source = event.source as Player;
        const itemStack = event.itemStack as ItemStack;
        source.addTag("boomerangOwner");
    }
}

export async function spawnBoomerang(throwBoomerang:Entity) {

    const boomerang = BoomerangObjects.find(obj => obj.throwBoomerang === throwBoomerang.typeId) as BoomerangObject;
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

    const boomerangItem = BoomerangObjects.find(obj => obj.itemName === boomerang.typeId) as BoomerangObject;

    if (boomerangItem === undefined) {
        return;
    }

    const throwBoomerang = player.dimension.getEntities({
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

    const item = BoomerangObjects.find(obj => obj.throwBoomerang === throwBoomerang.typeId) as BoomerangObject;
    if (item == undefined) {
        return;
    }

    if (!throwBoomerang.getDynamicProperty("throwBoomerang")) {
        return;
    }

    const invent = throwBoomerang.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
    const container = invent.container as Container;
    const boomerang = container.getItem(0) as ItemStack;

    let emptySlot = true;
    const equ = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
    const main = equ.getEquipment(EquipmentSlot.Mainhand) as ItemStack;
    if (main === undefined) {
        system.runTimeout(() => {
            equ.setEquipment(EquipmentSlot.Mainhand, boomerang);
        }, 2);
        emptySlot = false;
    } else {
        const invent = player.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
        const con = invent.container as Container;
        if (con.emptySlotsCount > 0){
            system.runTimeout(() => {
                con.addItem(boomerang);
            }, 2);
            emptySlot = false;
        }
    }
    if (emptySlot) {
        const dim = throwBoomerang.dimension;
        const loca = throwBoomerang.location;
        system.runTimeout(() => {
            dim.spawnItem(boomerang, loca);
        }, 2);
    }
}

async function hitBoomerang(throwEntity:Entity, throwBoomerang:Entity) {

    const item = BoomerangObjects.find(obj => obj.throwBoomerang === throwBoomerang.typeId) as BoomerangObject;
    if (item === undefined) {
        return;
    }

    const intervalNum = system.runInterval(() => {
        if (throwBoomerang != undefined && throwBoomerang.isValid) {
            const player = throwBoomerang.dimension.getEntities({
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
                const targetLoc = getDirectionVector(throwBoomerang.location, {x:throwEntity.location.x, y:throwEntity.location.y+1, z:throwEntity.location.z});
                const tpLoc = {
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