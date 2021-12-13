import { PlayController } from "../../contexts/player/application/PlayController";
import { GameView } from "./models/GameView";
import { PlayerType } from "../../contexts/player/domain/player/PlayerType";
import { HumanPlayerView } from "./models/HumanPlayerView";
import { PlayerView } from "./models/PlayerView";
import { AIPlayerView } from "./models/AIPlayerView";
import { PlayViewModel } from "../../contexts/player/application/viewModels/PlayViewModel";
import { PlayViewModelObservalbeState } from "../../contexts/player/application/viewModels/PlayViewModelObservalbeState";
import { Subscription } from "../../contexts/player/application/viewModels/Subscription";

export class PlayView {
  private gameView!: GameView;

  constructor(playViewModel: PlayViewModel) {
    this.gameView = new GameView(playViewModel);
    playViewModel.subscribe(new Subscription<PlayViewModelObservalbeState>(
      PlayViewModelObservalbeState.GameBoard,
      this.renderGame.bind(this)
    ));
    playViewModel.subscribe(new Subscription<PlayViewModelObservalbeState>(
      PlayViewModelObservalbeState.Menu,
      () => this.renderMenu(playViewModel)
    ));

    this.renderGame();
  }

  private renderGame() {
    this.gameView.render();
  }

  private renderMenu(controller: PlayController) {
    this.getPlayerView(controller).executeNextMove();
  }

  private getPlayerView(controller: PlayController): PlayerView {
    // TODO: possible extension point. Not extensible in current scope
    const playerType = controller.getCurrentPlayerType();
    switch (playerType) {
      case PlayerType.Human:
        return new HumanPlayerView(controller);
      case PlayerType.AI:
        return new AIPlayerView(controller);
    }
  }

}
