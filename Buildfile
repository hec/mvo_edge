# ===========================================================================
# Project:   MvoEdge
# Copyright: (c) 2009 RERO
# ===========================================================================

# Add initial buildfile information here
config :all, :required => [:sproutcore, :pdf_renderer, :LOG]
proxy '/multivio', :to => 'doc.test.rero.ch' 
