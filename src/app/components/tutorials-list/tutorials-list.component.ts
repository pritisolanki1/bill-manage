import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import { Router } from '@angular/router';
import { GlobalVal } from '../global-val.class';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})

export class TutorialsListComponent implements OnInit {

  tutorials: any;
  
  uniquecustList;
  yearList;
  currentTutorial: any;
  cust_name = '';
  responseCount = 0;

  selectedCust;
  selectedYear;
  selectedMonth;
  isAnyYear=0;
  months =[
    { id: 1, name: 'Jan' },
    { id: 2, name: 'Feb' },
    { id: 3, name: 'Mar' },
    { id: 4, name: 'Apr' },
    { id: 5, name: 'May' },
    { id: 6, name: 'Jun' },
    { id: 7, name: 'Jul' },
    { id: 8, name: 'Aug' },
    { id: 9, name: 'Sep' },
    { id: 10, name: 'Oct' },
    { id: 11, name: 'Nov' },
    { id: 12, name: 'Dec' },
    ];

  constructor(private tutorialService: TutorialService,
    private router: Router) { }

  ngOnInit() {

    this.selectedCust = GlobalVal.cust_name;
    this.selectedYear = GlobalVal.selYear;
    this.selectedMonth = GlobalVal.selMonth;

    this.retrieveAllYear();
    this.retrieveTutorials();
    this.getActiveCust();

    this.months.filter(x => x.id == 2)[0].id;
    console.log("static value:" + GlobalVal.cust_name+" "+GlobalVal.selYear);

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

        },
        error => {
          console.log(error);
        });
  }

  retrieveAllYear() {
    this.tutorialService.getAllYear()
      .subscribe(
        data => {
          this.yearList = data;
          
          this.isAnyYear=this.yearList.length;
          console.log("latest year: "+this.yearList.length);
          if (this.yearList.length != 0) {
            
            GlobalVal.selYear = this.yearList[0].year;
            // this.selectedYear=GlobalVal.selYear;
          }
          else {
            this.selectedYear = "Year";
          }
          
        },
        error => {
          console.log(error);
        });
  }

  refreshList() {
    this.retrieveTutorials();
    this.currentTutorial = null;
  }
  movetoComponent2(id: number): void {
    console.log('id', id);
    this.currentTutorial.forEach(function (value) {
      console.log(":" + value);
    })
    this.tutorialService.setNewUserInfo(this.currentTutorial);
    this.router.navigate(['print', id]);
  }
  movetoEdit(id: number): void {
    this.router.navigate(['cust', id]);
  }
  retriveWithFilter() {

    this.tutorialService.findByTitle(GlobalVal.cust_name, GlobalVal.selYear, GlobalVal.selMonth)
      .subscribe(
        data => {
          this.currentTutorial = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });

  }

  getActiveCust() {

    this.currentTutorial = null;
   
    if(GlobalVal.cust_name!='Select Customer')
    {
    this.tutorialService.findByTitle(GlobalVal.cust_name, GlobalVal.selYear, GlobalVal.selMonth)
      .subscribe(
        data => {
          this.currentTutorial = data;
          this.responseCount = this.currentTutorial.length;
        },
        error => {
          console.log(error);
        });
      }
      else
      this.responseCount =-1;
  }

  onChange(selectedYear) {
    GlobalVal.selYear = selectedYear;
    console.log("selected Year: " + selectedYear);
    this.getActiveCust();

  }
  onChangeCust(selectedCust) {
    GlobalVal.cust_name = selectedCust;
    GlobalVal.selYear = this.selectedYear;
    this.selectedCust = GlobalVal.cust_name;
    this.getActiveCust();
    
    if(this.selectedCust=='Select Customer')
    {
      this.responseCount==-1;
    }
   
    console.log("custName: " + selectedCust);

  }
  onChangeMonth(selectedMonth) {
    GlobalVal.selMonth = this.months.filter(x => x.id == selectedMonth)[0].id;
    console.log("month: " + this.months.filter(x => x.id == selectedMonth)[0].id);
    this.getActiveCust();
  }
}
