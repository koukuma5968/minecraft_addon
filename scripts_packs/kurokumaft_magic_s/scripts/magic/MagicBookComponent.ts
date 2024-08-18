import { ItemStack } from "@minecraft/server";

class MagicBookComponent {

    playerId:String;     // プレイヤーID
    item:ItemStack;         // ブック名
    durability:Number;   // 耐久値
    intervalNum:number;  // jobId

    constructor(playerId:String, item:ItemStack, durability:Number, intervalNum:number) {
        this.playerId = playerId;
        this.item = item;
        this.durability = durability;
        this.intervalNum = intervalNum;
    }
    
    isPlayerId(id:String) {
        return id == this.playerId;
    }
    getItem() {
        return this.item;
    }
    getDurability() {
        return this.durability;
    }
    getIntervalNum() {
        return this.intervalNum;
    }
}

export default MagicBookComponent;
