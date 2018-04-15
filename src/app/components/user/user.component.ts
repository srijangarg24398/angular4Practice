import { Component, OnInit , ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

	// name:string="Srijan";
	name:string;
	email:string;
	age:number;
	address:Address;
	hobbies:any[];
	isEdit:boolean;

  show:boolean=true;
  thenBlock: TemplateRef<any>|null=null;
  @ViewChild('primaryBlock')
  primaryBlock: TemplateRef<any>|null=null;
  @ViewChild('secondaryBlock')
  secondaryBlock: TemplateRef<any>|null=null;

  constructor() { 
  	console.log("User Components constructor");
  	this.name="constructor"
  }

  onClick(){
  	console.log("Button clicked")
  	this.name="Srijan Garg";
  	this.hobbies.push("New Hobby");
  }

  toggleEdit(){
  	this.isEdit=!this.isEdit;
  }

  addHobby(hobby){
  	this.hobbies.unshift(hobby);
  	return false;
  }

  deleteHobby(i){
  	this.hobbies.splice(i,1);
  	return false;
  }
  switchPrimary(){
    this.thenBlock=this.thenBlock===this.primaryBlock ? this.secondaryBlock : this.primaryBlock;
  }
  ngOnInit() {
    this.thenBlock = this.primaryBlock;
  	console.log("User components on init");
  	this.name="onInit"
  	this.email="srijan@gmail.com"
  	this.age=12
  	this.address={
  		street:"abc",
  		city:"xyz",
  		state:"state"
  	}
  	this.hobbies=["Hobby 1","Hobby 2","Hobby 3"];
  	this.isEdit=false;
  }

}
interface Address{
		street:string,
		city:string,
		state:string

}
