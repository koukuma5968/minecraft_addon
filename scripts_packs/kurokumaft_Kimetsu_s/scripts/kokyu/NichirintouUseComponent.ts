import { Entity, ItemStack, Player } from "@minecraft/server";

export interface NichirintouUseComponent {

    // 型変更
    changeKata(player:Player): void;
    // 呼吸攻撃（通常攻撃時発動）
    hitAttackKata(entity:Entity, itemStack:ItemStack):void;
    // 呼吸攻撃（押下時発動）
    useAttackKata(entity:Entity, itemStack:ItemStack):void;
    // 呼吸攻撃（解放時発動）
    releaseAttackKata(entity:Entity, itemStack:ItemStack, duration:number):void;

}

export interface KokyuMobUseComponent {

    startMonitoring(entity:Entity): void;
    // 呼吸攻撃
    useAttackKokyu(entity:Entity): void;
    // 呼吸攻撃（通常攻撃時発動）
    hitAttackKata(entity:Entity): Promise<void>;

}
