import { Move } from "../../domain/Move";
import { Session } from "../../domain/Session";
import { PlayController } from "../PlayController";
import { IObserver } from "./IObserver";
import { Subscription } from "./Subscription";
export class PlayViewModel extends PlayController implements IObserver<PlayViewModel> {
  public readonly gameBoardState = "gameBoardState";
  private readonly subscriptions: Subscription[];

  constructor(session: Session) {
    super(session);
    this.subscriptions = [];
  }

  executeMove(move?: Move): void {
    super.executeMove(move);
    this.onChange(this.gameBoardState);
  }

  undo(): void {
    super.undo();
    this.onChange(this.gameBoardState);
  }

  redo(): void {
    super.redo();
    this.onChange(this.gameBoardState);
  }

  onChange(property: keyof this): void {
    this.subscriptions
      .filter(s => s.getObservedProperty() === property)
      .forEach(s => s.onChange());
  }
  subscribe(subscription: Subscription): void {
    this.subscriptions.push(subscription);
  }
}