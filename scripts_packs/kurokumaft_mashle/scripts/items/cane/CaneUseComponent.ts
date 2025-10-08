import { Entity, ItemStack, Player } from "@minecraft/server";

export interface CaneUseComponent {

    // 魔法攻撃
    useMagic(entity:Entity, itemStack:ItemStack, duration: number):void;

}
