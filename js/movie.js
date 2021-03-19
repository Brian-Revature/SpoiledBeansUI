
window.onload = () => {
    //getAllMovies();
    getReviews();
    //getMyReviews();
}

//Get all movies from DB passes to drop down menu
function getAllMovies() {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('spoiledBeans-token', window.localStorage.getItem('token'));

    let url = 'http://Spoiledbeansapi-env.eba-mnv79iji.us-east-2.elasticbeanstalk.com/movies';
    //let url = 'http://Spoiledbeansapi-env.eba-mnv79iji.us-east-2.elasticbeanstalk.com/users/myfavorites';

     fetch(url, {
                method: 'GET',
                headers: headers
            })
                .then(response => response.json())
                .then(result => {
                    //addMoviesToDropdown(result);
                    addSingleMovieToMovieDetails(result);
            });


}

function getReviews(){

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('spoiledBeans-token', window.localStorage.getItem('token'));

        //'http://Spoiledbeansapi-env.eba-mnv79iji.us-east-2.elasticbeanstalk.com/reviews/moviereviews'
        let url = new URL('http://Spoiledbeansapi-env.eba-mnv79iji.us-east-2.elasticbeanstalk.com/reviews/moviereviews')
        //let url = new URL('http://Spoiledbeansapi-env.eba-mnv79iji.us-east-2.elasticbeanstalk.com/reviews/moviereviewsbyrating')
        url.search = new URLSearchParams({
            //Movie clicked on from home page as query param
            //name: window.localStorage.getItem('movie'));
            //ascending: false,
            name: window.localStorage.getItem('movie')
        })


         fetch(url, {
                    method: 'GET',
                    headers: headers,
                })
                    .then(response => response.json())
                    .then(result => {
                        addReviewsToTable(result);
                });



}

//
//function addMoviesToDropdown(data) {
//
//    data.forEach(element => {
//
//         let select = document.getElementById("selectNumber");
//         let el = document.createElement("option");
//         el.textContent = element.name;
//         el.value = element.name;
//         console.log(el)
//         select.appendChild(el);
//
//    });
//
//}


function getReviewsByRatingDes(){

        //Test for clearing table
        document.getElementById("review-table-body").innerHTML="";

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('spoiledBeans-token', window.localStorage.getItem('token'));

        let url = new URL('http://Spoiledbeansapi-env.eba-mnv79iji.us-east-2.elasticbeanstalk.com/reviews/moviereviewsbyrating')
        url.search = new URLSearchParams({
            //Movie clicked on from home page as query param
            //name: window.localStorage.getItem('movie'));
            ascending: false,
            name: window.localStorage.getItem('movie')
        })


         fetch(url, {
                    method: 'GET',
                    headers: headers,
                })
                    .then(response => response.json())
                    .then(result => {
                        addReviewsToTable(result);
                });



}


function getReviewsByRatingAsc(){

        //Test for clearing table
        document.getElementById("review-table-body").innerHTML="";

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('spoiledBeans-token', window.localStorage.getItem('token'));

        let url = new URL('http://Spoiledbeansapi-env.eba-mnv79iji.us-east-2.elasticbeanstalk.com/reviews/moviereviewsbyrating')
        url.search = new URLSearchParams({
            //Movie clicked on from home page as query param
            //name: window.localStorage.getItem('movie'));
            ascending: true,
            name: window.localStorage.getItem('movie')
        })


         fetch(url, {
                    method: 'GET',
                    headers: headers,
                })
                    .then(response => response.json())
                    .then(result => {
                        addReviewsToTable(result);
                });

}

function getReviewsByTimeDes(){

        //Test for clearing table
        document.getElementById("review-table-body").innerHTML="";

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('spoiledBeans-token', window.localStorage.getItem('token'));

        let url = new URL('http://Spoiledbeansapi-env.eba-mnv79iji.us-east-2.elasticbeanstalk.com/reviews/moviereviewsbytime')
        url.search = new URLSearchParams({
            //Movie clicked on from home page as query param
            //name: window.localStorage.getItem('movie'));
            ascending: false,
            name: window.localStorage.getItem('movie')
        })


         fetch(url, {
                    method: 'GET',
                    headers: headers,
                })
                    .then(response => response.json())
                    .then(result => {
                        addReviewsToTable(result);
                });



}



function getReviewsByTimeAsc(){

        //Test for clearing table
        document.getElementById("review-table-body").innerHTML="";

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('spoiledBeans-token', window.localStorage.getItem('token'));

        let url = new URL('http://Spoiledbeansapi-env.eba-mnv79iji.us-east-2.elasticbeanstalk.com/reviews/moviereviewsbytime')
        url.search = new URLSearchParams({
            //Movie clicked on from home page as query param
            //name: window.localStorage.getItem('movie'));
            ascending: true,
            name: window.localStorage.getItem('movie')
        })


         fetch(url, {
                    method: 'GET',
                    headers: headers,
                })
                    .then(response => response.json())
                    .then(result => {
                        addReviewsToTable(result);
                });



}

function getMyReviews(){

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('spoiledBeans-token', window.localStorage.getItem('token'));


    let url = new URL('http://Spoiledbeansapi-env.eba-mnv79iji.us-east-2.elasticbeanstalk.com/reviews/myreviews')
     fetch(url, {
                method: 'GET',
                headers: headers,
            })
                .then(response => response.json())
                .then(result => {
                    console.log('Success:', result);
                    //Not ready yet
                    //addReviewsToMyTable(result);
            });

}

async function addSingleMovieToMovieDetails(data) {
    document.getElementById('movie-table-body').innerHTML = "";


    for (const element of data) {

        if(element.name==window.localStorage.getItem('movie')){

            let overallRating;

            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            headers.append('spoiledBeans-token', window.localStorage.getItem('token'));


            let url = new URL('http://Spoiledbeansapi-env.eba-mnv79iji.us-east-2.elasticbeanstalk.com/movies/name')
            url.search = new URLSearchParams({
                name: element.name
            })
            await fetch(url, {
                method: 'GET',
                headers: headers,
            })
                .then(response => response.json())
                .then(result => {
                    overallRating = result.rating;
                });

            //Creating elements
            let row1 = document.createElement('tr')
            let cellName = document.createElement('td');
            let cellGenre = document.createElement('td');
            let cellDirector = document.createElement('td');
            let cellYear = document.createElement('td');
            let cellSynopsis = document.createElement('td');
            let cellRating = document.createElement('td');


            //Populating with values
            cellName.innerText = element.name;
            cellDirector.innerText = element.director;
            cellGenre.innerText = element.genre;
            cellYear.innerText = element.year;
            cellSynopsis.innerText = element.synopsis;
            cellRating.innerText = overallRating.toFixed(1) + "/5.0";

            //Appending to html
            row1.appendChild(cellName);
            row1.appendChild(cellGenre);
            row1.appendChild(cellDirector);
            row1.appendChild(cellYear);
            row1.appendChild(cellSynopsis);
            row1.appendChild(cellRating);
            document.getElementById('movie-table-body').appendChild(row1);

        }

    }

}

function addReviewsToTable(data) {

        let userArr = [];
        let reviewInfoArr = [];
        let movieName;

        Object.keys(data).forEach(key => {
            if(key=="movie"){
                console.log("This is the movie: " + data[key]);
                movieName = data[key];
            }
            if(key=="reviews"){
                data["reviews"].forEach(review =>{
                        reviewInfoArr.push({review:review.review,rating:review.rating,time:review.reviewTime})

                })
            }
               if(key=="users"){

                            data["users"].forEach(users =>{
                                    userArr.push(users.username)
                                    //console.log(users.username)
                            })
                        }
        })

        let i;
        for(i=0;i<userArr.length;i++){

            let row1 = document.createElement('tr')
            //User will be an anchor to user's profile
            let cellUser = document.createElement('td');
            let cellMovie = document.createElement('td');
            let cellRating = document.createElement('td');
            let cellReview = document.createElement('td');
            let cellReviewTime = document.createElement('td');

            // //Populating with values
            cellUser.innerText = userArr[i];
            cellMovie.innerText = movieName;
            cellRating.innerText = reviewInfoArr[i].rating;
            cellReview.innerText = reviewInfoArr[i].review;
            cellReviewTime.innerText = reviewInfoArr[i].time.substring(0,10);

            //Appending to html
            row1.appendChild(cellUser);
            row1.appendChild(cellMovie);
            row1.appendChild(cellRating);
            row1.appendChild(cellReview);
            row1.appendChild(cellReviewTime);
            document.getElementById('review-table-body').appendChild(row1);

        }

        getAllMovies();

}

//Not working yet, need to parse differently than the other
function addReviewsToMyTable(data) {

        let userArr = [];
        let reviewInfoArr = [];
        let movieName;

        Object.keys(data).forEach(key => {
            if(key=="movie"){
                console.log("This is the movie: " + data[key]);
                movieName = data[key];
            }
            if(key=="reviews"){
                data["reviews"].forEach(review =>{
                        reviewInfoArr.push({review:review.review,rating:review.rating,time:review.reviewTime})

                })
            }
               if(key=="users"){

                            data["users"].forEach(users =>{
                                    userArr.push(users.username)
                                    //console.log(users.username)
                            })
                        }
        })

        let i;
        for(i=0;i<userArr.length;i++){

            let row1 = document.createElement('tr')
            //User will be an anchor to user's profile
            let userAnchor = document.createElement('a')
            let cellMovie = document.createElement('td');
            let cellRating = document.createElement('td');
            let cellReview = document.createElement('td');
            let cellReviewTime = document.createElement('td');


            //Anchor for movie name
            userAnchor.href = './index.html';
            userAnchor.id = userArr[i];
            //Method to get name of clicked user
            userAnchor.addEventListener("click",() =>  grabUser(event.srcElement.id));

            //Populating with values
            userAnchor.innerText = userArr[i];
            cellMovie.innerText = movieName;
            cellRating.innerText = reviewInfoArr[i].rating;
            cellReview.innerText = reviewInfoArr[i].review;
            cellReviewTime.innerText = reviewInfoArr[i].time.substring(0,10);

            //Appending to html
            row1.appendChild(userAnchor);
            row1.appendChild(cellMovie);
            row1.appendChild(cellRating);
            row1.appendChild(cellReview);
            row1.appendChild(cellReviewTime);
            document.getElementById('my-review-table-body').appendChild(row1);
        }
}

function grabUser(clicked_id){

    window.localStorage.setItem('user', clicked_id);
    //alert(clicked_id);
}

function addUpdateReview(){

    let url = 'http://Spoiledbeansapi-env.eba-mnv79iji.us-east-2.elasticbeanstalk.com/reviews/addreview';
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('spoiledBeans-token', window.localStorage.getItem('token'));

    //Review data
    let reviewText = document.getElementById('review').value;
    let e = document.getElementById("selectNumber");
    let ratingNum = e.value;
    console.log("Did the review get got?: "+ reviewText);
    document.getElementById('review').innerText = "";

    //let loginInfo = document.querySelectorAll("input");

        let reviewDTO = {

            movie:{name:window.localStorage.getItem('movie')},
            review:{review:reviewText, rating:ratingNum}
            //username:loginInfo.item(0).value,
            //password:loginInfo.item(1).value
        };

        fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(reviewDTO)
        })
            .then(response => {
            console.log("Updated review");
            console.log(response);
            document.getElementById("review-table-body").innerHTML="";
                //state.token = response.headers.get("spoiledBeans-token");
                //window.localStorage.setItem('token', response.headers.get("spoiledBeans-token"));

        })
            .then(() => getReviews());

}

document.getElementById('reviews-by-rating-des').addEventListener('click', getReviewsByRatingDes);
document.getElementById('reviews-by-rating-asc').addEventListener('click', getReviewsByRatingAsc);
document.getElementById('reviews-by-time-des').addEventListener('click', getReviewsByTimeDes);
document.getElementById('reviews-by-time-asc').addEventListener('click', getReviewsByTimeAsc);
document.getElementById("add-review").addEventListener('click', addUpdateReview);
