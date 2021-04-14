import UnbxdSearch from "../../src/index";


const setCategory = function(e) {
    const el = e.target;
    const {
        dataset
    } = el;
    if (dataset && dataset.id) {
        window.UnbxdAnalyticsConf = {
            page: dataset.id
        };
        window.unbxdSearch.getCategoryPage();
    }
};
const navElem = document.getElementById("categoryLinks");
navElem.addEventListener("click", setCategory);


const checkRangeTemplate = function(range, selectedRange, facet) {
    const {
        displayName,
        facetName,
        values,
        gap
    } = range;
    let valueUI = ``;
    const {
        facetClass,
        selectedFacetClass,
        applyMultipleFilters,
        applyButtonText,
        clearButtonText,
    } = facet;
    const selected = selectedRange.length > 0 ? true : false;
    values.forEach(item => {
        const {
            from,
            end
        } = item;
        const isSelected = this.isSelectedRange(facetName, item);
        const btnCss = (isSelected) ? `UNX-selected-facet-btn ${facetClass} ${selectedFacetClass}` : `${facetClass}`;
        valueUI += [`<button class="${btnCss} UNX-range-facet UNX-change-facet" data-action="setRange" data-facet-name="${facetName}" data-start="${from.dataId}" data-end="${end.dataId}" >`,
            `<span class="UNX-facet-text">${from.name}  -  ${end.name}</span>`,
            `<span class="UNX-facet-count">(${from.count})</span>`,
            `</button>`
        ].join('');
    });
    let clearBtn = ``;
    let applyBtn = ``;
    if (selected) {
        if (applyMultipleFilters) {
            applyBtn = `<button class="UNX-default-btn ${facetClass} UNX-facet-primary" data-action="applyRange"> ${applyButtonText}</button>`;
        }
        clearBtn = `<button class="UNX-default-btn UNX-facet-clear  ${facetClass}" data-action="clearRangeFacets">${clearButtonText}</button>`;
    }
    return [`<div class="UNX-range-wrapper">`,
        valueUI,
        `<div class="UNX-price-action-row">`,
        applyBtn, clearBtn,
        `<div>`,
        `</div>`
    ].join('')
}


const unbxdCallbackEcma = function(instance, type, data) {
    console.log(type, data, 'type,data');
}

let showFacet = false;
window.resizeTimer = null;

const facetBlock = document.querySelector(".UNX-fxd-facet");
const checkMobile = () => {
    const w = window.innerWidth;
    if (w < 980) {
        return true;
    }
    return false;
};
const toggleMobileFacets = (e) => {
    showFacet = !showFacet;
    const {
        action
    } = e.target.dataset;
    if (action === "applyFacets") {
        window.unbxdSearch.setPageStart(0);
        window.unbxdSearch.getResults();
    }
    if (action === "clearFacets") {
        window.unbxdSearch.clearAllFacets();
        window.unbxdSearch.setPageStart(0);
        window.unbxdSearch.getResults();
    }
    if (showFacet) {
        facetBlock.classList.add("UNX-show-facets")
    } else {
        facetBlock.classList.remove("UNX-show-facets")
    }
}

const btnEls = document.querySelectorAll(".UNX-facet-trigger");
btnEls.forEach(item => {
    item.addEventListener("click", toggleMobileFacets)
})
window.unbxdSearch = new UnbxdSearch({
    siteKey: "demo-german-unbxd809051586180937",
    apiKey: "16e3cf8d510c50106d64f1ebb919b34e",
    hashMode: false,
    updateUrls: true,
    searchBoxEl: document.getElementById("unbxdInput"),
    searchTrigger: "click",
    searchButtonEl: document.getElementById("searchBtn"),
    products: {
        productType: "SEARCH",
    }
});
window.unbxdSearch.updateConfig({
    products: {
        el: document.getElementById("searchResultsWrapper"),
        productType: "SEARCH",
        productClick: function(product, e) {
            console.log(product, "product,index", e);
        }
    },
    spellCheck: {
        enabled: true,
        el: document.getElementById("didYouMeanWrapper")
    },
    noResults: {
        el: document.getElementById("noResultWrapper")
    },
    facet: {
        facetsEl: document.getElementById("facetsWrapper"),
        selectedFacetsEl: document.getElementById("selectedFacetWrapper"),
        applyMultipleFilters: false,
        defaultOpen: "FIRST",
        onFacetLoad: function(facets) {
            const self = this;
            const {
                facet
            } = this.options;
            const {
                rangeWidgetConfig
            } = facet;
            facets.forEach(facetItem => {
                const {
                    facetType,
                    facetName,
                    gap
                } = facetItem;
                const {
                    prefix
                } = rangeWidgetConfig;

                if (facetType === "range") {
                    const rangeId = `${facetName}_slider`;
                    const sliderElem = document.getElementById(rangeId);
                    let {
                        end,
                        gap,
                        max,
                        min,
                        start
                    } = facetItem;
                    const selectedValues = sliderElem.dataset;
                    if (selectedValues) {
                        start = Number(selectedValues.x),
                            end = Number(selectedValues.y)
                    }
                    this[rangeId] = noUiSlider.create(sliderElem, {
                        start: [start, end],
                        tooltips: [{
                                to: function(value) {
                                    return `${prefix} ${Math.round(value)}`;
                                }
                            },
                            {
                                to: function(value) {
                                    return `${prefix} ${Math.round(value)}`;
                                }
                            }
                        ],
                        connect: true,
                        range: {
                            'min': 0,
                            'max': max
                        },
                        format: {
                            to: function(value) {
                                return Math.round(value);
                            },
                            from: function(value) {
                                return Math.round(value);
                            }
                        },
                        padding: 0,
                        margin: 0,
                    });
                    this[rangeId].on("set", function(data) {
                        const newData = {
                            start: data[0],
                            end: data[1],
                            facetName,
                            gap
                        };
                        self.setRangeSlider(newData);
                    });

                }

            });
        },
        isCollapsible: true,
        isSearchable: true,
        enableViewMore: false,
        rangeTemplate: function(range, selectedRange, facet) {
            const {
                facetName,
                start,
                end
            } = range;
            let min = start;
            let max = end;
            if (selectedRange.length > 0) {
                const sel = selectedRange[0].replace(/[^\w\s]/gi, '').split(" TO ");
                min = sel[0];
                max = sel[1];
            }
            const rangId = `${facetName}_slider`;
            return [`<div id="${facetName}"  data-id="${facetName}" class=" UNX-range-slider-wrap">`,
                `<div class="UNX-value-container UNX-range-value-block" ></div>`,
                `<div id="${rangId}" data-x="${min}" data-y="${max}" class="UNX-range-slider-wrapper"></div>`,
                `</div>`,
                `<div>`,
                `</div>`
            ].join('')
        }
    },
    pagination: {
        type: 'FIXED_PAGINATION',
        el: document.querySelector("#clickScrollContainer"),
        onPaginate: function(data) {}
    },
    breadcrumb: {
        el: document.getElementById("breadcrumpContainer")
    },
    pagesize: {
        el: document.getElementById("changeNoOfProducts"),
        template:function(selected, pagesize){
            const {
                UNX_pagesize
            } = this.testIds;
            let ui = `<div  class="UNX-select-pagesize ">`;
            pagesize.options.forEach((opt,i)=>{
                const tId = `data-test-id="${UNX_pagesize}${i+1}"`;
                if(selected == opt) {
                    ui+=`<button selected ${tId} class="${pagesize.pageSizeClass} ${pagesize.selectedPageSizeClass}" id="${opt}">${opt}</button>`;
                } else{
                    ui+=`<button ${tId} class="${pagesize.pageSizeClass}" id="${opt}">${opt}</button>`;
                }
                
            });
            ui+= `</div>`
            return `<div class="UNX-pagesize-block">${ui}</div>`;
        },
        action:"click"
    },

    sort: {
        el: document.getElementById("sortWrapper"),
        options: [{
                value: "min_price desc",
                text: "Price High to Low"
            },
            {
                value: "min_price asc",
                text: " Price Low to High"
            }
        ]
    },
    loader: {
        el: document.getElementById("loaderEl")
    },
    productView: {
        el: document.getElementById("productViewTypeContainer"),
        defaultViewType: "GRID"
    },
    banner: {
        el: document.getElementById("bannerContainer"),
        count: 1
    },
    swatches: {
        enabled: true,
        attributesMap: {
            swatchList: "color",
            swatchImgs: "unbxd_color_mapping",
            swatchColors: "color"
        }
    },
    onAction: function(e, ctx) {},
    onEvent: unbxdCallbackEcma

})



//window.unbxdSearch.initialize();