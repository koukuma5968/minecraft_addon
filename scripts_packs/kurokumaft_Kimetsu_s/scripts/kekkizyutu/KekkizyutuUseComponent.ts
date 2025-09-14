import { Entity, ItemStack, Player } from "@minecraft/server";

export interface KekkizyutuUseComponent {

    // 術変更
    changeZyutu(player:Player): void;
    // 術攻撃（通常攻撃時発動）
    hitAttackZyutu(entity:Entity):void;
    // 術攻撃（押下時発動）
    useAttackZyutu(entity:Entity):void;
    // 術攻撃（解放時発動）
    releaseAttackZyutu(entity:Entity):void;

}

export interface KekkizyutuMobUseComponent {

    startMonitoring(entity:Entity): void;
    // 呼吸攻撃
    useAttackZyutu(entity:Entity): void;
    // 術攻撃（通常攻撃時発動）
    hitAttackZyutu(entity:Entity):void;

}