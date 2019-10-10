import { Component, OnInit } from "@angular/core";
import { Store, Select } from "@ngxs/store";
import { Tutorial } from "./../models/tutorial.model";
import { TutorialState } from "./../state/tutorial.state"; // We will use this shortly
import { Observable } from "rxjs";
import { RemoveTutorial } from "./../actions/tutorial.actions";

@Component({
  selector: "app-read",
  templateUrl: "./read.component.html",
  styleUrls: ["./read.component.scss"]
})
export class ReadComponent implements OnInit {
  @Select(TutorialState.getTutorials) tutorials$: Observable<Tutorial>;

  constructor(private store: Store) {}

  delTutorial(name) {
    this.store.dispatch(new RemoveTutorial(name));
  }

  ngOnInit() {}
}

