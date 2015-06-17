(function(factory) {
    
    "use strict";
    
	if(typeof exports === "object" && typeof module === "object")
    {
		module.exports = factory();
    } 
    else if(typeof define === "function" && (define.amd || define.cmd))
    {
        define(factory);
    }
    else
    {
        window.httpx = factory();
    }    
    
})(function() { 
    
    "use strict";
    
    var httpx = {
        version : "0.2.0",
        
        /**
         * Create XHR object
         * 
         * @return {object} XMLHttpRequest
         */
        
        xhr : function() {
            return new XMLHttpRequest(); // IE7+, XMLHttpRequest Level 1
        },        
        
        /**
         * Get default's configs
         *
         * @param  {string}         name
         * @return {string|object}
         */
        
        defaults : function(name) {

            name = name || "";
            
            var $defaults = {
                async         : true,
                timeout       : 3000,
                method        : "GET",
                url           : "",
                data          : "",
                dataType      : "text",
                headers       : {},
                contentType   : "text/plain; charset=UTF-8",
                jsonp         : "callback",  // for query string
                success       : function() {},
                error         : function(method, url) {
                    console.error("HTTP Request Error: ", method, url, this.status + " (" + ((this.statusText) ? this.statusText : "Unkown Error / Timeout") + ")");
                },
                ontimeout     : function(method, url) {
                    console.error("HTTP Request Timeout: ", method, url, this.status + " (" + ((this.statusText) ? this.statusText : "Timeout") + ")");
                }
            };

            return (name !== "" && typeof name === "string") ? $defaults[name] : $defaults;
        },
        
        /**
         * XHR requestor
         *
         * @param  {object} options
         * @return {void}
         */
        
        request : function(options) {
            options      = options  || {};  

            var settings = this.defaults();
            
            for (var key in options)
            {
                if (options.hasOwnProperty(key))
                {
                    settings[key] = options[key];
                }
            }
            
            var url      = settings.url;
            var data     = settings.data;
            var method   = settings.method;

            //console.log("settings =>", settings);

            var urlData = urlBuild(url, data);

            data = urlData.data;

            if (method === "GET")
            {
                url  = urlData.url;
            }

            var xhr = this.xhr();

            var readyStateChange = function(e) {
                
                if ( xhr.readyState === 4 )
                {
                    if ( xhr.status === 200 || xhr.status === 304) 
                    {
                        var result;

                        switch (settings.dataType) 
                        {
                            case "json" :
                                result = JSON.parse(xhr.responseText);
                                break;
                            case "xml":
                                result = xhr.responseXML;
                                break;
                            default:
                                result = xhr.responseText;
                                break;
                        }

                        settings.success.bind(xhr)(result);
                    }
                    else 
                    {
                        settings.error.bind(xhr)(method, url, e);
                    }
                }
            };            
            
            xhr.addEventListener("readystatechange", readyStateChange);
            
            xhr.addEventListener("error", function(e) {
                settings.error.bind(xhr)(method, url, e);
            });
            
            xhr.addEventListener("timeout", function(e) {
                settings.ontimeout.bind(xhr)(method, url, e);
            });

            xhr.open(method, url, true);

            if (method !== "GET")
            {
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            } 
            else
            {
                xhr.setRequestHeader("Content-type", settings.contentType);
            }
            
            // Custom http headers, you can override default's Content-Type header.
            for (var key2 in settings.headers)
            {
                xhr.setRequestHeader(key2, settings.headers[key2]);                
            }
            
            xhr.$url      = url;
            xhr.$method   = method;
            xhr.$dataType = settings.dataType;
            xhr.timeout   = settings.timeout;

            xhr.send(data);
        },
        
        /**
         * Execute request for short methods
         * 
         * @param  {string}        method   HTTP method
         * @param  {string|object} url      request url or options k/v object    
         * @param  {object}        data     request datas
         * @param  {function}      callback Success callback
         * @param  {function}      error    Error callback
         * @return {void}
         */
        
        exec : function(method, url, data, callback, error) {            
            data     = data     || {};
            callback = callback || function() {};
            error    = error    || this.defaults("error");

            if (typeof data === "function")
            {
                error    = callback;
                callback = data;
                data     = "";
            }

            var options = {
                url     : url,
                method  : method,
                data    : data,
                success : callback,
                error   : error
            };

            if (typeof url === "object")
            {
                options = url;
                options.method = method;
            }

            this.request(options);
        },
        
        /**
         * GET method
         * 
         * @param  {string|object} url      request url or options k/v object    
         * @param  {object}        data     request datas
         * @param  {function}      callback Success callback
         * @param  {function}      error    Error callback
         * @return {void}
         */

        get : function(url, data, callback, error) {
            this.exec("GET", url, data, callback, error);
        },
        
        /**
         * POST method
         * 
         * @param  {string|object} url      request url or options k/v object    
         * @param  {object}        data     request datas
         * @param  {function}      callback Success callback
         * @param  {function}      error    Error callback
         * @return {void}
         */

        post : function(url, data, callback, error) {
            this.exec("POST", url, data, callback, error);
        },
        
        /**
         * PUT method
         * 
         * @param  {string|object} url      request url or options k/v object    
         * @param  {object}        data     request datas
         * @param  {function}      callback Success callback
         * @param  {function}      error    Error callback
         * @return {void}
         */
        
        put : function(url, data, callback, error) {
            this.exec("PUT", url, data, callback, error);
        },
        
        /**
         * PATCH method
         * 
         * @param  {string|object} url      request url or options k/v object    
         * @param  {object}        data     request datas
         * @param  {function}      callback Success callback
         * @param  {function}      error    Error callback
         * @return {void}
         */
        
        patch : function(url, data, callback, error) {
            this.exec("PATCH", url, data, callback, error);
        },
        
        /**
         * DELETE method
         * 
         * @param  {string|object} url      request url or options k/v object    
         * @param  {object}        data     request datas
         * @param  {function}      callback Success callback
         * @param  {function}      error    Error callback
         * @return {void}
         */
        
        "delete" : function(url, data, callback, error) {
            this.exec("DELETE", url, data, callback, error);
        },
        
        /**
         * Get json, link jQuery getJSON()
         * 
         * @param  {string|object} url      request url or options k/v object    
         * @param  {object}        data     request datas
         * @param  {function}      callback Success callback
         * @param  {function}      error    Error callback
         * @return {void}
         */
        
        json : function(url, data, callback, error) {
            data     = data     || {};
            callback = callback || function() {};
            error    = error    || this.defaults("error");
            
            if (typeof data === "function")
            {
                error    = callback;
                callback = data;
                data     = "";
            }
            
            var options = {
                url      : url,
                dataType : "json",
                method   : "GET",
                data     : data,
                success  : callback,
                error    : error
            };
            
            if (typeof url === "object")
            {
                options          = url;
                options.method   = "GET";
                options.dataType = "json";
            }

            this.request(options);
        },
        
        /**
         * Alias json()
         * 
         * @param  {string|object} url      request url or options k/v object    
         * @param  {object}        data     request datas
         * @param  {function}      callback Success callback
         * @param  {function}      error    Error callback
         * @return {void}
         */
        
        getJSON : function(url, data, callback, error) {
            this.json(url, data, callback, error);
        },
        
        /**
         * JSONP method
         * 
         * @param  {string|object} url          request url or options k/v object    
         * @param  {object}        data         request datas
         * @param  {function}      callback     Success callback
         * @param  {string}        callbackName for query string name
         * @return {void}
         */
        
        jsonp : function(url, data, callback, callbackName) {
            
            callbackName = callbackName || "callback";

            if (typeof data === "function") 
            {
                callbackName = callback;
                callback = data;
                data     = "";
            }

            var urlData = urlBuild(url, data);

            url  = urlData.url;
            data = urlData.data;

            var fn = "__jsonp_" + callbackName + (new Date()).getTime() + "_" + Math.floor(Math.random() * 100000) + "__";

            url += ((url.indexOf("?") < 0) ? "?" : "&") + callbackName + "=" + fn;

            var evalJsonp = function(callback) {
                
                return function(data) {
                    
                    if (typeof data === "string") 
                    {
                        try {
                            data = JSON.parse(data);
                        } catch (e) {}
                    }

                    data = data || {};

                    callback(data, url);
                    window[fn] = null;
                    document.body.removeChild(document.getElementById(fn));
                };
                
            };

            window[fn] = evalJsonp(callback);

            var script   = document.createElement("script");
            script.src   = url;
            script.async = true;
            script.id    = fn;
            document.body.appendChild(script);
        },
        
        /**
         * Get script file, like jQuery getScript()
         * 
         * @param   {string}   src      javascript file path
         * @param   {function} callback loaded callback function
         * @returns {void}
         */
        
        getScript : function(src, callback) {
            
            if (src === "") 
            {
                alert("Error: Get script source can't be empty");
                return ;
            }
            
            callback     = callback || function() {};
                       
            var head     = document.getElementsByTagName("head")[0];
            var loaded   = document.querySelectorAll("script[src=\""+src+"\"]");
            
            if (loaded.length > 0)
            {
                head.removeChild(loaded[0]);
            }
            
            var script   = document.createElement("script");            
            script.type  = "text/javascript";

            script.onload = script.onreadystatechange = function() {
                
                if (!script.readyState || /loaded|complete/.test(script.readyState) ) 
                {
                    script.onload = script.onreadystatechange = null;
                    script        = undefined;
                    callback(); 
                }

            };

            script.src   = src;
            script.async = true;
            
            head.appendChild(script);
        }
    };
        
    /**
     * Query url & strings build
     * 
     * @param  {string} url  request url
     * @param  {object} data request datas
     * @return {object}
     */

    function urlBuild(url, data) {

        if (typeof data === "object")
        {
            var temp = [];

            for (var i in data) {
                temp.push(i + "=" + encodeURIComponent(data[i]));
            }

            data = temp.join("&");
        }

        url = url + ( (url.indexOf("?") < 0) ? ( (data === "" || !data) ? "" : "?" ) : (data === "" || !data) ? "" : "&") + data;

        return {
            url  : url,
            data : data
        };
    };
    
    return httpx;
});