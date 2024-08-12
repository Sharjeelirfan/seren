// import './firebase.js'
import {
  db,
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  deleteDoc,
  ref,
  storage,
  uploadBytes,
  getDownloadURL,
  updateDoc,
  onAuthStateChanged,
  auth
} from "./firebase.js";

onAuthStateChanged(auth, (user) => {
  if (!user) {
    console.log("user");
    // User is signed in, see docs for a list of available properties
    // const uid = user.uid;
    // console.log(uid);

    // window.location.href = "./pages/seren.html";
    window.location.href = "./pages/login-page.html";
    // ...
  } else{
    console.log(user.email);
    
  }
});

const input_for_written = document.querySelector("#input-for-written");

const post_btn = document.querySelector("#post-btn");
const main_div_for_add_content = document.querySelector(
  "#main-div-for-add-content"
);

input_for_written.addEventListener("click", () => {
  post_btn.style.display = "block";
});
document.addEventListener("click", (event) => {
  if (!main_div_for_add_content.contains(event.target)) {
    post_btn.style.display = "none";
  }
});

const content_div = document.querySelector("#content-div");
const fileInput = document.querySelector("#for-add-img");
// console.log(fileInput[0]);

const mycollection = collection(db, "content");

// post_btn.addEventListener("click", async () => {
//   if (!input_for_written.value.trim() == "" || !fileInput.value == "") {

//     let myContent = {
//       text_content: input_for_written.value,
//       added_at: serverTimestamp(),
//     };

//     try {
//       const docRef = await addDoc(mycollection, myContent);
//       // console.log("Document written with ID: ", docRef.id);
//       await addcontent();
//     } catch (e) {
//       console.log("Error adding document: ", e);
//     }

//     input_for_written.value = "";
//     fileInput.value = "";
//   } else {
//     alert("please write somthing");
//   }
// });

let url = "";

post_btn.addEventListener("click", async () => {
  if (input_for_written.value.trim() !== "" || fileInput.files.length > 0) {
    let myContent = {
      text_content: input_for_written.value,
      added_at: serverTimestamp(),
      content_img: "",
    };

    try {
      // Add document to Firestore
      const docRef = await addDoc(mycollection, myContent);

      // Display the new content immediately
      const text_data = myContent.text_content;
      const date_data = dateFns.formatDistanceStrict(
        new Date().toLocaleString(),
        new Date(),
        {
          addSuffix: true,
        }
      );
      const docdel = docRef; // Use the reference to delete later

      if (fileInput.files.length > 0) {
        const myfile = fileInput.files[0];
        // console.log(myfile);

        const storageRef = ref(storage, myfile.name);
        // console.log(storageRef);

        await uploadBytes(storageRef, myfile);

        url = await getDownloadURL(storageRef);
        // console.log(url);

        await updateDoc(docRef, { content_img: url });

        // await addcontent()
        // console.log("File uploaded successfully");
      }

      await addcontent(text_data, date_data, docdel, url);
      // Clear inputs after adding
      input_for_written.value = "";
      fileInput.value = "";
    } catch (e) {
      console.log("Error adding document: ", e);
    }

    // try {

    //   const myfile = fileInput.files[0] ;
    //   console.log(myfile);

    //   const storageRef = ref(
    //     storage,
    //     `uploads/${new Date().getTime()}_${myfile.name}`
    //   );
    //   console.log(storageRef);

    //   uploadBytes(storageRef, myfile);
    // } catch (e) {
    //   console.log(e);
    // }
  } else {
    alert("Please write something");
  }
});

async function getandfetchdata() {
  try {
    const querySnapshot = await getDocs(mycollection);
    querySnapshot.forEach(async (doc) => {
      const text_data = doc.data().text_content;
      const date_data = dateFns.formatDistanceStrict(
        doc.data().added_at.toDate(),
        new Date(),
        {
          addSuffix: true,
        }
      ); //.toDate().toLocaleString()
      const img_data = doc.data().content_img;
      // const date_data = doc.data().added_at.toDate().toLocaleString();
      const docdel = doc.ref;
      await addcontent(text_data, date_data, docdel, img_data); // Ensure doc is a valid Firestore document snapshot
      // console.log(data);
    });
  } catch (e) {
    console.error("Error fetching documents: ", e);
  }
}
getandfetchdata();

async function addcontent(text_data, date_data, docdel, img_data) {
  const content = document.createElement("div");
  content.id = "content";
  const top = document.createElement("div");
  top.id = "top";
  const name_and_profile_div1 = document.createElement("div");
  name_and_profile_div1.id = "name_and_profile1";
  const name_and_profile_div2 = document.createElement("div");
  name_and_profile_div2.id = "name_and_profile2";
  const name_and_profile_div = document.createElement("div");
  name_and_profile_div.id = "name-and-profile";
  const content_profile = document.createElement("img");
  content_profile.id = "contant-profile";
  content_profile.src = "../images/user.png";
  const user_name = document.createElement("p");
  user_name.id = "user-name";
  user_name.textContent = localStorage.getItem("email");
  const date = document.createElement("div");
  date.id = "date";
  // date.textContent = doc.data().added_at.toDate().toLocaleString();
  date.textContent = date_data;

  const div_for_del_icon = document.createElement("div");
  const close_img = document.createElement("img");
  close_img.id = "close";
  close_img.src = "../images/close.png";
  close_img.addEventListener("click", async () => {
    const confirmDel = confirm("Are you sure?");
    if (confirmDel) {
      try {
        await deleteDoc(docdel);
        content.remove();
      } catch (e) {
        console.error("Error deleting document: ", e);
      }
    }
  });

  const main_content = document.createElement("div");
  main_content.id = "main-content";
  const main_content_text = document.createElement("p");
  main_content_text.id = "main-content-text";
  // console.log(doc.data());
  // const docdata = data.text_content;
  // console.log(text_data);
  // const text_data_wait = text_data
  main_content_text.textContent = text_data;

  const content_img_div = document.createElement("div");
  content_img_div.id = "content-img-div";
  const content_img = document.createElement("img");
  content_img.id = "content-img";
  if (img_data) {
    content_img.src = img_data;
    content_img_div.style.display = "block";
  }

  // const file = fileInput.files[0];
  // console.log(file);

  // if (file) {
  //   const reader = new FileReader();
  //   reader.onload = function (e) {
  //     content_img.src = url;
  //     // content_img.src = e.target.result;
  //     content_img_div.style.display = "block";
  //   };
  //   reader.readAsDataURL(file);
  // } else {
  //   content_img.src = "";
  //   content_img_div.style.display = "none";
  // }

  // content_img.src = "../images/loading.gif";

  content_div.appendChild(content);
  content.appendChild(top);
  top.appendChild(name_and_profile_div);
  name_and_profile_div.appendChild(name_and_profile_div1);
  name_and_profile_div.appendChild(name_and_profile_div2);
  name_and_profile_div1.appendChild(content_profile);
  name_and_profile_div1.appendChild(user_name);
  name_and_profile_div2.appendChild(date);

  top.appendChild(div_for_del_icon);
  div_for_del_icon.appendChild(close_img);

  content.appendChild(main_content);
  main_content.appendChild(main_content_text);

  content.appendChild(content_img_div);
  content_img_div.appendChild(content_img);
}
// addcontent()
