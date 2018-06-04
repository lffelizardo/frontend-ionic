import { RefDTO } from "./ref.dto";
import { PagamentoDTO } from "./paramento.dto";
import { ItemPeditoDTO } from "./item-pedido.dto";
import { EnderecoDTO } from "../../models/endereco.dto";

export interface PedidoDTO{
    cliente: RefDTO;
    enderecoDeEntrega: RefDTO;
    pagamento: PagamentoDTO;
    itens: ItemPeditoDTO[]; 
}