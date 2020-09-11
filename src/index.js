//import UnbxdSearchCore from "../../../search-JS-core/src/index";
import UnbxdSearchCore from "@unbxd-ui/unbxd-search-core";
import styles from '../styles/index.scss';
import delegate from "./modules/utils/delegate";
import options from './common/options';
import setMethods from './core/setMethods';
import events from './common/constants/eventsLib';
import actions from './common/constants/actions';

import setConfig from './core/setConfig';


class UnbxdSearch extends UnbxdSearchCore {
    constructor(props) {
        super(props);
        this.viewState = {
            productViewType: options.productView.viewTypes,
            isInfiniteStarted:false,
            lastAction:'',
            selectedRange:{},
            expandedFacets:{},
            searchFacetsText:{},
            noResultLoaded:false,
            lastDidYouMean:null,
            loadedFromSuggestion:false
        };
        this.setConfig = setConfig.bind(this);
        this.setConfig(options,props);
        this.events = events;
        this.actions = actions;
        this.updateConfig();
        const urlParams = this.getQueryParams();
        const ln = Object.keys(urlParams).length;
        if(ln > 0){
            this.renderFromUrl();
        }
        this.options.onCallBack(this, 'initialised')
    }
    callBack(state,type) {
        this.getCallbackActions(state,type);
        const {
            onCallBack,
            loader,
            facet
        } = this.options;
        const {
            beforeApiCall,
            afterApiCall,
        } = this.events;
        if(type ==="lastBack") {
            onCallBack(this,"lastBack");
        }
        if(type === beforeApiCall) { 
            onCallBack(this,beforeApiCall);
            if(loader && loader.el) {
                loader.el.innerHTML = loader.template(this);
            }
        }
        if(type === afterApiCall) { 
            onCallBack(this,afterApiCall);
            this.reRender();
        }
        if((type === 'added_facet' || type === 'deleted_facet' ) && facet.applyMultipleFilters) {
            onCallBack(this,'added_facet');
            this.renderFacets();
        }
    }
    delegate(delgationElem,evt,elem,fn){
        return delegate(delgationElem,evt,elem,fn);
    }
}
setMethods(UnbxdSearch);
export default UnbxdSearch;
