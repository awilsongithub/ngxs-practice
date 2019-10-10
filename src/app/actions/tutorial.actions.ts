import { Tutorial } from "./../models/tutorial.model";

/** classes have a type and payload 
 * TODO: GROUP THESE DONT SUFFIX THEM
 * https://www.ngxs.io/concepts/actions
*/

export class AddTutorial {
  static readonly type = "[TUTORIAL] Add";
  constructor(public payload: Tutorial) {
    // console.log(payload);
  }
}

export class RemoveTutorial {
  static readonly type = "[TUTORIAL] Remove";
  constructor(public payload: string) {}
}
