const onProductItemClick = function(e) {
    const path = e.path || (e.composedPath && e.composedPath());
    const {
        productItemClass,
        attributesMap,
    } = this.options.products;
    const id = productItemClass.replace(".","");
    let dataset = e.target.dataset;
    const elem = path.find((item) => {
        const itemCss = item.className;
        return (itemCss.indexOf(id)) >=0 
    });
    if(dataset.action === this.actions.changeSwatch) {
        this.options.onCallBack(this,dataset.action);
        elem.querySelector(dataset.swatchTarget).src=dataset.swatchImg;
        return false;
    }
    let product = null;
    dataset = elem.dataset;
    if(dataset.id) {
        product =  this.getProductByPropValue(attributesMap.unxId,dataset.id);
    }
    if(product && elem) {
        product.prank = elem.dataset.prank;
    }
    this.options.products.productClick(product,e);
    this.getCallbackActions(product,"click");
}
export {
    onProductItemClick as default
};
