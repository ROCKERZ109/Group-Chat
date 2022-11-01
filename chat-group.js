import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import {
    getFirestore, doc, getDoc, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField, query, orderBy, getDocs, limit, onSnapshot
}
    from "https://www.gstatic.com/firebasejs/9.9.2/firebase-firestore.js"
const firebaseConfig = {
    apiKey: "AIzaSyAvFciOXxUMhhDenRVVzVqEXLlzVeHgOxU",
    authDomain: "vira-d182b.firebaseapp.com",
    projectId: "vira-d182b",
    storageBucket: "vira-d182b.appspot.com",
    messagingSenderId: "642906804481",
    appId: "1:642906804481:web:a5f667b54241d428188b00"
};
import lottieWeb from "https://cdn.skypack.dev/lottie-web";
// Initialize Firebase
const app = initializeApp(firebaseConfig);
let loading = true;
let interval = window.setInterval(anim(), 100);
setTimeout(() => clearInterval(interval), 100);
function anim() {
    console.log("running");
    var animation = bodymovin.loadAnimation({
        // animationData: { /* ... */ },
        container: document.getElementById('lottie'), // required
        path: 'load.json', // required
        renderer: 'svg', // required
        loop: true, // optional
        autoplay: true, // optional
        name: "Demo Animation", // optional

    });


}//


const db = getFirestore();
// playLottie();
// function playLottie()
// {

//     document.body.innerHTML= "<lottie-player src='load.json' background='transparent'  speed='0.9'  style='width: 300px; height: 300px;' loop controls autoplay>SADASD</lottie-player>";


// }
window.adder = async function adder() {

    console.log("bello");
    const messageToSend = document.getElementById('message_box').value;
    if (messageToSend == "") {
        return;
    }
    document.getElementById('message_box').value = "";

    await addDoc(
        collection(db, "Chatroom"), {
        name: window.localStorage["name"],
        message: messageToSend,

        ts: new Date().getTime(),

    }
    );

}

//   await setDoc(doc(db, "Chatroom","name"), {

//     name: new Date().getTime(),
//     message: messageToSend.value,
//     ts:new Date().getTime()
// })
//   .then(()=>alert('called')).catch((e)=>{
//     alert("not success");
//   });

let value;
let input = document.getElementById("message_box");
input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        // event.preventDefault();
        adder();
    }
});
window.getDocument = function getDocument(param) {
    // const q = query(collection(db, param),orderBy('ts','desc'),limit(1));
    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    // // doc.data() is never undefined for query doc snapshots
    // value=doc.data();
    //  });
    let paraelement;
    const q = query(collection(db, 'Chatroom'), orderBy('ts', 'asc'));
    const unsub = onSnapshot(q, (snapshot) => {
        // snapshot.doc.map((d)=>console.log(d.name))
        //   snapshot.docChanges().forEach(async change => {
        // if (change.type === 'added') 
        // {

        //  console.log(change.doc);
        //    }
        //   });
        if (snapshot.empty) {
            loading = false;
        }

        snapshot.docChanges().forEach((change) => {
            let element = document.createElement('div');
            element.id = new Date().getTime();
            console.log(window.localStorage["name"]);
            if (change.doc.data()['name'] == window.localStorage["name"]) {
                element.style = "position:relative;display: flex;justify-content: end;";
                let image = document.createElement('img');
                image.src = "https://media1.popsugar-assets.com/files/thumbor/hnVKqXE-xPM5bi3w8RQLqFCDw_E/475x60:1974x1559/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/09/09/023/n/1922398/9f849ffa5d76e13d154137.01128738_/i/Taylor-Swift.jpg"
                image.style = "margin-top:25px;margin-left:5px;background-color:red;width:40px;height:40px;border-radius:20px;margin-right:15%"
                let headername = document.createElement('div');
                headername.style = "position:absolute;top:-10.0px;right:10%;font-size:9px;color:black;font-family:Roboto,Arial;font-weight:600;white-space: nowrap;"
                headername.innerText = window.localStorage["name"].toUpperCase();
                paraelement = document.createElement('p');
                paraelement.innerText = change.doc.data()['message'];

                paraelement.style = "position:relative;min-width:50px;font-size: 16px;box-shadow: 10px 10px 10px rgba(0,0,0,0.20);word-wrap: break-word;line-height: 1.4;font-family:Roboto,Arial;background-color:rgb(249, 184, 184);max-width: 250px;padding: 9px;word-wrap: break-word;margin-right: 0%;border-radius:10px 0 10px 0;margin-top:20px;font-weight:500;color:black"
                paraelement.appendChild(headername);
                element.appendChild(paraelement);
                element.appendChild(image);
            }
            else {
                let image = document.createElement('img');
                image.src = "https://media1.popsugar-assets.com/files/thumbor/hnVKqXE-xPM5bi3w8RQLqFCDw_E/475x60:1974x1559/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/09/09/023/n/1922398/9f849ffa5d76e13d154137.01128738_/i/Taylor-Swift.jpg"
                image.style = "margin-top:25px;margin-right:5px;background-color:red;width:40px;height:40px;border-radius:20px;margin-left:15%"
                let headername = document.createElement('div');
                headername.style = "position:absolute;top:-10.0px;left:10%;font-size:9px;color:black;font-family:Roboto,Arial;font-weight:600;white-space: nowrap;"

                headername.innerText = change.doc.data()['name'].toUpperCase();
                element.style = "display: flex;justify-content: start;";
                paraelement = document.createElement('p');
                paraelement.innerText = change.doc.data()['message'];
                paraelement.style = "position:relative;min-width:50px;font-size: 16px;box-shadow: 10px 10px 10px rgba(0,0,0,0.20);word-wrap: break-word;line-height: 1.4;font-family:Roboto,Arial;background-color:rgb(229, 206, 208);max-width: 250px;padding: 10px;word-wrap: break-word;border-radius:0px 10px 0px 10px;margin-top:20px;font-weight:500;color:black";
                paraelement.appendChild(headername);
                element.appendChild(image);
                element.appendChild(paraelement);

            }

            document.body.appendChild(element);
            window.scrollTo(0, document.body.scrollHeight);

            document.getElementById('lottie').innerHTML = '';
            console.log(change.doc.data())

        });
        if (loading == false) {
            document.getElementById('lottie').innerHTML = '';
        }



    });
}
// document.getElementById('click_button').addEventListener("click",adder(),true)
await getDocument("Chatroom");
let button_click = document.getElementById('click_button');
    // button_click.addEventListener("click",adder(),true);
