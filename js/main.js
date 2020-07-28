let alamat = "https://script.google.com/macros/s/AKfycbwZ2wKOLBvcdWRtmDtG-NDhIxMVLwh-HnFcDOfc7AteUT5aKIZd/exec";
let main = {
    kirimdata: function(dataku) {
       return fetch(alamat, {
            method: 'post',
            body: JSON.stringify(dataku)
        }).then((response) => {
            return response.json();
        });
    },
    simpanDb: function(db) {
        return localStorage.setItem("db", db);
    },
    ambilDb: function(db) {
        return localStorage.getItem(db);
    },
    cekLogin: function(nip) {
        return fetch(alamat + `?nip=${nip}`)
            .then((data) => {
                return data.text();
            });
    },
    logout: function() {
        return fetch(alamat + `?nip=${this.ambilDb('nip')}&keluar=1`)
            .then((data) => {
                return data.text();
            });
    }
}
