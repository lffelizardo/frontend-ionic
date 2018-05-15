import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;

  numberPattern = /^[0-9]*$/;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder) {

                this.formGroup = this.formBuilder.group({
                  nome: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
                  email: ['', [Validators.required, Validators.email]],
                  tipo: ['', [Validators.required]],
                  cpfOuCnpj: ['', [Validators.required, Validators.minLength(11), Validators.pattern(this.numberPattern)]],
                  senha: ['', [Validators.required]],
                  logradouro: ['', [Validators.required]],
                  numero: ['', [Validators.required, Validators.pattern(this.numberPattern)]],
                  complemento: ['', []],
                  bairro: ['', Validators.required],
                  cep: ['', [Validators.required]],
                  telefone1: ['', [Validators.required]],
                  telefone2: ['', [Validators.required]],
                  telefone3: ['', [Validators.required]],
                  estadoId: [null, Validators.required],
                  cidadeId: [null, Validators.required]
                });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  singupUser(){
    
  }

}
