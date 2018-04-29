import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable'
// import 'rxjs/add/operator/combineLatest'
import 'rxjs/add/observable/combineLatest'
import { Subscription } from 'rxjs/Subscription'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';

@Component({
  selector: 'app-observables',
  templateUrl: './observables.component.html',
  styleUrls: ['./observables.component.css']
})

export class ObservablesComponent implements OnInit {

  // cats:AngularFireList<Cat[]>
  cats:Observable<any[]>
  dogs:Array<any>
  // owner:AngularFireObject<string>
  // owner:Observable<string>
  owner:any
  subscription:Subscription
  catCount:Observable<number>
  dogCount:number
  catName:Observable<string>
  dogName:Observable<string>
  animals:Observable<any[]>
  currentAnimal=new BehaviorSubject(null);

  constructor(private db:AngularFireDatabase) { 
  }

  ngOnInit() {
  	this.combineLatest()
  	this.initializeAll()
  	this.switchMapCall()
  }

  combineLatest(){
  	let hello=Observable.create(observer=>{
  		observer.next("Hello")
  	})
  	let world=Observable.create(observer=>{
  		observer.next("World")
  	})
  	//combileLatest creates an observable array of two strings
  	// hello.combineLatest(world)
  	// hello.subscribe(data=>console.log(data))
  	Observable.combineLatest(hello,world).subscribe(data=>console.log(data))
  	let cat=this.db.object('cats/-LBGCCaCzhjVSCyLUkKb').valueChanges()
  	let dog=this.db.object('dogs/-LBGCYU1TX7K925DZqMd').valueChanges()
  	this.animals=Observable.combineLatest(cat,dog)
  }

  initializeAll(){
  	this.cats=this.db.list('cats').valueChanges()
  	// this.cats.subscribe(data=>console.log(data))
  	this.subscription=this.db.list('dogs').valueChanges().subscribe(dogs=>{
  		this.dogs=dogs
  		this.dogCount=dogs.length
  	})

  	this.catCount=this.cats.map(cats=>{
  		return cats.length
  	})
  	this.dogName=this.db.object('dogs/-LBGCYU1TX7K925DZqMd').valueChanges()
  	.map(dog=>{
  		return dog['name']
  	})
  	this.catName=this.db.object('cats/-LBGCCaCzhjVSCyLUkKb').valueChanges()
  	.map(cat=>cat['name'])
  }

  switchMapCall(){
  	this.owner=this.db.object('owner/srijan')//.valueChanges().map(owner=>owner['name'])
  	this.cats=this.owner.valueChanges().switchMap(owner=>{
  		return this.db.list('cats',ref=>ref.orderByChild('owner').equalTo(owner['name'])).valueChanges()
  	})
  	this.catCount=this.cats.map(cats=>{
  		return cats.length
  	})
  }

  changeAnimal(animal, type){
  	this.currentAnimal.next(animal)
  }

  ngOnDestroy(){
  	this.subscription.unsubscribe()
  }

}
