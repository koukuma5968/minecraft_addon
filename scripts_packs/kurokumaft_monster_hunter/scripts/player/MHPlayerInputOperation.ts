import { ButtonState, InputButton, Player, PlayerButtonInputAfterEvent } from "@minecraft/server";

export function setGuardOperation(event: PlayerButtonInputAfterEvent) {
  const player = event.player as Player;
  if (event.button === InputButton.Sneak) {
    if (event.newButtonState === ButtonState.Pressed) {
      // player.triggerEvent("");
      // player.playAnimation("animation.player.first_person.attack_rotation");
    }
  }
}