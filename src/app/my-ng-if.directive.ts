import { Directive, ViewContainerRef, TemplateRef, OnInit } from '@angular/core';

@Directive({
  selector: '[myNgIf]'
})
export class MyNgIfDirective {

  constructor(private viewContainer:ViewContainerRef , private template: TemplateRef<Object>) { }

  ngOnInit(){
  	const condition=true;
  	if (condition){
  		this.viewContainer.createEmbeddedView(this.template)
  	}else{
  		this.viewContainer.clear();
  	}
  }
}
