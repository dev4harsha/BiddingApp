class Domain{
    constructor(id, domainname, registrar,domaintype,age,bidamount,endDateTime,expires){
        this.id = id;
        this.domainname = domainname;
        this.registrar = registrar;
        this.domaintype =domaintype;
        this.age = age;
        this.bidamount = bidamount
        this.endDateTime = endDateTime;
        this.expires = expires;
    }
}

export default Domain;