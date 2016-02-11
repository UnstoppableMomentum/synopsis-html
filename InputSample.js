enyo.kind({
              name: "enyo.sample.InputSample",
              classes: "input-sample",
              components: [
                  {
                      tag: "label",
                      content: "Text Input",
                      classes: "section",
                      attributes: [
                          {"for": "inputText"
                          }
                      ]
                  },
                  {
                      kind: "enyo.Input",
                      name: "inputText",
                      type: "text",
                      placeholder: "Text",
                      value: "Initial Value",
                      onchange: "inputChanged",
                      oninput: "inputOccurred"
                  },

                  {
                      kind: "enyo.Button",
                      name: "buttonDbg1",
                      ontap: "onButtonDbg1",
                      content: "Dbg1"
                  },
              ],

              _testAjax: function(inProps, inParams, inAssertFn, inAssertErrFn) {
                  return new enyo.Ajax(inProps)
                      .response(this, function(inSender, inValue) {
                          //var obj = JSON.parse(inValue);
                          //for (var key in obj) {
                              var value = inValue["response"];
                              // do stuff.

                          //}
                          console.log("last inserted row id:" + value);
                          console.log("@@@@ddd@@@@@@inValue.response:" + JSON.stringify(inValue));

                          //console.log("response"
                          //            + " inSender:" + JSON.stringify(inSender)
                          //            + " ====================inValue:" + JSON.stringify(inValue) );
                          //this.finish(inAssertFn.call(null, inValue) ? "" : "bad response: " + JSON.stringify(inValue));
                      })
                      .error(this, function(inSender, inError) {
                          console.log("response");
                          if (!inAssertErrFn) {
                              this.finish("bad status: " + inError.toString());
                              enyo.error(inError);
                              enyo.error(inError.stack);
                          } else {
                              this.finish(inAssertErrFn.call(null, inError) ? "" : "bad response: " + inError);
                          }
                      })
                      .go(inParams);
              },
              _testResponse: function(inProps, inAssertFn) {
                  this._testAjax(enyo.mixin({
                    url: "php/test1.php?name=" + inProps.handleAs}, inProps),
                    null, inAssertFn);
              },
              testJsonResponse: function() {
                  this._testResponse({handleAs: this.$.inputText.getValue()},
                  function(inValue) {
                      console.log("@@@@@@@@@@@@inValue.response:" + inValue.response);
                      return inValue.response == "hello";
                  });
              },

              onButtonDbg1: function(inSender, inEvent) {
                  //alert(this.$.inputText.getValue());
                  this.testJsonResponse();
                  //alert("1!!!");
              },

});
