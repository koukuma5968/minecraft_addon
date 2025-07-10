import { ItemCustomComponent, ItemStack, ItemComponentUseEvent, Player, ItemComponentCompleteUseEvent, Entity } from "@minecraft/server";
import { fireShell } from "./FireShellMagic";
import { iceShell } from "./IceShellMagic";
import { lightningShell } from "./LightningShellMagic";
import { stoneShell } from "./StoneShellMagic";
import { waterShell } from "./WaterShellMagic";
import { windShell } from "./WindShellMagic";

interface BazookaMagicObject {
    itemName:string,
    func: any
}

const BazookaChargeObjects = Object.freeze([
    {
        itemName: "kurokumaft:fire_magic_bazooka"
    },
    {
        itemName: "kurokumaft:water_magic_bazooka"
    },
    {
        itemName: "kurokumaft:wind_magic_bazooka"
    },
    {
        itemName: "kurokumaft:stone_magic_bazooka"
    },
    {
        itemName: "kurokumaft:lightning_magic_bazooka"
    },
    {
        itemName: "kurokumaft:ice_magic_bazooka"
    }
]);

const ShellBomObjects = Object.freeze([
    {
        itemName: "kurokumaft:fire_magic_shell",
        func:fireShell
    },
    {
        itemName: "kurokumaft:water_magic_shell",
        func:waterShell
    },
    {
        itemName: "kurokumaft:wind_magic_shell",
        func:windShell
    },
    {
        itemName: "kurokumaft:stone_magic_shell",
        func:stoneShell
    },
    {
        itemName: "kurokumaft:lightning_magic_shell",
        func:lightningShell
    },
    {
        itemName: "kurokumaft:ice_magic_shell",
        func:iceShell
    }
]);

/**
 * バズーカ系魔法
 */
export class BazookaShotMagic implements ItemCustomComponent {

    // チャージ完了
    onCompconsteUse(event:ItemComponentCompleteUseEvent) {
        const itemStack = event.itemStack as ItemStack;
        const player = event.source as Player;
    }

    // 右クリック
    onUse(event:ItemComponentUseEvent) {
        const itemStack = event.itemStack as ItemStack;
        const player = event.source as Player;

        if (!itemStack) {
            return;
        }
    }

}

export function checkShellProjectile(projectileName:string) {
    return ShellBomObjects.some(obj => obj.itemName == projectileName);
}

export function hitShellEvent(projectile: Entity, dameger: Entity) {
    const proje = ShellBomObjects.find(obj => obj.itemName == projectile.typeId) as BazookaMagicObject;
    try {
        proje.func(projectile, dameger);
    } catch (error) {
    }
}
