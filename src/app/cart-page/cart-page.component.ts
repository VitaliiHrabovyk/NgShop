import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/interfaces';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  cartProducts:Product[] = []
  totalPrice  = 0

  constructor(
   public productServ: ProductService
  ) { }

  ngOnInit(): void {


      this.cartProducts = this.productServ.cartProducts
      for (let index = 0; index < this.cartProducts.length; index++) {
      this.totalPrice += Number(this.cartProducts[index].price)
       
      }



    
  }

}
