export function groupByAlternatif(data: any, kriteria: any, alternatif: any) {
  const groupedData: any[] = []

  data.forEach((item: any) => {
    const idAlternatif = item.id_alternatif
    const existingGroup = groupedData.find(
      (group) => group.id_alternatif === idAlternatif,
    )
    const namaAlternatif = alternatif.find(
      (itemAlt: any) => itemAlt.id === item.id_alternatif,
    )

    const namaKriteria = kriteria.find(
      (itemKri: any) => itemKri.id === item.id_kriteria,
    )

    if (!existingGroup) {
      groupedData.push({
        id_alternatif: idAlternatif,
        nama_alternatif: namaAlternatif.nama,
        data: [
          {
            id_kriteria: item.id_kriteria,
            nama_kriteria: namaKriteria.nama,
            nilai: item.nilai,
          },
        ],
      })
    } else {
      existingGroup.data.push({
        id_kriteria: item.id_kriteria,
        nama_kriteria: namaKriteria.nama,
        nilai: item.nilai,
      })
    }
  })

  return groupedData
}

export function groupByKriteria(data: any, kriteria: any) {
  // console.log('kriteria', kriteria)
  const groupedData: any[] = []

  data.forEach((item: any) => {
    const idKriteria = item.id_kriteria
    const existingGroup = groupedData.find(
      (group) => group.id_kriteria === idKriteria,
    )

    const namaKriteria = kriteria.find(
      (itemKri: any) => itemKri.id === item.id_kriteria,
    )

    if (!existingGroup) {
      groupedData.push({
        id_kriteria: idKriteria,
        nama_kriteria: namaKriteria.nama,
        data: [
          {
            id_alternatif: item.id_alternatif,
            nilai: item.nilai,
          },
        ],
      })
    } else {
      existingGroup.data.push({
        id_alternatif: item.id_alternatif,
        nilai: item.nilai,
      })
    }
  })

  return groupedData
}

export function getMinMaxValues(data: any, kriteriaDB: any) {
  const result: any = []

  data.forEach((kriteria: any) => {
    const idKriteria = kriteria.id_kriteria
    let maxNilai = Number.MIN_VALUE
    let minNilai = Number.MAX_VALUE

    const jenis = kriteriaDB.find((item: any) => item.id === idKriteria)

    kriteria.data.forEach((dataItem: any) => {
      const nilai = dataItem.nilai
      maxNilai = Math.max(maxNilai, nilai)
      minNilai = Math.min(minNilai, nilai)
    })

    result.push({
      id_kriteria: idKriteria,
      tipe: jenis.jenis,
      nama_kriteria: kriteria.nama_kriteria,
      max: maxNilai,
      min: minNilai,
    })
  })

  return result
}

export function getNormalisasi(data: any, minMax: any) {
  return data.map((alternatif: any) => {
    const newData = alternatif.data.map((dataItem: any) => {
      const matchingMaxItem = minMax.find(
        (maxItem: any) => maxItem.id_kriteria === dataItem.id_kriteria,
      )

      if (matchingMaxItem) {
        if (matchingMaxItem.tipe) {
          return {
            ...dataItem,
            nilai: parseFloat(
              (
                (dataItem.nilai - matchingMaxItem.min) /
                (matchingMaxItem.max - matchingMaxItem.min)
              ).toFixed(3),
            ),
          }
        } else {
          return {
            ...dataItem,
            nilai: parseFloat(
              (
                (dataItem.nilai - matchingMaxItem.max) /
                (matchingMaxItem.min - matchingMaxItem.max)
              ).toFixed(3),
            ),
          }
        }
      } else {
        return dataItem
      }
    })

    return {
      ...alternatif,
      data: newData,
    }
  })
}

export function getTertimbang(normalisasi: any, kriteria: any) {
  return normalisasi.map((item: any) => {
    const newData = item.data.map((item2: any) => {
      const kriteriaData = kriteria.find(
        (itemKri: any) => itemKri.id === item2.id_kriteria,
      )
      const bobot = kriteriaData.bobot
      return {
        ...item2,
        nilai: parseFloat((item2.nilai * bobot + bobot).toFixed(3)),
      }
    })
    // console.log('newData',newData)
    return {
      id_alternatif: item.id_alternatif,
      nama: item.nama_alternatif,
      data: newData,
    }
  })
}

export function getMatriksBatas(tertimbang: any) {
  const totalPenjumlahan: any = {}

  // Iterasi melalui setiap elemen data
  tertimbang.forEach((alternatif: any) => {
    alternatif.data.forEach((kriteria: any, index: number) => {
      // Mendapatkan id_kriteria dan nilai dari setiap elemen data
      const { id_kriteria, nilai } = kriteria

      // Memeriksa apakah id_kriteria sudah ada di objek totalPenjumlahan
      if (!totalPenjumlahan[id_kriteria]) {
        // Jika belum ada, inisialisasi dengan nilai dari data pertama
        totalPenjumlahan[id_kriteria] = {
          id_kriteria,
          nama_kriteria: kriteria.nama_kriteria,
          total_penjumlahan: 1,
        }
      }

      // Menambahkan nilai ke total_penjumlahan
      totalPenjumlahan[id_kriteria].total_penjumlahan *= nilai
    })
  })

  // Mengonversi objek menjadi array (jika diperlukan)
  const hasilPenjumlahanArray = Object.values(totalPenjumlahan)
  hasilPenjumlahanArray.forEach((item: any) => {
    item.total_penjumlahan = parseFloat(
      Math.pow(item.total_penjumlahan, 1 / tertimbang.length).toFixed(3),
    )
  })
  return hasilPenjumlahanArray
}

// export function getAlternatif(data1: any, data2: any) {
//   console.log('tertimbang', data1)
//   console.log('batas', data2)
//   const hasilUpdate: any[] = data1.map((alternatif: any) => {
//     const alternatifBaru = { ...alternatif }
//     alternatifBaru.data = alternatifBaru.data.map((kriteria: any) => {
//       const totalKriteria = data2.find(
//         (total: any) => total.id_kriteria === kriteria.id_kriteria,
//       )

//       if (totalKriteria) {
//         kriteria.nilai = parseFloat(
//           (kriteria.nilai - totalKriteria.total_nilai).toFixed(3),
//         )
//       }

//       return kriteria
//     })

//     return alternatifBaru
//   })

//   return hasilUpdate
// }

export function getAlternatif(data1: any, data2: any) {
  return data1.map((item1: any) => {
    const newData = {
      ...item1,
      data: item1.data.map((item2: any) => {
        const kriteria = data2.find(
          (item3: any) => item3.id_kriteria === item2.id_kriteria,
        )

        if (kriteria) {
          return {
            ...item2,
            nilai: parseFloat(
              (item2.nilai - kriteria.total_penjumlahan).toFixed(3),
            ),
          }
        }

        return item2
      }),
    }

    return newData
  })
}

export function getTotalKriteria(matrixAlternatif: any) {
  const hasilHitung: any = matrixAlternatif.map((alternatif: any) => {
    const totalNilai = alternatif.data.reduce(
      (total: any, kriteria: any) => total + kriteria.nilai,
      0,
    )

    return {
      id_alternatif: alternatif.id_alternatif,
      nama: alternatif.nama,
      total_nilai: parseFloat(totalNilai.toFixed(3)),
    }
  })

  return hasilHitung
}
