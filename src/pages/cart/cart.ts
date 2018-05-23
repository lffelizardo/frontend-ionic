import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';
import { StorageService } from '../../services/storage.service';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../app/config/api.config';
import { CartService } from '../../services/domain/cart.service';
import { ProdutoDTO } from '../../models/produto.dto';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public cartService: CartService,
              public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let cart = this.cartService.getCart();
    this.items = cart.items;
    this.loadImageUrls();
  }

  aumentarQuantidade(produto:ProdutoDTO){
    this.items = this.cartService.aumentarQuantidade(produto).items;
  }

  diminuirQuantidade(produto:ProdutoDTO){
    this.items = this.cartService.diminuirQuantidade(produto).items;
  }

  removerItem(produto: ProdutoDTO){
    this.items = this.cartService.removeProduto(produto).items;
  }
  
  total(): number{
    return this.cartService.total();
  }

  continuarComprando(){
    this.navCtrl.setRoot("CategoriasPage");
  }

  loadImageUrls(){
    for(var i=0; i<this.items.length; i++){
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.produto.id)
          .subscribe(response => {
            item.produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.produto.id}-small.jpg`;
          })
    }
  }

}
