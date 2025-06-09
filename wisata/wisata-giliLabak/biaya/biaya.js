document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('calculate-btn').addEventListener('click', hitungBiaya);

    function hitungBiaya() {
        const jumlahOrang = parseInt(document.getElementById('people').value);
        const jumlahHari = parseInt(document.getElementById('days').value);
        const kendaraan = document.getElementById('transport').value;
        const paketTrip = document.querySelector('input[name="paket"]:checked');

        if (!jumlahOrang || !jumlahHari || !kendaraan || !paketTrip) {
            alert("Harap isi semua input dan pilih paket trip.");
            return;
        }

        const pilihPaket = paketTrip.value;
        const jumlahWisata = 3; // asumsi tetap

        // Harga tetap
        const biayaMakanPerOrangPerHari = 45000;
        const biayaMasukWisataPerOrang = 10000;
        const biayaParkirMotor = 5000;
        const biayaParkirMobil = 10000;
        const biayaPaketTrip = 150000;
        const biayaSewaPerahu = 400000;

        // Inisialisasi biaya
        let totalBiayaMakan = 0;
        let totalBiayaWisata = 0;
        let totalBiayaTransport = 0;
        let totalBiayaPaket = 0;
        let keteranganTransport = "-";
        let keteranganMakan = "-";
        let keteranganPaket = "-";

        if (pilihPaket === "ya") {
            // Paket Trip dipilih
            totalBiayaPaket = biayaPaketTrip * jumlahOrang;
            keteranganPaket = `Rp 150.000 × ${jumlahOrang} orang`;
        } else {
            // Paket Trip tidak dipilih → hitung semua
            totalBiayaMakan = biayaMakanPerOrangPerHari * jumlahOrang * jumlahHari;
            totalBiayaWisata = biayaMasukWisataPerOrang * jumlahWisata * jumlahOrang * jumlahHari;

            if (kendaraan === "motor") {
                totalBiayaTransport = biayaParkirMotor * jumlahWisata * jumlahHari;
                keteranganTransport = `Rp ${formatAngka(biayaParkirMotor)} × ${jumlahWisata} wisata × ${jumlahHari} hari`;
            } else if (kendaraan === "mobil") {
                totalBiayaTransport = biayaParkirMobil * jumlahWisata * jumlahHari;
                keteranganTransport = `Rp ${formatAngka(biayaParkirMobil)} × ${jumlahWisata} wisata × ${jumlahHari} hari`;
            } else {
                keteranganTransport = "Tidak ada biaya parkir   ";
            }

            totalBiayaPaket = biayaSewaPerahu;
            keteranganPaket = `Rp 400.000 (Sewa Perahu)`;
            keteranganMakan = `Rp ${formatAngka(biayaMakanPerOrangPerHari)} × ${jumlahOrang} orang × ${jumlahHari} hari`;
        }

        const totalBiaya = totalBiayaMakan + totalBiayaWisata + totalBiayaTransport + totalBiayaPaket;

        // Tampilkan hasil
        const detailBiaya = document.getElementById('cost-details');
        detailBiaya.innerHTML = '';

        if (pilihPaket === "tidak") {
            detailBiaya.innerHTML += `
                <div class="cost-item">
                    <span><strong>Biaya Makan:</strong><br>${keteranganMakan}</span>
                    <span>Rp ${formatAngka(totalBiayaMakan)}</span>
                </div>
                <div class="cost-item">
                    <span><strong>Biaya Masuk Wisata:</strong><br>
                    Rp ${formatAngka(biayaMasukWisataPerOrang)} × ${jumlahWisata} wisata × ${jumlahOrang} orang × ${jumlahHari} hari</span>
                    <span>Rp ${formatAngka(totalBiayaWisata)}</span>
                </div>
                <div class="cost-item">
                    <span><strong>Biaya Parkir:</strong><br>${keteranganTransport}</span>
                    <span>${kendaraan !== 'angkutan' ? 'Rp ' + formatAngka(totalBiayaTransport) : '-'}</span>
                </div>
            `;
        }

        detailBiaya.innerHTML += `
            <div class="cost-item">
                <span><strong>${pilihPaket === "ya" ? "Biaya Paket Trip" : "Sewa Perahu"}:</strong><br>${keteranganPaket}</span>
                <span>Rp ${formatAngka(totalBiayaPaket)}</span>
            </div>
        `;

        document.getElementById('total-cost').textContent = `Rp ${formatAngka(totalBiaya)}`;
        document.getElementById('result').style.display = 'block';
    }

    function formatAngka(angka) {
        return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
});
