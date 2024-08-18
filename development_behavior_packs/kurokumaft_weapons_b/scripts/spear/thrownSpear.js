/**
 * スピアーエンティティスポーン
 * @param {Entity} entity
 */
function spearSpawn(entity) {
    entity.setDynamicProperty("spearCharge", true);
}

/**
 * 忠誠エンチャント
 * @param {Player} player
 * @param {ItemStack} item
 */
function spearLoyalty(player, item) {

    player.setDynamicProperty("spearCharge", true);

    let eventNum = player.getDynamicProperty("machinegunShotEventNum");
    let damage = player.getDynamicProperty("machinegunDamage");
    player.setDynamicProperty("machinegunShot", null);
    player.setDynamicProperty("machinegunDamage", null);
    player.setDynamicProperty("machinegunShotEventNum", null);
    system.clearRun(eventNum);

    let reEqu = player.getComponent(EntityComponentTypes.Equippable);
    let reItem = reEqu.getEquipment("Mainhand");
    if (reItem != undefined && reItem.typeId == "kurokumaft:machine_gun") {
        durabilityDamage(player, item, "slot.weapon.mainhand", "Mainhand", damage);
    }

}

export {spearSpawn, spearLoyalty}