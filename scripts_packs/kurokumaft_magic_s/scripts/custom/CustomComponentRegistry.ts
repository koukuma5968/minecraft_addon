import { system, world, WorldInitializeBeforeEvent } from "@minecraft/server";
import { WandWeaponMagic } from "../weapon/wand/WandWeaponMagic";
import { ShieldMagic } from "../weapon/shield/ShieldMagic";
import { SwordWeaponMagic, SwordWeaponMagicMons } from "../weapon/sword/SwordWeaponMagic";
import { BowShotMagic } from "../weapon/bow/BowWeaponMagic";
import { checkPlayerEquTick } from "../player/armorEquipment";
import { StickWeaponMagic } from "../weapon/stick/StickWeaponMagic";

/**
 * カスタムコンポーネントの登録
 * @param {WorldInitializeBeforeEvent} initEvent
 */
function initRegisterCustom(initEvent:WorldInitializeBeforeEvent) {

    // ワンド系
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:wand_magic', new WandWeaponMagic());
    // スティック系
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:stick_magic', new StickWeaponMagic());

    // ソード系
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:sword_magic', new SwordWeaponMagic());
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:sword_magic_monster', new SwordWeaponMagicMons());

    // シールド
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:shield_magic', new ShieldMagic());

    // 弓
    initEvent.itemComponentRegistry.registerCustomComponent('kurokumaft:bow_magic', new BowShotMagic());

}

/**
 * 監視スレッドの登録
 * @param {WorldInitializeBeforeEvent} initEvent
 */
function initStateChangeMonitor(initEvent:WorldInitializeBeforeEvent) {
    printEveryMinute();
    checkPlayerEquTick();
}

function printEveryMinute() {
    try {
        // Minecraft runs at 20 ticks per second.
        if (system.currentTick % 1200 === 0) {
            world.sendMessage('Another minute passes...');
        }
    } catch (e) {
        console.warn('Error: ' + e);
    }

    system.run(printEveryMinute);
}

printEveryMinute();

export {initRegisterCustom, initStateChangeMonitor}