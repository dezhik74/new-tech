import{r as I,w as p,o as l,c as a,v as c,F as m,a as u,b as g,d as y,t as v,e as D,f as w,p as S,g as V,h as O,i as j,j as k}from"./vendor.92fb3100.js";const N=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))d(n);new MutationObserver(n=>{for(const t of n)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&d(s)}).observe(document,{childList:!0,subtree:!0});function r(n){const t={};return n.integrity&&(t.integrity=n.integrity),n.referrerpolicy&&(t.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?t.credentials="include":n.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function d(n){if(n.ep)return;n.ep=!0;const t=r(n);fetch(n.href,t)}};N();const J="https://api-dev.shop-delivery.ru/int_api/ozon/v3/category/attribute",T="https://api-dev.shop-delivery.ru/int_api/ozon/v2/category/attribute/values";async function U(o){let e={attribute_type:"ALL",category_id:[o],language:"DEFAULT"};try{let r=await fetch(J,{method:"POST",headers:{"Content-Type":"application/json;charset=utf-8"},body:JSON.stringify(e)}),d=await r.json();if(r.status>=400&&r.status<=599)throw new Error(`Http exeption code: ${r.status}`);return d.result[0].attributes}catch(r){return console.log("error =>",r.name),{}}}async function h(o,e,r=0,d=20,n=""){let t={attribute_id:e,category_id:o,language:"DEFAULT",last_value_id:r,limit:d,query:n};try{let s=await fetch(T,{method:"POST",headers:{"Content-Type":"application/json;charset=utf-8"},body:JSON.stringify(t)});if(s.status>=400&&s.status<=599)throw new Error(`Http exeption code: ${s.status}`);return await s.json()}catch(s){return console.log("error =>",s.message),null}}var _=(o,e)=>{const r=o.__vccOpts||o;for(const[d,n]of e)r[d]=n;return r};const x={name:"SmartInput",props:{category:{type:String,default:""},field:{type:Object,default:()=>{}}},emits:["update"],data(){return{innerValue:"",dropDownOpen:!1,options:[]}},computed:{isCollection(){return this.field.is_collection&&this.field.options},isDropDownOpen(){return this.dropDownOpen},filteredOptions(){return this.field.options.filter(o=>o.startsWith(this.innerValue)).sort()},fieldValueTrigger(){return this.field.value}},watch:{fieldValueTrigger(){this.innerValue=this.fieldValueTrigger}},methods:{openCloseDropDown(){this.dropDownOpen=!this.dropDownOpen},openDropDown(){this.dropDownOpen=!0},closeDropDown(){this.dropDownOpen=!1},dropDownSelected(o){this.innerValue=o.target.innerText,this.$emit("update",[this.innerValue,this.field.id]),this.closeDropDown()},async onInput(){this.filteredOptions.length===0&&(this.innerValue=this.innerValue.slice(0,-1)),this.$emit("update",[this.innerValue,this.field.id])},onBlur(){this.options.includes(this.innerValue)||(this.innerValue=this.filteredOptions[0]),this.$emit("update",[this.innerValue,this.field.id]),this.closeDropDown()}}},L={class:"wrapper"},A=["required"],F=["required"],E={key:0,class:"drop_down"};function q(o,e,r,d,n,t){const s=I("click-outside");return p((l(),a("div",L,[t.isCollection?(l(),a(m,{key:1},[p(u("input",{"onUpdate:modelValue":e[2]||(e[2]=i=>n.innerValue=i),required:r.field.is_required,type:"text",onInput:e[3]||(e[3]=(...i)=>t.onInput&&t.onInput(...i)),onFocus:e[4]||(e[4]=(...i)=>t.openDropDown&&t.openDropDown(...i)),onBlur:e[5]||(e[5]=(...i)=>t.onBlur&&t.onBlur(...i))},null,40,F),[[c,n.innerValue]]),u("div",{class:"picker_icon",onClick:e[6]||(e[6]=(...i)=>t.openCloseDropDown&&t.openCloseDropDown(...i))}),t.isDropDownOpen?(l(),a("div",E,[(l(!0),a(m,null,g(t.filteredOptions,(i,f)=>(l(),a("div",{key:`${r.field.id}-${f}`,class:"drop_down_item",onMousedown:e[7]||(e[7]=y(()=>{},["prevent"])),onClick:e[8]||(e[8]=y((...C)=>t.dropDownSelected&&t.dropDownSelected(...C),["self"]))},v(i),33))),128))])):D("",!0)],64)):p((l(),a("input",{key:0,"onUpdate:modelValue":e[0]||(e[0]=i=>n.innerValue=i),required:r.field.is_required,type:"text",onInput:e[1]||(e[1]=i=>o.$emit("update",[n.innerValue,r.field.id]))},null,40,A)),[[c,n.innerValue]])])),[[s,t.closeDropDown]])}var B=_(x,[["render",q],["__scopeId","data-v-1af8de6e"]]);const M={name:"TheForm",components:{smartInput:B},props:{model:{type:Array,default:()=>[]},category:{type:String,default:""}},emits:["update","json"],methods:{onUpdate(o){this.$emit("update",o)},onSubmit(){this.$emit("json")}}},P=o=>(S("data-v-505d42cf"),o=o(),V(),o),R=["title"],z=P(()=>u("input",{class:"submit",type:"submit",value:"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C JSON"},null,-1));function H(o,e,r,d,n,t){const s=w("smart-input");return l(),a("form",{class:"form_wrapper",onSubmit:e[0]||(e[0]=y((...i)=>t.onSubmit&&t.onSubmit(...i),["prevent"]))},[(l(!0),a(m,null,g(r.model,(i,f)=>(l(),a("div",{key:`frm-${f}`,class:"form_item"},[u("span",{title:i.description},v(i.name),9,R),O(s,{type:"text",class:"item_input",field:i,category:r.category,onUpdate:t.onUpdate},null,8,["field","category","onUpdate"])]))),128)),z],32)}var G=_(M,[["render",H],["__scopeId","data-v-505d42cf"]]);const K={name:"App",components:{TheForm:G},data(){return{categoryID:"17028968",model:{},jsonData:""}},computed:{isCategoryIDCorrect(){return this.categoryID&&/^[0-9]+$/.test(this.categoryID)},isModel(){return Object.keys(this.model).length!==0},haveJson(){return this.jsonData.length>0}},async mounted(){},methods:{async loadCategory(){if(this.jsonData="",this.model=await U(this.categoryID),this.isModel){this.model.forEach(o=>o.value="");for(let o=0;o<this.model.length;o++)if(this.model[o].is_collection){let e=await h(this.categoryID,this.model[o].id);e?this.model[o].options=e.map(r=>r.value):this.model[o].options=["\u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0438\u0437 API"]}}},loadCategoryFromJSON(){try{let o=JSON.parse(this.jsonData);this.model={},this.model=o}catch{alert("\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 JSON")}},async testAPI(){let o=await h(17028968,10096,0,20,"");console.log(o.map(r=>r.value).sort());let e=await h(17028968,10096,0,20,"\u0431\u0435\u043B\u044B\u0439");console.log(e.map(r=>r.value).sort())},onUpdate([o,e]){this.model.forEach(r=>{r.id===e&&(r.value=o)})},onJson(){this.jsonData=JSON.stringify(this.model,null,2)}}},W=u("h1",null,"\u0424\u043E\u0440\u043C\u0430 \u0432\u0432\u043E\u0434\u0430 \u0430\u0442\u0440\u0438\u0431\u0443\u0442\u043E\u0432",-1),Y={class:"id_input_wrapper"},Q=["disabled"],X={key:0},Z={key:1,class:"no_data"},$={key:2};function ee(o,e,r,d,n,t){const s=w("the-form");return l(),a(m,null,[W,u("div",Y,[p(u("input",{"onUpdate:modelValue":e[0]||(e[0]=i=>n.categoryID=i),type:"text"},null,512),[[c,n.categoryID]]),u("button",{disabled:!t.isCategoryIDCorrect,onClick:e[1]||(e[1]=(...i)=>t.loadCategory&&t.loadCategory(...i))}," \u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C ",8,Q)]),t.isModel?(l(),a("section",X,[O(s,{model:n.model,category:n.categoryID,onUpdate:t.onUpdate,onJson:t.onJson},null,8,["model","category","onUpdate","onJson"])])):(l(),a("section",Z,"\u0414\u0430\u043D\u043D\u044B\u0435 \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u044B")),t.haveJson?(l(),a("div",$,[p(u("textarea",{"onUpdate:modelValue":e[2]||(e[2]=i=>n.jsonData=i),class:"json_area"},null,512),[[c,n.jsonData]]),u("button",{class:"load_json_button",onClick:e[3]||(e[3]=(...i)=>t.loadCategoryFromJSON&&t.loadCategoryFromJSON(...i))}," \u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0438\u0437 JSON ")])):D("",!0)],64)}var te=_(K,[["render",ee]]);const b=j(te);b.use(k);b.mount("#app");