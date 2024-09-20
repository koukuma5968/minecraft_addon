import { Player, ItemStack, EntityComponentTypes, EntityEquippableComponent, EquipmentSlot, system, world, TicksPerSecond, Block, EffectTypes} from "@minecraft/server";
import { MinecraftBlockTypes, MinecraftEffectTypes, MinecraftPotionEffectTypes } from "@minecraft/vanilla-data";

interface MagicChestObject {
    itemName:string,
    func: any,
    delay: number,
    removeFunc: any
}

const MagicChestObjects = Object.freeze([
    {
        itemName: "kurokumaft:fire_magic_chestplate",
        func: fireAttackUp,
        delay: TicksPerSecond,
        removeFunc: fireAttackReset
    },
    {
        itemName: "kurokumaft:water_magic_chestplate",
        func: waterHealthUp,
        delay: TicksPerSecond * 20,
        removeFunc: waterHealthReset
    },
    {
        itemName: "kurokumaft:ice_magic_chestplate",
        func: lavaFreeze,
        delay: 10,
        removeFunc: lavaFreezeReset
    },
    {
        itemName: "kurokumaft:nether_fire_magic_chestplate",
        func: fireAttackUp,
        delay: TicksPerSecond,
        removeFunc: fireAttackReset
    },
    {
        itemName: "kurokumaft:nether_water_magic_chestplate",
        func: waterHealthUp,
        delay: TicksPerSecond * 10,
        removeFunc: waterHealthReset
    },
    {
        itemName: "kurokumaft:nether_ice_magic_chestplate",
        func: lavaFreeze,
        delay: 10,
        removeFunc: lavaFreezeReset
    }

]);

/**
 * 胴装備状態チェック監視クラス
 */
export class MagicChestSurveillance {
    player: Player;
    itemStack:ItemStack;

    constructor(player: Player, itemStack:ItemStack) {
        this.player = player;
        this.itemStack = itemStack;
    }

    /**
     * 胴装備状態チェック
     */
    checkMagicChestTick() {
        this.checkJob();
    };

    private async checkJob() {

        let equItem = MagicChestObjects.find(obj => obj.itemName == this.itemStack.typeId) as MagicChestObject;
        let equ = this.player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;
        let chest = equ.getEquipment(EquipmentSlot.Chest) as ItemStack;

        if (chest != null && chest.typeId == equItem.itemName) {
            this.player.setDynamicProperty("magic_chest_equ", true);
            equItem.func(this.player);
            system.runTimeout(() => {
                system.run(this.checkJob.bind(this));
            }, equItem.delay);
        } else {
            equItem.removeFunc(this.player);
            this.player.setDynamicProperty("magic_Chest_equ", false);
        }
    };
}

async function fireAttackUp(player:Player) {
    player.triggerEvent("kurokumaft:attack20_up");
}

async function waterHealthUp(player:Player) {
    player.addEffect(MinecraftPotionEffectTypes.Healing, 10*TicksPerSecond, {
        amplifier: 2,
        showParticles: true
    })
}

async function lavaFreeze(player:Player) {
    for (let x=-2;x<=2;x++) {
        for (let z=-2;x<=2;x++) {
            for (let y=-2;y<=2;y++) {
                let underBlock = player.dimension.getBlock({x:player.location.x+x,y:player.location.y+y,z:player.location.z+z}) as Block;
                if (underBlock.typeId == MinecraftBlockTypes.Lava || underBlock.typeId == MinecraftBlockTypes.Magma) {
                    player.dimension.setBlockType({x:player.location.x+x,y:player.location.y+y,z:player.location.z+z}, MinecraftBlockTypes.Ice);
                }
            }
        }
    }
}

async function fireAttackReset(player:Player) {
    player.triggerEvent("kurokumaft:attack_down");
}

async function waterHealthReset(player:Player) {
}

async function lavaFreezeReset(player:Player) {
}