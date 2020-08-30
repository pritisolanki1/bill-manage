import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TutorialService } from 'src/app/services/tutorial.service';
import { formatDate, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription, fromEvent } from 'rxjs';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { Location } from '@angular/common';

interface Post {
  currdate: Date;
}

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})

export class AddTutorialComponent implements OnInit {
  title = 'dateexample';
  tutorials: any;
  count: number = 0;
  cust_name: string = '';
  rate: number;
  subscription: Subscription;

  post: Post = {
    currdate: new Date(Date.now()),
  }

  registerForm: FormGroup;
  tutorial = {
    // cust_name: '',
    currdate: this.datePipe.transform(this.post.currdate, 'yyyy-MM-dd'),
    jangadNo: 0,
    than: '',
    weight: 0,
    published: false
  };
  submitted = false;
  isnewCust = false;
  btnDisabled: boolean = false;
  toDate;
  // constructor(private tutorialService: TutorialService) { }

  constructor(private tutorialService: TutorialService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private location: Location) {
  }

  ngOnInit() {

    this.cust_name = this.route.snapshot.paramMap.get('cname').toString();
    this.rate = parseFloat(this.route.snapshot.paramMap.get('rate'));

    this.retrieveTutorials();

    this.registerForm = this.formBuilder.group({
      // cust_name: ['', Validators.required],
      jangadNo: [''],
      than: ['', Validators.required],
      weight: [''],
      currdate: ['', [Validators.required]]

    });

    const keyDowns = fromEvent(document, 'keydown').pipe(
      filter((e: KeyboardEvent) => e.keyCode === 27),
      distinctUntilChanged()
    );
    this.subscription = keyDowns.subscribe((escpress) => {
      if (escpress.type === 'keydown') {
        // Do your thing
        this.location.back();
      }
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  saveTutorial() {

    // this.toaster.show('success', 'Well done!', 'This is a success alert');
    console.log("registerForm valid:" + this.registerForm.invalid);
    this.submitted = true;
    this.btnDisabled = true;

    console.log("form:" + this.registerForm.invalid);
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this.btnDisabled = false;
      console.log("btndisabled: " + this.btnDisabled);
      return;
    }

    console.log("date: " + this.tutorial.currdate + " " + this.tutorial.jangadNo);
    const data = {

      cust_name: this.cust_name,
      date: this.datePipe.transform(this.tutorial.currdate, 'yyyy-MM-dd'),
      jangadNo: this.tutorial.jangadNo,
      than: this.tutorial.than,
      weight: this.tutorial.weight,
      rate: this.rate,
    };

    console.log("date: " + data.date + " " + data);
    this.tutorialService.create(data)
      .subscribe(
        response => {
          this.btnDisabled = false;
          this.retrieveTutorials();
          console.log(response);
          this.submitted = true;
          this.registerForm.reset({
            currdate: this.datePipe.transform(this.post.currdate, 'yyyy-MM-dd')
          });

          this.submitted = false;
        },
        error => {
          this.btnDisabled = true;
          alert("can't add");
          console.log(error);
        });
  }

  newTutorial() {
    this.submitted = false;
    this.tutorial = {
      // cust_name: '',
      currdate: '',
      jangadNo: 0,
      than: '',
      weight: 0,
      published: false
    };
  }
  addNewCustomer() {
    if (this.isnewCust == false)
      this.isnewCust = true;
    else
      this.isnewCust = false;
  }
  retrieveTutorials() {
    this.tutorialService.getAll()
      .subscribe(
        data => {
          this.tutorials = data;
          this.count = this.tutorials.length;
          this.count += 1;
          this.tutorial.jangadNo = this.count;
          console.log(data);

        },
        error => {
          console.log(error);
        });
  }
}
