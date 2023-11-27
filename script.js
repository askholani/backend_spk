var namaKriteria = [];
function inputKriteria() {
    var jumlahKriteria = document.getElementById("jumlahKriteria").value;
    var container = document.getElementById("formKriteria");
    container.innerHTML = "";

    for (var i = 0; i < jumlahKriteria; i++) {
        var formKriteria = document.createElement("form");
        formKriteria.id = "formKriteria" + i;
        var labelNamaKriteria = document.createElement("label");
        labelNamaKriteria.innerHTML = "Pilih Kriteria: ";
        var inputNamaKriteria = document.createElement("select");
        inputNamaKriteria.name = "inputNamaKriteria";
        for (var j = 0; j < jumlahKriteria; j++) {
            var option = document.createElement("option");
            option.value = "C" + (j + 1);
            option.text = "C" + (j + 1);
            inputNamaKriteria.appendChild(option);
        }
        var br1 = document.createElement("br");
        var labelJenisKriteria = document.createElement("label");
        labelJenisKriteria.innerHTML = "Pilih Jenis Kriteria: ";
        var inputJenisKriteria = document.createElement("select");
        inputJenisKriteria.name = "inputJenisKriteria";
        var option1 = document.createElement("option");
        option1.value = "Benefit";
        option1.text = "Benefit";
        var option2 = document.createElement("option");
        option2.value = "Cost";
        option2.text = "Cost";
        inputJenisKriteria.appendChild(option1);
        inputJenisKriteria.appendChild(option2);
        var br2 = document.createElement("br");
        var labelNilaiKriteria = document.createElement("label");
        labelNilaiKriteria.innerHTML = "Bobot Kriteria: ";
        var inputNilaiKriteria = document.createElement("input");
        inputNilaiKriteria.type = "text";
        inputNilaiKriteria.name = "inputNilaiKriteria";
        var br3 = document.createElement("br");
        formKriteria.appendChild(labelNamaKriteria);
        formKriteria.appendChild(inputNamaKriteria);
        formKriteria.appendChild(br1);
        formKriteria.appendChild(labelJenisKriteria);
        formKriteria.appendChild(inputJenisKriteria);
        formKriteria.appendChild(br2);
        formKriteria.appendChild(labelNilaiKriteria);
        formKriteria.appendChild(inputNilaiKriteria);
        formKriteria.appendChild(br3);
        container.appendChild(formKriteria);
    }

    // Tampilkan form submit
    document.getElementById("submitKriteria").style.display = "block";
}

function tampilTabelKriteria() {
    var jumlah = document.getElementById("jumlahKriteria").value;
    var tabelContainer = document.getElementById("tabelKriteria");
    tabelContainer.innerHTML = "";

    var tabel = document.createElement("table");
    tabel.style.border = "1px solid black";  // Menambahkan border pada tabel
    var thead = document.createElement("thead");
    var tr = document.createElement("tr");
    var th1 = document.createElement("th");
    th1.innerHTML = "Kriteria";
    th1.style.border = "1px solid black";  // Menambahkan border pada header tabel
    var th2 = document.createElement("th");
    th2.innerHTML = "Jenis";
    th2.style.border = "1px solid black";  // Menambahkan border pada header tabel
    var th3 = document.createElement("th");
    th3.innerHTML = "Bobot";
    th3.style.border = "1px solid black";  // Menambahkan border pada header tabel
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    thead.appendChild(tr);
    tabel.appendChild(thead);

    var tbody = document.createElement("tbody");
    for (var i = 0; i < jumlah; i++) {
        var formKriteria = document.getElementById("formKriteria" + i);
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        td1.innerHTML = formKriteria.inputNamaKriteria.value;
        td1.style.border = "1px solid black";  // Menambahkan border pada data tabel
        var td2 = document.createElement("td");
        td2.innerHTML = formKriteria.inputJenisKriteria.value;
        td2.style.border = "1px solid black";  // Menambahkan border pada data tabel
        var td3 = document.createElement("td");
        td3.innerHTML = formKriteria.inputNilaiKriteria.value;
        td3.style.border = "1px solid black";  // Menambahkan border pada data tabel
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tbody.appendChild(tr);
    }
    tabel.appendChild(tbody);

    tabelContainer.appendChild(tabel);

    // Mencegah form submit dikirim
    return false;
}

function inputAlternatif() {
    var jumlahAlternatif = document.getElementById("jumlahAlternatif").value;
    var jumlahKriteria = document.getElementById("jumlahKriteria").value;
    var container = document.getElementById("formAlternatif");
    container.innerHTML = "";

    for (var i = 0; i < jumlahAlternatif; i++) {
        var formAlternatif = document.createElement("form");
        formAlternatif.id = "formAlternatif" + i;

        var labelNamaAlternatif = document.createElement("label");
        labelNamaAlternatif.innerHTML = "Nama Alternatif " + (i + 1) + ": ";
        var inputNamaAlternatif = document.createElement("select");
        inputNamaAlternatif.name = "inputNamaAlternatif";
        for (var j = 0; j < jumlahAlternatif; j++) {
            var option = document.createElement("option");
            option.value = "A" + (j + 1);
            option.text = "A" + (j + 1);
            inputNamaAlternatif.appendChild(option);
        }
        var br1 = document.createElement("br");
        formAlternatif.appendChild(labelNamaAlternatif);
        formAlternatif.appendChild(inputNamaAlternatif);
        formAlternatif.appendChild(br1);

        for (var k = 0; k < jumlahKriteria; k++) {
            var labelNilaiAlternatif = document.createElement("label");
            labelNilaiAlternatif.innerHTML = "Nilai A" + (k + 1) + " pada C" + (k + 1) + ":";
            var inputNilaiAlternatif = document.createElement("input");
            inputNilaiAlternatif.type = "text";
            inputNilaiAlternatif.name = "inputNilaiAlternatif" + k;
            var br2 = document.createElement("br");
            formAlternatif.appendChild(labelNilaiAlternatif);
            formAlternatif.appendChild(inputNilaiAlternatif);
            formAlternatif.appendChild(br2);
        }

        container.appendChild(formAlternatif);
    }

    // Tampilkan form submit
    document.getElementById("submitAlternatif").style.display = "block";
}

function tampilTabelAlternatif() {
    var jumlahAlternatif = document.getElementById("jumlahAlternatif").value;
    var jumlahKriteria = document.getElementById("jumlahKriteria").value;
    var container = document.getElementById("tabelAlternatif");
    container.innerHTML = "";

    var table = document.createElement("table");
    table.className = "bordered-table";
    var thead = document.createElement("thead");
    var tbody = document.createElement("tbody");

    // Membuat header tabel
    var tr = document.createElement("tr");
    var th = document.createElement("th");
    th.innerHTML = "";
    tr.appendChild(th);
    for (var i = 0; i < jumlahKriteria; i++) {
        var th = document.createElement("th");
        var inputNamaKriteria = document.getElementById("formKriteria" + i).elements["inputNamaKriteria"];
        th.innerHTML = inputNamaKriteria.options[inputNamaKriteria.selectedIndex].text;
        tr.appendChild(th);
    }
    thead.appendChild(tr);

    // Membuat isi tabel
    for (var i = 0; i < jumlahAlternatif; i++) {
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        var inputNamaAlternatif = document.getElementById("formAlternatif" + i).elements["inputNamaAlternatif"];
        td.innerHTML = inputNamaAlternatif.options[inputNamaAlternatif.selectedIndex].text;
        tr.appendChild(td);
        for (var j = 0; j < jumlahKriteria; j++) {
            var td = document.createElement("td");
            var inputNilaiAlternatif = document.getElementById("formAlternatif" + i).elements["inputNilaiAlternatif" + j];
            td.innerHTML = inputNilaiAlternatif.value;
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    table.appendChild(thead);
    table.appendChild(tbody);
    container.appendChild(table);

    return false;
}
