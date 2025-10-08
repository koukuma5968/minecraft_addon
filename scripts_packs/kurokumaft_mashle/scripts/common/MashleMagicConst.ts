import { CaneUseComponent } from "../items/cane/CaneUseComponent";
import { GeneralMagicComponent } from "../items/cane/player/GeneralMagicComponent";
import { MuscleMagicComponent } from "../items/cane/player/MuscleMagicComponent";

export interface UniqueMagic {
    id: number,
    name: string
}

export const CaneList: Record<string, new () => CaneUseComponent> = {
    nomal: GeneralMagicComponent,
    none: MuscleMagicComponent,
};

export const UniqueMagicList = Object.freeze([
    { id: 0, name: 'none' },
    { id: 1, name: 'changes' },
    { id: 2, name: 'gravior' },
    { id: 3, name: 'explom' },
    { id: 4, name: 'cuffs' },
]);
