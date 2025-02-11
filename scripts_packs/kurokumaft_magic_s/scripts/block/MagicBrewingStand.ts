import { ItemStack, EntityComponentTypes, system, Entity, EntityInventoryComponent, Container, TicksPerSecond, world, Block, BlockComponentOnPlaceEvent, BlockComponentPlayerDestroyEvent, BlockCustomComponent, Dimension, Direction } from "@minecraft/server";

interface MagicBrewingItemObject {
    materialItem:string,
    stoneItem:string,
    outputItem:string,
    type:string,
    lore:string,
    particle:string
}

const MagicBrewingItemObjects = Object.freeze([
    {
        materialItem: "kurokumaft:fire_log_nut",
        stoneItem: "kurokumaft:fire_magic_stone",
        outputItem: "kurokumaft:fire_strengt_potion",
        type: "fire",
        lore: "攻撃力上昇 Ⅹ (10:00)",
        particle: "kurokumaft:brewing_frame"
    },
    {
        materialItem: "kurokumaft:water_log_nut",
        stoneItem: "kurokumaft:water_magic_stone",
        outputItem: "kurokumaft:water_healthboost_potion",
        type: "water",
        lore: "体力増強 Ⅹ (10:00)",
        particle: "kurokumaft:brewing_water"
    },
    {
        materialItem: "kurokumaft:wind_log_nut",
        stoneItem: "kurokumaft:wind_magic_stone",
        outputItem: "kurokumaft:wind_jumpboost_potion",
        type: "wind",
        lore: "跳躍力上昇 Ⅹ (10:00)",
        particle: "kurokumaft:brewing_wind"
    },
    {
        materialItem: "kurokumaft:stone_log_nut",
        stoneItem: "kurokumaft:stone_magic_stone",
        outputItem: "kurokumaft:stone_resistance_potion",
        type: "stone",
        lore: "耐性 Ⅹ (10:00)",
        particle: "kurokumaft:brewing_stone"
    },
    {
        materialItem: "kurokumaft:lightning_log_nut",
        stoneItem: "kurokumaft:lightning_magic_stone",
        outputItem: "kurokumaft:lightning_speedup_potion",
        type: "lightning",
        lore: "移動速度上昇 Ⅹ (10:00)",
        particle: "kurokumaft:brewing_lightning"
    },
    {
        materialItem: "kurokumaft:ice_log_nut",
        stoneItem: "kurokumaft:ice_magic_stone",
        outputItem: "kurokumaft:ice_absorption_potion",
        type: "ice",
        lore: "衝撃吸収 Ⅹ (10:00)",
        particle: "kurokumaft:brewing_ice"
    }

]);

/**
 * ポーション鋳造台ブロック
 */
export class MagicBrewingStandBlock implements BlockCustomComponent {

    onPlace(blockEvent:BlockComponentOnPlaceEvent) {
        let block = blockEvent.block;
        let dimension = blockEvent.dimension;
        let magic_brewing_stand = dimension.spawnEntity("kurokumaft:magic_brewing_stand", {x:block.location.x+0.5,y:block.location.y,z:block.location.z+0.5}) as Entity;
        magic_brewing_stand.nameTag = "magic_brewing_stand";

        let direction = block.permutation.getState("minecraft:cardinal_direction");

        if (direction == "north") {
            magic_brewing_stand.setProperty("kurokumaft:stand_pos", "n");
        } else if (direction == "south") {
            magic_brewing_stand.setProperty("kurokumaft:stand_pos", "s");
        } else if (direction == "east") {
            magic_brewing_stand.setProperty("kurokumaft:stand_pos", "e");
        } else if (direction == "west") {
            magic_brewing_stand.setProperty("kurokumaft:stand_pos", "w");
        }

        new MagicBrewingStand(magic_brewing_stand, block).checkPosionBrewTick();
    }

    onPlayerDestroy(blockEvent:BlockComponentPlayerDestroyEvent) {
        let block = blockEvent.block;
        let dimension = blockEvent.dimension;
        breakMagicBrewing(block, dimension);
    }

}

/**
 * ポーション鋳造状態監視クラス
 */
export class MagicBrewingStand {
    stand: Entity;
    block:Block;

    constructor(stand: Entity, block:Block) {
        this.stand = stand;
        this.block = block;
        this.stand.setProperty("kurokumaft:brewing_fuel", 0);
        this.stand.setProperty("kurokumaft:bottle_type", "empty");
    }

    checkPosionBrewTick() {
        this.checkJob();
    };

    private async checkJob() {

        if (this.stand.isValid()) {
            let inventory = this.stand.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
            let container = inventory.container as Container;

            let materialItem = container.getItem(0) as ItemStack;
            let stoneItem = container.getItem(1) as ItemStack;
            let fuelItem = container.getItem(2) as ItemStack;
            let outputItem = container.getItem(3) as ItemStack;
            if (outputItem != undefined) {
                if (outputItem.typeId == "kurokumaft:diamond_bottle_water") {
                    this.stand.setProperty("kurokumaft:bottle_type", "magic");
                } else  {
                    this.stand.setProperty("kurokumaft:bottle_type", isPorionBottle(outputItem));
                }

                if (materialItem != undefined && stoneItem != undefined) {
                    let brewingItemObject = getBrewingItemObject(materialItem, stoneItem);
                    if (brewingItemObject != undefined ) {
                        if (fuelItem != undefined && fuelItem.typeId == "minecraft:blaze_powder" && outputItem.typeId == "kurokumaft:diamond_bottle_water") {
                            let brewingCount = this.stand.getProperty("kurokumaft:brewing_fuel") as number;
                            this.stand.dimension.spawnParticle(brewingItemObject.particle, this.stand.location);
                            brewingCount++;
                            if (brewingCount == 10) {
                                let newOutputItem = new ItemStack(brewingItemObject.outputItem, 1);
                                newOutputItem.setLore([brewingItemObject.lore]);
                                container.setItem(3, undefined);
                                container.setItem(3, newOutputItem);

                                materialItem.amount--;
                                if (materialItem.amount == 0) {
                                    container.setItem(0, undefined);
                                } else {
                                    container.setItem(0, materialItem);
                                }
                                stoneItem.amount--;
                                if (stoneItem.amount == 0) {
                                    container.setItem(1, undefined);
                                } else {
                                    container.setItem(1, stoneItem);
                                }
                                fuelItem.amount--;
                                if (fuelItem.amount == 0) {
                                    container.setItem(2, undefined);
                                } else {
                                    container.setItem(2, fuelItem);
                                }
                                this.stand.setProperty("kurokumaft:brewing_fuel", 0);
                                this.stand.setProperty("kurokumaft:bottle_type", brewingItemObject.type);
                            }
                            this.stand.setProperty("kurokumaft:brewing_fuel", brewingCount);
                        }
                    } else {
                        this.stand.setProperty("kurokumaft:brewing_fuel", 0);
                    }
                } else {
                    this.stand.setProperty("kurokumaft:brewing_fuel", 0);
                }
            } else {
                this.stand.setProperty("kurokumaft:brewing_fuel", 0);
                this.stand.setProperty("kurokumaft:bottle_type", "empty");
            }
            system.runTimeout(this.checkJob.bind(this), TicksPerSecond);
        }
    };
}

function getBrewingItemObject(materialItem:ItemStack, stoneItem:ItemStack) : MagicBrewingItemObject {

    let brewingItem = MagicBrewingItemObjects.find((predicate) => {
        return (predicate.materialItem == materialItem.typeId && predicate.stoneItem == stoneItem.typeId);
    }) as MagicBrewingItemObject;

    return brewingItem;
}

function isPorionBottle(potion:ItemStack) : string {

    let brewingItem = MagicBrewingItemObjects.find((predicate) => {
        return (predicate.outputItem == potion.typeId);
    }) as MagicBrewingItemObject;

    return brewingItem != undefined ? brewingItem.type : "empty";
}

/**
 * ポーション鋳造台破壊
 * @param {Block} block
 * @param {Dimension} dimension
 */
export async function breakMagicBrewing(block: Block, dimension: Dimension) {
    let stand = dimension.getEntitiesAtBlockLocation({x:block.location.x+0.5, y:block.location.y,z:block.location.z+0.5}) as Entity[];
    let inventory = stand[0].getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
    let container = inventory.container as Container;

    let materialItem = container.getItem(0) as ItemStack;
    if (materialItem != undefined) {
        dimension.spawnItem(materialItem, stand[0].location);
    }
    let stoneItem = container.getItem(1) as ItemStack;
    if (stoneItem != undefined) {
        dimension.spawnItem(stoneItem, stand[0].location);
    }
    let fuelItem = container.getItem(2) as ItemStack;
    if (fuelItem != undefined) {
        dimension.spawnItem(fuelItem, stand[0].location);
    }
    let outputItem = container.getItem(3) as ItemStack;
    if (outputItem != undefined) {
        dimension.spawnItem(outputItem, stand[0].location);
    }
    stand[0].remove();

};
