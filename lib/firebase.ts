// import { initializeApp } from "firebase/app";
// import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
//
// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDXoQhBvdO5W88Skqu9pFiRjNAOBnks4pM",
//   authDomain: "doodle-f1093.firebaseapp.com",
//   projectId: "doodle-f1093",
//   storageBucket: "doodle-f1093.appspot.com",
//   messagingSenderId: "585137489294",
//   appId: "1:585137489294:web:9e65937cadf72802ec10df"
// };
//
// const app = initializeApp(firebaseConfig);
// export const storage = getStorage(app);
//
// export async function uploadFileToFirebase(image_url: string, name: string) {
//   try {
//     const response = await fetch(image_url);
//     const buffer = await response.arrayBuffer();
//     const file_name = name.replace(" ", "") + Date.now + ".jpeg";
//     const storageRef = ref(storage, file_name);
//     await uploadBytes(storageRef, buffer, {
//       contentType: "image/jpeg",
//     });
//     const firebase_url = await getDownloadURL(storageRef);
//     return firebase_url;
//   } catch (error) {
//     console.error(error);
//   }
// }
