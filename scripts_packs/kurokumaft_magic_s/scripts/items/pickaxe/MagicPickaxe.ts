import { ItemCustomComponent, ItemStack, Entity, EntityDamageCause, ItemComponentHitEntityEvent, ItemComponentUseOnEvent, Player, world } from "@minecraft/server";
import { firingOreBlock } from "./BlazeMagicPickaxe";
import { breakRangeBlock } from "./GraizMagicPickaxe";
import { breakLineBlock } from "./VolzasMagicPickaxe";
import { freezeRangeBlock } from "./BlizzasMagicPickaxe";
import { polishBlock } from "./BreezeMagicPickaxe";
import { wetRangeBlock } from "./DraizMagicPickaxe";

interface PicAttackObject {
    itemName:string,
    cause:EntityDamageCause
    damage:number,
    particle:string
}

const PicAttackObjects = Object.freeze([
    {
        itemName: "kurokumaft:fire_pickaxe",
        cause: EntityDamageCause.fire,
        damage: 1,
        particle: "kurokumaft:pickaxe_fire"
    },
    {
        itemName: "kurokumaft:water_pickaxe",
        cause: EntityDamageCause.drowning,
        damage: 1,
        particle: "kurokumaft:pickaxe_water"
    },
    {
        itemName: "kurokumaft:wind_pickaxe",
        cause: EntityDamageCause.fall,
        damage: 1,
        particle: "kurokumaft:pickaxe_wind"
    },
    {
        itemName: "kurokumaft:stone_pickaxe",
        cause: EntityDamageCause.thorns,
        damage: 1,
        particle: "kurokumaft:pickaxe_stone"
    },
    {
        itemName: "kurokumaft:lightning_pickaxe",
        cause: EntityDamageCause.lightning,
        damage: 1,
        particle: "kurokumaft:pickaxe_lightning"
    },
    {
        itemName: "kurokumaft:ice_pickaxe",
        cause: EntityDamageCause.freezing,
        damage: 1,
        particle: "kurokumaft:pickaxe_ice"
    },
    {
        itemName: "kurokumaft:blaze_magic_pickaxe",
        cause: EntityDamageCause.fire,
        damage: 5,
        particle: "kurokumaft:pickaxe_fire"
    },
    {
        itemName: "kurokumaft:draiz_magic_pickaxe",
        cause: EntityDamageCause.drowning,
        damage: 5,
        particle: "kurokumaft:pickaxe_water"
    },
    {
        itemName: "kurokumaft:breeze_magic_pickaxe",
        cause: EntityDamageCause.fall,
        damage: 5,
        particle: "kurokumaft:pickaxe_wind"
    },
    {
        itemName: "kurokumaft:graiz_magic_pickaxe",
        cause: EntityDamageCause.thorns,
        damage: 5,
        particle: "kurokumaft:pickaxe_stone"
    },
    {
        itemName: "kurokumaft:volzas_magic_pickaxe",
        cause: EntityDamageCause.lightning,
        damage: 5,
        particle: "kurokumaft:pickaxe_lightning"
    },
    {
        itemName: "kurokumaft:blizzas_magic_pickaxe",
        cause: EntityDamageCause.freezing,
        damage: 5,
        particle: "kurokumaft:pickaxe_ice"
    }
]);

/**
 * ピッケル
 */
export class PicMagicAttack implements ItemCustomComponent {

    onHitEntity(event:ItemComponentHitEntityEvent) {
        let itemStack = event.itemStack as ItemStack;
        let entity = event.hitEntity as Entity;

        if (itemStack == undefined || !entity.isValid()) {
            return;
        }
        let pic = PicAttackObjects.find(obj => obj.itemName == itemStack.typeId) as PicAttackObject;
        try {
            if (entity instanceof Player) {
                if (world.gameRules.pvp) {
                    entity.applyDamage(pic.damage, {
                        cause: pic.cause
                    });
                    entity.dimension.spawnParticle(pic.particle, entity.location);
                }
            } else {
                entity.applyDamage(pic.damage, {
                    cause: pic.cause
                });
                entity.dimension.spawnParticle(pic.particle, entity.location);
            }
        } catch (error) {
        }
    }

}

interface MagicPicObject {
    itemName:string,
    func:Function
}

const MagicPicObjects = Object.freeze([
    {
        itemName: "kurokumaft:blaze_magic_pickaxe",
        func: firingOreBlock
    },
    {
        itemName: "kurokumaft:draiz_magic_pickaxe",
        func: wetRangeBlock
    },
    {
        itemName: "kurokumaft:breeze_magic_pickaxe",
        func: polishBlock
    },
    {
        itemName: "kurokumaft:graiz_magic_pickaxe",
        func: breakRangeBlock
    },
    {
        itemName: "kurokumaft:volzas_magic_pickaxe",
        func: breakLineBlock
    },
    {
        itemName: "kurokumaft:blizzas_magic_pickaxe",
        func: freezeRangeBlock
    }
]);

/**
 * 魔法ピッケル
 */
export class PicMagicTool implements ItemCustomComponent {

    onUseOn(event:ItemComponentUseOnEvent) {
        magicPickaxe(event);
    }

}

export function magicPickaxe(event:ItemComponentUseOnEvent) {

    let itemStack = event.itemStack as ItemStack;
    if (itemStack != undefined) {
        let magicPic = MagicPicObjects.find(pic => pic.itemName == itemStack.typeId) as MagicPicObject;
        magicPic.func(event);
    }
}