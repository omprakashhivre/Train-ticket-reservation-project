var test
var counter = 1
var trainnox
var sourcex
var destx
var counterx = 1
var archit
function swap() {
    console.log("swap call")
    let val1 = document.getElementById("source").value
    let val2 = document.getElementById("dest").value

    document.getElementById("source").value = val2

    document.getElementById("dest").value = val1
}

async function searchtrain() {
    var source = document.getElementById("source").value
    var dest = document.getElementById("dest").value
    var disp = document.getElementById("trainfind")
    var trainno = document.getElementById("trainno").value
    var trainname1 = document.getElementById("trainname").value

    if (trainno) {
        test = trainno
        disp.innerHTML = ` <h2 style="color:red;">There is no train for train number ${trainno} ..</h2>`
        let fres = await fetch("http://localhost:8080/thbs/trains/" + trainno);

        let data = await fres.json();


        let txt = ` <div class="card border-success mb-3" style ="color:black;">
      <div class="card-header bg-transparent border-success"><h2>${data.trainname}</h2></div>
      <div class="card-body text-success">
        <h5 class="card-title" >Train Number : ${data.trainno}</h5>
        <p class="card-text" id="text">Source : ${data.source}<br> Destination : ${data.destination} <br> Train Number : ${data.trainno} <br> Price : ${data.price}</p>
      </div>
      <div class="card-footer  bg-success border-success" style="text-align:center" onclick="location.href='Passengerindex.html?trainno=${trainno}'">Book Ticket</div>
    </div>`

        if (fres)
            document.getElementById("trainfind").innerHTML = txt
    }
    else if (source && dest) {
        disp.innerHTML = ` <h2 style="color:red;">There is no train From ${source} to ${dest} ..</h2>`
        let fres = await fetch("http://localhost:8080/thbs/trainbysource?source=" + source + "&dest=" + dest);
        let txt = `<br>`
        let r = await fres.json();
        for (let i = 0; i < r.length; i++) {
            let data = r[i]

            txt += ` <div class="card border-success mb-3" style ="color:black;">
            <div class="card-header bg-transparent border-success"><h2>${data.trainname}</h2></div>
            <div class="card-body text-success">
                <h5 class="card-title" >Train Number : ${data.trainno}</h5>
                <p class="card-text" id="text">Source : ${data.source}<br> Destination : ${data.destination} <br> Train Number : ${data.trainno} <br> Price : ${data.price}</p>
            </div>
            <div class="card-footer  bg-success border-success" style="text-align:center" onclick="location.href='html/pass.html?trainno=${data.trainno}'">Book Ticket</div>
            </div>`
        }
        if (fres)
            document.getElementById("trainfind").innerHTML = txt
    }
    else if (trainname1) {
        disp.innerHTML = ` <h2 style="color:red;">There is no train like ${trainname1} ..</h2>`
        let fres = await fetch("http://localhost:8080/thbs/trainbyname?trainname=" + trainname1);

        let r = await fres.json();
        let txt = `<br>`
        for (let i = 0; i < r.length; i++) {
            let data = r[i]

            txt += ` <div class="card border-success mb-3" style ="color:black;">
            
                    <div class="card-header bg-transparent border-success"><h2>${data.trainname}</h2></div>
                    <div class="card-body text-success">
                        <h5 class="card-title" >Train Number : ${data.trainno}</h5>
                        <p class="card-text" id="text">Source : ${data.source}<br> Destination : ${data.destination} <br> Train Number : ${data.trainno} <br> Price : ${data.price}</p>
                    </div>
                    <div class="card-footer bg-success border-success" style="text-align:center" onclick="location.href='html/pass.html?trainno=${data.trainno}'">Book Ticket</div>
                    </div>`
        }
        if (fres)
            document.getElementById("trainfind").innerHTML = txt
    }
    else {
        alert("Please enter atleast single entry........")
    }
}

async function bookTicket(train) {
    trainnox = train
    checkloginstatus()
    let fres = await fetch("http://localhost:8080/thbs/trains/" + train);
    let data = await fres.json();
    sourcex = data.source
    destx = data.destination
    document.getElementById("gettrain").innerHTML =     `<h5>Train Number : ${data.trainno} - ${data.trainname} <br>${sourcex} ==> ${destx}<br>Total Price = ${data.price}</h5>`

    // gettrain.innerHTML = `<h3>Train Number : ${trainno} ${data.trainname}<br>From ${data.source} to ${data.destinationt}</h3>`
}
function checkloginstatus(){
    if(localStorage.getItem("email") && localStorage.getItem("password")){
     console.log("login verified")
    }else{
      window.location.href = "C:/Users/user79/Desktop/THBSRail_official-project/ZIP/Gp/LoginforTrainProject/loginview.html"
    }
   }

async function addPassenger() {
    let name = document.getElementById("name").value
    let age = document.getElementById("age").value
    let gender = document.getElementById("gender").value
    var txt

    if (name && age && gender) {
        try{
        let nameage =await fetch("http://localhost:8080/thbs/passengers/nameage?pname=" + name+"&age="+age);
        let xcs001 = await  nameage.json();
            alert(name+" is Already Registered. Ok to Use Existing Details.")
            addTicket(name,age);
        }
        catch{
            var data = {
                "pname": name,
                "age": age,
                "gender": gender
            }
            console.log(data);

            let options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)

            }

            txt = `<table><tr>
        <th>PassengerID </th> <th>Name</th> <th> Age </th> <th> Gender </th> <th> PNR </th></tr>
         `;

            let fres = fetch("http://localhost:8080/thbs/passengers", options);
            if (fres) {
                addTicket(name,age);
               txt  += `<tr><th>${counter++}</th>  <th>${name}</th> <th>${age}</th> <th>${gender}</th> <th>${archit}</th>  </tr>`
                
            }
            txt += `</table>`
            document.getElementById("passs").innerHTML = "</br>"+txt
        }
    
    }
    else {
        alert("Please enter name age gender")
    }
}

// async function morepassenger(){
//     // let trainno = document.getElementById("trainno").value
//     window.location.href = "C:/Users/User76/Desktop/PROJECT/Gp/Passengerindex.html"
//     let fres = await fetch("http://localhost:8080/thbs/trains/" + test);
//     let data = await fres.json();
//     sourcex = data.source
//     destx = data.destination
//     document.getElementById("gettrain").innerHTML =     `<h5>Train Number : ${data.trainno} - ${data.trainname} <br>${sourcex} ==> ${destx}</h5>`
    
// }

async  function addTicket(name,age) {
    let pnr = generatepnr()
    let date = document.getElementById("date").value;
    console.log("ok")
    await new Promise(r => setTimeout(r,2000))
    let tara = await fetch("http://localhost:8080/thbs/passengers/nameage?pname=" + name + "&age="+age);
    console.log("ok after call")
    let naveen = await  tara.json();
    // let r =await  omi.json();

    let trainno = trainnox
    //document.getElementById("passs").innerHTML += pnr
    if (date) {
        var data = {
            "pnr": archit,
            "trainno": trainno,
            "date": date,
            "pid": naveen[0].pid,
        }

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        }

        let fres = fetch("http://localhost:8080/thbs/tickets", options);
        fres.then(res => res.json()).then(d => console.log("Ticket Added succesfully with pnr"))
    } else {
        alert("all fields are required ")
    }
}

function generatepnr(){
    let source = sourcex
    let dest = destx
    let  date = document.getElementById("date").value


    let pnr = source.charAt(0)+dest.charAt(0)+"_"+date+"_"+counterx
    console.log(pnr)
    counterx++
    archit =  pnr.toUpperCase()
    return archit
}

function searchsomething(some){
    alert(some)
    console.log(some.value)
}

async function searchpassenger(pass_id){
    
    if(pass_id){
        try {
        let fres = await fetch("http://localhost:8080/thbs/passengers/"+pass_id);
        let reponse = await fres.json();
        
            // alert("user exist")
            window.location.href = "C:/Users/User76/Desktop/PROJECT/Gp/UpdatePassengerForm.html"
        } catch (error) {
            alert(pass_id+ " User does not exist")
        }
        
       
     }
     else{
         alert("Passenger id Required")
     }
}

function editPassenger(){
    let name = document.getElementById("name1").value
    let age = document.getElementById("age1").value
    let gender = document.getElementById("gender1").value
    var txt

    if(id){
        var data = {
            "id" : id,
            "name":name,
            "age":age,
            "gender" :gender
        }
        // console.log(data);
     
        let options = {
         method:'PUT',
         headers:{
             'Content-Type':'application/json'
         },
         body: JSON.stringify(data)
         
        }
       
        let fres = fetch("http://localhost:8080/api/passengers/"+id,options);
         fres.then(res => res.json()).then(d =>  console.log("Passenger details updated succesfully : "+ d + ""));
     //    var data = await fres.json();
     
        // console.log(data);
     }
     else{
         alert("Passenger id Required")
     }
}
