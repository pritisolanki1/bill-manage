import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { formatDate, DatePipe, Location } from '@angular/common';
import { parse } from 'date-fns';
import { Subscription, fromEvent } from 'rxjs';
import { filter, distinctUntilChanged } from 'rxjs/operators';

interface Post {
  currdate: Date;
}

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent implements OnInit {
  tutorial = null;
  message = '';
  editForm: FormGroup;
  submitted = false;
  subscription: Subscription;
  toDate;

  post: Post = {
    currdate: new Date(Date.now()),
  }
  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private location: Location) { }

  ngOnInit() {
    this.message = '';

    this.getTutorial(this.route.snapshot.paramMap.get('id'));
    this.editForm = this.formBuilder.group({
      cust_name: ['', Validators.required],
      jangadNo: ['', Validators.required],
      than: ['', Validators.required],
      weight: ['', Validators.required],
      currdate: ['', [Validators.required]],
      rate:['']
    });
    const keyDowns = fromEvent(document, 'keydown').pipe(
      filter((e: KeyboardEvent) => e.keyCode === 27),
      distinctUntilChanged()
    );
    this.subscription = keyDowns.subscribe((escpress) => {
      if(escpress.type === 'keydown') {
        // Do your thing
        this.location.back();
      }
    });
    // window.addEventListener("keyup", function (e) { 
    //   if (e.keyCode == 27)
    //   {
    //     console.log("back --------");
    //    history.back(); 
    //   }
    //   }, true);
    console.log("ngOnInit:" + this.editForm.invalid);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  getTutorial(id) {
    this.tutorialService.get(id)
      .subscribe(
        data => {
          this.tutorial = data;
          console.log("tutorial date: " + this.tutorial.date);
          this.post.currdate = parse(this.tutorial.date, 'yyyy-MM-dd', new Date());
          console.log("date: " + this.post.currdate);
          // this.post.currdate= this.datePipe.transform(this.tutorial.currdate,'yyyy-MM-dd')
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePublished(status) {
    const data = {

      cust_name: this.tutorial.cust_name,
      date: this.tutorial.date,
      jangadNo: this.tutorial.jangadNo,
      than: this.tutorial.than,
      weight: this.tutorial.weight,
      published: status
    };

    this.tutorialService.update(this.tutorial.id, data)
      .subscribe(
        response => {
          this.tutorial.published = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  // convenience getter for easy access to form fields
  get f() { return this.editForm.controls; }

  cancel() {
    this.location.back();
  }
  updateTutorial() {
    this.submitted = true;

    console.log("form:" + this.editForm.invalid);
    if (this.editForm.invalid) {
      return;
    }
    this.tutorialService.update(this.tutorial.id, this.tutorial)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The tutorial was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteTutorial() {
    this.tutorialService.delete(this.tutorial.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/tutorials']);
        },
        error => {
          console.log(error);
        });
  }

}
