//listen to form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);
// saving bookmark
function saveBookmark(e){
    // get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;
    var bookmark = {
        name: siteName,
        url: siteUrl
    }
    if ((!siteName) | (!siteUrl)){
        alert('Enter a valid values please !')
        return false;
    }
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if(!siteUrl.match(regex)){
        alert('Use a valid URL please !')
        return false;
    }
    var bookmarks = [];
    // local storage
    // localStorage.setItem('test', 'hello world');
    // console.log(localStorage.getItem('test'));
    // localStorage.removeItem('test');
    if (localStorage.getItem('bookmarks')=== null){
        
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }else{
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    
    document.getElementById('myForm').reset();
    fetchBookmarks();
    // prevent form from submitting
    e.preventDefault();
}
function deleteBookmark(url){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(i=0;i<bookmarks.length;i++){
        if (bookmarks[i].url === url){
            bookmarks.splice(i,1);    
        }
        
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}
function fetchBookmarks(){
    var name,url;
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    var bookmarkResults = document.getElementById('bookmarkResults');
    bookmarkResults.innerHTML = '';
    for(i=0;i<bookmarks.length;i++){
        name = bookmarks[i].name;
        url = bookmarks[i].url;
        bookmarkResults.innerHTML += '<div class="well"><h3>'+ name +
        '  <a class="btn btn-default" target="_blank" href="'+ url +'">Visit</a>'+
        '  <a onclick= "deleteBookmark(\''+ url +'\')" class="btn btn-danger" href="#">Delete</a>'+
        '</h3></div>';
        
    }

}