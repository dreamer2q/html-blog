var baseUrl = "http://localhost:8080/api";

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
        <div class="post-button center">
            <a href="${href}" class="btn">阅读全文 »</a>
        </div>
    </div>
    <div class="post-footer">
        <div class="post-eof"></div>
    </div>
</article>`;
}

function checkResp(resp) {
    if (resp.code != 200) {
        throw `error ${resp.code} : ${resp.message}`;
    }
}