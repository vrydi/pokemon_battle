(this.webpackJsonppokemon_battle=this.webpackJsonppokemon_battle||[]).push([[0],{105:function(e,t,a){},106:function(e,t,a){},140:function(e,t,a){"use strict";a.r(t);var n=a(2),c=a.n(n),s=a(23),r=a.n(s),i=(a(105),a(106),a(158)),o=a(148),l=a(159),j=a(31),u=a(3);function b(){return Object(u.jsx)(u.Fragment,{children:Object(u.jsx)(i.a,{bg:"dark",variant:"dark",expand:"lg",children:Object(u.jsxs)(o.a,{className:"d-flex justify-content-center",children:[Object(u.jsxs)(i.a.Brand,{children:[Object(u.jsx)("img",{className:"d-inline-block align-top",src:"https://firebasestorage.googleapis.com/v0/b/pokemon-battle-f40d2.appspot.com/o/pokemon_logo.png?alt=media&token=911b4fce-0aac-4ee4-8e8e-308472d9997a",height:"40",alt:""}),Object(u.jsx)("span",{className:"text-light ms-5 h2",children:"Pokemon battle"})]}),Object(u.jsx)(i.a.Toggle,{"aria-controls":"responsive-navbar-nav"}),Object(u.jsx)(i.a.Collapse,{id:"responsive-navbar-nav",children:Object(u.jsxs)(l.a,{className:"me-auto",children:[Object(u.jsx)(j.b,{to:"/",className:"nav-link",children:"Home"}),Object(u.jsx)(j.b,{to:"/battle",className:"nav-link",children:"Battle"})]})})]})})})}a(114);var m=a(9),d=a(151),p=a(152),h=a(153),x=a(160),O=a(154),f=a(155),g=a(161),v=a(149),k=a(157),y=a(150),N=a(101),w=a(59);function P(e){var t=e.pokemon,a=Object(n.useState)(!1),c=Object(m.a)(a,2),s=c[0],r=c[1],i=M(t.gender);return Object(u.jsx)(u.Fragment,{children:Object(u.jsxs)(g.a,{children:[Object(u.jsx)(g.a.Img,{variant:"top",src:t.image}),Object(u.jsxs)(g.a.Body,{children:[Object(u.jsxs)(g.a.Title,{children:[Object(u.jsxs)("h2",{className:"text-capitalize",children:[t.name," ",Object(u.jsx)(w.c,{icon:i})]}),t.types.map((function(e,t){return Object(u.jsxs)("small",{className:"text-muted",children:[e.type.name," "]},t)}))]}),s&&Object(u.jsxs)("div",{children:[Object(u.jsx)("h5",{children:"Moves : "}),Object(u.jsx)(v.a,{className:"list-group-flush",children:t.moves.map((function(e,t){return Object(u.jsx)(u.Fragment,{children:e.description.length>0&&Object(u.jsx)(k.a,{overlay:Object(u.jsx)(y.a,{children:e.description[0].flavor_text}),placement:"top",defaultShow:!1,delay:500,children:Object(u.jsx)(N.a,{className:"text-capitalize",children:e.name})},t)})}))}),Object(u.jsx)(g.a.Text,{children:t.ability&&Object(u.jsx)(k.a,{overlay:Object(u.jsx)(y.a,{children:t.ability.description[0].flavor_text}),placement:"top",defaultShow:!1,delay:500,children:Object(u.jsxs)("span",{children:[Object(u.jsx)("span",{className:"h5",children:"Ability"})," : ",t.ability.name]})})}),Object(u.jsx)("h5",{children:"Stats :"}),Object(u.jsx)(v.a,{className:"list-group-flush",children:Object.entries(t.stats).map((function(e,t){return Object(u.jsx)(S,{name:e[0],value:e[1]},t)}))})]}),Object(u.jsx)(d.a,{className:"my-2 w-100",onClick:function(){return r(!s)},children:s?"Hide extra info":"Show extra info"})]})]})})}function S(e){var t=e.name,a=e.value;return Object(u.jsx)(N.a,{className:"text-capitalize",children:"".concat(t," : ").concat(a.base_stat)})}var M=function(e){switch(e){case"genderless":default:return"genderless";case"male":return"mars";case"female":return"venus"}},_=a(13),T=a.n(_),C=a(26),H=a(4);function I(e){return e.sprites.other["official-artwork"].front_default}function z(e){return B.apply(this,arguments)}function B(){return(B=Object(C.a)(T.a.mark((function e(t){var a,n,c,s;return T.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(t.length<1)){e.next=2;break}return e.abrupt("return",[]);case 2:if(!(t.length<=4)){e.next=4;break}return e.abrupt("return",t);case 4:a=[],n=0;case 6:if(!(n<4)){e.next=15;break}return c=t[Math.round(Math.random()*(t.length-1))].move,e.next=10,K(c.url);case 10:s=e.sent,a.push(Object(H.a)(Object(H.a)({},s),{},{name:c.name,currentPP:s.pp}));case 12:n++,e.next=6;break;case 15:return e.abrupt("return",a);case 16:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function F(e){return A.apply(this,arguments)}function A(){return(A=Object(C.a)(T.a.mark((function e(t){var a;return T.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t[Math.round(Math.random()*(t.length-1))],e.next=3,U(a.ability.url);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function E(){return J.apply(this,arguments)}function J(){return(J=Object(C.a)(T.a.mark((function e(){var t,a,n,c;return T.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,W();case 2:t=e.sent,a=[],n=0;case 5:if(!(n<6)){e.next=13;break}return e.next=8,G(Math.round(Math.random()*(t-1)+1));case 8:c=e.sent,a.push(c);case 10:n++,e.next=5;break;case 13:return e.abrupt("return",a);case 14:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function G(e){return L.apply(this,arguments)}function L(){return(L=Object(C.a)(T.a.mark((function e(t){var a,n;return T.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://pokeapi.co/api/v2/pokemon/".concat(t));case 2:return a=e.sent,e.next=5,a.json();case 5:if(!((n=e.sent).moves.length<1)){e.next=9;break}return e.next=9,G(t);case 9:return console.log(n),e.t0=String(n.id),e.t1=n.name,e.t2=I(n),e.next=15,F(n.abilities);case 15:return e.t3=e.sent,e.next=18,z(n.moves);case 18:return e.t4=e.sent,e.t5={currentHeath:n.stats[0],health:n.stats[0],attack:n.stats[1],defense:n.stats[2],"special attack":n.stats[3],"special defense":n.stats[4],speed:n.stats[5],statusEffect:["test"]},e.t6=n.types,e.t7=n.species.url,e.next=24,D(n.name);case 24:return e.t8=e.sent,e.abrupt("return",{id:e.t0,name:e.t1,image:e.t2,ability:e.t3,moves:e.t4,stats:e.t5,types:e.t6,species:e.t7,gender:e.t8});case 26:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function D(e){return R.apply(this,arguments)}function R(){return(R=Object(C.a)(T.a.mark((function e(t){var a,n;return T.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://pokeapi.co/api/v2/gender/?name=".concat(t));case 2:return a=e.sent,e.next=5,a.json();case 5:return n=e.sent,e.abrupt("return",n.results[Math.round(Math.random()*(n.results.length-1))].name);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function W(){return q.apply(this,arguments)}function q(){return(q=Object(C.a)(T.a.mark((function e(){var t,a;return T.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://pokeapi.co/api/v2/pokemon-species/?limit=0");case 2:return t=e.sent,e.next=5,t.json();case 5:return a=e.sent,e.abrupt("return",a.count);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function K(e){return Q.apply(this,arguments)}function Q(){return(Q=Object(C.a)(T.a.mark((function e(t){var a,n;return T.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t);case 2:return a=e.sent,e.next=5,a.json();case 5:return n=e.sent,e.abrupt("return",{accuracy:n.accuracy,"damage class":n.damage_class,description:n.flavor_text_entries.filter((function(e){return"en"===e.language.name})),pp:n.pp,"effect chance":n.effect_chance,"effect description":n.effect_entries[0].effect,power:n.power,target:n.target});case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function U(e){return V.apply(this,arguments)}function V(){return(V=Object(C.a)(T.a.mark((function e(t){var a,n;return T.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t);case 2:return a=e.sent,e.next=5,a.json().then();case 5:return n=e.sent,e.abrupt("return",{name:n.name,id:n.id,description:n.flavor_text_entries.filter((function(e){return"en"===e.language.name}))});case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var X=Object(n.createContext)();function Y(e){var t=Object(n.useState)(JSON.parse(localStorage.getItem("pokemonTeam"))||[]),a=Object(m.a)(t,2),c=a[0],s=a[1],r=Object(n.useState)(localStorage.getItem("tries")||3),i=Object(m.a)(r,2),o=i[0],l=i[1],j=Object(n.useCallback)(Object(C.a)(T.a.mark((function e(){var t;return T.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E();case 2:t=e.sent,console.log(t),localStorage.setItem("pokemonTeam",JSON.stringify(t)),l(o-1),localStorage.setItem("tries",o),s(t);case 8:case"end":return e.stop()}}),e)}))),[s,o,l]),b=Object(n.useMemo)((function(){return{pokemonTeam:c,generateTeam:j,tries:o}}),[c,j,o]);return Object(u.jsx)(X.Provider,{value:b,children:e.children})}var Z=function(){return Object(n.useContext)(X)},$=Object(n.createContext)();function ee(e){var t=Object(n.useState)(JSON.parse(localStorage.getItem("enemyPokemonTeam"))||[]),a=Object(m.a)(t,2),c=a[0],s=a[1],r=Object(n.useCallback)(Object(C.a)(T.a.mark((function e(){var t;return T.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E();case 2:t=e.sent,console.log(t),localStorage.setItem("enemyPokemonTeam",JSON.stringify(t)),s(t);case 6:case"end":return e.stop()}}),e)}))),[s]),i=Object(n.useMemo)((function(){return{enemyPokemonTeam:c,generateEnemyTeam:r}}),[c,r]);return Object(u.jsx)($.Provider,{value:i,children:e.children})}var te=function(){return Object(n.useContext)($)};function ae(){return Object(u.jsx)(o.a,{fluid:!0,className:"px-5 mt-3",children:Object(u.jsxs)("fieldset",{className:"border border-3 px-4 py-2",style:{borderRadius:"25px"},children:[Object(u.jsxs)("div",{className:"d-flex justify-content-around",children:[Object(u.jsx)("h1",{children:"My Team"}),Object(u.jsx)(ne,{})]}),Object(u.jsx)(ce,{})]})})}function ne(){var e=Z(),t=e.generateTeam,a=e.tries,c=te().generateEnemyTeam,s=Object(n.useState)("Generate your team"),r=Object(m.a)(s,2),i=r[0],o=r[1],l=Object(n.useState)(!1),j=Object(m.a)(l,2),b=j[0],O=j[1];return Object(u.jsxs)("div",{className:"text-center",children:[a>=0&&Object(u.jsxs)(d.a,{className:"m-2",onClick:function(){return o("Generating..."),c(),void t().then((function(){o("Generate your team"),O(!0)}))},children:["Generating..."===i?Object(u.jsx)(p.a,{animation:"border",size:"sm"}):"",i]}),b&&Object(u.jsx)(h.a,{position:"top-center",className:"mt-5",style:{zIndex:"10000"},children:Object(u.jsxs)(x.a,{onClose:function(){return O(!1)},show:b,delay:5e3,autohide:!0,animation:!0,children:[Object(u.jsx)(x.a.Header,{children:Object(u.jsx)("strong",{className:"me-auto",children:"Successfully generated a new team"})}),Object(u.jsx)(x.a.Body,{children:"".concat(a+1," generation attempt(s) remaining")})]})})]})}function ce(){var e=Z().pokemonTeam;return Object(u.jsx)(O.a,{xl:6,children:e.map((function(e,t){return Object(u.jsx)(f.a,{children:Object(u.jsx)(P,{pokemon:e})},t)}))})}var se=a(16),re=(a(137),a(138),a(139),a(162)),ie=a(156);function oe(){var e=Z().pokemonTeam,t=te().enemyPokemonTeam,a=Object(n.useState)(e[0]),c=Object(m.a)(a,2),s=c[0],r=c[1],i=Object(n.useState)(t[0]),l=Object(m.a)(i,2),j=l[0],b=(l[1],Object(n.useState)("start")),d=Object(m.a)(b,2),p=d[0],h=d[1];return Object(u.jsx)("section",{children:Object(u.jsx)(o.a,{id:"battle",className:"p-0 mt-5",children:"pokemon"===p?Object(u.jsx)(le,{pokemonTeam:e,activePokemon:s,setActivePokemon:r,setPokeMenu:h}):Object(u.jsxs)(u.Fragment,{children:[Object(u.jsxs)("div",{className:"d-flex battle-screen",children:[Object(u.jsxs)(f.a,{lg:6,className:"left-field",children:[Object(u.jsxs)(O.a,{className:"mt-3",children:[Object(u.jsx)(Oe,{pokemon:j}),Object(u.jsx)("div",{className:"position-relative w-75 mx-auto card-arrow"})]}),Object(u.jsx)(O.a,{children:Object(u.jsx)("img",{className:"w-75 mt-5 poke-image mirror",src:s.image,alt:""})}),Object(u.jsx)(O.a,{style:{height:"0"},children:Object(u.jsx)("img",{src:"https://firebasestorage.googleapis.com/v0/b/pokemon-battle-f40d2.appspot.com/o/battle_podia.png?alt=media&token=21348cd1-ea50-4ea2-ab4c-c9d4ba6d6042",alt:"",className:"w-75 position-relative poke-stadia"})})]}),Object(u.jsxs)(f.a,{lg:6,className:"right-field",children:[Object(u.jsx)(O.a,{children:Object(u.jsx)("img",{className:"w-75 mt-5 ms-auto mirror poke-image",src:j.image,alt:""})}),Object(u.jsx)(O.a,{style:{height:"25px"},children:Object(u.jsx)("img",{src:"https://firebasestorage.googleapis.com/v0/b/pokemon-battle-f40d2.appspot.com/o/battle_podia.png?alt=media&token=21348cd1-ea50-4ea2-ab4c-c9d4ba6d6042",alt:"",className:"w-75 position-relative ms-auto poke-stadia mirror"})}),Object(u.jsxs)(O.a,{children:[Object(u.jsx)(Oe,{pokemon:s,className:"ms-auto",friend:!0}),Object(u.jsx)("div",{className:"position-relative w-75 mx-auto card-arrow mirror"})]})]})]}),"start"===p&&Object(u.jsx)(be,{activePokemon:s,setPokeMenu:h}),"battle"===p&&Object(u.jsx)(pe,{moves:s.moves,setPokeMenu:h})]})})})}function le(e){var t=e.pokemonTeam,a=e.activePokemon,n=e.setActivePokemon,c=e.setPokeMenu;return Object(u.jsxs)(o.a,{children:[Object(u.jsx)(O.a,{lg:2,className:"g-4",children:t.map((function(e,t){return Object(u.jsx)(je,{activePokemon:a.name===e.name,setActivePokemon:n,setPokeMenu:c,pokemon:e},t)}))}),Object(u.jsx)("div",{className:"mt-3",children:Object(u.jsx)("button",{onClick:function(){return c("start")},className:"poke-option-button w-100 btn bg-light",children:"Back"})})]})}function je(e){var t=e.activePokemon,a=e.pokemon,n=e.setActivePokemon,c=e.setPokeMenu,s=M(a.gender);console.log(a);return Object(u.jsx)(f.a,{children:Object(u.jsx)(g.a,{className:t?"border-3 border-primary bg-yellow":"",onClick:function(){return function(e){n(e),c("start")}(a)},children:Object(u.jsxs)(O.a,{className:"mt-2",children:[Object(u.jsx)(f.a,{lg:4,children:Object(u.jsx)("img",{src:a.image,alt:"",style:{height:"10rem"}})}),Object(u.jsxs)(f.a,{lg:8,children:[Object(u.jsx)("div",{className:"text-capitalize h3",children:Object(u.jsxs)("span",{className:"text-capitalize h4",children:[a.name," ",Object(u.jsx)("span",{className:"ms-2 text-primary",children:Object(u.jsx)(w.c,{icon:s})})]})}),Object(u.jsx)("div",{children:a.types.map((function(e,t){return Object(u.jsx)("span",{className:"text-capitalize",children:"".concat(e.type.name," ")},t)}))}),Object(u.jsxs)(O.a,{lg:2,style:{height:"70px"},className:"me-2",children:[Object(u.jsx)(f.a,{className:"d-flex",children:Object(u.jsx)("div",{className:"align-self-end",children:a.stats.statusEffect.map((function(e,t){return Object(u.jsx)(ue,{status:e},t)}))})}),Object(u.jsxs)(f.a,{children:[Object(u.jsxs)("div",{className:"w-100 my-auto d-flex rounded text-light ps-2 bg-green",children:[Object(u.jsx)("span",{className:"text-yellow",children:"HP"}),Object(u.jsx)("div",{className:"w-100 my-auto mx-2",children:Object(u.jsx)(re.a,{now:a.stats.currentHeath.base_stat,min:0,max:a.stats.health.base_stat,variant:"success"})})]}),Object(u.jsx)("div",{className:"text-right me-3",children:"".concat(a.stats.currentHeath.base_stat," / ").concat(a.stats.health.base_stat)})]})]})]})]})})})}function ue(e){var t=e.status,a=function(e){switch(e){case"fainted":return"danger";case"burn":return"warning";case"confusion":case"paralysed":return"secondary";default:return"primary"}}(t);return Object(u.jsx)(ie.a,{className:"p-2",pill:!0,bg:a,children:t})}function be(e){var t=e.activePokemon,a=e.setPokeMenu,c=Object(n.useState)("What will ".concat(t.name," do?")),s=Object(m.a)(c,2),r=s[0],i=s[1];return Object(u.jsx)(me,{color:"bg-green",children:Object(u.jsxs)("div",{className:"p-2 battle-option-screen m-0 d-flex",children:[Object(u.jsx)(de,{message:r}),Object(u.jsx)(f.a,{lg:6,className:"m-0 bg-beige row rounded-3",children:Object(u.jsx)(xe,{buttons:["fight","pokemon","bag","flee"],setMessage:i,setPokeMenu:a})})]})})}function me(e){var t=e.color,a=e.children;return Object(u.jsx)("div",{className:"rounded-3 p-1 ".concat(t),children:a})}function de(e){var t=e.message;return Object(u.jsx)(f.a,{lg:6,className:"m-0",children:Object(u.jsx)(me,{color:"bg-green",children:Object(u.jsx)(me,{color:"bg-yellow",children:Object(u.jsx)(me,{color:"bg-green",children:Object(u.jsx)("div",{className:"bg-beige battle-option-text p-2",children:t})})})})})}function pe(e){var t=e.setPokeMenu,a=e.moves;return console.log(a),Object(u.jsx)(me,{color:"bg-green",children:Object(u.jsxs)(o.a,{children:[Object(u.jsx)(O.a,{col:2,children:a.map((function(e,t){return Object(u.jsx)(he,{move:e},t)}))}),Object(u.jsx)("div",{children:Object(u.jsx)("button",{onClick:function(){return t("start")},className:"poke-option-button w-100 btn bg-light",children:"Back"})})]})})}function he(e){var t=e.move;return Object(u.jsx)(f.a,{children:Object(u.jsx)(k.a,{overlay:Object(u.jsx)(y.a,{children:t.description[0].flavor_text}),placement:"top",defaultShow:!1,delay:500,children:Object(u.jsxs)("button",{className:"poke-option-button w-100 btn bg-light",children:[Object(u.jsx)("div",{className:"font-weight-bold",children:t.name}),Object(u.jsx)("div",{className:"text-muted",children:"".concat(t.currentPP,"/").concat(t.pp)})]})})})}function xe(e){var t=e.buttons,a=e.setMessage,n=e.setPokeMenu,c=Object(se.f)();return Object(u.jsx)(u.Fragment,{children:t.map((function(e,t){return Object(u.jsx)(f.a,{lg:6,children:Object(u.jsx)("button",{onClick:function(){return function(e){switch(e){case"fight":n("battle");break;case"pokemon":n("pokemon");break;case"bag":n("bag");break;case"flee":a("you have fled"),setTimeout((function(){c.push("/")}),1e3);break;default:n("start")}}(e)},className:"poke-option-button w-100 btn ".concat(e),children:e})},t)}))})}function Oe(e){var t=e.pokemon,a=e.friend,n=e.className,c=M(t.gender);return Object(u.jsx)("div",{children:Object(u.jsxs)(g.a,{className:n+" px-3 py-1 pokemon-card bg-beige",children:[Object(u.jsx)(g.a.Title,{children:Object(u.jsxs)("span",{className:"text-capitalize h4",children:[t.name," ",Object(u.jsx)("span",{className:"ms-2 text-primary",children:Object(u.jsx)(w.c,{icon:c})})]})}),Object(u.jsxs)("div",{className:"d-flex justify-content-between",children:[Object(u.jsx)("img",{src:"https://firebasestorage.googleapis.com/v0/b/pokemon-battle-f40d2.appspot.com/o/Poke-Ball-32.png?alt=media&token=9513774d-f6e3-474b-988f-490c7f58ff08",alt:""}),Object(u.jsxs)("div",{className:"w-75 my-auto d-flex rounded text-light ps-2 bg-green",children:[Object(u.jsx)("span",{className:"text-yellow",children:"HP"}),Object(u.jsx)("div",{className:"w-100 my-auto mx-2",children:Object(u.jsx)(re.a,{now:t.stats.currentHeath.base_stat,min:0,max:t.stats.health.base_stat,variant:"success"})})]})]}),Object(u.jsxs)(O.a,{lg:2,className:"mt-1",children:[Object(u.jsx)(f.a,{lg:6,children:t.stats.statusEffect.map((function(e,t){return Object(u.jsx)(ue,{status:e},t)}))}),Object(u.jsx)(f.a,{lg:6,children:a&&Object(u.jsx)("div",{className:"text-right",children:"".concat(t.stats.currentHeath.base_stat," / ").concat(t.stats.health.base_stat)})})]})]})})}function fe(e){return Object(u.jsxs)("div",{className:"App",children:[Object(u.jsx)(b,{}),e.children]})}function ge(){return Object(u.jsxs)(se.c,{children:[Object(u.jsx)(se.a,{path:"/battle",children:Object(u.jsx)(fe,{children:Object(u.jsx)(oe,{})})}),Object(u.jsx)(se.a,{path:"/",children:Object(u.jsx)(fe,{children:Object(u.jsx)(ae,{})})})]})}var ve=function(){return Object(u.jsx)(j.a,{children:Object(u.jsx)(Y,{children:Object(u.jsx)(ee,{children:Object(u.jsx)(ge,{})})})})},ke=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,163)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,s=t.getLCP,r=t.getTTFB;a(e),n(e),c(e),s(e),r(e)}))};r.a.render(Object(u.jsx)(c.a.StrictMode,{children:Object(u.jsx)(ve,{})}),document.getElementById("root")),ke()}},[[140,1,2]]]);
//# sourceMappingURL=main.cdf1beb3.chunk.js.map