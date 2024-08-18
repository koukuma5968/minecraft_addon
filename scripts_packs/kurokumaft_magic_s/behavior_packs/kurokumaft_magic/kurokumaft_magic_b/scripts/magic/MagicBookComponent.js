class MagicBookComponent {

    constructor(playerId, item, durability, intervalNum) {
        this.playerId = playerId;     // プレイヤーID
        this.item = item;     // ブック名
        this.durability = durability; // 耐久値
        this.intervalNum = intervalNum; // jobId
    }
    
    isPlayerId(id) {
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
