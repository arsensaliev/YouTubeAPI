window.addEventListener('DOMContentLoaded', () => {
    let key = 'AIzaSyB2rUIerQGg1Tbg6V9GxMD0M0cj-0R6-k4';
    let playlistId = 'PLvoBekrlHDgTR_I-dQQ7VxZMJ0GXiyfud';
    let URL = 'https://www.googleapis.com/youtube/v3/playlistItems';
    let options = {
        part: 'snippet',
        key: key,
        maxResults: 20,
        playlistId: playlistId
    };

    loadVids();

    function loadVids() {
        $.getJSON(URL, options, function (data) {
            console.log(data);
            let id = data.items[0].snippet.resourceId.videoId;
            mainVid(id);
            resultsLoop(data);
        })
    }

    function mainVid(id) {
        $('#video').html(`
        <iframe width="550" height="305" src="https://www.youtube.com/embed/${id}" frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>`)
    }

    function resultsLoop(data) {
        $.each(data.items, (i, item) => {

            let preview = item.snippet.thumbnails.medium.url;
            let title = item.snippet.title;
            let descr = item.snippet.description.substring(0, 100);
            let vid = item.snippet.resourceId.videoId;
            console.log(vid);

            $('main').append(`
        <article class="other-video" data-key="${vid}">
            <div class="preview" data-key="${vid}">
                <img src="${preview}"
                     alt="" data-key="${vid}">
            </div>
            <div class="more-info" data-key="${vid}">
                <h4 class="title" data-key="${vid}">${title}</h4>
                <p class="desc" data-key="${vid}">${descr}</p>
            </div>
        </article>
        `)
        });
    }

    $('main').on('click', 'article', (e) => {
        let id = e.target.getAttribute('data-key');
        mainVid(id);
    })
});