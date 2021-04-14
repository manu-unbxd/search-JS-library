const chai = require('chai');
const expect = chai.expect;
const assert = require('assert');

import {subStringCount} from "../../utils";

const getProductViewTypeButtons = ()=> {
    return global.testUnbxd.productViewTypeWrapper.querySelectorAll(".UNX-product-view");
}
const getUnSelectedProductViewType = ()=> {
    const btns = getProductViewTypeButtons();
    let unSelected = null;
    for(let i=0;i<btns.length;i++){
        const btn = btns[i];
        if(!btn.classList.contains("UNX-selected-product-view")){
            unSelected = btn;
        }
    }

    return unSelected;
}


const testProductViewType = ()=> {

    describe('testing pagesize module', function(){
        it('check 2 product view options are rendered',function () {
            const pageSizeElems = getProductViewTypeButtons();
            const elemLength = pageSizeElems.length;
            expect(elemLength).to.equal(2);
        });
        it('should be selected the default view.',function () {
            const selected = global.testUnbxd.productViewTypeWrapper.querySelector(".UNX-selected-product-view");
            const textContent = selected.dataset.viewAction;
            expect(global.testUnbxd.options.productView.productViewType).to.equal(textContent);
        });
        it('click on unselected button',  function(done) {
            const actionBtn = getUnSelectedProductViewType();
            actionBtn.click();
            const result = global.asyncRenderPromise();
            result.then(function() {
                expect(global.testUnbxd.viewState.productViewType).to.equal(actionBtn.dataset.viewAction);
                done();
            }, function(error) {
                assert.fail(error);
                done();
            });
        });

    });

    

}
export default testProductViewType;
