import { PlayController } from "../src/contexts/player/application/PlayController";
import { Color } from "../src/contexts/player/domain/Color";
import { expect } from "chai";
import { Logic } from "../src/contexts/player/application/Logic";
import { Session } from "../src/contexts/player/domain/Session";
import { PlayViewModel } from "../src/contexts/player/application/viewModels/PlayViewModel";
import { GameView } from "../src/apps/player/models/GameView";
import { PlayView } from "../src/apps/player/PlayView";
describe('checkers tests', () => {
  let logic: Logic;
  let session: Session;
  let playViewModel: PlayViewModel;
  beforeEach(() => {
    logic = new Logic();
    session = logic.getSession();
    playViewModel = logic.getViewModel<PlayViewModel>(PlayController);

  });
  describe('Play', () => {
    it('should play a View AI game', () => {
      session.setNumPlayers(0);
      new PlayView(playViewModel);
      while (!session.isGameOver()) {
        playViewModel.interactMenu();
      }
      expect(session.isWinner(Color.Black) || session.isWinner(Color.White));
    });
    it('should play a Controller AI game', () => {
      session.setNumPlayers(0);
      const playController = new PlayController(session);
      while (!session.isGameOver()) {
        playController.executeMove();
      }
      expect(session.isWinner(Color.Black) || session.isWinner(Color.White));
    });
  });

});