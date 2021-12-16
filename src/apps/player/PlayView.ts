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

  constructor(private readonly playViewModel: PlayViewModel) {
    this.gameView = new GameView(playViewModel);
    playViewModel.subscribe(new Subscription<PlayViewModelObservalbeState>(
      PlayViewModelObservalbeState.GameBoard,
      this.renderGame.bind(this)
    ));
    playViewModel.subscribe(new Subscription<PlayViewModelObservalbeState>(
      PlayViewModelObservalbeState.Menu,
      this.renderMenu.bind(this)
    ));

    this.renderGame();
  }

  private renderGame() {
    this.gameView.render();
  }

  private renderMenu() {
    this.getPlayerView().executeNextMove();
  }

  private getPlayerView(): PlayerView {
    // TODO: possible extension point. Not extensible in current scope
    const playerType = this.playViewModel.getCurrentPlayerType();
    switch (playerType) {
      case PlayerType.Human:
        return new HumanPlayerView(this.playViewModel);
      case PlayerType.AI:
        return new AIPlayerView(this.playViewModel);
    }
  }

}
