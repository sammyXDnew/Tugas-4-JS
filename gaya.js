document.getElementById("okButton").addEventListener("click", function() {
    console.log("Tombol OK ditekan"); // Debugging untuk memastikan event listener bekerja

    // Ambil nilai dari textarea di dalam container Nama
    const nama = document.querySelector("#container textarea").value.trim();

    // Validasi input nama
    if (nama === "") {
        alert("Nama anda masih kosong!");
        return;
    }

    // Ambil nilai dari textarea di dalam jumlahPilihanContainer
    const jumlahPilihan = document.querySelector("#jumlahPilihanContainer textarea").value.trim();

    // Validasi input hanya angka
    if (jumlahPilihan === "" || isNaN(jumlahPilihan) || parseInt(jumlahPilihan, 10) <= 0) {
        alert("Masukkan angka pada jumlah pilihan!");
        return;
    }

    // Jika input valid (angka), tampilkan teks "Pilihan" sebanyak angka yang diinputkan
    const jumlah = parseInt(jumlahPilihan, 10);
    let hasil = "";
    for (let i = 1; i <= jumlah; i++) {
        hasil += `
            <div class="container-wrapper">
                <p class="label">Pilihan ${i}:</p>
                <div class="container">
                    <input type="text" class="pilihanInput" placeholder="Teks Pilihan ${i}" style="width: 100%; height: 100%; border: none; font-size: 16px;">
                </div>
            </div>`;
    }

    // Tambahkan tombol OK baru di bawah pilihan
    hasil += `
        <div style="display: flex; justify-content: center; margin-top: 20px;">
            <button id="newOkButton" style="padding: 10px 20px; font-size: 16px;">OK</button>
        </div>
    `;

    // Tampilkan elemen hasilContainer setelah tombol OK pertama ditekan
    const hasilContainer = document.getElementById("hasilContainer");
    if (hasilContainer) {
        hasilContainer.style.display = "block"; // Tampilkan elemen hasilContainer
        hasilContainer.innerHTML = hasil;

        // Tambahkan event listener untuk tombol OK kedua
        const newOkButton = document.getElementById("newOkButton");
        if (newOkButton) {
            newOkButton.addEventListener("click", function () {
                // Ambil semua input pilihan
                const pilihanInputs = document.querySelectorAll(".pilihanInput");
                const pilihanValues = [];

                // Periksa apakah semua input telah diisi
                let allFilled = true;
                pilihanInputs.forEach((input) => {
                    const value = input.value.trim();
                    if (value === "") {
                        allFilled = false;
                    } else {
                        pilihanValues.push(value);
                    }
                });

                if (!allFilled) {
                    alert("Harap isi semua pilihan sebelum melanjutkan!");
                    return;
                }

                // Tambahkan pilihan dalam bentuk Radio Button atau Drop Down di bawah container
                let pilihanHTML = `
                    <div style="margin-top: 20px;">
                        <p><strong>Pilih salah satu:</strong></p>
                        ${pilihanValues
                            .map(
                                (value, index) =>
                                    `<div><input type="radio" name="pilihan" id="pilihan${index}" value="${value}"><label for="pilihan${index}"><strong>${value}</strong></label></div>`
                            )
                            .join("")}
                    </div>
                    <div style="margin-top: 20px;">
                        <p><strong>Atau pilih dari Drop Down:</strong></p>
                        <select id="dropdownPilihan" style="width: 100%; padding: 5px; font-size: 16px;">
                            ${pilihanValues
                                .map((value) => `<option value="${value}">${value}</option>`)
                                .join("")}
                        </select>
                    </div>
                    <div style="display: flex; justify-content: center; margin-top: 20px;">
                        <button id="thirdOkButton" style="padding: 10px 20px; font-size: 16px;">OK</button>
                    </div>
                `;

                // Sisipkan pilihan di bawah elemen hasilContainer tanpa menghapus elemen sebelumnya
                hasilContainer.insertAdjacentHTML("beforeend", pilihanHTML);

                // Tambahkan event listener untuk tombol OK ketiga
                const thirdOkButton = document.getElementById("thirdOkButton");
                if (thirdOkButton) {
                    thirdOkButton.addEventListener("click", function () {
                        // Ambil nama dan jumlah pilihan
                        const nama = document.querySelector("#container textarea").value.trim();
                        const jumlahPilihan = pilihanValues.length;

                        // Ambil pilihan yang dipilih
                        const selectedRadio = document.querySelector('input[name="pilihan"]:checked');
                        const selectedDropdown = document.getElementById("dropdownPilihan").value;
                        const selectedPilihan = selectedRadio ? selectedRadio.value : selectedDropdown;

                        // Hapus semua elemen di dalam body
                        document.body.innerHTML = "";

                        // Tampilkan pesan dengan kotak
                        document.body.innerHTML = `
                            <div style="
                                padding: 20px; 
                                text-align: center; 
                                font-family: Arial, sans-serif; 
                                background-color: rgba(255, 255, 255, 0.8); 
                                border-radius: 8px; 
                                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
                                max-width: 600px; 
                                margin: 50px auto;">
                                <p><strong>Hallo, nama saya</strong> <strong>${nama}</strong>, <strong>saya mempunyai sejumlah</strong> <strong>${jumlahPilihan}</strong> <strong>pilihan yaitu</strong> <strong>${pilihanValues.join(
                            ", "
                        )}</strong>, <strong>dan saya memilih</strong> <strong>${selectedPilihan}</strong>.</p>
                            </div>
                        `;
                    });
                }

                // Nonaktifkan semua input pilihan dan tombol OK kedua
                pilihanInputs.forEach((input) => (input.disabled = true));
                newOkButton.disabled = true;
            });
        }
    } else {
        console.error("Elemen hasilContainer tidak ditemukan!");
    }

    // Nonaktifkan elemen setelah tombol OK pertama ditekan
    const namaTextarea = document.querySelector("#container textarea");
    const jumlahTextarea = document.querySelector("#jumlahPilihanContainer textarea");
    const okButton = document.getElementById("okButton");

    if (namaTextarea) namaTextarea.disabled = true; // Nonaktifkan container Nama
    if (jumlahTextarea) jumlahTextarea.disabled = true; // Nonaktifkan container Jumlah Pilihan
    if (okButton) okButton.disabled = true; // Nonaktifkan tombol OK pertama
});

// Event handler untuk container 'Jumlah Pilihan'
document.getElementById("jumlahPilihanContainer").addEventListener("click", function() {
    console.log("Container 'Jumlah Pilihan' diklik!"); // Debugging untuk memastikan event listener bekerja
});