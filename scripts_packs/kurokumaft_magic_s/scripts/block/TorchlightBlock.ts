import { ItemCustomComponent, ItemStack, ItemComponentUseEvent, Player, GameMode, EquipmentSlot, ItemComponentUseOnEvent, system, ItemComponentCompleteUseEvent, Entity, BlockCustomComponent, BlockComponentTickEvent, BlockComponentOnPlaceEvent, BlockEvent } from "@minecraft/server";

/**
 * トーチライトブロック
 */
export class TorchlightBlock implements BlockCustomComponent {

    onPlace(blockEvent:BlockComponentOnPlaceEvent) {
        torchlightFire(blockEvent);
    }

    onTick(blockEvent:BlockComponentTickEvent) {
        torchlightFire(blockEvent);
    }
}

async function torchlightFire(blockEvent:BlockEvent) {
    const block = blockEvent.block;
    const dimension = blockEvent.dimension;
    dimension.spawnParticle("kurokumaft:torchlight_fire", {x:block.location.x+0.5,y:block.location.y,z:block.location.z+0.5});

}
