import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TutorialService } from 'src/app/services/tutorial.service';
import { GlobalVal } from '../global-val.class';
import { Subscription, fromEvent } from 'rxjs';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {

  currentTutorial: any;
  isnextPresent=false;
  sumF:number=0;
  sumL:number=0;
  cName:string;
  rate:number;
  value;
  mcount:number;
  smonth:number=3;
  syear:number;
  firstHLen;
  secHLen;

  fArray;
  sArray=new Array();
  fFill;
  sFill;
  listSize;
  subscription: Subscription;

  constructor(private route: ActivatedRoute,
    private tutorialService: TutorialService,    
    private location: Location) { }
    
  id: number;
  ngOnInit() {
    
    this.syear=GlobalVal.selYear;
    this.smonth=GlobalVal.selMonth;
    var now=new Date();
    this.mcount=new Date(this.syear, this.smonth+1, 0).getDate();

    console.log("current month: "+now.getMonth()+1+" --- "+GlobalVal.selYear+" "+GlobalVal.selMonth);
    this.tutorialService.getNewUserInfo().subscribe(info => {
      this.currentTutorial = info;

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
    this.fArray=new Array(10).fill(null);
    this.cName=this.currentTutorial[0].cust_name;
     this.rate=this.currentTutorial[0].rate;
    // this.fArray.apply(null,Array(3));

    this.fArray=this.currentTutorial.slice(0,2);
    console.log("size---"+this.fArray.length);
    if(this.currentTutorial.length>16)
    {
      this.isnextPresent=true;
    }
    this.listSize=this.currentTutorial.length;
    console.log("full size: "+this.listSize);
    if(this.listSize<=16)
    {
      this.fArray=this.currentTutorial.slice(0,this.listSize);
      this.sArray.length=0;
      this.fFill=16;
      this.sFill=16;

      console.log("fsize: "+this.fArray.length);
    }
    else if(this.listSize<=32 && this.listSize>16)
    {
      this.fArray=this.currentTutorial.slice(0,15);
      this.sArray=this.currentTutorial.slice(16,this.listSize);
      this.fFill=16;
      this.sFill=16;
      // this.firstHLen=16;
    }else 
    {
      const halfList=Math.floor(this.currentTutorial.length/2);
      this.fArray=this.currentTutorial.slice(0,halfList);
      this.sArray=this.currentTutorial.slice(halfList,this.listSize);
      this.fFill=Math.floor(this.currentTutorial.length/2);
      this.sFill=Math.floor(this.currentTutorial.length/2);
    }
   
    this.currentTutorial.forEach((value,index)=>
    {
     if(index<16)
     {
      console.log("index: "+index+" ");
      this.sumF=this.sumF+value.than;
     }
     else
     {
      this.sumL=this.sumL+value.than;
     }
     
    })
   
    for (let i = 0; i < 3; i++) {
      console.log ("Block statement execution no." + i);
    }
    this.value = ((this.sumF+this.sumL)*this.rate).toFixed(2);
    
    this.id = +this.route.snapshot.paramMap.get('id');
    console.log("id: "+this.id);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
