import UnbxdSearch from "../src/index";
import {
    sortOptions,
    testUrl
} from "./config/index.js";



const chai = require('chai');
const assert = require('assert');
const expect = chai.expect;
const fetch = require("node-fetch");
const Sequelize = require('sequelize');

const fs = require("fs");
const { JSDOM } = require("jsdom");



import testFacets from "./modules/facets/index.spec.js";
import testProducts from "./modules/products/index.spec.js";
import testSort from "./modules/sort/index.spec.js";
import testPagination from "./modules/pagination/index.spec.js";
import testPageSize from "./modules/pagesize/index.spec.js"
  
const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Mocha Tests</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="../node_modules/mocha/mocha.css" />
  </head>
  <body>
  <div class="UNX-header">
        <div class="UNX-header-inner">
            <div class="UNX-logo">
                UNBXD
            </div>
            <div class="UNX-input-wrapper">
                <input data-testid="unbxdInput" id="unbxdInput" class="UNX-input" />
                <button data-testid="searchBtn" id="searchBtn" class="fa fa-search UNX-search-btn"></button>
            </div>
        </div>
        <nav id="categoryLinks" class="UNX-naviagtion-wrap">
            <button data-id="Girls Fashion>Tops>T-Shirts" class="nav-links">T-Shirts</button>
        </nav>
    </div>

    <div class="UNX-results-container">
        <div class="UNX-head-wrapper">
            <div class="UNX-selected-actions">
                <div class="UNX-bread-wrapper" id="breadcrumpContainer"></div>
                <div class="UNX-selected-facet-wrapper" id="selectedFacetWrapper"></div>
            </div>
            <div class="UNX-product-type-block" id="productViewTypeContainer"></div>
        </div>
        <div class="UNX-product-results">
            <div class="UNX-facet-wrapper">
                <h2 class="UNX-filter-header">Filter By</h2>
                <div class="UNX-fxd-facet">
                    <div class="UNX-selected-facet-wrapper UNX-selected-f-m" id="selectedMFacetWrapper"></div>
                    <div class="UNX-text-facet-block" id="facetsWrapper"></div>
                    <div class="UNX-m-facet-row">
                        <button data-action="applyFacets" class="UNX-primary-btn UNX-facet-trigger">Apply</button>
                        <button data-action="clearFacets" class="UNX-default-btn UNX-facet-trigger">Clear</button>
                    </div>

                </div>
                <div class="UNX-m-facet-row">
                    <button class="UNX-m-facet-btn UNX-facet-trigger fa fa-filter"></button>
                </div>
            </div>
            <div class="UNX-product-list">
                <div class="UNX-result-header">
                    <div id="didYouMeanWrapper"></div>
                    <div class="UNX-result-right">
                        <div class="UNX-change-products" id="changeNoOfProducts"></div>
                        <div class="UNX-sort-wrapper" id="sortWrapper"></div>
                        <div class="UNX-change-pagination-wrap" id="paginationContainer"></div>
                        <div id="" class="UNX-change-pagination-wrap unxPagination"></div>
                    </div>
                </div>
                <div id="bannerContainer"></div>
                <div class="UNX-product-wrapper" id="searchResultsWrapper"></div>
                <div id="" class="UNX-change-pagination-wrap UNX-m-page unxPagination"></div>
            </div>
        </div>
        <div class="UNX-loader-container" id="loaderEl"></div>
        <div id="noResultWrapper"></div>
        <div id="clickScrollContainer">
        </div>
    </div>
  </body>
</html>`;
const page = new JSDOM(html);
global.testPage = page;
global.window = global.testPage.window;
global.document = global.testPage.window.document;
global.asyncStart = false;
global.pageSizeArray = [
    8,
    12,
    16,
    20,
    24
];
global.selectedPage = 12;




const searchTerm = "*";
global.latestInstance = {};
global.facetElementSelector = "UNX-facet-item-d";
global.productElementSelector = "UNX-product-col";

global.facetElementSelector = "UNX-facet-item-row";
global.testUnbxd = new UnbxdSearch({
    siteKey: "demo-german-unbxd809051586180937",
    apiKey: "16e3cf8d510c50106d64f1ebb919b34e",
    searchBoxEl: page.window.document.getElementById("unbxdInput"),
    searchTrigger: "click",
    searchButtonEl: page.window.document.getElementById("searchBtn"),
    hashMode: false,
    updateUrls: false,

    products: {
        el: page.window.document.getElementById("searchResultsWrapper"),
        productType: "SEARCH"
    },
    pagination: {
        el: page.window.document.querySelectorAll(".unxPagination"),
        type: 'FIXED_PAGINATION'
    },
    spellCheck: {
        enabled: true,
        el: page.window.document.getElementById("didYouMeanWrapper")
    },
    facet: {
        defaultOpen: "FIRST",
        facetsEl: page.window.document.getElementById("facetsWrapper"),
        selectedFacetsEl: page.window.document.getElementById("selectedFacetWrapper"),
    },
    sort: {
        options: sortOptions,
        el: page.window.document.getElementById("sortWrapper"),
        action: "click",
        template: function (selectedSort) {
            var sortBtnsUI = "";
            var self = this;
            this.options.sort.options.forEach(function (item, index) {
                var selectedCss = "";
                if (item.value === selectedSort) {
                selectedCss = self.options.sort.selectedSortClass;
                }
                sortBtnsUI += [
                '<button class="btn UNX-sort-btn ' +
                    self.options.sort.sortClass +
                    " " +
                    selectedCss +
                    '"',
                'data-value="' +
                    item.value +
                    '" data-action="changeSort"> ' +
                    item.text +
                    "</button>"
                ].join("");
            });
            return sortBtnsUI;
        }
    },
    productView: {
        el: page.window.document.getElementById("productViewTypeContainer"),
        defaultViewType: "GRID"
    },
    swatches: {
        enabled: true,
        attributesMap: {
            swatchList: "color",
            swatchImgs: "unbxd_color_mapping",
            swatchColors: "color"
        }
    },
    pagesize: {
        el: document.getElementById("changeNoOfProducts"),
        options:global.pageSizeArray,
        pageSize:global.selectedPage,
        template:function(selected, pagesize){
            const {
                UNX_pagesize
            } = this.testIds;
            let ui = `<div  class="UNX-select-pagesize ">`;
            pagesize.options.forEach((opt,i)=>{
                const tId = `data-test-id="${UNX_pagesize}${i+1}"`;
                if(selected == opt) {
                    ui+=`<button selected ${tId} class="${pagesize.pageSizeClass} ${pagesize.selectedPageSizeClass}" id="${opt}">${opt}</button>`;
                } else{
                    ui+=`<button ${tId} class="${pagesize.pageSizeClass}" id="${opt}">${opt}</button>`;
                }
                
            });
            ui+= `</div>`
            return `<div class="UNX-pagesize-block">${ui}</div>`;
        },
        action:"click"
    },
    onEvent:function(instance, type, data) {

        console.log(type,data," type and data")
        if(type === "AFTER_RENDER") {
            global.asyncStart = false;
        }
    }
});


const searchPromise = () => {
    return new Promise(function(resolve, reject){
        global.testUnbxd.getResults(searchTerm, true, function(data) {
            resolve(data);
        })
    })
};

global.asyncRenderPromise = () => {
    global.asyncStart = true;
    return new Promise(function(resolve, reject){
        let timer = setInterval(()=> {
            if(!global.asyncStart) {
                clearInterval(timer);
                resolve();
            }
        }, 500);
    })
};


describe("start search from search box", () => {
    it("it should filter by a search term (link)", function(done) {
      global.document.getElementById('unbxdInput').value = searchTerm;
      global.document.getElementById('searchBtn').click();
      const result = global.asyncRenderPromise();
      result.then(function() {
            done();
            testFacets();
            testProducts();
            testSort();
            testPagination();
            testPageSize();
        }, function(error) {
            assert.fail(error);
            done();
        });
    });
});


