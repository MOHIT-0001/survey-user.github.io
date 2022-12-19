import { db } from "./firebase.js";
window.addEventListener("load", read);

function read() {
 // console.log(localStorage.getItem(JSON.parse(email)));
  if (localStorage.getItem("email")) {
    var email = localStorage.getItem("email");
    var object;
    var id;
    function reading() {
      var type = location.search.split("?type=")[1]?location.search.split("?type=")[1]:localStorage.getItem("type");
      console.log(type);
        db.collection("Survey-questions")
          .where("type", "==", type)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              document.getElementById("loading").style.display = "none";
              document.getElementById("quiz").style.display = "block";
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              id = doc.id;
              object = doc.data();
              document.querySelector("#my_ques").innerText = object.question;
              document.querySelector("#opt1").innerText =
                object.answers[0].option;
              document.querySelector("#opt2").innerText =
                object.answers[1].option;
              document.querySelector("#opt3").innerText =
                object.answers[2].option;
              document.querySelector("#opt4").innerText =
                object.answers[3].option;
            });
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
        document.querySelector("#submit").addEventListener("click", submited);

        function submited() {
          var a = document.querySelector("#id1").checked;
          var b = document.querySelector("#id2").checked;
          var c = document.querySelector("#id3").checked;
          var d = document.querySelector("#id4").checked;
          var option_number;
          if (a) {
            option_number = 0;
          } else if (b) {
            option_number = 1;
          } else if (c) {
            option_number = 2;
          } else if (d) {
            option_number = 3;
          }
          if (option_number != null) {
            var submitted = false;
            object.answers.map((option) => {
              if (option.voted_by.includes(email)) {
                submitted = true;
              }
            });
            if (!submitted) {
              object.answers[option_number].voted_by.push(email);
              db.collection("Survey-questions").doc(id).delete();
              db.collection("Survey-questions").add(object);

              var yValues = [];
              object.answers.forEach((option) => {
                yValues.push(option.voted_by.length);
              });
              localStorage.setItem("yValues", JSON.stringify(yValues));
              Swal.fire({
                title: "Submitting Your Response",
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                  Swal.showLoading();
                },
              }).then((result) => {
                locatio
                n.href = "./view_result.html";
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "OOPS...",
                text: "You have already submitted the survey once!",
              });
            }
          } else {
            Swal.fire({
              icon: "error",
              title: "OOPS...",
              text: "Please select an option first!",
            });
          }
        }
      
    }
    reading();
  }
  else{
    var type = Location.search.split("?type=")[1];
    localStorage.setItem("type",type);
    console.log("email is ",email)
    Swal.fire({
      title: "Sign in For Filling Survey",
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then((result) => {
       location.href = "./index.html";
    });
  }
}

