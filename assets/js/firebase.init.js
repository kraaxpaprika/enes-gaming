// Firebase initialization - uses config from data provided by user
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-database.js";

// Firebase config - directly from user's provided code
const firebaseConfig = {
  apiKey: "AIzaSyDgq0CuNtf3ipr47_OfCOc9LwL2tBr2UJc",
  authDomain: "enes-gaming.firebaseapp.com",
  databaseURL: "https://enes-gaming-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "enes-gaming",
  storageBucket: "enes-gaming.firebasestorage.app",
  messagingSenderId: "594873352928",
  appId: "1:594873352928:web:09e2e86ac5e399dcd0c685"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const playersRef = ref(database, "players");

// Helper: get the current player ID from localStorage (same key used by stats.js)
function getCurrentUserId() {
  try { return localStorage.getItem("eg_player") || "guest"; } catch (e) { return "guest"; }
}

// Sync the localStorage player data to Firebase on page load
function syncPlayerDataToFirebase() {
  const uid = getCurrentUserId();
  const localKey = "eg_stats_v1__" + uid;
  const localData = window.localStorage.getItem(localKey);

  if (!localData) return; // nothing to sync yet

  const data = JSON.parse(localData);
  // Path in Firebase: players/<uid>
  const firebaseRef = ref(playersRef, uid);
  set(firebaseRef, data)
    .then(() => {
      // Optionally: notify the user in console
      console.log("Progress synced to Firebase for user", uid);
    })
    .catch((error) => {
      console.error("Firebase sync error:", error);
    });
}

// Also listen for changes from Firebase and update localStorage if Firebase has newer data
function listenForFirebaseUpdates() {
  const uid = getCurrentUserId();
  if (uid === "guest") return;
  const firebaseRef = ref(playersRef, uid);
  onValue(firebaseRef, (snapshot) => {
    const remoteData = snapshot.val();
    if (remoteData) {
      try {
        // If Firebase has data, prefer it (overwrite local)
        window.localStorage.setItem("eg_stats_v1__" + uid, JSON.stringify(remoteData));
        // Reinitialize EGStats so the site uses the newly loaded data
        if (window.EGStats && window.EGStats.usePlayer) {
          window.EGStats.usePlayer(uid);
        }
        console.log("Progress loaded from Firebase for user", uid);
      } catch (e) {
        console.error("Failed to save Firebase data to localStorage:", e);
      }
    }
  });
}

// Export helpers for use in other scripts (e.g., stats.html or game files)
window.firebaseSync = {
  syncPlayerDataToFirebase,
  listenForFirebaseUpdates
};