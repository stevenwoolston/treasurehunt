
var currentSlide = 1;
$(".stopwatch-modal").on("shown.bs.modal", function () {
    startTimer();
});

$(".stopwatch-modal").on("hide.bs.modal", function () {
    stopTimer();
});

$(".modal-footer .btn").on("click", function () {
    currentSlide++;
    navigateSlide(currentSlide);
});

$(".btn-navigate-left").on("click", function () {
    currentSlide--;
    navigateSlide(currentSlide);
});

$(".btn-show-clue").on("click", function(){
    $("#begin").removeClass("hidden");
    $(".slide-content").addClass("fadeIn");
    $(this).addClass("hidden");
});

function navigateSlide(slideId) {
    toggleLoader(true);

    if (slideId > 1) {
        $(".btn-navigate-left").removeClass("hidden");
    } else {
        $(".btn-navigate-left").addClass("hidden");
    }

    $(".slide-body").addClass("hidden");
    $(".slide-body .slide-content").removeClass("fadeIn");
    $("#slide" + slideId).removeClass("hidden");

    if (slideId == totalSlides) {
        $("#begin").addClass("hidden");
    } else {
        $(".btn-show-clue").removeClass("hidden");
        $("#begin").addClass("hidden");
    }

    currentSlide = slideId;

    toggleLoader(false);
}

function getWP_Data() {
    var categoryId = 2,
        $wpURL = `https://treasurehunt.woolston.com.au/wp-json/wp/v2/posts?_embed&categories=${categoryId}&orderby=title&order=asc&per_page=20`;

    $.ajax({
        type: "GET",
        url: $wpURL,
        success: function (data, textStatus, request) {
            totalSlides = data.length;
            if (totalSlides == 0) {
                toggleLoader(false);
                return true;
            }

            $.each(data, function (index, value) {
                var item = data[index];
                var title = item.title.rendered;
                var content = item.content.rendered;
                var featured_img = `${item._embedded["wp:featuredmedia"][0].source_url}?v=8`;
                console.log(featured_img);
                var $slide_body =
                    `<div id="slide${index + 1}" class="slide-body hidden"
                        style="background-image:url(${featured_img});">
                        <div class="slide-content">${ content }</div>
                    </div>`;

                $("#slides").append($slide_body);
            });

            navigateSlide(currentSlide);
            toggleLoader(false);
            $(".btn-show-clue").removeClass("hidden");
            $("#begin").addClass("hidden");
        }
    });
}

function toggleLoader(enable) {
    if (enable) {
        $(".loader").removeClass("hidden");
        return;
    }

    $(".loader").addClass("hidden");
}