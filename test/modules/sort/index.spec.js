const chai = require('chai');
const expect = chai.expect;
const assert = require('assert');

import {subStringCount} from "../../utils";



const testSort = ()=> {   
    describe('start testing sort module..', function(){
        it('should have 3 sort options rendered in the ui',function () {
            const optnL = global.testUnbxd.sortWrapper.querySelectorAll("button").length;
            expect(optnL).to.equal(2);
        });
        it('should fire a sort api call with `selectedSort`',  function(done) {
            const firstElementItem = global.testUnbxd.sortWrapper.querySelectorAll("button")[0];
           firstElementItem.click();
            const result = global.asyncRenderPromise();
            result.then(function() {
                const selectedSort  = global.testUnbxd.getSelectedSort();
                expect(selectedSort).to.be.equal(`min_price desc`);
                done();
            }, function(error) {
                assert.fail(error);
                done();
            });
        });
        it('should have a selected sort item  in ui',function () {
            const optnL = global.testUnbxd.sortWrapper.querySelectorAll(".UNX-selected-sort").length;
            expect(optnL).to.equal(1);
        });

        it('should be able to clear the sort',function (done) {
            global.testUnbxd.applySort(``);
            const result = global.asyncRenderPromise();
            result.then(function() {
                const optnL = global.testUnbxd.sortWrapper.querySelectorAll(".UNX-selected-sort").length;
                expect(optnL).to.equal(0);
                done();
            }, function(error) {
                assert.fail(error);
                done();
            });
        });

    })    

}
export default testSort;