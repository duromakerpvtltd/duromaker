const u=id=>`https://images.unsplash.com/${id}?auto=format&fit=crop&w=1800&q=80`;
// Replace these image URLs with your own project photography.
export const IMG={hero:u('photo-1600210492486-724fe5c67fb0'),a:u('photo-1618221195710-dd6b41faaea6'),b:u('photo-1616486338812-3dadae4b4ace'),c:u('photo-1600607687939-ce8a6c25118c'),d:u('photo-1600585154340-be6161a56a0c'),e:u('photo-1505693416388-ac5ce068fe85'),f:u('photo-1493663284031-b7e3aefcae8e')};
export const CATS=['Residential','Commercial','Modern Luxury','Minimalist','Contemporary'];
export const PROJECTS=[
{slug:'the-linen-house',title:'The Linen House',location:'Mumbai',category:'Residential',year:2025,img:IMG.a,concept:'A home organised around light, where every room borrows warmth from the next.',materials:['Lime plaster','Smoked oak','Honed travertine','Brushed brass']},
{slug:'atrium-offices',title:'Atrium Offices',location:'Bengaluru',category:'Commercial',year:2024,img:IMG.b,concept:'A workplace that behaves like a courtyard: open at the centre, quiet at the edges.',materials:['Acoustic felt','Black steel','Terrazzo','Ash veneer']},
{slug:'villa-sorrel',title:'Villa Sorrel',location:'Goa',category:'Modern Luxury',year:2025,img:IMG.c,concept:'Long sightlines and deep shade, built for slow afternoons.',materials:['Teak','Basalt','Raw silk','Bronze']},
{slug:'quiet-room',title:'The Quiet Room',location:'Delhi',category:'Minimalist',year:2023,img:IMG.d,concept:'Reduction as a practice: fewer objects, each one chosen for its weight.',materials:['Clay paint','Pale oak','Linen','Stoneware']},
{slug:'maison-ardent',title:'Maison Ardent',location:'Pune',category:'Contemporary',year:2024,img:IMG.e,concept:'A contemporary flat with a gallery spine connecting private rooms.',materials:['Walnut','Fluted glass','Marble','Bouclé']}];
export const PRODUCTS=[
{id:1,name:'Ember Lounge Chair',category:'Seating',price:'₹84,000',img:IMG.b},{id:2,name:'Stratum Side Table',category:'Tables',price:'₹32,500',img:IMG.d},
{id:3,name:'Halo Pendant',category:'Lighting',price:'₹21,000',img:IMG.f},{id:4,name:'Dune Sofa',category:'Seating',price:'₹1,42,000',img:IMG.a},
{id:5,name:'Terra Vase Set',category:'Decor',price:'₹9,800',img:IMG.e},{id:6,name:'Monolith Dining Table',category:'Tables',price:'₹1,10,000',img:IMG.c}];
