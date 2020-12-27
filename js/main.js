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
    kirimPak: (pak) => {
        let nilai = new dataCek();
        nilai.nilaiPak = pak;
        return main.kirimdata(nilai);
    },
    cariUrl: (textToCheck) => {
        //note,	we	first	check	the	text	if	we	have	a	potential	link	with	this	Regex
        var expression = /(https?:\/\/)?[\w\-~]+(\.[\w\-~]+)+(\/[\w\-~@:%]*)*(#[\w\-]*)?(\?[^\s]*)?/gi;
        //and	then	we	make	sure	it	really	is	a	link	by	checking	if	it	is	one	of	the	common	topdomains
        var topDomains = [/\.com/, /\.de/, /\.org/, /\.net/, /\.us/, /\.co/, /\.edu/, /\.gov/, /\.biz/, /\.za/,
            /\.info/, /\.cc/, /\.ca/, /\.cn/, /\.fr/, /\.ch/, /\.au/, /\.in/, /\.jp/, /\.be/, /\.it/,
            /\.nl/, /\.uk/, /\.mx/, /\.no/, /\.ru/, /\.br/, /\.se/, /\.es/, /\.at/, /\.dk/, /\.eu/, /\.il/, /\.id/, /\.co\.id/, /\.go\.id/, /\.sch/, /\.sch\.id/];

        var regex = new RegExp(expression);
        var match = ''; var splitText = []; var startIndex = 0;
        var domainMatch = ''; var urlLength = 0; var abort = false;
        //this	algorithm	does	the	checking	AND	pushes	text	or	link	into	an	array
        while ((match = regex.exec(textToCheck)) != null) {
            abort = true;
            //	we	need	to	double	check	if	this	is	one	of	the	"known"	topDomains	like	.com	
            for (var i = 0; i < topDomains.length; i++) {
                domainMatch = match[0].match(topDomains[i]);
                if (domainMatch) {
                    urlLength = domainMatch[0].length + domainMatch.index;
                    //we	found	one	of	the	domains	we	look	for	- now	we	need	to	know	if	the	.com	or	.de	etc.	is	at	the	VERY	END	 of	the	domain
                    if (match[0].length == urlLength) abort = false;
                    if (match[0].length > urlLength) {
                        if (match[0].substr(urlLength, 1) == '/') abort = false;
                    }
                }
            }
            //we	want	to	avoid	matching	email	addresses
            if ((match.index != 0) && (textToCheck[match.index - 1] == '@')) {
                abort = true;
            }
            //we	want	to	avoid	matching	?	without	anything	at	the	end	like	www.epiloge.com/@axel-wittmann?
            if ((match.index != 0) && (textToCheck[match.index + match[0].length - 1] == '?')) {
                match[0] = match[0].substr(0, match[0].length - 1);
            }
            //we	always	put	in	the	last	text
            splitText.push({ text: textToCheck.substr(startIndex, (match.index - startIndex)), type: 'text' });
            //however,	based	on	the	match,	we	either	create	a	link,	or	no	link,	just	text
            if (abort) {
                splitText.push({ text: textToCheck.substr(match.index, (match[0].length)), type: 'text' });
            } else {
                var cleanedLink = textToCheck.substr(match.index, (match[0].length));
                cleanedLink = cleanedLink.replace(/^https?:\/\//, '');
                splitText.push({ text: cleanedLink, type: 'link' });
            }
            startIndex = match.index + (match[0].length);
        }
        if (startIndex < textToCheck.length) splitText.push({ text: textToCheck.substr(startIndex), type: 'text' });
        return splitText;
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
