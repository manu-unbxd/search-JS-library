const chai = require('chai');
const expect = chai.expect;
const assert = require('assert');

import {subStringCount} from "../../utils";



const testFacets = ()=> {
    const allFacets = global.testUnbxd.getAllFacets();
    const facetsLength = allFacets.length;
    const facetsStr =  global.testUnbxd.renderFacets();
    const generatedFacetsCount = global.testUnbxd.facetsWrapper.querySelectorAll(`.UNX-facet-item-d`).length;

    const testFacet = global.testUnbxd.getFacets()[0];
    const textFacetName = testFacet.facetName;
    const textFacetValue = testFacet.values[0].name;
    describe('facets methods', function(){
        it('should check the facets length and generate html has same number of elements',function () {
            expect(facetsLength).to.equal(generatedFacetsCount);
        });

        it('should be able to get the facet details when we pass a facet name',function () {
            const facetInfo = global.testUnbxd.getSelectedFacet(textFacetName);
            expect(facetInfo).to.eql(testFacet);
        });

        it('should be able to select a facet on click on the facet button',  function(done) {
            const firstElementItem = global.testUnbxd.facetsWrapper.querySelector(`[data-id="${textFacetValue}"]`);
           firstElementItem.click();
            const result = global.asyncRenderPromise();
            result.then(function() {
                expect(global.testUnbxd.state.selectedFacets[textFacetName]).to.be.an('array');
                done();
            }, function(error) {
                assert.fail(error);
                done();
            });
        });
        it('once the facet is selected selected class names should be applied',  function() {
            const firstElementItem = global.testUnbxd.facetsWrapper.querySelector(`[data-id="${textFacetValue}"]`).classList.contains("UNX-selected-facet-btn");
            expect(firstElementItem).to.be.true;
        });
        it('should be able to un select a facet on click on the same facet button twice',  function(done) {
            const firstElementItem = global.testUnbxd.facetsWrapper.querySelector(`[data-id="${textFacetValue}"]`);
           firstElementItem.click();
            const result = global.asyncRenderPromise();
            result.then(function() {
                expect(global.testUnbxd.state.selectedFacets[textFacetName]).to.be.an('array').to.be.empty;
                done();
            }, function(error) {
                assert.fail(error);
                done();
            });
        });
        it('selected class name should be removed',  function() {
            const firstElementItem = global.testUnbxd.facetsWrapper.querySelector(`[data-id="${textFacetValue}"]`).classList.contains("UNX-selected-facet-btn");
            expect(firstElementItem).to.be.false;
        });

        it('click on the first facet header',  function() {
            const firstElementItem = global.testUnbxd.facetsWrapper.querySelector(`.UNX-facet-header`);
            firstElementItem.click();
            const isClosed = firstElementItem.classList.contains("UNX-facet-close");
            expect(isClosed).to.be.true;
        });
        it('click on the first facet header',  function() {
            const firstElementItem = global.testUnbxd.facetsWrapper.querySelector(`.UNX-facet-header`);
            firstElementItem.click();
            const isOpen = firstElementItem.classList.contains("UNX-facet-open");
            expect(isOpen).to.be.true;
        });

    });

    

}
export default testFacets;
