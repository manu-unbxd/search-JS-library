const chai = require('chai');
const expect = chai.expect;
const assert = require('assert');

import {subStringCount} from "./utils";



const testFacets = ()=> {   
    const allFacets = global.testUnbxd.getAllFacets();
    const facetsLength = allFacets.length;
    const facetsStr =  global.testUnbxd.renderFacets();
    const generatedFacetsCount = subStringCount(facetsStr, global.facetElementSelector);
    const testFacet = global.testUnbxd.getFacets()[0];
    const textFacetName = testFacet.facetName;
    describe('facets methods', function(){
        it('should check the facets length and generate html has same number of elements',function () {
            expect(facetsLength).to.equal(generatedFacetsCount);
        });

        it('should be able to get the facet details when we pass a facet name',function () {
            const facetInfo = global.testUnbxd.getSelectedFacet(textFacetName);
            expect(facetInfo).to.eql(testFacet);
        });

    });
    

}
export default testFacets;
