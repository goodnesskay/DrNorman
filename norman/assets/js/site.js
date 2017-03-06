//site.js 
function clsPage(){
    var me = this;
    me.sessionReady;

    this.init = function () {
        using("HelperLib")
        using("DHTMLLib")
        using("XMLLib")

        var eh = new hl.clsEventHandler();
        me.attachEvents = eh.attachEvent;
        me.detachEvents = eh.detachEvent;
        me.raiseEvent = eh.raiseEvent;

        hl.attachEvents(window, window, "onscroll", scrollMonitor)
        setTimeout(checkSession, 10)
    }

    function checkSession() {
        me.raiseEvent("sessionready")


    }

    function reInitSlackButtons()
    {

        var slackButtons = document.getElementsByClassName("addToSlack")
        for (var i = 0; i < slackButtons.length; i++) {
            var href = slackButtons[i].getAttribute("href");
            href += aoc.clientId;
            slackButtons[i].setAttribute("href", href);
        }
    }

    this.genLink = function(link)
    {
        try {
            document.getElementById("eventFrame").src = link + ".html"
        } catch (e) {

        }
    }


    //called when the document is ready
    this.pageReady = function () {
        reInitSlackButtons();
    }

     this.registerStats = function(property) {
        try {
            wafstats.register(property, aoc.emailId, aoc.clientId);
        } catch (e) { }
    }


    this.trackEvent = function (type,event, value) {
        try {
            if(value == null) value = 0
            if (type == null) type = "button"
            type = type.replace(/ /g,"_")
            event = event.replace(/ /g, "_")

            ga('send', 'event', type, 'click', event, value)
        }catch(e){}
    }


    function scrollMonitor() {
        var top = window.pageYOffset || document.documentElement.scrollTop
    }


    var popupCallback;
    this.popup = function (message, callback, title) {


        title = title || "Message from appsonchat"
        var elPopup = document.getElementById("aocMessage")
        popupCallback = callback;
        if (elPopup == null) {
            elPopup = document.body.appendChild(document.createElement("div"))
            elPopup.id = "aocMessage"
            elPopup.innerHTML = "<div class='brand'></div>"
                                + "<h3 wftype='hdr'></h3>"
                                + "<div class='regularFont descColor dparastart' wftype='msg'></div>"
                                + "<div class='buttonctr' >"
                                    + "<button class='mainbutton button' id='popupbutton' onclick='page.closePopup()'>Ok</button>"
                                + "</div>"
            elPopup.className = "disappear easeTrans popup"
        }
        //set message
        var el = dl.getChildByType(elPopup, "msg");
        el.innerHTML = message;

        //set title
        el = dl.getChildByType(elPopup, "hdr");
        el.innerHTML = title;

        //positioning
        dl.removeClass(elPopup, "hide")
        dl.removeClass(elPopup, "disappear")

        var pos = dl.getScreenCenterPos(window, elPopup.offsetWidth, elPopup.offsetHeight);
        elPopup.style.left = pos.x + "px";
        var top = window.pageYOffset || document.documentElement.scrollTop
        elPopup.style.top = (pos.y - top) + "px"

        document.getElementById("popupbutton").focus();

        me.showOverlay(me.closePopup)

    }



    this.closePopup = function () {
        overlayCallback = null;
        me.hideOverlay()
        var elPopup = document.getElementById("aocMessage")

        dl.addClass(elPopup, "disappear")
        try { popupCallback() } catch (e) { };
        setTimeout(hidePop, 300)

        function hidePop() {
            dl.addClass(elPopup, "hide")
        }
    }

    //function that shows an overlay
    var overlayCallback
    this.showOverlay = function (callback) {
        var ol = document.getElementById("overlay")
        overlayCallback = callback
        hl.attachEvents(window, ol, "onclick", me.hideOverlay);
        document.body.style.overflow = "hidden"
        dl.removeClass(document.getElementById("overlay"), "hide")
    }
    this.hideOverlay = function (invokeCallback) {
        document.body.style.overflow = "auto"
        dl.addClass(document.getElementById("overlay"), "hide")
        if (invokeCallback != false) {
            try { overlayCallback() } catch (e) { }
        }

  
    }

    this.sendMail = function (params,method) {
     
     
        var url = window.location.protocol + "//" + window.location.host + "/w/mailer.ashx";        
        alert(params.resume);
        hl.processRequestAsync(url, null, params, method, page.fetchResults)
    }
    this.fetchResults = function (results) {
        alert(results);
    }

    this.getFilePath = function (e) {



    }

   

}

var page = new clsPage()
page.init();

if (window.addEventListener) {
    window.addEventListener("load", page.pageReady, false)
}
else if (typeof (window.attachEvent) != "undefined") {
    window.attachEvent("onload", page.pageReady);
}


//end site.js