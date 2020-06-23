import didYouMeanUI from "../modules/didYouMean/spellCheckView";
import {
    selectedFacetUI,
    facetUIElem,
    facetItemUiElem
} from "../modules/facets/ui";
import paginationUI from "../modules/pagination/fixedPaginationView";
import {
    renderRangeFacets
} from "../modules/facets/renderRangeFacets";
import BucketedSearchUi from "../modules/facets/renderBucketedSearch";
import breadCrumbsUI from "../modules/breadcrumbs/breadcrumbsView";
import {
    sortOptions,
    sortTemplate
} from "../modules/sort";
import renderProductViewType from '../modules/productViewType';
import bannerTemplateUI from '../modules/banners';
import pageSizeUi from '../modules/pageSize/pageSizeView';
const options = {
    productId:"uniqueId",
    searchBoxSelector:null,
    siteKey:"demo-spanish-unbxd809051588861207",
    apiKey:"f19768e22b49909798bc2411fa3dd963",
    sdkHostName:"https://search.unbxd.io/",
    searchResultsTemplate : function(product){
        const {
            title,
            sku
        } = product;
        return `<div id="${sku}" class="product-item" style="border:solid 1px green">
         ${title}
        </div>`;
    },
    searchResultsSelector: null,
    productItemClass:".product-item", // to find out product
    facetsSelector: null,
    selectedFacetTemplate : selectedFacetUI,
    facetTemplate: facetUIElem,
    facetItemTemplate: facetItemUiElem,
    facetClass:"select-facets-block",
    facetAction:"change",
    selectedFacetBlock:null,
    selectedFacetClass:"selected-facet",
    productType:"SEARCH",
    searchQueryParam:"q",
    defaultFilters : null, //or object with keys
    spellCheckSelector: null,
    spellCheckTemplate: didYouMeanUI,
    noResultsUi: (query) => {
        return `<div> No Results found ${query} </div>`
    },
    noResultContainer: null,
    callBackFn: (state,type) =>{
        console.log(state,type,"state,type")
    },
    pageSize: 10,
    startPageNo:0,
    sortContainerSelector:null,
    sortOptions : sortOptions,
    sortTemplate:sortTemplate,
    sortAction:"change",
    sortElement:"select",
    productClick: function(product) {
        console.log(product,"product,index");
    },
    fields: ['title','uniqueId', 'sku', 'rating'],
    spellCheck: false,
    facetMultiSelect: false,
    facetMultiSelectionMode: false,
    loaderTemplate: () =>{
        return `<div>Loading search results....</div>`
    },
    loaderContainer:null,
    showVariants:false,
    variantMapping:{},
    rangeFacetContainer:null,
    rangeFacetUI:renderRangeFacets,
    rangeWidgetConfig:{
        "start": 0,
        "end": 100,
        "minLabel":"Min",
        "maxLabel":"Max"
    },
    extraParams:{
        "version":"V2",
        "facet.multilevel":"categoryPath",
        "f.categoryPath.displayName":"category",
        "f.categoryPath.max.depth":"4",
        "f.categoryPath.facet.limit":"100"
    },
    facetMultilevel:true,
    bucketedSearchUi:BucketedSearchUi,
    multiLevelFacetContainer:null,
    bucketFacetElem:"",
    bucketFacetEvnt:"click",
    multiLevelFacetSelector:"bucketFacetElem",
    facetDepth:4,
    breadcrumbContainer:null,
    breadcrump:true,
    breadcrumbSelectorClass:"bread-crumb",
    breadCrumpTemplate:breadCrumbsUI,
    showSwatches:true,
    swatchMap:{},
    swatchTemplate:(swatchInfo)=>{
        return `<div>swatchtemplate</div>`
    },
    paginationType:"FIXED_PAGINATION",
    paginationSelector:null,
    paginationTemplate: paginationUI,
    paginationEvt:"click",
    infiniteScrollSelector:window,
    /*
    paginationType:'INFINITE_SCROLL',
    infiniteScrollSelector:document.getElementById('es6Root'),
    */
    productViewTypes:'GRID',
    gridCount:3,
    productViewTypeTemplate:renderProductViewType,
    productViewTypeSelector:null,
    pageSizeOptions:[8,12,16,20,24],
    pageSizeDisplayAction:"change",
    pageSizeTemplate:function(page){
        return ``
    },
    pageSizeContainerSelector:null,
    bannerSelector:null,
    bannerTemplate:bannerTemplateUI,
    pageSizeContainerSelector:document.getElementById("changeNoOfProducts"),
    pageSizeDisplayType:"LIST",
    pageSizeContainerTemp:pageSizeUi,
    pageSizeOptions:[6,8,12,16,20],
    unbxdAnalytics:false
   // searchQueryParam:null
};
export default options;