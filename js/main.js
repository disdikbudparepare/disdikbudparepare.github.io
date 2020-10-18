const alamat = "https://script.google.com/macros/s/AKfycbwZ2wKOLBvcdWRtmDtG-NDhIxMVLwh-HnFcDOfc7AteUT5aKIZd/exec";

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
        if(localStorage.getItem('token')){
            main.kirimdata(new dataCek()).then(res=>{
              if(!res){
                return location.assign('index.html')
              }else{
                console.log(res);
              }
            }).catch(err=>{
              console.log(err)
            })
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
    pesanTerbaca : ()=>{
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
    ubahpass:(isipass)=>{
        let gantipass = new dataCek();
        gantipass.ubahpass = isipass;
        return main.kirimdata(gantipass);
    }
}

class dataCek {
    constructor(namaBerkas, terbaca, urlSkTerakhir, ubahpass, countPesan, pesan, keluar) {
        this.token = localStorage.getItem('token'),
        this.username = localStorage.getItem('nip'),
        this.urlSkTerakhir = false,
        this.ubahpass = false,
        this.countPesan = false,
        this.pesan = false,
        this.keluar = false,
        this.namaBerkas = false
    }
}
