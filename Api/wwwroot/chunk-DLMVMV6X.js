import{Bb as i,H as e,K as o,Qb as s}from"./chunk-JB4EPEJV.js";var a=class t{constructor(r){this.http=r}baseUrl=s.apiUrl;orderComplete=!1;createOrder(r){return this.http.post(this.baseUrl+"orders",r)}getOrdersForUser(){return this.http.get(this.baseUrl+"orders")}getOrderDetailed(r){return this.http.get(this.baseUrl+"orders/"+r)}static \u0275fac=function(n){return new(n||t)(o(i))};static \u0275prov=e({token:t,factory:t.\u0275fac,providedIn:"root"})};export{a};
