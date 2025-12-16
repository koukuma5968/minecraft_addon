import { Entity, ItemStack, Player } from "@minecraft/server";

export interface MagicWeaponUseComponent {
  hitMagicAttack(itemStack: ItemStack, player: Player, target: Entity): void;
  completeMagicAttack(itemStack: ItemStack, player: Player): void;
}
