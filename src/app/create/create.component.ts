import { AddTutorial } from "./../actions/tutorial.actions";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Store, Select } from "@ngxs/store";
import { TutorialState } from "../state/tutorial.state";
import { Observable } from "rxjs";
import { Tutorial } from "../models/tutorial.model";
import { withLatestFrom } from "rxjs/operators";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"]
})
export class CreateComponent implements OnInit {
  @Select(TutorialState.getTutorials) tutorials$: Observable<Tutorial>;

  constructor(private store: Store) {}

  addTutorial(name, url) {
    /** pass new tut obj to dispatcher. AddTutorial objs are stamped with their action '[TUTORIAL] Add' */
    this.store
      .dispatch(new AddTutorial({ name: name, url: url }))
      .pipe(withLatestFrom(this.tutorials$))
      .subscribe(([first, tutorials]) => {
          
        console.log("all tuts: ", tutorials);
        var snap = this.store.snapshot();
        console.log("store: ", snap);

        // this.store.reset({});
        // var snap2 = this.store.snapshot();
        // console.log("store after reset: ", snap2);
      });
  }

  ngOnInit() {}
}
