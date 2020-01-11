let alamat = "https://script.google.com/macros/s/AKfycbwZ2wKOLBvcdWRtmDtG-NDhIxMVLwh-HnFcDOfc7AteUT5aKIZd/exec";
let main = {
    kirimdata: function(dataku) {
        return fetch(alamat, {
            method: 'post',
            body: JSON.stringify(dataku)
        }).then((response) => {
            return response.json();
        })
    },
    simpanNip: function(nipPegawai) {
        return localStorage.setItem("nip", nipPegawai);
    },
    ambilNip: function() {
        return localStorage.getItem("nip");
    },
    cekLogin: function() {
        return fetch(alamat + `?nip=${this.ambilNip()}`)
            .then((data) => {
                return data.text();
            })
    },
    logout: function() {
        return fetch(alamat + `?nip=${this.ambilNip()}&keluar=1`)
            .then((data) => {
                return data.text();
            })
    }
}