// ==========================================================================
// Project:   MvoEdge
// Copyright: (c) 2009 RERO
// ==========================================================================
/*globals MvoEdge */
/**
  @class

  Object logger. 

  @author {CHE}      
  @extends {Object}   
  @since {0.1.0} 
*/

MvoEdge.logger = SC.Object.create( 
/** @scope MvoEdge.logger.prototype */ {

  errorLogger: undefined,
  warningLogger: undefined,
  infoLogger: undefined,
  debugLogger: undefined,

  /**
    @method

    Initialize logger, set level and add appender(s)
    
    We use 4 logger => error, warning, info, debug
  */
  init: function () { 
    var listOfLogger = [];
    this.errorLogger = Log4js.getLogger("error");
    this.errorLogger.setLevel(Log4js.Level.ERROR);
    listOfLogger.push(this.errorLogger);
    this.warningLogger = Log4js.getLogger("warning");
    this.warningLogger.setLevel(Log4js.Level.WARN);
    listOfLogger.push(this.warningLogger);
    this.infoLogger = Log4js.getLogger("info");
    this.infoLogger.setLevel(Log4js.Level.INFO);
    listOfLogger.push(this.infoLogger);
    this.debugLogger = Log4js.getLogger("debug");
    this.debugLogger.setLevel(Log4js.Level.DEBUG);   
    listOfLogger.push(this.debugLogger);
    var appenders = MvoEdge.CONFIG.log;
    for (var appender in appenders) {
      if (appender === 'ajax') {
        var level = MvoEdge.get(appenders[appender]);
        var ajaxAppender = new Log4js.AjaxAppender(MvoEdge.CONFIG.logFile);
        ajaxAppender.setLayout(new Log4js.JSONLayout());
        for (var i = 0; i < listOfLogger.length; i++) {
          var logger = listOfLogger[i];
          if (logger.level >= level) {
            logger.addAppender(ajaxAppender); 
          }
        }
      }
      if (appender === 'console') {
        level = MvoEdge.get(appenders[appender]);  
        var consoleAppender = new Log4js.ConsoleAppender(false);  
        for (i = 0; i < listOfLogger.length; i++) {
          logger = listOfLogger[i];
          if (logger.level >= level) {
            logger.addAppender(consoleAppender); 
          }
        }
      }
    }
    this.info('end logger');
  },      
  
  error: function (message) {
    this.errorLogger.error(message);
  },

  warning: function (message) {
    this.warningLogger.warn(message);
  },

  info: function (message) {
    this.infoLogger.info(message);
  },

  debug: function (message) {
    this.debugLogger.debug(message);
  },
  
  log: function (ex) {
    var exceptionMessage = "\n\t{'message': " + ex.message + ",";
    exceptionMessage += "\n\t 'type': " + ex.name + ",";
    exceptionMessage += "\n\t 'file': " + ex.fileName + ",";
    exceptionMessage += "\n\t 'line': " + ex.lineNumber + "}\n";
    this.error(exceptionMessage);
  }

});
