import { Entity } from "@minecraft/server";

export interface MHInsectActionInterface {

  startPeaceTimeActionControl(): void;
  damageAction(): void;
  huntingDrop(): void;
}