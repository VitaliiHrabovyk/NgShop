import { Component, OnInit } from '@angular/core';
import { Subscription, VirtualTimeScheduler } from 'rxjs';
import { Product } from 'src/app/shared/interfaces';
import { ProductService } from 'src/app/shared/product.service';



@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  constructor(
    public productServe: ProductService,

  ) { }

  products:any[]
  pSub!: Subscription
  rSub!: Subscription
  productName!:string


  ngOnInit(): void {
    this.productServe.getAll().subscribe(products => {
      console.log(products);
      
      this.products = products
    })
  }


  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe
    }

    if (this.rSub) {
      this.pSub.unsubscribe
    }
  }



  remove(id){
    console.log('delete');
    this.rSub = this.productServe.delete(id).subscribe(()=>{
      this.products = this.products.filter(product => product.id != id)
    })
    
  }

}
