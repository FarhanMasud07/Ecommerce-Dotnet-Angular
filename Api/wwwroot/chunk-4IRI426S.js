import{$a as N,Aa as _,Ba as x,Ga as d,H as k,Ib as Y,Jb as L,K as I,La as G,Lb as Z,Mb as ee,N as w,Na as Q,Oa as M,P as D,Pb as te,Qa as C,Ra as y,Va as q,Xa as X,_a as R,a as c,ab as W,b as p,ea as u,fa as T,ga as E,k as O,ob as H,pb as V,qa as b,qb as z,r as j,ra as $,sa as l,sb as J,tb as K,v as A,wa as h,xa as g,xb as U,za as f}from"./chunk-JB4EPEJV.js";var ae=n=>({"xng-breadcrumb-link-disabled":n}),ne=(n,i,s,e,t,r)=>({$implicit:n,info:i,last:s,first:e,index:t,count:r});function ie(n,i){n&1&&x(0)}function se(n,i){if(n&1&&(f(0),C(1),_()),n&2){let s=d(2).$implicit;u(),y(s.label)}}function oe(n,i){if(n&1&&(h(0,"a",7),b(1,ie,1,0,"ng-container",8)(2,se,2,1,"ng-container",9),g()),n&2){let s=d(),e=s.$implicit,t=s.last,r=s.first,a=s.index,o=s.count,m=d();l("ngClass",X(10,ae,e.disable))("routerLink",e.routeInterceptor?e.routeInterceptor(e.routeLink,e):e.routeLink)("queryParams",m.preserveQueryParams?e.queryParams:void 0)("fragment",m.preserveFragment?e.fragment:void 0)("target",m.anchorTarget?m.anchorTarget:"_self"),$("aria-disabled",e.disable)("tabIndex",e.disable?-1:0),u(),l("ngTemplateOutlet",m.itemTemplate)("ngTemplateOutletContext",R(12,ne,e.label,e.info,t,r,a,o)),u(),l("ngIf",!m.itemTemplate)}}function ce(n,i){n&1&&x(0)}function ue(n,i){if(n&1&&(f(0),C(1),_()),n&2){let s=d(2).$implicit;u(),y(s.label)}}function me(n,i){if(n&1&&(h(0,"label",10),b(1,ce,1,0,"ng-container",8)(2,ue,2,1,"ng-container",9),g()),n&2){let s=d(),e=s.$implicit,t=s.last,r=s.first,a=s.index,o=s.count,m=d();u(),l("ngTemplateOutlet",m.itemTemplate)("ngTemplateOutletContext",R(3,ne,e.label,e.info,t,r,a,o)),u(),l("ngIf",!m.itemTemplate)}}function le(n,i){n&1&&x(0)}function de(n,i){if(n&1&&(f(0),C(1),_()),n&2){let s=d(3);u(),y(s.separator)}}function pe(n,i){if(n&1&&(h(0,"li",11),b(1,le,1,0,"ng-container",12)(2,de,2,1,"ng-container",9),g()),n&2){let s=d(2);u(),l("ngTemplateOutlet",s.separatorTemplate),u(),l("ngIf",!s.separatorTemplate)}}function be(n,i){if(n&1&&(f(0),h(1,"li",3),b(2,oe,3,19,"a",4)(3,me,3,10,"label",5),g(),b(4,pe,3,2,"li",6),_()),n&2){let s=i.last;u(2),l("ngIf",!s),u(),l("ngIf",s),u(),l("ngIf",!s)}}var he=(()=>{let i=class i{};i.\u0275fac=function(t){return new(t||i)},i.\u0275dir=D({type:i,selectors:[["","xngBreadcrumbItem",""]],standalone:!0});let n=i;return n})(),B={PREFIX:":",REGEX_IDENTIFIER:"/:[^/]+",REGEX_REPLACER:"/[^/]+"},ge="@",re=n=>!!n&&Object.keys(n).length>0,fe=(()=>{let i=class i{constructor(e,t){this.activatedRoute=e,this.router=t,this.baseHref="/",this.dynamicBreadcrumbStore=[],this.currentBreadcrumbs=[],this.previousBreadcrumbs=[],this.breadcrumbs=new O([]),this.breadcrumbs$=this.breadcrumbs.asObservable(),this.detectRouteChanges()}detectRouteChanges(){this.setupBreadcrumbs(this.activatedRoute.snapshot),this.router.events.pipe(A(e=>e instanceof Y)).subscribe(e=>{e.shouldActivate&&this.setupBreadcrumbs(e.state.root)})}setupBreadcrumbs(e){this.previousBreadcrumbs=this.currentBreadcrumbs;let t=this.getRootBreadcrumb();this.currentBreadcrumbs=t?[t]:[],this.prepareBreadcrumbList(e,this.baseHref)}getRootBreadcrumb(){let e=this.router.config.find(a=>a.path===""),t=this.extractObject(e?.data?.breadcrumb),r=this.getFromStore(t.alias,"/");if(re(t)||re(r))return c(p(c(c({},r),t),{routeLink:this.baseHref}),this.getQueryParamsFromPreviousList("/"))}prepareBreadcrumbItem(e,t){let{path:r,breadcrumb:a}=this.parseRouteData(e.routeConfig),o=this.resolvePathSegment(r,e),m=`${t}${o}`,P=this.getFromStore(a.alias,m),F=this.extractLabel(P?.label||a?.label,o),v=!1,S="";return F||(v=!0,S=o),c(p(c(c({},P),a),{label:v?S:F,routeLink:m,isAutoGeneratedLabel:v}),this.getQueryParamsFromPreviousList(m))}prepareBreadcrumbList(e,t){if(e.routeConfig?.path){let o=this.prepareBreadcrumbItem(e,t);if(this.currentBreadcrumbs.push(o),e.firstChild)return this.prepareBreadcrumbList(e.firstChild,o.routeLink+"/")}else if(e.firstChild)return this.prepareBreadcrumbList(e.firstChild,t);let r=this.currentBreadcrumbs[this.currentBreadcrumbs.length-1];this.setQueryParamsForActiveBreadcrumb(r,e);let a=this.currentBreadcrumbs.filter(o=>!o.skip);this.breadcrumbs.next(a)}getFromStore(e,t){return this.dynamicBreadcrumbStore.find(r=>e&&e===r.alias||t&&t===r.routeLink||this.matchRegex(t,r.routeRegex))}matchRegex(e,t){return e.match(new RegExp(t))?.[0]===e}resolvePathSegment(e,t){return e.includes(B.PREFIX)&&Object.entries(t.params).forEach(([r,a])=>{e=e.replace(`:${r}`,`${a}`)}),e}getQueryParamsFromPreviousList(e){let{queryParams:t,fragment:r}=this.previousBreadcrumbs.find(a=>a.routeLink===e)||{};return{queryParams:t,fragment:r}}setQueryParamsForActiveBreadcrumb(e,t){if(e){let{queryParams:r,fragment:a}=t;e.queryParams=r?c({},r):void 0,e.fragment=a}}parseRouteData(e){let{path:t,data:r}=e,a=this.mergeWithBaseChildData(e,r?.breadcrumb);return{path:t,breadcrumb:a}}mergeWithBaseChildData(e,t){if(!e)return this.extractObject(t);let r;e.loadChildren?r=e._loadedRoutes.find(o=>o.path===""):e.children&&(r=e.children.find(o=>o.path===""));let a=r?.data?.breadcrumb;return a?this.mergeWithBaseChildData(r,c(c({},this.extractObject(t)),this.extractObject(a))):this.extractObject(t)}set(e,t){let r=this.extractObject(t),a;e.startsWith(ge)?a=["alias",p(c({},r),{alias:e.slice(1)})]:e.includes(B.PREFIX)?a=["routeRegex",p(c({},r),{routeRegex:this.buildRegex(e)})]:a=["routeLink",p(c({},r),{routeLink:this.ensureLeadingSlash(e)})],a[1].isAutoGeneratedLabel=!1,this.updateStore(...a),this.updateCurrentBreadcrumbs(...a)}updateStore(e,t){let r=this.dynamicBreadcrumbStore.findIndex(a=>t[e]===a[e]);r>-1?this.dynamicBreadcrumbStore[r]=c(c({},this.dynamicBreadcrumbStore[r]),t):this.dynamicBreadcrumbStore.push(c({},t))}updateCurrentBreadcrumbs(e,t){let r=this.currentBreadcrumbs.findIndex(a=>e==="routeRegex"?this.matchRegex(a.routeLink,t[e]):t[e]===a[e]);if(r>-1){this.currentBreadcrumbs[r]=c(c({},this.currentBreadcrumbs[r]),t);let a=this.currentBreadcrumbs.filter(o=>!o.skip);this.breadcrumbs.next([...a])}}buildRegex(e){return this.ensureLeadingSlash(e).replace(new RegExp(B.REGEX_IDENTIFIER,"g"),B.REGEX_REPLACER)}ensureLeadingSlash(e){return e.startsWith("/")?e:`/${e}`}extractLabel(e,t){let r=typeof e=="object"?e.label:e;return typeof r=="function"?r(t):r}extractObject(e){return e&&(typeof e=="string"||typeof e=="function")?{label:e}:e||{}}};i.\u0275fac=function(t){return new(t||i)(I(L),I(Z))},i.\u0275prov=k({token:i,factory:i.\u0275fac,providedIn:"root"});let n=i;return n})(),Oe=(()=>{let i=class i{set separator(e){e instanceof E?(this.separatorTemplate=e,this._separator=void 0):(this.separatorTemplate=void 0,this._separator=e||"/")}get separator(){return this._separator}constructor(e,t){this.breadcrumbService=e,this._separator="/",this.autoGenerate=!0,this.preserveQueryParams=!0,this.preserveFragment=!0,this.class="",this.setupMessage="not set up yet",this.someParameterValue=null,t.params.subscribe(r=>{this.setupComponent(r.someParam)})}setupComponent(e){this.setupMessage="set up at "+new Date,this.someParameterValue=e}ngOnInit(){this.breadcrumbs$=this.breadcrumbService.breadcrumbs$.pipe(j(e=>e.filter(t=>this.autoGenerate?!0:!t.isAutoGeneratedLabel).map(t=>{let{routeInterceptor:r,routeLink:a}=t;return p(c({},t),{routeLink:r?.(a,t)||a})})))}};i.\u0275fac=function(t){return new(t||i)(T(fe),T(L))},i.\u0275cmp=w({type:i,selectors:[["xng-breadcrumb"]],contentQueries:function(t,r,a){if(t&1&&G(a,he,5,E),t&2){let o;Q(o=M())&&(r.itemTemplate=o.first)}},inputs:{autoGenerate:"autoGenerate",preserveQueryParams:"preserveQueryParams",preserveFragment:"preserveFragment",class:"class",anchorTarget:"anchorTarget",separator:"separator"},standalone:!0,features:[q],decls:4,vars:4,consts:[["aria-label","breadcrumb",1,"xng-breadcrumb-root",3,"ngClass"],[1,"xng-breadcrumb-list"],[4,"ngFor","ngForOf"],[1,"xng-breadcrumb-item"],["class","xng-breadcrumb-link","rel","noopener noreferrer",3,"ngClass","routerLink","queryParams","fragment","target",4,"ngIf"],["class","xng-breadcrumb-trail",4,"ngIf"],["class","xng-breadcrumb-separator","aria-hidden","true",4,"ngIf"],["rel","noopener noreferrer",1,"xng-breadcrumb-link",3,"ngClass","routerLink","queryParams","fragment","target"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],[4,"ngIf"],[1,"xng-breadcrumb-trail"],["aria-hidden","true",1,"xng-breadcrumb-separator"],[4,"ngTemplateOutlet"]],template:function(t,r){t&1&&(h(0,"nav",0)(1,"ol",1),b(2,be,5,3,"ng-container",2),N(3,"async"),g()()),t&2&&(l("ngClass",r.class),u(2),l("ngForOf",W(3,2,r.breadcrumbs$)))},dependencies:[U,H,V,z,J,K,te,ee],styles:[`.xng-breadcrumb-root{margin:0}.xng-breadcrumb-list{display:flex;align-items:center;flex-wrap:wrap;margin:0;padding:0}.xng-breadcrumb-item{list-style:none}.xng-breadcrumb-trail{display:flex;align-items:center}.xng-breadcrumb-link{display:flex;align-items:center;white-space:nowrap;color:inherit;text-decoration:none;transition:text-decoration .3s;cursor:pointer}.xng-breadcrumb-link:hover{text-decoration:underline}.xng-breadcrumb-link-disabled{pointer-events:none;cursor:disabled}.xng-breadcrumb-separator{display:flex;-webkit-user-select:none;user-select:none;margin-left:8px;margin-right:8px}
`],encapsulation:2});let n=i;return n})();export{fe as a,Oe as b};
