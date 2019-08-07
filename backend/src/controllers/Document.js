import {Firestore} from '../lib/firebase';
import uuid from 'uuid/v4';

let date = new Date();
let codeCollection = Firestore.collection('files');

export const addDocument = async payload => {
  try {
    const id = uuid();
    let snapshot = await codeCollection.get();

    let proDoc = Firestore.collection('files').doc(id);
    await proDoc.set({
      id: id,
      name: payload.name,
      url: payload.url,
      order: snapshot.docs.length,
      created: date.getTime(),
    });
  } catch (error) {
    throw error;
  }
};

export const updateDocument = async payload => {
  try {
    let proDoc = Firestore.collection('files').doc(payload.id);
    await proDoc.update({
      id: payload.id,
      name: payload.name,
      url: payload.url,
      order: payload.order
    });
  } catch (error) {
    throw error;
  }
};

export const deactivateDocument = async id => {
  try {
    await codeCollection.doc(id).update({
      active: false
    });
  } catch (error) {
    throw error;
  }
};

export const activateDocument = async id => {

  try {
    await codeCollection.doc(id).update({
      active: true
    });
  } catch (error) {
    throw error;
  }
};

export const getDocumentById = id =>
  new Promise((resolve) => {
    let proDoc = Firestore.collection('files').doc(id);
    proDoc.onSnapshot(async snapshot => {
      let codeData = {
        id: snapshot.data().id,
        url: snapshot.data().url,
        active: snapshot.data().active,
        order:snapshot.data().order,
        name: snapshot.data().name,
      };

      resolve(codeData);
    });
  });

// search codes with the criteria
export const getDocuments = async () => {
  try {
    let snapshot = await codeCollection.get();

    let tasks = snapshot.docs.map(proDoc => getDocumentById(proDoc.id));
    return Promise.all(tasks);
  } catch (error) {
    throw error;
  }
};
