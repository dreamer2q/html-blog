var baseUrl = "https://api.dreamer2q.wang/api";

var config = {
    suffix: "dreamer2q's blog",
};

const renderer = {
    image(href, title, text) {
        return `<img src="${href}" referrerPolicy="no-referrer">`
    }
}


function generateArticle(article) {
    let href = `article.html?slug=${article.slug}`;
    return `<article class="post">
    <div class="post-header">
        <h1 class="post-title">
            <a class="post-title-link" href="${href}">${article.title}</a>
        </h1>
        <div class="post-meta">
            <span class="post-time">
                <span class="post-meta-item-icon">
                    <i class="fa fa-calendar-o"></i>
                </span>
                <span class="post-meta-item-text">发布于</span>
                <span class="post-meta-item-time">${article.first_published_at}</span>
            </span>
            <span class="post-category">
                <span class="post-meta-divider">|</span>
                <span class="post-meta-item-icon"><i class="fa fa-folder-o"></i></span>
                <span class="post-meta-item-text">分类于</span>
                <span><a href="#"><span>Report</span></a></span>
            </span>
        </div>
    </div>
    <div class="post-body">
        <div class="post-brief-wrapper">
            ${article.description}
        </div>
        <div class="post-button">
            <a href="${href}" class="btn">阅读全文 »</a>
        </div>
    </div>
    <div class="post-footer">
        <div class="post-eof"></div>
    </div>
</article>`;
}

function generateDetail(article) {
    marked.use({ renderer });
    let markdownHtml = marked(article.body);
    return `<article class="post">
    <div class="post-header">
        <h1 class="post-title">
            ${article.title}
        </h1>
        <div class="post-meta">
            <span class="post-time">
                <span class="post-meta-item-icon">
                    <i class="fa fa-calendar-o"></i>
                </span>
                <span class="post-meta-item-text">发布于</span>
                <span class="post-meta-item-time">${article.first_published_at}</span>
            </span>
            <span class="post-category">
                <span class="post-meta-divider">|</span>
                <span class="post-meta-item-icon"><i class="fa fa-folder-o"></i></span>
                <span class="post-meta-item-text">分类于</span>
                <span><a href="#"><span>Report</span></a></span>
            </span>
        </div>
    </div>
    <div class="post-detail markdown-body line-numbers">
            ${markdownHtml}
    </div>
    <div class="post-footer">
    </div>
</article>`;
}

function parseResp(resp) {
    if (resp.code != 200) {
        throw `error ${resp.code} : ${resp.message}`;
    }
    return resp.data;
}

function parseQuery(queryString) {
    var query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}

function setPageTitle(title) {
    $('title').text(`${title} - ${config.suffix}`);
}

function initCommont(article) {
    new DisqusJS({
        shortname: 'dreamer2q',
        siteName: 'dreamer2q',
        identifier: article.identifier,
        // url: document.location.origin + document.location.pathname + document.location.search,
        title: article.title,
        api: 'https://disqus.dreamer2q.wang/api/',
        apikey: 'KeLEEO3J0n5QbVXBATtOQ8dJWQJeST2cZAdle6lv3XAo6uLUnUluVbn6bCAfB7gL',
        admin: 'dreamer2q',
        adminLabel: ''
    });
}

$(document).ready(function () {
    // 首先获取导航栏距离浏览器顶部的高度
    // var top = $('.nav').offset().top;

    let top = 300;
    //开始监控滚动栏scroll
    $(document).scroll(function () {
        //获取当前滚动栏scroll的高度并赋值
        var scrTop = $(window).scrollTop();
        //开始判断如果导航栏距离顶部的高度等于当前滚动栏的高度则开启悬浮
        if (scrTop >= top) {
            $('#person-bar').addClass('affix');
            // .css({ 'position': 'fixed', 'top': '12px' });
        } else {//否则清空悬浮
            $('#person-bar').removeClass('affix');
        }
    });
});
