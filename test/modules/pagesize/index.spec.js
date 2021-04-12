const chai = require('chai');
const expect = chai.expect;
const assert = require('assert');

import {subStringCount} from "../../utils";

const getPaginationOptions = ()=> {
    return global.testUnbxd.pageSizeWrapper.querySelectorAll(".UNX-pagesize");
}


const testPageSize = ()=> {

    describe('testing pagesize module', function(){
        it('check all pagesize options are rendered',function () {
            const pageSizeElems = getPaginationOptions();
            const elemLength = pageSizeElems.length;
            expect(global.pageSizeArray.length).to.equal(elemLength);
        });
        it('check the rendered product length equal to selected option',function () {
            expect(global.selectedPage).to.equal(global.testUnbxd.getSearchResults().products.length);
        });
        it('select the another pagesize option',function () {
            expect(global.selectedPage).to.equal(global.testUnbxd.getSearchResults().products.length);
        });
        it('select the another pagesize option',  function(done) {
            const firstElementItem = getPaginationOptions()[0]
           firstElementItem.click();
            const result = global.asyncRenderPromise();
            result.then(function() {
                expect(global.testUnbxd.state.pageSize).to.equal(global.pageSizeArray[0]);
                done();
            }, function(error) {
                assert.fail(error);
                done();
            });
        });
        it('check the new rendered product length equal to selected option',function () {
            expect(global.pageSizeArray[0]).to.equal(global.testUnbxd.getSearchResults().products.length);
        });

    });

    

}
export default testPageSize;
