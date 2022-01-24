import { getAuth, updateProfile } from "@firebase/auth";
import firebaseApp from "./firebaseCredentials";

const auth = getAuth(firebaseApp);

export const updateName = async (name) => {
  await updateProfile(auth.currentUser, {
    displayName: String(name),
    // photoURL: "https://example.com/jane-q-user/profile.jpg"
  })
    .then(() => {
      // Profile updated!
      // ...
      alert("Tu nombre es " + auth.currentUser.displayName);
    })
    .catch((error) => {
      // An error occurred
      // ...
      alert("Ocurrió un error!");
    });
};
