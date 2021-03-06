import { Component, OnInit } from '@angular/core';
import {CartItem} from "../../common/cart-item";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartSevice: CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails() {
    //get a handle to the cart items
    this.cartItems = this.cartSevice.cartItems;
    //subscribe to the cart totalPrice
    this.cartSevice.totalPrice.subscribe(
      data => this.totalPrice = data
    );
    //subscribe to the cart totalQuantity
    this.cartSevice.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
    //compute cart total price and quantity
    this.cartSevice.computeCartTotals();
  }

  incrementQuantity(theCartItem: CartItem) {
    this.cartSevice.addToCart(theCartItem);
  }

  decrementQuantity(theCartItem: CartItem) {
    this.cartSevice.decrementQuantity(theCartItem);
  }

  remove(theCartItem: CartItem) {
    this.cartSevice.remove(theCartItem);
  }
}
