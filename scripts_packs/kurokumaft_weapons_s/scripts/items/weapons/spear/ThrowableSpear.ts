import { ItemCustomComponent, ItemComponentHitEntityEvent, ItemStack, Entity, system, ItemComponentUseEvent, Player, EquipmentSlot, ItemComponentTypes, EntityComponentTypes, EntityEquippableComponent, EntityInventoryComponent, Container, ItemEnchantableComponent, Enchantment } from "@minecraft/server";
import { getDirectionVector } from "../../../common/WeaponsCommonUtil";
import { MinecraftEnchantmentTypes } from "@minecraft/vanilla-data";
import { sweepHit } from "../../../common/WeaponsSweepAttack";
import { throwItemDurabilityDamage } from "../../../common/WeaponsItemDurabilityDamage";

interface SpearObject {
    itemName: string,
    throwSpear: string,
    damage: number
}

const SpearObjects = Object.freeze([
    {
        itemName: "kurokumaft:wooden_spear",
        throwSpear: "kurokumaft:thrown_wooden_spear",
        damage: 1
    },
    {
        itemName: "kurokumaft:stone_spear",
        throwSpear: "kurokumaft:thrown_stone_spear",
        damage: 2
    },
    {
        itemName: "kurokumaft:bamboo_spear",
        throwSpear: "kurokumaft:thrown_bamboo_spear",
        damage: 1
    },
    {
        itemName: "kurokumaft:iron_spear",
        throwSpear: "kurokumaft:thrown_iron_spear",
        damage: 1
    },
    {
        itemName: "kurokumaft:cherry_spear",
        throwSpear: "kurokumaft:thrown_cherry_spear",
        damage: 2
    },
    {
        itemName: "kurokumaft:steel_spear",
        throwSpear: "kurokumaft:thrown_steel_spear",
        damage: 6
    },
    {
        itemName: "kurokumaft:blaze_spear",
        throwSpear: "kurokumaft:thrown_blaze_spear",
        damage: 6
    },
    {
        itemName: "kurokumaft:mithril_spear",
        throwSpear: "kurokumaft:thrown_mithril_spear",
        damage: 5
    },
    {
        itemName: "kurokumaft:diamond_spear",
        throwSpear: "kurokumaft:thrown_diamond_spear",
        damage: 5
    },
    {
        itemName: "kurokumaft:netherite_spear",
        throwSpear: "kurokumaft:thrown_netherite_spear",
        damage: 5
    }

]);

/**
 * スピアースロー
 */
export class ThrowableSpear implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity(event:ItemComponentHitEntityEvent) {

        let attackEntity = event.attackingEntity as Entity;
        let hitEntity = event.hitEntity as Entity;
        let itemStack = event.itemStack as ItemStack;

        let spear = SpearObjects.find(obj => obj.itemName == itemStack.typeId) as SpearObject;
        sweepHit(attackEntity, hitEntity, spear.damage);
    }

    onUse(event:ItemComponentUseEvent) {
        let source = event.source as Player;
        let itemStack = event.itemStack as ItemStack;
        source.addTag("spearOwner");
    }
}

export async function spawnSpear(throwSpear:Entity) {

    let spear = SpearObjects.find(obj => obj.throwSpear == throwSpear.typeId) as SpearObject;
    if (!spear) {
        return;
    }
    throwSpear.setDynamicProperty("throwSpear", true);
    throwSpear.addTag("throwSpear");

}

export async function stopSpear(player:Player) {
    player.removeTag("spearOwner");
}

export async function releaseSpear(player:Player, spear:ItemStack) {

    let spearItem = SpearObjects.find(obj => obj.itemName == spear.typeId) as SpearObject;

    if (!spearItem) {
        return;
    }

    let throwSpear = player.dimension.getEntities({
        tags: [
            "throwSpear"
        ],
        families: [
            "spear"
        ],
        location: player.location,
        closest: 1
    }) as Entity[];

    if (throwSpear.length > 0) {
        throwItemDurabilityDamage(throwSpear[0], spear, 0, undefined);

        let enchant = spear.getComponent(ItemComponentTypes.Enchantable) as ItemEnchantableComponent;
        if (enchant.hasEnchantment(MinecraftEnchantmentTypes.Loyalty)) {
            let loyalty = enchant.getEnchantment(MinecraftEnchantmentTypes.Loyalty) as Enchantment;
            throwSpear[0].setDynamicProperty("Loyalty", true);
            throwSpear[0].setDynamicProperty("LoyaltyLevel", loyalty.level);
        } else {
            throwSpear[0].setDynamicProperty("Loyalty", false);
        }
    }

}

export async function removeSpear(throwSpear:Entity) {

    let item = SpearObjects.find(obj => obj.throwSpear == throwSpear.typeId) as SpearObject;
    if (!item) {
        return;
    }

    if (!throwSpear.getDynamicProperty("throwSpear")) {
        return;
    }

    let invent = throwSpear.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
    let container = invent.container as Container;
    let spear = container.getItem(0) as ItemStack;

    let player = throwSpear.dimension.getEntities({
        families: [
            "player"
        ],
        location: throwSpear.location,
        closest: 1
    }) as Player[];

    let emptySlot = true;
    if (player) {
        let equ = player[0].getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        let main = equ.getEquipment(EquipmentSlot.Mainhand) as ItemStack;
        if (main == undefined) {
            system.runTimeout(() => {
                equ.setEquipment(EquipmentSlot.Mainhand, spear);
            }, 2);
            emptySlot = false;
        } else {
            let invent = player[0].getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
            let con = invent.container as Container;
            if (con.emptySlotsCount > 0){
                system.runTimeout(() => {
                    con.addItem(spear);
                }, 2);
                emptySlot = false;
            }
        }
    }
    if (emptySlot) {
        let dim = throwSpear.dimension;
        let loca = throwSpear.location;
        system.runTimeout(() => {
            dim.spawnItem(spear, loca);
        }, 2);
    }
}

export async function hitSpear(throwEntity:Entity, throwSpear:Entity) {

    let item = SpearObjects.find(obj => obj.throwSpear == throwSpear.typeId) as SpearObject;
    if (!item) {
        return;
    }

    if (throwSpear.getDynamicProperty("Loyalty")) {
        let level = throwSpear.getDynamicProperty("LoyaltyLevel") as number
        system.runTimeout(() => {
            let intervalNum = system.runInterval(() => {
                if (throwSpear != undefined && throwSpear.isValid()) {
                    let targetLoc = getDirectionVector(throwSpear.location, {x:throwEntity.location.x, y:throwEntity.location.y+1, z:throwEntity.location.z});
                    let tpLoc = {
                        x:throwSpear.location.x+targetLoc.x,
                        y:throwSpear.location.y+targetLoc.y,
                        z:throwSpear.location.z+targetLoc.z
                    }
                    throwSpear.teleport(tpLoc, {
                        checkForBlocks: false,
                        keepVelocity: true
                    });
                } else {
                    system.clearRun(intervalNum);
                }
            }, level==1?3:level==2?2:1);
        }, 5);
    }
}