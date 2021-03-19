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


import testFacets from "./facets.spec.js";


const searchTerm = "shirt";
global.facetElementSelector = "UNX-facet-item-row";
global.testUnbxd = new UnbxdSearch({


    siteKey: "demo-unbxd700181503576558",
    apiKey: "fb853e3332f2645fac9d71dc63e09ec1",
    hashMode: false,
    updateUrls: false,

    products: {
        productType: "SEARCH"
    },
    pagination: {
        type: 'FIXED_PAGINATION'
    },
    spellCheck: {
        enabled: true
    },
    facet: {
        applyMultipleFilters: false,
        defaultOpen: "FIRST",
        facetMultiSelect: false
    },
    pagination: {
        type: 'FIXED_PAGINATION'
    },

    sort: {
        options: sortOptions
    },
    productView: {
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
    onEvent:function(instance, type, data) {
        console.log(type, data, 'type,data');
    }
});


const searchPromise = () => {
    return new Promise(function(resolve, reject){
        global.testUnbxd.getResults(searchTerm, true, function(data) {
            resolve(data);
        })
    })
};

describe('start testing sdk', function(){

    it('Should be able to make an api call', function(done){
      const result = searchPromise();
        result.then(function(data) {
            expect(global.testUnbxd.state.userInput).to.equal(searchTerm);
            done();
            testFacets();
        }, function(error) {
            assert.fail(error);
            done();
        });
    });
});

 

