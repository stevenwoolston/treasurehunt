
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

function navigateSlide(slideId) {
    toggleLoader(true);

    if (slideId > 1) {
        $(".btn-navigate-left").removeClass("hidden");
    } else {
        $(".btn-navigate-left").addClass("hidden");
    }

    if (slideId == totalSlides) {
        $("#begin").addClass("hidden");
    } else {
        $("#begin").removeClass("hidden");
    }

    $(".slide-body").addClass("hidden");
    $("#slide" + slideId).removeClass("hidden");
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
                var featured_img = item._embedded["wp:featuredmedia"][0].source_url;
                console.log(featured_img);
                var $slide_body =
                    "<div id='slide" + (index + 1) + "' class='slide-body hidden' ";
                $slide_body += "style='background-image:url(" + featured_img + ");'>";
                $slide_body += "<div class='slide-content'>" + content + "</div>";
                $slide_body += "</div>";

                $("#slides").append($slide_body);
            });

            currentSlide = 1;
            navigateSlide(currentSlide);
            toggleLoader(false);
            $("#begin").removeClass("hidden");
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