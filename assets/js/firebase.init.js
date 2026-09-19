/* ------------------------------------------------------------------
   Firebase: progress sync. Load with <script type="module">.
   ------------------------------------------------------------------ */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, onValue, set }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDgq0CuNtf3ipr47_OfCOc9LwL2tBr2UJc",
  authDomain: "enes-gaming.firebaseapp.com",
  databaseURL: "https://enes-gaming-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "enes-gaming",
  storageBucket: "enes-gaming.firebasestorage.app",
  messagingSenderId: "594873352928",
  appId: "1:594873352928:web:09e2e86ac5e399dcd0c685"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function currentPlayerId() {
  try { return localStorage.getItem("eg_player") || ""; } catch (e) { return ""; }
}

function syncPlayerDataToFirebase(uid) {
  const localData = localStorage.getItem("eg_stats_v1__" + uid);
  if (!localData) return;
  set(ref(database, "players/" + uid), JSON.parse(localData))
    .catch((error) => console.error("Firebase sync error:", error));
}

function listenForFirebaseUpdates(uid) {
  onValue(ref(database, "players/" + uid), (snapshot) => {
    const remoteData = snapshot.val();
    if (!remoteData) return;
    localStorage.setItem("eg_stats_v1__" + uid, JSON.stringify(remoteData));
    if (window.EGStats && window.EGStats.usePlayer) window.EGStats.usePlayer(uid);
  });
}

const uid = currentPlayerId();
if (uid) {
  syncPlayerDataToFirebase(uid);
  listenForFirebaseUpdates(uid);
}
