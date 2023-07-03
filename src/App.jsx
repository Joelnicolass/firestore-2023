import React from "react";

import useSWR from "swr";
import { getCat } from "./services/getCat";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase/config";

const App = () => {
  const { data: catUrl, mutate: refetchCat } = useSWR("getCat", getCat, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const { data: favs, mutate: refetchFavs } = useSWR("getFavs", () =>
    readAllCollectionFromFirestore()
  );

  // CRUD FIRESTORE

  // CREATE
  const createDocInFirestore = async ({ url }) => {
    const id = window.crypto.randomUUID();
    const data = {
      id,
      url,
    };

    await setDoc(doc(db, "gatos", id), data);
  };

  // READ
  const readAllCollectionFromFirestore = async () => {
    const querySnapshot = await getDocs(collection(db, "gatos"));

    const result = querySnapshot.docs.map((doc) => doc.data());

    return result;
  };

  // READ
  const readDocFromFirestore = async (id) => {
    const docRef = doc(db, "gatos", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const result = docSnap.data();
      console.log(result);

      return result;
    } else {
      return null;
    }
  };

  // UPDATE
  const updateDocInFirestore = async (id, data) => {
    const docRef = doc(db, "gatos", id);
    await updateDoc(docRef, data);
  };

  // DELETE

  const deleteDocInFirestore = async (id) => {
    const docRef = doc(db, "gatos", id);
    await deleteDoc(docRef);
  };

  // DELETE ALL
  const deleteAllDocsInFirestore = async () => {
    const querySnapshot = await getDocs(collection(db, "gatos"));

    querySnapshot.docs.map(async (doc) => {
      await deleteDoc(doc.ref);
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <img style={styles.principalImg} src={catUrl} />
        <div style={styles.favsContainer}>
          {favs?.map((fav, i) => {
            return <img key={`cat-${i}`} style={styles.favImg} src={fav.url} />;
          })}
        </div>
      </div>

      <button
        onClick={() => {
          refetchCat();
        }}
      >
        Siguiente
      </button>

      <button
        onClick={async () => {
          await createDocInFirestore({
            url: catUrl,
          });
          refetchFavs();
        }}
      >
        Guardar en Favs
      </button>

      <button
        onClick={() => {
          readAllCollectionFromFirestore();
        }}
      >
        Traer Favs
      </button>

      <button
        onClick={() => {
          readDocFromFirestore("ac22dc65-709f-4ca8-a33a-4684542240b1");
        }}
      >
        Traer Favs por ID
      </button>

      <button
        onClick={() => {
          updateDocInFirestore("386cae03-7249-4366-9cce-5ff3f3700dce", {
            url: catUrl,
          });
        }}
      >
        Actualizar Favs
      </button>

      <button
        onClick={async () => {
          deleteDocInFirestore("386cae03-7249-4366-9cce-5ff3f3700dce");
          refetchFavs();
        }}
      >
        Eliminar Fav por id
      </button>

      <button
        onClick={async () => {
          await deleteAllDocsInFirestore();
          refetchFavs();
        }}
      >
        Eliminar todos los Favs
      </button>
    </div>
  );
};

export default App;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    display: "flex",
  },
  principalImg: {
    width: "200px",
    aspectRatio: "1/1",
  },
  favsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "5px",
  },
  favImg: {
    width: "20px",
    height: "20px",
    aspectRatio: "1/1",
  },
};
