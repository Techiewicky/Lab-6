// Simple cookie functions
function setCookie(name, value, days) {
    let d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    document.cookie = name + "=" + value + ";expires=" + d.toUTCString() + ";path=/";
}

function getCookie(name) {
    let cname = name + "=";
    let cookies = document.cookie.split(';');
    for(let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(cname) == 0) {
            return cookie.substring(cname.length, cookie.length);
        }
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

// Initialize page with cookies
let likeCount = parseInt(getCookie("likeCount") || 100);
let dislikeCount = parseInt(getCookie("dislikeCount") || 20);
let comments = JSON.parse(getCookie("comments") || '[]');

document.getElementById('likeCount').textContent = likeCount;
document.getElementById('dislikeCount').textContent = dislikeCount;
comments.forEach(comment => addCommentToPage(comment));

// Like and Dislike Buttons
document.getElementById('likeBtn').addEventListener('click', () => {
    likeCount++;
    document.getElementById('likeCount').textContent = likeCount;
    setCookie("likeCount", likeCount, 7);
});

document.getElementById('dislikeBtn').addEventListener('click', () => {
    dislikeCount++;
    document.getElementById('dislikeCount').textContent = dislikeCount;
    setCookie("dislikeCount", dislikeCount, 7);
});

// Comment submission
document.getElementById('submitCommentBtn').addEventListener('click', () => {
    let comment = document.getElementById('commentInput').value;
    if (comment) {
        comments.push(comment);
        addCommentToPage(comment);
        setCookie("comments", JSON.stringify(comments), 7);
        document.getElementById('commentInput').value = '';
    }
});

document.getElementById('clearCommentBtn').addEventListener('click', () => {
    document.getElementById('commentInput').value = '';
});

// Reset button
document.getElementById('resetBtn').addEventListener('click', () => {
    likeCount = 100;
    dislikeCount = 20;
    comments = [];
    
    document.getElementById('likeCount').textContent = likeCount;
    document.getElementById('dislikeCount').textContent = dislikeCount;
    document.getElementById('commentsDisplay').innerHTML = '';
    
    deleteCookie("likeCount");
    deleteCookie("dislikeCount");
    deleteCookie("comments");
});

// Helper function to show comments
function addCommentToPage(comment) {
    let p = document.createElement('p');
    p.textContent = comment;
    document.getElementById('commentsDisplay').appendChild(p);
}
