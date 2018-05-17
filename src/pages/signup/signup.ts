import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';

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
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  numberPattern = /^[0-9]*$/;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public cidadeService: CidadeService,
              public estadoService: EstadoService) {

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
    this.estadoService.findAll()
        .subscribe(response => {
          this.estados = response;
          this.formGroup.controls.estadoId.setValue(this.estados[0].id)
          this.updateCidades();
        })
  }

  updateCidades(){
    let estadoId = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estadoId)
      .subscribe(response => {
        this.cidades = response;
        this.formGroup.controls.cidadeId.setValue(null);
      })
  }

  singupUser(){
    
  }

}
