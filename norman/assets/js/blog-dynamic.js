
function blogController() {
    var me = this;
    var blogs = [];
    var $blogs = document.getElementById("blog-mansonry");
    me.blogCount = 0;
    

    this.init = function (xmlData) {
        clearActive();
        document.getElementById('p1').classList.add("current");
        me.loadXML("assets/blog.xml", function (xmlDoc) {
            var temp = 10;
            var table = "<tr><th>Blog</th><th>Title</th></tr>";

            if (xmlDoc != null) {
                blogs = xmlDoc.getElementsByTagName("blog");
                me.blogCount = blogs.length;
                console.log(blogs);
                //for (i = 0; i < x.length; i++) {
                //    blogs.push(x[i]);
                //}
                me.displayBlog();
  
            }
            else {
                console.log("file not found");
            }
        });
        
    };

    this.loadXML = function (filename, callback) {
        var xhttp;
        if (window.XMLHttpRequest) {
            xhttp = new XMLHttpRequest();
        } else {
            xhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhttp.open("GET", filename, true);
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState === 4) {
                callback(xhttp.responseXML);
            }
        }
        xhttp.send();
    };

    this.blog = {
        id: "",
        title: "",
        category: ""
    };

    this.displayBlog = function () {
        me.getTitle();
        me.displaySnippet();
        me.displayDate();
        me.displayPublisher();
        me.displayImg();
        me.getBlog();
        me.getComments();
    };

    this.getTitle = function () {
        //push article titles to this array
        var $titles = document.getElementsByClassName("post-title");
        var $captions = document.getElementsByClassName("flex-caption");

        for (var i = 0; i < blogs.length; i++) {
            $titles[i].childNodes[0].innerHTML = blogs[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
            $captions[i].childNodes[1].childNodes[0].innerHTML = $titles[i].childNodes[0].innerHTML;
        }
        //console.log($blogs, $titles);
    }

    this.displaySnippet = function () {
        var $postEntry = document.getElementsByClassName("post-entry");

        for (var i = 0; i < blogs.length; i++) {
            $postEntry[i].childNodes[1].innerHTML = blogs[i].getElementsByTagName("snippet")[0].childNodes[0].nodeValue;
        }
    }

    this.displayDate = function () {
        var $dates = document.getElementsByClassName("post_date");
        var $captions = document.getElementsByClassName("flex-caption");
        for (var i = 0; i < blogs.length; i++) {
            $dates[i].innerHTML = blogs[i].getElementsByTagName("date")[0].childNodes[0].nodeValue;
            $captions[i].childNodes[3].innerHTML = $dates[i].innerHTML;
        }
    }

    this.displayPublisher = function () {
        var $author = document.getElementsByClassName("post-author");

        for (var i = 0; i < blogs.length; i++) {
            $author[i].childNodes[1].innerHTML = blogs[i].getElementsByTagName("publisher")[0].childNodes[0].nodeValue;
        }
    }

    this.displayImg = function () {
        var $imgThumb = document.getElementsByClassName("post-thumb");

        for (var i = 0; i < blogs.length; i++) {
            $imgThumb[i].childNodes[1].childNodes[0].src = blogs[i].getElementsByTagName("imgThumb")[0].childNodes[0].nodeValue;
        }
    }
    this.getBlog = function () {
        var $read = document.getElementsByClassName("read-more");
        var $readmore = document.getElementsByClassName("more-link");
        var $post = document.getElementsByClassName("post-title");
        var $postThumb = document.getElementsByClassName("post-thumb");

        for (var i = 0; i < blogs.length; i++) {
            $read[i].href = blogs[i].getElementsByTagName("link")[0].childNodes[0].nodeValue;
            $post[i].childNodes[0].href = $read[i].href;
            $postThumb[i].childNodes[1].href = $read[i].href;
            console.log($postThumb[i].childNodes[1].href);
            $readmore[i].href = $read[i].href;
        }
    }

    this.getComments = function () {
        var $comments = document.getElementsByClassName("post-comments-link");
        for (var i = 0; i < blogs.length; i++) {
            $comments[i].childNodes[1].href = blogs[i].getElementsByTagName("link")[0].childNodes[0].nodeValue + "#disqus_thread";
            console.log($comments[i].childNodes[1]);
        }
    }
};

var blogView = {
    init: function () {
        getCurrentBlog();

    }
};

var blg = new blogController();
blg.init();

var curPage = 1;
var btn_next = document.getElementById("btn_next");
var btn_prev = document.getElementById("btn_prev");

function showPage(id) {
    document.getElementById('p' + id).classList.remove("current");
   
    var totalContent = blg.blogCount;
    var noPerPage = 9;
    var totalNoOfPages = 0;
    if (totalContent % noPerPage == 0) {
        totalNoOfPages = Math.floor(totalContent / noPerPage);
    }
    else {
        totalNoOfPages = Math.floor((totalContent / noPerPage) + 1);
    }
    for (var i = 1; i <= totalNoOfPages; i++) {

        if (document.getElementById('page' + i)) {
            document.getElementById('page' + i).style.display = 'none';
            curPage = i;
        }
    }
    if (document.getElementById('page' + id)) 
        document.getElementById('page' + id).style.display = 'block';
         clearActive();
         document.getElementById('p' + id).classList.add("current");
    
     
}

function clearActive() {
    var ar = document.getElementsByClassName("current");
    for (var i = 0; i < ar.length; i++) {
        var el = ar[i];
        el.classList.remove("current");
    }
}




function prevPage() {

    if (curPage > 1) {
        showPage(curPage - 1);
    }
}

function nextPage() {

    if (curPage < numPages())
        showPage(curPage + 1);
    else
        showPage(curPage);
    
}

function numPages() {
    return Math.ceil(blg.blogCount / 9);
}


//$('#navigation > ul.pagination li').click(function (e) {
//    $('.nav li.active').removeClass('active');
//    var $this = $(this);
//    $this.addClass('active');
//    e.preventDefault();
//});
//function changePage(page) {
    

//    // Validate page
//    if (curpage < 1) curPage = 1;
//    if (page > numPages()) page = numPages();

//    if (current_page>1) {
//        btn_prev.style.visibility = "visible";
//        //btn_next.style.visibility = "hidden"

//    } 
//    //else {
//    //    btn_prev.style.visibility = "visible";
//    //}

//    if (page == numPages()) {
//        btn_next.style.visibility = "hidden";
//    } else {
//        btn_next.style.visibility = "visible";
//    }
//}



//window.onload = function () {
//    changePage(1);
//};