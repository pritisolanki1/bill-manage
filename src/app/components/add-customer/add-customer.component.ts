import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, fromEvent } from 'rxjs';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { Location } from '@angular/common';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  cust_name: string='';
  rate: number;
  custForm: FormGroup;
  submitted = false;
  
  tutorials: any;
  
  uniquecustList;
  btnDisabled;
  subscription: Subscription;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private tutorialService: TutorialService,
    private location: Location) { }

  ngOnInit() {
    
    this.retrieveTutorials();
    this.custForm = this.formBuilder.group({
      cust_name: ['', Validators.required],
      rate: ['', Validators.required]
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
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onclickAddDetail(): void {
    this.submitted = true;

    console.log("form:" + this.custForm.invalid);
    // stop here if form is invalid
    if (this.custForm.invalid) {
      return;
    }
    this.router.navigate(['/add', { cname: this.cust_name, rate: this.rate }]);
    this.submitted = true;

  }
  get f() { return this.custForm.controls; }
  save(event) {
    // document.getElementById("test").innerHTML="priti";
    // this.query=this.commonService.getName();
    console.log("You entered: ", event.target.value);
  }
  
  retrieveTutorials() {

    this.tutorialService.getAll()
      .subscribe(
        data => {
          this.tutorials = data;
      
          this.uniquecustList = this.tutorials.reduce((r, { cust_name }) => {
            if (!r.some(o => o.cust_name == cust_name)) {
              r.push({ cust_name, groupItem: this.tutorials.filter(v => v.cust_name == cust_name) });
            }
            return r;

          }, []);

          console.log("size: "+this.uniquecustList.length);
        },
        error => {
          console.log(error);
        });
  }
  getCust(item:string)
  {
    this.cust_name=item.toString();
  }
}
