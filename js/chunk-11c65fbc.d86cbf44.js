(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-11c65fbc"],{2591:function(t,s,e){"use strict";var a=e("2997"),i=e.n(a);i.a},2997:function(t,s,e){},"4c62":function(t,s,e){},"5e1a":function(t,s,e){},"727f":function(t,s,e){},"7f7f":function(t,s,e){var a=e("86cc").f,i=Function.prototype,r=/^\s*function ([^ (]*)/,n="name";n in i||e("9e1e")&&a(i,n,{configurable:!0,get:function(){try{return(""+this).match(r)[1]}catch(t){return""}}})},"9f52":function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return this.results.id?e("section",["person"!=this.$route.params.type?e("div",{staticClass:"parallax",style:"background-image: url("+this.results.backdrop_path+");"},[e("span",[t._v(t._s(this.results.title||this.results.name))])]):e("div",{staticClass:"intro_person"},[e("div",{staticClass:"person_image"},[e("img",{attrs:{src:this.results.profile_path,alt:""}})]),e("div",{staticClass:"biography"},[e("h1",[t._v(t._s(this.results.name))]),e("span",[t._v(t._s(""!=this.results.biography?this.results.biography:"No biography found"))])])]),e("div",{staticClass:"movie_info"},["person"!=this.$route.params.type?e("div",{staticClass:"main_info"},[e("div",{staticClass:"overview"},[e("h1",[t._v("Overview")]),e("div",[t._v(t._s(this.results.overview))])]),this.people?e("div",{staticClass:"cast"},[e("h1",[t._v("Cast")]),e("previews",{attrs:{results:this.people.cast}})],1):t._e()]):e("div",{staticClass:"main_info"},[e("div",{staticClass:"as_cast"},[e("h1",[t._v("Known for being in:")]),this.movies_with_as_cast.total_results?e("previews",{attrs:{results:this.movies_with_as_cast.results}}):e("div",[e("span",[t._v("Nothing found")])])],1),e("div",{staticClass:"as_crew"},[e("h1",[t._v("Known for working on:")]),this.movies_with_as_crew.total_results?e("previews",{attrs:{results:this.movies_with_as_crew.results}}):e("div",[e("span",[t._v("Nothing found")])])],1)]),"person"!=this.$route.params.type?e("div",{staticClass:"more_info"},[e("div",{staticClass:"score"},[e("h2",[t._v("Score:")]),e("span",[t._v(t._s(this.results.vote_average+(Number.isInteger(this.results.vote_average)?".0":"")+" ★ out of "+this.results.vote_count+" votes."))])]),e("div",{staticClass:"genres"},[e("h2",[t._v("Genres:")]),e("span",[t._v(t._s(t.getGenres(this.results.genres)))])]),"movie"==this.$route.params.type?e("div",{staticClass:"runtime"},[e("h2",[t._v("Runtime:")]),e("span",[t._v(t._s(this.results.runtime+" minutes"))])]):t._e(),e("div",{staticClass:"companies"},[e("h2",[t._v("Producers:")]),t._l(this.results.production_companies,function(s,a){return e("span",{key:s.name},[t._v(t._s(0==a?s.name:", "+s.name))])})],2),"movie"==this.$route.params.type?e("div",{staticClass:"date"},[e("h2",[t._v("Release date:")]),e("span",[t._v(t._s(this.results.release_date))])]):t._e(),"tv"==this.$route.params.type?e("div",{staticClass:"date"},[e("h2",[t._v("First episode aired:")]),e("span",[t._v(t._s(this.results.first_air_date))])]):t._e(),"tv"==this.$route.params.type?e("div",{staticClass:"seasons"},[e("h2",[t._v("Seasons:")]),t._l(this.results.seasons,function(s){return e("p",{key:s.name},[t._v(t._s(s.name+" [ "+s.episode_count+"EP ]"))])})],2):t._e()]):e("div",{staticClass:"more_info"},[e("div",{staticClass:"department"},[e("h2",[t._v("Department:")]),e("span",[t._v(t._s(this.results.known_for_department))])]),e("div",{staticClass:"birthplace"},[e("h2",[t._v("Place of birth:")]),e("span",[t._v(t._s(this.results.place_of_birth||"Unknown"))])]),e("div",{staticClass:"date"},[e("h2",[t._v("Lifetime:")]),e("span",[t._v(t._s(this.results.birthday+" - "+(this.results.deathday||"Today")))])])])]),"person"!=this.$route.params.type?e("afterInfo",{attrs:{reviews_results:this.reviews,similar_results:this.similar}}):t._e()],1):t._e()},i=[],r=(e("7f7f"),e("ac6a"),e("bc3a")),n=e.n(r),o=e("f8af"),c=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"after_info"},[e("reviews",{attrs:{data:this.reviews_results}}),e("similar",{attrs:{data:this.similar_results}})],1)},u=[],l=function(){var t=this,s=t.$createElement,e=t._self._c||s;return this.data.length?e("div",{staticClass:"movie_reviews"},[e("h1",[t._v("Reviews:")]),t._l(this.data,function(s){return e("div",{key:s.id,staticClass:"review"},[e("div",{staticClass:"user_info"},[e("span",[t._v(t._s(s.author))]),e("a",{staticClass:"user_id",attrs:{href:s.url,target:"_blank"}},[e("span",[t._v(t._s(s.id))])])]),e("div",{staticClass:"review_content"},[e("span",[t._v(t._s(s.content))])])])})],2):e("div",[e("h1",[t._v("No Reviews")])])},h=[],v={name:"reviews",props:{data:{default:function(){return[]}}}},p=v,_=(e("eba1"),e("2877")),d=Object(_["a"])(p,l,h,!1,null,"7328b70a",null),f=d.exports,m=function(){var t=this,s=t.$createElement,e=t._self._c||s;return this.data.length?e("div",{staticClass:"similar_movies"},[e("h1",[t._v("You might also like:")]),e("previews",{attrs:{results:this.data}})],1):e("div",[e("h1",[t._v("Nothing Similar Found")])])},w=[],g={name:"similar",components:{previews:o["a"]},props:{data:{default:function(){return[]}}}},y=g,b=Object(_["a"])(y,m,w,!1,null,"c3e3ffe4",null),C=b.exports,$={name:"afterInfo",components:{reviews:f,similar:C},props:{reviews_results:{default:function(){return[]}},similar_results:{default:function(){return[]}}}},k=$,E=(e("2591"),Object(_["a"])(k,c,u,!1,null,"bd7b7880",null)),N=E.exports,P={name:"detailsData",components:{previews:o["a"],afterInfo:N},data:function(){return{results:{backdrop_path:"",profile_path:""},people:null,similar:[],reviews:[],movies_with_as_cast:{total_results:0},movies_with_as_crew:{total_results:0}}},methods:{getGenres:function(t){var s="";return t.forEach(function(e,a){s+=e.name,a<t.length-1&&(s+=", ")}),s}},mounted:function(){var t=this;"movie"==this.$route.params.type||"tv"==this.$route.params.type?(n.a.get("https://api.themoviedb.org/3/".concat(this.$route.params.type,"/").concat(this.$route.params.id,"?").concat(this.$store.state.api_key)).then(function(s){s.data.backdrop_path="https://image.tmdb.org/t/p/original/"+s.data.backdrop_path,t.results=s.data}).catch(function(){}),n.a.get("https://api.themoviedb.org/3/".concat(this.$route.params.type,"/").concat(this.$route.params.id,"/credits?").concat(this.$store.state.api_key)).then(function(s){t.people=s.data}).catch(function(){}),n.a.get("https://api.themoviedb.org/3/".concat(this.$route.params.type,"/").concat(this.$route.params.id,"/reviews?").concat(this.$store.state.api_key)).then(function(s){t.reviews=s.data.results}).catch(function(){}),n.a.get("https://api.themoviedb.org/3/".concat(this.$route.params.type,"/").concat(this.$route.params.id,"/similar?").concat(this.$store.state.api_key)).then(function(s){t.similar=s.data.results}).catch(function(){})):(n.a.get("https://api.themoviedb.org/3/person/".concat(this.$route.params.id,"?").concat(this.$store.state.api_key)).then(function(s){s.data.profile_path="https://image.tmdb.org/t/p/original/"+s.data.profile_path,t.results=s.data}).catch(function(){}),n.a.get("https://api.themoviedb.org/3/discover/movie?with_cast=".concat(this.$route.params.id,"&").concat(this.$store.state.api_key)).then(function(s){t.movies_with_as_cast=s.data}).catch(function(){}),n.a.get("https://api.themoviedb.org/3/discover/movie?with_crew=".concat(this.$route.params.id,"&").concat(this.$store.state.api_key)).then(function(s){t.movies_with_as_crew=s.data}).catch(function(){}))}},S=P,x=(e("f785"),Object(_["a"])(S,a,i,!1,null,"675a2703",null));s["default"]=x.exports},b79e:function(t,s,e){"use strict";var a=e("727f"),i=e.n(a);i.a},eba1:function(t,s,e){"use strict";var a=e("5e1a"),i=e.n(a);i.a},f785:function(t,s,e){"use strict";var a=e("4c62"),i=e.n(a);i.a},f8af:function(t,s,e){"use strict";var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return this.results.length?e("div",{staticClass:"container"},[e("div",{staticClass:"arr_left",on:{click:function(s){return t.scrollPreviews(-1)}}},[e("i",{staticClass:"fas fa-chevron-left"})]),e("div",{ref:"mov",staticClass:"movies_container"},t._l(this.filteredResults,function(t){return e("preview",{key:t.id,attrs:{data:t}})}),1),e("div",{staticClass:"arr_left",on:{click:function(s){return t.scrollPreviews(1)}}},[e("i",{staticClass:"fas fa-chevron-right"})])]):e("div",[e("p",[t._v("Nothing found")])])},i=[],r=e("e814"),n=e.n(r),o=e("1f65"),c={name:"previews",props:{results:{type:Array,default:function(){return[]}}},computed:{filteredResults:function(){return this.results.filter(function(t){return null!=(t.poster_path||t.profile_path)})}},components:{preview:o["a"]},methods:{scrollPreviews:function(t){var s=document.querySelector(".movies_container").offsetWidth,e=document.querySelector(".movie_preview").offsetWidth;e+=2*n()(window.getComputedStyle(document.querySelector(".movie_preview")).getPropertyValue("margin-left"));var a=Math.floor(s/e)*e;this.$refs.mov.scrollBy(a*t,0)}}},u=c,l=(e("b79e"),e("2877")),h=Object(l["a"])(u,a,i,!1,null,"4c16e222",null);s["a"]=h.exports}}]);
//# sourceMappingURL=chunk-11c65fbc.d86cbf44.js.map