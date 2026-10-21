// Conteúdo de apresentação do site (fotos, galeria, depoimentos).
// Cardápio, preços e dados da loja vêm da API — ver backend/src/data.
import { assetUrl } from '@/lib/format';

export const photos = {
  logo: assetUrl('galeria/WhatsApp_Image_2026-09-20_at_12.30.34.jpeg'),
  monster: assetUrl('galeria/WhatsApp_Image_2026-09-20_at_12.33.40.jpeg'),
  rings: assetUrl('galeria/WhatsApp_Image_2026-09-20_at_12.33.41.jpeg'),
  fries: assetUrl('galeria/WhatsApp_Image_2026-09-20_at_12.33.44.jpeg'),
  bacon: assetUrl('galeria/WhatsApp_Image_2026-09-20_at_12.33.46.jpeg'),
  salada: assetUrl('galeria/WhatsApp_Image_2026-09-20_at_12.33.47.jpeg'),
  loaded: assetUrl('pedidos/WhatsApp_Image_2026-09-20_at_12.33.44_(1).jpeg'),
  egg: assetUrl('pedidos/WhatsApp_Image_2026-09-20_at_12.33.48.jpeg'),
};

export const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Sobre nós', href: '#sobre' },
  { label: 'Cardápio', href: '#cardapio' },
  { label: 'Combo', href: '#combo' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Avaliações', href: '#avaliacoes' },
  { label: 'Contato', href: '#contato' },
];

/** Itens do cardápio que giram no destaque do topo da página. */
export const heroShowcaseIds = [
  'gran-monster-angus',
  'gran-egg-angus',
  'gran-salada-angus',
  'gran-bacon-angus',
];

export interface GalleryImage {
  url: string;
  title: string;
  subtitle: string;
  alt: string;
}

export const galleryImages: GalleryImage[] = [
  {
    url: photos.monster,
    title: 'Gran Monster Angus',
    subtitle: 'Duplo blend 160g, cheddar duplo e bacon',
    alt: 'Hambúrguer duplo Gran Monster Angus com queijo cheddar e bacon',
  },
  {
    url: photos.rings,
    title: 'Gran Rings',
    subtitle: 'Onion rings sequinhos e maionese verde',
    alt: 'Hambúrguer com anéis de cebola empanados e maionese verde',
  },
  {
    url: photos.loaded,
    title: 'Batata Loaded',
    subtitle: 'Fritas crocantes com cheddar cremoso e bacon',
    alt: 'Porção de batata frita com cheddar e bacon',
  },
  {
    url: photos.bacon,
    title: 'Gran Bacon Angus',
    subtitle: 'Brioche dourado, Angus 160g e bacon na chapa',
    alt: 'Hambúrguer Gran Bacon Angus com queijo e bacon',
  },
  {
    url: photos.salada,
    title: 'Gran Salada Angus',
    subtitle: 'Alface americana e tomate fresquinhos',
    alt: 'Hambúrguer Gran Salada com alface, tomate, queijo e bacon',
  },
  {
    url: photos.egg,
    title: 'Gran Egg Angus',
    subtitle: 'Ovo na chapa, bacon crocante e queijo',
    alt: 'Hambúrguer Gran Egg com ovo, bacon e queijo derretido',
  },
];

export interface Review {
  text: string;
  author: string;
  role: string;
  order: string;
  rating: number;
}

export const reviews: Review[] = [
  {
    text: 'O Gran Monster Angus é surreal. Carne no ponto exato, suculenta de verdade, pão macio que não desmonta e a maionese da casa faz toda a diferença.',
    author: 'Lucas Mendes',
    role: 'Lago Norte',
    order: 'Gran Monster Angus + Batata Loaded',
    rating: 5,
  },
  {
    text: 'Melhor hambúrguer artesanal do Varjão e região! Chegou quentinho, a batata com cheddar e bacon vem muito bem servida e o atendimento no WhatsApp é super rápido.',
    author: 'Camila Rocha',
    role: 'Varjão',
    order: 'Combo Granfinos',
    rating: 5,
  },
  {
    text: 'Dá pra sentir que os ingredientes são de primeira. O smash tem aquela crostinha perfeita na carne e o preço é super justo pela qualidade entregue.',
    author: 'Rafael Nogueira',
    role: 'Asa Norte',
    order: 'Gran Rings',
    rating: 5,
  },
];
