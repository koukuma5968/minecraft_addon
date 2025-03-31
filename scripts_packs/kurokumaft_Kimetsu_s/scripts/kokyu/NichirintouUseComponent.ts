import { ItemStack, Player } from "@minecraft/server";

export interface NichirintouUseComponent {

    // 型変更
    changeKata(player:Player): void;
    // 呼吸攻撃（通常攻撃時発動）
    hitAttackKata(player:Player, itemStack:ItemStack):void;
    // 呼吸攻撃（押下時発動）
    useAttackKata(player:Player, itemStack:ItemStack):void;
    // 呼吸攻撃（解放時発動）
    releaseAttackKata(player:Player, itemStack:ItemStack, duration:number):void;

}