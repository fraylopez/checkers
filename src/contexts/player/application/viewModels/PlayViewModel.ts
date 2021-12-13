import { Move } from "../../domain/Move";
import { Session } from "../../domain/Session";
import { IControllerVisitor } from "../IControllerVisitor";
import { PlayController } from "../PlayController";
import { IObserver } from "./IObserver";
import { PlayViewModelObservalbeState } from "./PlayViewModelObservalbeState";
import { Subscription } from "./Subscription";

export class PlayViewModel extends PlayController implements IObserver<PlayViewModelObservalbeState> {
  private readonly subscriptions: Subscription[];

  constructor(session: Session) {
    super(session);
    this.subscriptions = [];
  }

  executeMove(move?: Move): void {
    super.executeMove(move);
    this.onChange(PlayViewModelObservalbeState.GameBoard);
  }

  undo(): void {
    super.undo();
    this.onChange(PlayViewModelObservalbeState.GameBoard);
  }

  redo(): void {
    super.redo();
    this.onChange(PlayViewModelObservalbeState.GameBoard);
  }


  onChange(state: PlayViewModelObservalbeState): void {
    this.subscriptions
      .filter(s => s.getObservedProperty() === state)
      .forEach(s => s.onChange());
  }
  subscribe(subscription: Subscription<PlayViewModelObservalbeState>): void {
    this.subscriptions.push(subscription);
  }
}