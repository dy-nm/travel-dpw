document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('calculate-btn').addEventListener('click', hitungBiaya);
    
    function hitungBiaya() {
        const jumlahOrang = parseInt(document.getElementById('people').value);
        const jumlahHari = parseInt(document.getElementById('days').value);
        const kendaraan = document.getElementById('transport').value;
        const jumlahWisata = parseInt(document.getElementById('destinations').value);
        
        const biayaMakanPerOrangPerHari = 30000;
        const biayaMasukWisataPerOrang = 10000;
        const biayaParkirMotorPerWisata = 5000;
        const biayaParkirMobilPerWisata = 10000;
    
        const totalBiayaMakan = biayaMakanPerOrangPerHari * jumlahOrang * jumlahHari;
        const totalBiayaWisata = biayaMasukWisataPerOrang * jumlahWisata * jumlahOrang * jumlahHari;
        
        let totalBiayaTransport = 0;
        let keteranganTransport = "";
        
        if (kendaraan === 'motor') {
            totalBiayaTransport = biayaParkirMotorPerWisata * jumlahWisata * jumlahHari;
            keteranganTransport = `(Rp ${formatAngka(biayaParkirMotorPerWisata)} × ${jumlahWisata} wisata × ${jumlahHari} hari)`;
        } else if (kendaraan === 'mobil') {
            totalBiayaTransport = biayaParkirMobilPerWisata * jumlahWisata * jumlahHari;
            keteranganTransport = `(Rp ${formatAngka(biayaParkirMobilPerWisata)} × ${jumlahWisata} wisata × ${jumlahHari} hari)`;
        } else {
            keteranganTransport = "(Tidak ada biaya parkir untuk angkutan umum)";
        }
        
        const totalBiaya = totalBiayaMakan + totalBiayaWisata + totalBiayaTransport;
        
        const detailBiaya = document.getElementById('cost-details');
        detailBiaya.innerHTML = `
            <div class="cost-item">
                <span>
                    <strong>Biaya Makan:</strong><br>
                    Rp ${formatAngka(biayaMakanPerOrangPerHari)}/orang/hari × ${jumlahOrang} orang × ${jumlahHari} hari
                </span>
                <span>Rp ${formatAngka(totalBiayaMakan)}</span>
            </div>
            
            <div class="cost-item">
                <span>
                    <strong>Biaya Masuk Wisata:</strong><br>
                    Rp ${formatAngka(biayaMasukWisataPerOrang)}/orang/wisata × ${jumlahWisata} wisata × ${jumlahOrang} orang × ${jumlahHari} hari
                </span>
                <span>Rp ${formatAngka(totalBiayaWisata)}</span>
            </div>
            
            <div class="cost-item">
                <span>
                    <strong>Biaya Transportasi (${kendaraan === 'motor' ? 'Motor' : kendaraan === 'mobil' ? 'Mobil' : 'Angkutan Umum'}):</strong><br>
                    ${keteranganTransport}
                </span>
                <span>${kendaraan !== 'angkutan' ? 'Rp ' + formatAngka(totalBiayaTransport) : '-'}</span>
            </div>
        `;
        
        document.getElementById('total-cost').textContent = `Rp ${formatAngka(totalBiaya)}`;
        document.getElementById('result').style.display = 'block';
    }

    function formatAngka(angka) {
        return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
});