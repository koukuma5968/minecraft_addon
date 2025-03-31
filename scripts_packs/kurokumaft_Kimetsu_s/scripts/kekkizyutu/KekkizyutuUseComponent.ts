import { ItemStack, Player } from "@minecraft/server";

export interface KekkizyutuUseComponent {

    // 術変更
    changeZyutu(player:Player): void;
    // 術攻撃（通常攻撃時発動）
    hitAttackZyutu(player:Player, itemStack:ItemStack):void;
    // 術攻撃（押下時発動）
    useAttackZyutu(player:Player, itemStack:ItemStack):void;
    // 術攻撃（解放時発動）
    releaseAttackZyutu(player:Player, itemStack:ItemStack, duration:number):void;

}