var ratingScore = 0; // all user-input ratings added together
var totalRatings = 0; // the total number of user-input ratings
function openWindow() {
    var element = document.getElementById("input-review");
    if (element != null) {
        element.style.display = "block";
    }
}
function closeWindow() {
    //resets the values of the name and comment text boxes
    var commentValue = document.getElementById("comment");
    var nameValue = document.getElementById("name");
    commentValue.value = "";
    nameValue.value = "";
    //closes the pop-up "write a review" window
    var element = document.getElementById("input-review");
    if (element != null) {
        element.style.display = "none";
    }
}
function appendReview() {
    //ensures that all required fields have been entered before appending a review
    if (validateForm()) {
        formatReview();
        countReviews();
        updateRating();
        closeWindow();
    }
}
function validateForm() {
    var element = document.getElementById("name");
    var inputName = element.value;
    //ensures that name is not null, undefined, or empty
    if (inputName == null || inputName == undefined || inputName == "") {
        //alerts the user that they must enter a name and prevents review from being appended
        alert("Please enter a name!");
        return false;
    }
    var firstStar = document.getElementById('1');
    var secondStar = document.getElementById('2');
    var thirdStar = document.getElementById('3');
    var fourthStar = document.getElementById('4');
    var fifthStar = document.getElementById('5');
    //ensures that at least ONE of the radio buttons has been selected
    if (firstStar != null) {
        if (firstStar.checked != true
            && secondStar.checked != true
            && thirdStar.checked != true
            && fourthStar.checked != true
            && fifthStar.checked != true) {
            //if not selected, it alerts the user to enter a star rating
            alert("Please select a star rating (1-5)!");
            return false;
        }
    }
    //validates the form if name and rating have been selected
    return true;
}
function countReviews() {
    var current = document.getElementById("review-count");
    if (current != null) {
        //retrieves the default, starting number of reviews 
        current.innerHTML.slice(0, 3);
        var count = parseInt(current.innerHTML);
        //increments number of reviews as a new review is added
        count++;
        //adds the string "review(s) to the total number of reviews"
        var final = count.toString() + " review(s)";
        //updates the number that displays review count on the page
        current.innerHTML = final;
    }
}
function formatReview() {
    var _a, _b;
    //creating/adding classes to divs and appending them appropriately
    var pastReviewsDiv = document.createElement("div");
    pastReviewsDiv.classList.add("past-reviews");
    var reviewDiv = document.createElement("div");
    reviewDiv.classList.add("review");
    pastReviewsDiv.append(reviewDiv);
    var reviewTitleDiv = document.createElement("div");
    reviewTitleDiv.classList.add("review-title");
    reviewDiv.append(reviewTitleDiv);
    //getting the value input in the name field and adding it to the page
    var nameInput = (_a = document.getElementById("name")) === null || _a === void 0 ? void 0 : _a.value;
    if (nameInput != null) {
        var name_1 = document.createElement("h3");
        name_1.innerHTML = nameInput;
        reviewTitleDiv.append(name_1);
    }
    var reviewRatingDiv = document.createElement("div");
    reviewRatingDiv.classList.add("review-rating");
    reviewTitleDiv.append(reviewRatingDiv);
    //getting the comment input in the comment field and adding it to the page
    var commentInput = (_b = document.getElementById("comment")) === null || _b === void 0 ? void 0 : _b.value;
    if (commentInput != null) {
        var comment = document.createElement("p");
        comment.innerHTML = commentInput;
        reviewDiv.append(comment);
    }
    //getting the current date and appending it tto the review
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth();
    var year = currentDate.getFullYear();
    var todaysDate = "Date Posted: " + (month + 1) + "/" + day + "/" + year;
    var dateOfReview = document.createElement("p");
    dateOfReview.classList.add("date");
    dateOfReview.innerHTML = todaysDate;
    reviewDiv.append(dateOfReview);
    var starOnReview = document.createElement("p");
    var oneStar = document.getElementById('1');
    var twoStars = document.getElementById('2');
    var threeStars = document.getElementById('3');
    var fourStars = document.getElementById('4');
    var fiveStars = document.getElementById('5');
    //determining which radio button was selecting 
    if (oneStar != null) {
        if (oneStar.checked == true) {
            //adding the selected star rating to the review
            starOnReview.innerHTML = "???";
            reviewRatingDiv.append(starOnReview);
            //adding user-input rating to the overall rating 
            ratingScore += 1;
        }
    }
    if (twoStars != null) {
        if (twoStars.checked == true) {
            starOnReview.innerHTML = "??????";
            reviewRatingDiv.append(starOnReview);
            ratingScore += 2;
        }
    }
    if (threeStars != null) {
        if (threeStars.checked == true) {
            starOnReview.innerHTML = "?????????";
            reviewRatingDiv.append(starOnReview);
            ratingScore += 3;
        }
    }
    if (fourStars != null) {
        if (fourStars.checked == true) {
            starOnReview.innerHTML = "????????????";
            reviewRatingDiv.append(starOnReview);
            ratingScore += 4;
        }
    }
    if (fiveStars != null) {
        if (fiveStars.checked == true) {
            starOnReview.innerHTML = "???????????????";
            reviewRatingDiv.append(starOnReview);
            ratingScore += 5;
        }
    }
    var list = document.getElementById("review-list");
    if (list != null) {
        list.append(reviewDiv);
        //incrementing total number of reviews now that a new review has been added
        totalRatings++;
    }
}
function updateRating() {
    var element = document.getElementById("product-stars");
    //calculating the star rating (1-5) based on ratings and number of reviews
    var totalRating = ratingScore / totalRatings;
    //appending a 1-star (lowest possible) rating to the review if necessary
    if (1 >= totalRating && totalRating < 1.5) {
        if (element != undefined) {
            element.innerHTML = "";
            var oneStar = document.createElement("i");
            oneStar.className = "fas fa-star";
            element.append(oneStar);
            var twoStar = document.createElement("i");
            twoStar.className = "far fa-star";
            element.append(twoStar);
            var threeStar = document.createElement("i");
            threeStar.className = "far fa-star";
            element.append(threeStar);
            var fourStar = document.createElement("i");
            fourStar.className = "far fa-star";
            element.append(fourStar);
            var fiveStar = document.createElement("i");
            fiveStar.className = "far fa-star";
            element.append(fiveStar);
        }
    }
    //appending a 1.5-star rating to the review if necessary
    else if (1.5 <= totalRating && totalRating < 2) {
        if (element != undefined) {
            element.innerHTML = "";
            var oneStar = document.createElement("i");
            oneStar.className = "fas fa-star";
            element.append(oneStar);
            var twoStar = document.createElement("i");
            twoStar.className = "fas fa-star-half-alt";
            element.append(twoStar);
            var threeStar = document.createElement("i");
            threeStar.className = "far fa-star";
            element.append(threeStar);
            var fourStar = document.createElement("i");
            fourStar.className = "far fa-star";
            element.append(fourStar);
            var fiveStar = document.createElement("i");
            fiveStar.className = "far fa-star";
            element.append(fiveStar);
        }
    }
    //appending a 2-star rating to the review if necessary
    else if (2 <= totalRating && totalRating < 2.5) {
        if (element != undefined) {
            element.innerHTML = "";
            var oneStar = document.createElement("i");
            oneStar.className = "fas fa-star";
            element.append(oneStar);
            var twoStar = document.createElement("i");
            twoStar.className = "fas fa-star";
            element.append(twoStar);
            var threeStar = document.createElement("i");
            threeStar.className = "far fa-star";
            element.append(threeStar);
            var fourStar = document.createElement("i");
            fourStar.className = "far fa-star";
            element.append(fourStar);
            var fiveStar = document.createElement("i");
            fiveStar.className = "far fa-star";
            element.append(fiveStar);
        }
    }
    //appending a 2.5-star rating to the review if necessary
    else if (2.5 <= totalRating && totalRating < 3) {
        if (element != undefined) {
            element.innerHTML = "";
            var oneStar = document.createElement("i");
            oneStar.className = "fas fa-star";
            element.append(oneStar);
            var twoStar = document.createElement("i");
            twoStar.className = "fas fa-star";
            element.append(twoStar);
            var threeStar = document.createElement("i");
            threeStar.className = "fas fa-star-half-alt";
            element.append(threeStar);
            var fourStar = document.createElement("i");
            fourStar.className = "far fa-star";
            element.append(fourStar);
            var fiveStar = document.createElement("i");
            fiveStar.className = "far fa-star";
            element.append(fiveStar);
        }
    }
    //appending a 3-star rating to the review if necessary
    else if (3 <= totalRating && totalRating < 3.5) {
        if (element != undefined) {
            element.innerHTML = "";
            var oneStar = document.createElement("i");
            oneStar.className = "fas fa-star";
            element.append(oneStar);
            var twoStar = document.createElement("i");
            twoStar.className = "fas fa-star";
            element.append(twoStar);
            var threeStar = document.createElement("i");
            threeStar.className = "fas fa-star";
            element.append(threeStar);
            var fourStar = document.createElement("i");
            fourStar.className = "far fa-star";
            element.append(fourStar);
            var fiveStar = document.createElement("i");
            fiveStar.className = "far fa-star";
            element.append(fiveStar);
        }
    }
    //appending a 3.5-star rating to the review if necessary
    else if (3.5 <= totalRating && totalRating < 4) {
        if (element != undefined) {
            element.innerHTML = "";
            var oneStar = document.createElement("i");
            oneStar.className = "fas fa-star";
            element.append(oneStar);
            var twoStar = document.createElement("i");
            twoStar.className = "fas fa-star";
            element.append(twoStar);
            var threeStar = document.createElement("i");
            threeStar.className = "fas fa-star";
            element.append(threeStar);
            var fourStar = document.createElement("i");
            fourStar.className = "fas fa-star-half-alt";
            element.append(fourStar);
            var fiveStar = document.createElement("i");
            fiveStar.className = "far fa-star";
            element.append(fiveStar);
        }
    }
    //appending a 4-star rating to the review if necessary
    else if (4 <= totalRating && totalRating < 4.5) {
        if (element != undefined) {
            element.innerHTML = "";
            var oneStar = document.createElement("i");
            oneStar.className = "fas fa-star";
            element.append(oneStar);
            var twoStar = document.createElement("i");
            twoStar.className = "fas fa-star";
            element.append(twoStar);
            var threeStar = document.createElement("i");
            threeStar.className = "fas fa-star";
            element.append(threeStar);
            var fourStar = document.createElement("i");
            fourStar.className = "fas fa-star";
            element.append(fourStar);
            var fiveStar = document.createElement("i");
            fiveStar.className = "far fa-star";
            element.append(fiveStar);
        }
    }
    //appending a 4.5-star rating to the review if necessary
    else if (4.5 <= totalRating && totalRating < 5) {
        if (element != undefined) {
            element.innerHTML = "";
            var oneStar = document.createElement("i");
            oneStar.className = "fas fa-star";
            element.append(oneStar);
            var twoStar = document.createElement("i");
            twoStar.className = "fas fa-star";
            element.append(twoStar);
            var threeStar = document.createElement("i");
            threeStar.className = "fas fa-star";
            element.append(threeStar);
            var fourStar = document.createElement("i");
            fourStar.className = "fas fa-star";
            element.append(fourStar);
            var fiveStar = document.createElement("i");
            fiveStar.className = "fas fa-star-half-alt";
            element.append(fiveStar);
        }
    }
    //appending a 5-star (highest possible) rating to the review if necessary
    else if (5 <= totalRating) {
        if (element != undefined) {
            element.innerHTML = "";
            var oneStar = document.createElement("i");
            oneStar.className = "fas fa-star";
            element.append(oneStar);
            var twoStar = document.createElement("i");
            twoStar.className = "fas fa-star";
            element.append(twoStar);
            var threeStar = document.createElement("i");
            threeStar.className = "fas fa-star";
            element.append(threeStar);
            var fourStar = document.createElement("i");
            fourStar.className = "fas fa-star";
            element.append(fourStar);
            var fiveStar = document.createElement("i");
            fiveStar.className = "fas fa-star";
            element.append(fiveStar);
        }
    }
}
