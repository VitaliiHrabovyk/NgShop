import { Component, OnInit } from '@angular/core';
import { subscribeOn } from 'rxjs';
import { ProductService } from '../shared/product.service';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})

export class MainPageComponent implements OnInit {

  products$
  constructor(private productServ:ProductService) { }

  
  ngOnInit(): void {

  this.products$ = this.productServ.getAll()

    
  }

    


  }



