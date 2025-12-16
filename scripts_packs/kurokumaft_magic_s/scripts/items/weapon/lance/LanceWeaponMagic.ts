import { CustomComponentParameters, Entity, EquipmentSlot, ItemComponentCompleteUseEvent, ItemComponentHitEntityEvent, ItemComponentTypes, ItemComponentUseEvent, ItemCooldownComponent, ItemCustomComponent, ItemStack, Player, world } from "@minecraft/server";
import { itemDurabilityMagicDamage } from "../../../common/MagicItemDurabilityDamage";
import { MagicWeaponUseComponent } from "../../../custom/MagicWeaponUseComponent";
import { FireHowitzerComponent } from "./FireHowitzerComponent";
import { WaterHowitzerComponent } from "./WaterHowitzerComponent";
import { WindHowitzerComponent } from "./WindHowitzerComponent";
import { IceHowitzerComponent } from "./IceHowitzerComponent";
import { LightningHowitzerComponent } from "./LightningHowitzerComponent";
import { StoneHowitzerComponent } from "./StoneHowitzerComponent";

export const LanceMagicClassRecord: Record<string, new () => MagicWeaponUseComponent> = {
    fire: FireHowitzerComponent,
    water: WaterHowitzerComponent,
    wind: WindHowitzerComponent,
    stone: StoneHowitzerComponent,
    lightning: LightningHowitzerComponent,
    ice: IceHowitzerComponent,
}

type LanceMagicType = {
    magic:string,
    type:string
}

/**
 * ランス系魔法
 */
export class LanceWeaponMagic implements ItemCustomComponent {

    // 通常攻撃
    onHitEntity (event: ItemComponentHitEntityEvent, arg: CustomComponentParameters) {
        const itemStack = event.itemStack as ItemStack;
        const attackEntity = event.attackingEntity as Player;
        const hitEntity = event.hitEntity as Entity;
        const lanceType = arg.params as LanceMagicType;
        const effect = event.hadEffect as boolean;

        if (itemStack === undefined) {
            return;
        }

        const lanceClass = LanceMagicClassRecord[lanceType.magic];
        new lanceClass().hitMagicAttack(itemStack, attackEntity, hitEntity);
    }

    onUse (event: ItemComponentUseEvent, arg1: CustomComponentParameters) {
        const player = event.source;
        player.dimension.playSound("imitate.fuse", player.location, {
            pitch:1,
            volume:2
        });

    };

    // チャージ完了
    onCompleteUse (event: ItemComponentCompleteUseEvent, arg: CustomComponentParameters) {
        const player = event.source;
        const itemStack = event.itemStack;
        const lanceType = arg.params as LanceMagicType;

        if (itemStack === undefined) {
            return;
        }

        itemDurabilityMagicDamage(player, itemStack, EquipmentSlot.Mainhand);

        const cool = itemStack.getComponent(ItemComponentTypes.Cooldown) as ItemCooldownComponent;
        cool.startCooldown(player);

        const lanceClass = LanceMagicClassRecord[lanceType.magic];
        new lanceClass().completeMagicAttack(itemStack, player);
    }

}

