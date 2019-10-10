// Section 1. lib, shape, method/classes
import { State, Action, StateContext, Selector } from "@ngxs/store";
import { Tutorial } from "./../models/tutorial.model";
import { AddTutorial, RemoveTutorial } from "./../actions/tutorial.actions";
import { HttpClient } from "@angular/common/http";
import { tap } from 'rxjs/operators';


// Section 2
export class TutorialStateModel {
  tutorials: Tutorial[];
}

// @State decorator defines this slice of app state
@State<TutorialStateModel>({
  name: "tutorials",
  defaults: {
    tutorials: []
  }
})
export class TutorialState {
  api = "https://jsonplaceholder.typicode.com/posts";

  constructor(private http: HttpClient) {}

  @Selector()
  static getTutorials(state: TutorialStateModel) {
    return state.tutorials;
  }

  /* setter. ctx wraps state w methods. action has type & payload */
  @Action(AddTutorial)
  add(ctx: StateContext<TutorialStateModel>, action: AddTutorial) {
    // call api first
    return this.http.get(this.api).pipe(tap((posts) => {
        console.log(posts);
        // REPLAE TUT NAME WITH TITLE OF FIRST RETURNED POST
        // tut shape is name, url, post is body, title, id, userId
        action.payload.name = posts[0].title;
        const state = ctx.getState();
        ctx.patchState({
          tutorials: [...state.tutorials, action.payload]
        });
    }))
  }

  @Action(RemoveTutorial)
  remove(ctx: StateContext<TutorialStateModel>, action: RemoveTutorial) {
    const state = ctx.getState();
    ctx.patchState({
      tutorials: ctx
        .getState()
        .tutorials.filter((a) => a.name != action.payload)
    });
  }
}
