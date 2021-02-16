import firebase from '../helpers/db';
import Domain from '../models/domain';

const firestore = firebase.firestore();

export const getDomains = async () => {
    try{
            const response = await firestore.collection('domains');
            const data = await response.get();
            let array = [];
            data.forEach(doc =>{
                const domain = new Domain(
                    doc.id,
                    doc.data().domainname,
                    doc.data().registrar,
                    doc.data().domaintype,
                    doc.data().age,
                    doc.data().bidamount,
                    doc.data().endDateTime.toDate().toString(),
                    doc.data().expires,
                );

                array.push(domain)
            });
            return array;
    }catch(error){
            throw error;
    }
}

export const addDomain = async (domain) => {
    try {
        await firestore.collection('domains').doc().set(domain);
    } catch (error) {
        throw error;
    }
}