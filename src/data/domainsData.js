import {db} from '../helpers/firebase';
import Domain from '../models/domain';



export const getDomains = async () => {
    try{
            const response = await db.collection('domains');
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
        await db.collection('domains').doc().set(domain);
    } catch (error) {
        throw error;
    }
}

export const getDomain = async (id) => {
    try {
        const domain = await db.collection('domains').doc(id);
        const data = await domain.get();
        return data.data();
    } catch (error) {
        throw error;
    }
}

export const updateDomain = async (id, data) => {
    try {
        const customer = await db.collection('domains').doc(id);
        await customer.update(data)
    } catch (error) {
        throw error;
    }
}

export const deleteDomain = async (id) => {
    try {
        await db.collection('domains').doc(id).delete();
    } catch (error) {
        throw error;
    }
}