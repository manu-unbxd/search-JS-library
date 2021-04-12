const chai = require('chai');
const expect = chai.expect;
const assert = require('assert');

import {subStringCount} from "../../utils";



const testPagination = ()=> {

    describe('testing pagination module', function(){
        it('check pagination wrapper rendered',function () {
            const paginationL = global.testUnbxd.paginationWrappers.length;
            expect(paginationL).to.equal(2);
        });
        it('click on a  pagination button',  function(done) {
            const paginationButtons = global.document.querySelectorAll(".UNX-page-button"); //UNX-page-button
            const  currentPageButton = paginationButtons[1];
            const nextPageNumber = currentPageButton.dataset.pageNo;
            currentPageButton.click();
            const result = global.asyncRenderPromise();
            result.then(function() {
                expect(global.testUnbxd.state.startPageNo).to.equal(nextPageNumber);
                done();
            }, function(error) {
                assert.fail(error);
                done();
            });
        });
        it('click on next page button',  function(done) {
            const nextPageButton = global.document.querySelector(".UNX-page-next"); //UNX-page-button
            nextPageButton.click();
            const result = global.asyncRenderPromise();
            result.then(function() {
                expect(global.testUnbxd.state.startPageNo).to.equal(24);
                done();
            }, function(error) {
                assert.fail(error);
                done();
            });
        });
        it('click on previous page button',  function(done) {
            const prevPageButton = global.document.querySelector(".UNX-page-prev"); //UNX-page-button
            prevPageButton.click();
            const result = global.asyncRenderPromise();
            result.then(function() {
                expect(global.testUnbxd.state.startPageNo).to.equal(12);
                done();
            }, function(error) {
                assert.fail(error);
                done();
            });
        });
    });

    

}
export default testPagination;
