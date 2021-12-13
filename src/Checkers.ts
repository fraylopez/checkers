import { IAcceptorController } from "./contexts/player/application/IAcceptorController";
import { Logic } from "./contexts/player/application/Logic";
import { View } from "./apps/player/View";
import { PlayViewModel } from "./contexts/player/application/viewModels/PlayViewModel";
import { PlayController } from "./contexts/player/application/PlayController";

export class Checkers {
  private readonly logic: Logic;
  private readonly view: View;

  constructor() {
    this.logic = new Logic();
    this.view = new View(this.logic);
  }

  play() {
    let controller: IAcceptorController | null;
    do {
      controller = this.logic.getController();
      if (controller instanceof PlayController) {
        this.logic.getViewModel<PlayViewModel>(PlayController).interactMenu();
      }
      else if (controller != null) {
        this.view.interact(controller);
      }
    } while (controller != null);
  }
}