// ==========================================================================
// Project:   MvoEdge - views
// Copyright: (c) 2009 RERO
// ==========================================================================
/*globals MvoEdge */
//require('views/content');
//require('views/thumbnail');
//require('views/tree');

MvoEdge.views = SC.Page.design({

  /**
    Title view
  */
  titleView: SC.LabelView.design({
    layout: { left: 20, top: 10 },
    classNames: '',
    tagName: 'h3',
    tooltip: 'This is the title',
    value: 'Multivio prototype Edge'
  }),

  /**
    Main content view
  */
  mainContentView: SC.View.design({
    layout: { top: 0, bottom: 0, left: 0, right: 0 },
    
    childViews: 'innerMainContent'.w(),
    innerMainContent: MvoEdge.ContentView.design({
      layout: { top: 10, bottom: 10, left: 10, right: 10 },
      borderStyle: SC.BORDER_NONE,

      contentView: SC.ImageView.design({
        layout: { top: 0, bottom: 0, centerX: 0, minWidth: 1 },
        useImageCache: NO
      })
    })
  }).classNames('shadow_dark inner_content_view'.w()),

  /**
    HTML main content view
  */
  htmlMainContentView: SC.ScrollView.design({
    layout: { top: 0, bottom: 0, left: 0, right: 0 },
    
    contentView: SC.WebView.design({
      layout: { top: 0, bottom: 0, left: 0, right: 0 },
      contentBinding: 'MvoEdge.masterController.masterSelection',
      contentValueKey: 'imageUrl'
    })
  }),
  
  /**
    Thumbnail view
  */
  thumbnailView: SC.View.design({
    layout: { top: 0, bottom: 0, left: 0, right: 0 },
    
    childViews: 'innerThumbnail'.w(),
    innerThumbnail: MvoEdge.ThumbnailView.design({
      layout: { top: 10, bottom: 10, left: 10, right: 10 },
      hasHorizontalScroller: NO,
      borderStyle: SC.BORDER_NONE,

      contentView: SC.ListView.design({
        layout: { top: 0, bottom: 0, left: 0, right: 0 },
        insertionOrientation: SC.VERTICAL_ORIENTATION,
        rowHeight: 120,
        exampleView: SC.View.design({
          childViews: 'thumbnail label'.w(),
          thumbnail: SC.ImageView.design({
            layout:  { top: 4, height: 92, centerX: 0, width: 80 },
            useImageCache: NO,
            contentBinding: '.parentView.content',
            contentValueKey: 'url'
          }),
          label: SC.LabelView.design({
            layout:  { bottom: 4, height: 20, left: 4, right: 4 },
            textAlign: SC.ALIGN_CENTER,
            contentBinding: '.parentView.content',
            contentValueKey: 'guid'
          })
        }),
        //useImageCache: NO,
        contentBinding: 'MvoEdge.thumbnailController.arrangedObjects',
        selectionBinding: 'MvoEdge.thumbnailController.selection'
      })
    })
  }).classNames('shadow_light inner_view'.w()),
  
  /**
    HTML thumbnail view
  */
  htmlThumbnailView: SC.ScrollView.design({
    hasHorizontalScroller: NO,
    layout: { top: 0, bottom: 0, left: 0, right: 0 },

    contentView: SC.ListView.design({
      layout: { top: 0, bottom: 0, left: 5, right: 5 },
      insertionOrientation: SC.VERTICAL_ORIENTATION,
      rowHeight: 25,
      columnWidth: 30,
      exampleView: SC.LabelView.design({
        textAlign: SC.ALIGN_CENTER
      }),
      contentBinding: 'MvoEdge.thumbnailController.arrangedObjects',
      selectionBinding: 'MvoEdge.thumbnailController.selection',
      contentValueKey: 'label'
    })
  }),

  /**
    Tree view
  */
  treeView: SC.View.design({
    layout: { top: 0, bottom: 0, left: 0, right: 0 },

    childViews: 'innerTree'.w(),
    innerTree: SC.ScrollView.design({
      layout: { top: 10, bottom: 10, left: 10, right: 10 },
      borderStyle: SC.BORDER_NONE,

      contentView: MvoEdge.TreeView.design({
        layout: { top: 0, bottom: 0, left: 0, right: 0 },
        rowHeight: 18,
        borderStyle: SC.BORDER_NONE,
        contentValueKey: 'label',
        contentBinding: 'MvoEdge.treeController.arrangedObjects',
        selectionBinding: 'MvoEdge.treeController.selection'
      })
    })
  }).classNames('shadow_light inner_view'.w()),

  /**
    Navigation view
  */
  navigationView: SC.View.design({
    layout: { top: 0, bottom: 0, left: 0, right: 0 },

    childViews: 'firstPageView previousPageView textPageView nextPageView lastPageView zoomPageView'.w(),
    
    firstPageView: SC.ButtonView.design({
      layout: { centerX: -70, centerY: 0, width: 30, height: 25 },
      titleMinWidth : 30,
      title: "<<",
      target: "MvoEdge.navigationController", 
      action: "goToFirstPage" 
    }),    
    
    previousPageView: SC.ButtonView.design({
      layout: { centerX: -35, centerY: 0,  width: 30, height: 25 },
      titleMinWidth : 30,
      title: "<",
      target: "MvoEdge.navigationController", 
      action: "goToPreviousPage"
    }),    
    
    textPageView: SC.TextFieldView.design({ 
      layout: { centerX: 0, centerY: 0, width: 30, height: 20 },
      isEditing: YES,
      textAlign: SC.ALIGN_CENTER,
      hint: 'Page',
      valueBinding: 'MvoEdge.navigationController.currentPage',
      validator: 'Number'
    }),

    nextPageView: SC.ButtonView.design({
      layout: { centerX: 35, centerY: 0, width: 30, height: 25 },
      titleMinWidth : 30,
      title: ">",      
      target: "MvoEdge.navigationController", 
      action: "goToNextPage"
    }),

    lastPageView: SC.ButtonView.design({
      layout: { centerX: 70, centerY: 0, width: 30, height: 25 },
      titleMinWidth : 30,
      title: ">>",
      target: "MvoEdge.navigationController", 
      action: "goToLastPage"
    }),    
    
    zoomPageView: SC.ToolbarView.design({
      layout: { centerX: 140, centerY: 0, width: 105, height: 25 },
      layerId: "zoomPageId",
      
      childViews: 'zoomInPageView originalSizePageView zoomOutPageView'.w(),
      
      zoomInPageView: SC.ButtonView.design({
        layout: { centerX: -35, centerY: 0, width: 30, height: 25 },
        layerId: "zoomInPageId",
        titleMinWidth : 30,
        title: "-",
        target: "MvoEdge.zoomController", 
        action: "doZoomIn"
      }),
      
      originalSizePageView: SC.ButtonView.design({
        layout: { centerX: 0, centerY: 0, width: 30, height: 25 },
        layerId: "originalSizePageId",
        titleMinWidth : 30,
        title: "o",
        target: "MvoEdge.zoomController", 
        action: "retrieveOriginalSize"
      }),      
      
      zoomOutPageView: SC.ButtonView.design({
        layout: { centerX: 35, centerY: 0, width: 30, height: 25 },
        layerId: "zoomOutPageId",
        titleMinWidth : 30,
        title: "+",
        target: "MvoEdge.zoomController", 
        action: "doZoomOut"
      })
      
    })    
          
  }),

  /**
    Metadata view
  */
  metadataView: SC.View.design({
    layout: { top: 0, bottom: 0, left: 0, right: 0 },
    
    childViews: [
      SC.LabelView.design({
        layout: { top: 10, height: 20, left: 10, right: 10 },
        tagName: 'span',
        classNames: 'metadata_primary',
        contentBinding: 'MvoEdge.masterController.descriptiveMetadataDictionary',
        contentValueKey: 'title'
      }),
      SC.LabelView.design({
        layout: { top: 31, height: 20, left: 10, right: 10 },
        tagName: 'span',
        classNames: 'metadata_secondary',
        contentBinding: 'MvoEdge.masterController.descriptiveMetadataDictionary',
        contentValueKey: 'creator'
      })
    ]
  }).classNames(''.w()),

  usageView: SC.View.design({
    layout: { top: 0, bottom: 0, left: 0, right: 0 },

    childViews: [
      SC.LabelView.design({
        layout: { centerX: 0, centerY: 0, width: 700, height: 400 },
        classNames: 'mvo_info_full',
        contentBinding: 'MvoEdge.configurator',
        contentValueKey: 'usageText',
        escapeHTML: NO
      })
    ]
  }).classNames('mvo_info_full shadow'.w())

});
