const alamat = "https://script.google.com/macros/s/AKfycbwZ2wKOLBvcdWRtmDtG-NDhIxMVLwh-HnFcDOfc7AteUT5aKIZd/exec";
let arrbulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

let main = {
    kirimdata:
        async function (dataku) {
            const response = await fetch(alamat, {
                method: "POST",
                body: JSON.stringify(dataku)
            });
            return response.json();
        },
    cekLogin: () => {
        if (localStorage.getItem('token')) {
            main.kirimdata(new dataCek()).then(res => {
                if (!res) {
                    return location.assign('index.html');
                } else {
                    return res;
                }
            }).catch(err => {
                console.log(err);
                return location.assign('index.html');
            })
        } else {
            return location.assign('index.html');
        }
    },
    logout: () => {
        let out = new dataCek();
        out.keluar = true;
        return main.kirimdata(out);
    },
    bacaPesan: () => {
        let pesanBaca = new dataCek();
        pesanBaca.pesan = true;
        return main.kirimdata(pesanBaca);
    },
    pesanTerbaca: () => {
        let terbaca = new dataCek();
        terbaca.countPesan = true;
        return main.kirimdata(terbaca);
    },
    redirectWa: (nip) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(loc => {
                location.assign(`https://web.whatsapp.com/send?phone=6288804263785&text=nip: ${nip}, mlat=${loc.coords.latitude}, mlon=${loc.coords.longitude}`);
            })
        } else {
            alert("Mohon gunakan browser terbaru");
        }
    },
    lastArr: (parm) => {
        if (parm.toString().includes('#')) {
            let data = parm.split('#');
            let panjangData = data.length;
            return data[panjangData - 1];
        }
        return parm;
    },
    ubahpass: (isipass) => {
        let gantipass = new dataCek();
        gantipass.ubahpass = isipass;
        return main.kirimdata(gantipass);
    },
    daftar: (ok) => {
        let mintakode = new dataCek();
        mintakode.mendaftar = ok;
        return main.kirimdata(mintakode);
    },
    cekDua: () => {
        let cek = new dataCek();
        cek.cekDua = true;
        return main.kirimdata(cek);
    },
    kirimPak: (pak) =>{
        let nilai = new dataCek();
        nilai.nilaiPak = pak;
        return main.kirimdata(nilai);
    }
}

class dataCek {
    constructor(cekDua, namaBerkas, terbaca, urlSkTerakhir, ubahpass, countPesan, pesan, keluar, mendaftar, nilaiPak) {
        this.token = localStorage.getItem('token'),
            this.username = localStorage.getItem('nip'),
            this.urlSkTerakhir = false,
            this.ubahpass = false,
            this.countPesan = false,
            this.pesan = false,
            this.keluar = false,
            this.namaBerkas = false,
            this.mendaftar = false,
            this.cekDua = false,
            this.nilaiPak = false
    }
}
