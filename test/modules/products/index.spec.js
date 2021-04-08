const chai = require('chai');
const expect = chai.expect;
const assert = require('assert');

import {subStringCount} from "../../utils";



const testProducts = ()=> {   
    const results = global.testUnbxd.getSearchResults();
    const productsLength = results.products.length;
    const searchStr =  global.testUnbxd.renderSearch();
    const generatedProductsCount = subStringCount(searchStr, global.productElementSelector);
    describe('start testing product module...', function(){
        it('should check the products length and generate html has same number of elements',function () {
            expect(productsLength).to.equal(generatedProductsCount);
        });
    })    

}
export default testProducts;