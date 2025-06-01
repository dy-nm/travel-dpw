document.addEventListener('DOMContentLoaded', function() {
    // Menambahkan event listener ke tombol hitung
    document.getElementById('calculate-btn').addEventListener('click', hitungBiaya);
    
    // Fungsi untuk menghitung biaya liburan
    function hitungBiaya() {
        // Ambil nilai input dari pengguna
        const jumlahOrang = parseInt(document.getElementById('people').value);
        const jumlahHari = parseInt(document.getElementById('days').value);
        const kendaraan = document.getElementById('transport').value;
        const jumlahWisata = parseInt(document.getElementById('destinations').value);
        
        // Tetapkan harga tetap
        const biayaMakanPerOrangPerHari = 45000; // Rp 45.000 per orang per hari
        const biayaMasukWisataPerOrang = 10000; // Rp 10.000 per wisata per orang
        const biayaParkirMotorPerWisata = 5000; // Rp 5.000
        const biayaParkirMobilPerWisata = 10000; // Rp 10.000
        
        // Hitung total biaya untuk masing-masing komponen
        const totalBiayaMakan = biayaMakanPerOrangPerHari * jumlahOrang * jumlahHari;
        const totalBiayaWisata = biayaMasukWisataPerOrang * jumlahWisata * jumlahOrang * jumlahHari;
        
        let totalBiayaTransport = 0;
        let keteranganTransport = "";
        
        if (kendaraan === 'motor') {
            totalBiayaTransport = biayaParkirMotorPerWisata * jumlahWisata;
            keteranganTransport = `Rp ${formatAngka(biayaParkirMotorPerWisata)} × ${jumlahWisata} wisata`;
        } else if (kendaraan === 'mobil') {
            totalBiayaTransport = biayaParkirMobilPerWisata * jumlahWisata;
            keteranganTransport = `Rp ${formatAngka(biayaParkirMobilPerWisata)} × ${jumlahWisata} wisata`;
        } else {
            keteranganTransport = "(Tidak ada biaya parkir untuk angkutan umum)";
        }
        
        const totalBiaya = totalBiayaMakan + totalBiayaWisata + totalBiayaTransport;
        
        // Tampilkan hasil perhitungan dengan keterangan lengkap
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
                    <strong>Biaya parkir Transportasi (${kendaraan === 'motor' ? 'Motor' : kendaraan === 'mobil' ? 'Mobil' : 'Angkutan Umum'}):</strong><br>
                    ${keteranganTransport}
                </span>
                <span>${kendaraan !== 'angkutan' ? 'Rp ' + formatAngka(totalBiayaTransport) : '-'}</span>
            </div>
        `;
        
        document.getElementById('total-cost').textContent = `Rp ${formatAngka(totalBiaya)}`;
        document.getElementById('result').style.display = 'block';
    }
    
    // Fungsi untuk memformat angka dengan pemisah ribuan
    function formatAngka(angka) {
        return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
});