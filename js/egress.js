// Egress que solta o pacote, gateway que abre a rota e failover que troca o nó.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

function cena(id, titulo, emoji, nivel, onde, etapa, pares) {
  return {
    id, titulo, emoji, nivel, onde,
    rodadas: pares.map(p => fala(p[0] || etapa, p[1], p[2], p[3], p[4], p[5], p[6]))
  };
}

export const EGRESSES = [
  cena('egressbase', 'Solta do egress', '📦', 'A2', 'O egress solta o pacote.', 'Solta', [
    ['Solta', 'What does the egress release?', 'O que o egress solta?', 'Diga que o egress solta o pacote.', 'The egress releases the packet.', ['the egress releases the packet', 'that egress releases the packet'], 'The packet é o pacote.'],
    ['Fecha', 'What should the egress do with the packet?', 'O que o egress deve fazer com o pacote?', 'Peça para soltar o pacote.', 'Please release the packet.', ['please release the packet', 'release the packet'], 'Release the packet é soltar o pacote.']
  ]),
  cena('egress2', 'Egress dois', '📦', 'B1', 'O egress soltou dois pacotes.', 'Solta', [
    ['Solta', 'How many packets did the egress release?', 'Quantos pacotes o egress soltou?', 'Diga que o egress soltou dois pacotes.', 'The egress released two packets.', ['the egress released two packets', 'the egress released 2 packets', 'that egress released two packets'], 'Two packets é dois pacotes.'],
    ['Fecha', 'Where should we cap the packets?', 'Onde a gente limita os pacotes?', 'Peça para soltar dois pacotes.', 'Please release two packets.', ['please release two packets', 'please release 2 packets', 'release two packets'], 'Release two packets é soltar dois pacotes.']
  ]),
  cena('egressok', 'Egress no alvo', '📦', 'B1', 'O egress pode ficar.', 'Solta', [
    ['Solta', 'Can the egress stay?', 'O egress pode ficar?', 'Diga que o egress pode ficar.', 'The egress can stay.', ['the egress can stay', 'that egress can stay'], 'Can stay é pode ficar.'],
    ['Fecha', 'Can this egress stay quiet?', 'Este egress pode ficar quieto?', 'Diga que este egress pode ficar quieto.', 'This egress can stay quiet.', ['this egress can stay quiet', 'that egress can stay quiet'], 'Stay quiet é ficar quieto.']
  ])
];

export const GATEWAYS = [
  cena('gatewaybase', 'Abre do gateway', '🚪', 'A2', 'O gateway abre a rota.', 'Abre', [
    ['Abre', 'What does the gateway open?', 'O que o gateway abre?', 'Diga que o gateway abre a rota.', 'The gateway opens the route.', ['the gateway opens the route', 'that gateway opens the route'], 'The route é a rota.'],
    ['Fecha', 'What should the gateway do with the route?', 'O que o gateway deve fazer com a rota?', 'Peça para abrir a rota.', 'Please open the route.', ['please open the route', 'open the route'], 'Open the route é abrir a rota.']
  ]),
  cena('gateway3', 'Gateway três', '🚪', 'B1', 'O gateway abriu três rotas.', 'Abre', [
    ['Abre', 'How many routes did the gateway open?', 'Quantas rotas o gateway abriu?', 'Diga que o gateway abriu três rotas.', 'The gateway opened three routes.', ['the gateway opened three routes', 'the gateway opened 3 routes', 'that gateway opened three routes'], 'Three routes é três rotas.'],
    ['Fecha', 'Where should we cap the routes?', 'Onde a gente limita as rotas?', 'Peça para abrir três rotas.', 'Please open three routes.', ['please open three routes', 'please open 3 routes', 'open three routes'], 'Open three routes é abrir três rotas.']
  ]),
  cena('gatewayok', 'Gateway no alvo', '🚪', 'B1', 'O gateway pode ficar.', 'Abre', [
    ['Abre', 'Can the gateway stay?', 'O gateway pode ficar?', 'Diga que o gateway pode ficar.', 'The gateway can stay.', ['the gateway can stay', 'that gateway can stay'], 'Can stay é pode ficar.'],
    ['Fecha', 'Can this gateway stay quiet?', 'Este gateway pode ficar quieto?', 'Diga que este gateway pode ficar quieto.', 'This gateway can stay quiet.', ['this gateway can stay quiet', 'that gateway can stay quiet'], 'Stay quiet é ficar quieto.']
  ])
];

export const FAILOVERS = [
  cena('failoverbase', 'Troca do failover', '🔄', 'A2', 'O failover troca o nó.', 'Troca', [
    ['Troca', 'What does the failover switch?', 'O que o failover troca?', 'Diga que o failover troca o nó.', 'The failover switches the node.', ['the failover switches the node', 'that failover switches the node'], 'The node é o nó.'],
    ['Fecha', 'What should the failover do with the node?', 'O que o failover deve fazer com o nó?', 'Peça para trocar o nó.', 'Please switch the node.', ['please switch the node', 'switch the node'], 'Switch the node é trocar o nó.']
  ]),
  cena('failover4', 'Failover quatro', '🔄', 'B1', 'O failover trocou quatro nós.', 'Troca', [
    ['Troca', 'How many nodes did the failover switch?', 'Quantos nós o failover trocou?', 'Diga que o failover trocou quatro nós.', 'The failover switched four nodes.', ['the failover switched four nodes', 'the failover switched 4 nodes', 'that failover switched four nodes'], 'Four nodes é quatro nós.'],
    ['Fecha', 'Where should we cap the nodes?', 'Onde a gente limita os nós?', 'Peça para trocar quatro nós.', 'Please switch four nodes.', ['please switch four nodes', 'please switch 4 nodes', 'switch four nodes'], 'Switch four nodes é trocar quatro nós.']
  ]),
  cena('failoverok', 'Failover no alvo', '🔄', 'B1', 'O failover pode ficar.', 'Troca', [
    ['Troca', 'Can the failover stay?', 'O failover pode ficar?', 'Diga que o failover pode ficar.', 'The failover can stay.', ['the failover can stay', 'that failover can stay'], 'Can stay é pode ficar.'],
    ['Fecha', 'Can this failover stay quiet?', 'Este failover pode ficar quieto?', 'Diga que este failover pode ficar quieto.', 'This failover can stay quiet.', ['this failover can stay quiet', 'that failover can stay quiet'], 'Stay quiet é ficar quieto.']
  ])
];

export function egressPorId(id) {
  return EGRESSES.find(c => c.id === id) ?? null;
}

export function gatewayPorId(id) {
  return GATEWAYS.find(c => c.id === id) ?? null;
}

export function failoverPorId(id) {
  return FAILOVERS.find(c => c.id === id) ?? null;
}

export function avaliarEgress(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarGateway(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarFailover(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
