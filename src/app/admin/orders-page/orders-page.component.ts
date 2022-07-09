import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/shared/order.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit {

  constructor(
    private orderServ: OrderService
  ) { }
  
  orders:any[]
  pSub!: Subscription
  rSub!: Subscription


  ngOnInit(): void {
    this.orderServ.getAll().subscribe(orders => {
      this.orders = orders
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
    this.rSub = this.orderServ.delete(id).subscribe(()=>{
      this.orders = this.orders.filter(order => order.id != id)
    })
    
  }



}
