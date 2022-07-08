import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../shared/interfaces';
import { OrderService } from '../shared/order.service';
import { ProductService } from '../shared/product.service';


@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  cartProducts:Product[] = []
  totalPrice  = 0
  form!:FormGroup
  submitted = false
  added = ''

  constructor(
   public productServ: ProductService,
   private route: Router,
   private orderServ: OrderService
  ) { }

  ngOnInit(): void {


      this.cartProducts = this.productServ.cartProducts
      for (let index = 0; index < this.cartProducts.length; index++) {
      this.totalPrice += Number(this.cartProducts[index].price)
      }

      this.form = new FormGroup({
        name: new FormControl(null, Validators.required),
        phone: new FormControl(null, Validators.required),
        adress: new FormControl(null, Validators.required),
        payment: new FormControl("cash"),
        })
    
  }


  submit(){
    if (this.form.invalid){
      return
    }
    this.submitted = true;

    const order = {
      name: this.form.value.name,
      phone: this.form.value.phone,
      adress: this.form.value.adress,
      payment: this.form.value.payment,
      price: this.totalPrice,
      date: new Date(),
      items : this.cartProducts

    }
    console.log(this.form);
    
   
    this.orderServ.create(order).subscribe(res => {
      console.log(res);  
      this.form.reset()
      this.submitted = false
      this.added = "Order inprogress"

    })


  }


  delete (product:any) {
    this.totalPrice -=Number(product.price)
    this.cartProducts.splice(this.cartProducts.indexOf(product), 1)

  }




}


