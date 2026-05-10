import { Entity } from "@minecraft/server";
import { AptonosAction } from "../../monster/action/herbivore/AptonosAction";
import { MHMonsterActionInterface } from "../../monster/action/MHMonsterActionInterface";
import { RamposAction } from "../../monster/action/bird_dragon/RamposAction";
import { DossRamposAction } from "../../monster/action/bird_dragon/DossRamposAction";

export const MHHerbivoreMonsterActionClass: Record<string, new (entity:Entity) => MHMonsterActionInterface> = {
  aptonos: AptonosAction,
}

export const MHBirdDragonMonsterActionClass: Record<string, new (entity:Entity) => MHMonsterActionInterface> = {
  rampos: RamposAction,
  doss_rampos: DossRamposAction,
}

export type MHWeaknessTypes = {
  type: string,
  endurance: number
}

export type MHAilmentWeaknessTypes = {
  type: string,
  endurance: number,
  duration: number,
  damage: number
}

export type MHMonsterStatePointType = {
  hesitation: number,
  anger: number,
  size: number
}

export type MHMonsterElementTypes = {
  attack: string[],
  weakness: MHWeaknessTypes[]
}

export type MHMonsterAilmentTypes = {
  attack: string[],
  weakness: MHAilmentWeaknessTypes[]
}
