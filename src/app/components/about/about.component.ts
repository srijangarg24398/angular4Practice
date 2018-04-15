import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

	posts:Post[]
  constructor(private dataService:DataService) {

  }

  ngOnInit() {
  	this.dataService.getPosts().subscribe((posts)=>{
  		// console.log(posts);
  		this.posts=posts
  	})
  }

}
interface Post{
	id:number,
	userId:number,
	title:string,
	body:string
}