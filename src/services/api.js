import apiService from "./jsonApiService";
import firestoreService from "./firestoreService";

const strategy = "firestore" || process.env.REACT_APP_API_SERVICE || "JSON";

export const Api = strategy === "JSON" ? apiService : firestoreService;
