import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, switchScan } from 'rxjs';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  product$


  constructor(
    private ProductServe:ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.product$ = this.route.params.pipe(switchMap(params => {
      return this.ProductServe.getById(params['id'])
    }))
  }

  addProduct(product){
    this.ProductServe.addProduct(product)
  }

}
