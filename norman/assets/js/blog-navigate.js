var blogData = {
    currentBlog: null,
    blog: [
               
             {
                 id: 13,
                 title: 'Your New Response Manager on Slack-AceBot',
                 link: 'your-new-response-manager-on-slack.html'

             },
             {
                 id: 12,
                 title: 'Can checklists transform your life? Yes, they can!',
                 link: 'can-checklists-transform-you-life.html'

             },
            {
                id: 11,
                title: 'Ace, the only productivity bot on Slack, you will ever need!',
                link: 'ace-the-only-productivity-bot-on-slack.html'
            },
            
             {
                 id: 10,
                 title: 'What Would YOU Like to Add to Ace?',
                 link: 'what-would-you-like-to-add-to-ace.html'

             },
       

         {
             id: 9,
             title: 'Top Slackbots to Add to Your Slack Channel',
             link: 'top-slackbots-to-add-to-your-slack-channel.html'
         },

        {
            id: 8,
            title: 'How Slack Is Replacing Internal Email For Teams',
            link: 'how-slack-is-replacing-internal-email-or-teams.html'
        },

        {
             id: 7,
              title: 'The New Way To Manage Your Expenses',
              link: 'the-new-way-to-manage-your-expenses.html'

        },

       {
            id: 6,
            title: "The New Destination to Create Your Online Community",
            link: 'the-new-destination-to-create-your-online-community.html'

       },

        {

            id: 5,
            title: "How Slack Helps Strengthen Your Team",
            link: 'how-slack-helps-strengthen-your-team.html'

       },

    {

    id: 4,
    title: "What You Need To Know About Microsoft Teams",
    link: 'what-you-need-to-know-about-microsoft-teams.html'

    },
    
    {

    id: 3,
    title: "A recap of 2016: The year of the bots",
    link: 'the-year-of-the-bots.html'

    },
    {

    id: 2,
    title: "How to build a Lean and Productive Sales Team using Slack",
    link: 'lean-and-productive-sales-team-using-slack.html'

    },
    {

    id: 1,
    title: "Kickstart the habit of ‘Saving’",
    link: 'kickstart-the-habit-of-saving.html'

   }


]
};

(function () {
    this.setCurrentBlog = function () {
        for (var index = 0; index < blogData.blog.length; index++) {
            console.log(document.title, blogData.blog[index].title);
            if (blogData.blog[index].title === document.title) {
                blogData.currentBlog = blogData.blog[index];
            }
        }
    };

    this.getCurrentBlog = function () {
        return blogData.currentBlog;
    }

    this.getPrevBlog = function () {
        var currentID = blogData.currentBlog.id;
        console.log(currentID);
        if (currentID - 1 != 0) {
            var prevBlog = currentID - 1;
        }
        else
            prevBlog = 1;
        console.log(prevBlog);
        var blogLength = blogData.blog.length;
        for (var i = 0; i < blogLength; i++) {
            if (blogData.blog[i].id === prevBlog) {
                return blogData.blog[i].link;
            }
        }
    }
    this.getNextBlog = function () {
        var currentID = blogData.currentBlog.id;
        console.log(currentID);
        var blogLength = blogData.blog.length;
        if (currentID + 1 <= blogLength) {
            var nextBlog = currentID + 1;
        }
        else
            nextBlog = currentID;
        console.log(nextBlog);
        for (var i = 0; i < blogLength; i++) {
            if (blogData.blog[i].id === nextBlog) {
                return blogData.blog[i].link;
            }
        }
    }

    this.navigatePrev = function () {
        var prev;
        var $navPrev = document.getElementsByClassName("nav-previous");
        for (var i = 0; i < $navPrev.length; i++) {
            prev = $navPrev[i];
            $navPrev[i].childNodes[0].addEventListener('click', (function (prev) {
                return function () {
                    prev.childNodes[0].href = getPrevBlog();
                    console.log(prev.childNodes[0].href);
                };
            })(prev));
        }
    }

    this.navigateNext = function () {
        var next;
        var $navNext = document.getElementsByClassName("nav-next");
        for (var i = 0; i < $navNext.length; i++) {
            next = $navNext[i];
            $navNext[i].childNodes[0].addEventListener('click', (function (next) {
                return function () {
                    next.childNodes[0].href = getNextBlog();
                    console.log(next.childNodes[0].href);
                };
            })(next));
        }
    }

    setCurrentBlog();
    navigatePrev();
    navigateNext();
})();