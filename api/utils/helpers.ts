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
      const bobot = kriteriaData.bobot / 100
      return {
        ...item2,
        nilai: item2.nilai * bobot + bobot,
      }
    })
    return {
      id_alternatif: item.id_alternatif,
      nama: item.nama_alternatif,
      data: newData,
    }
  })
}

export function getMatriksBatas(tertimbang: any) {
  const groupedData: any = {}

  tertimbang.forEach((alternatif: any) => {
    let count = 0
    let idKriteria = ''
    alternatif.data.forEach((kriteria: any, index: number) => {
      count++
      idKriteria = kriteria.id_kriteria

      if (!groupedData[idKriteria]) {
        groupedData[idKriteria] = {
          nama_kriteria: kriteria.nama_kriteria,
          total_nilai: 1,
          count: 1,
        }
      }
      groupedData[idKriteria].total_nilai *= kriteria.nilai
      groupedData[idKriteria].count++
    })
  })

  const resultArray = Object.keys(groupedData).map((idKriteria) => ({
    id_kriteria: idKriteria,
    nama_kriteria: groupedData[idKriteria].nama_kriteria,
    total_nilai: parseFloat(
      Math.pow(
        groupedData[idKriteria].total_nilai,
        1 / groupedData[idKriteria].count,
      ).toFixed(3),
    ),
    count: groupedData[idKriteria].count,
  }))

  return resultArray
}

export function getAlternatif(data1: any, data2: any) {
  const hasilUpdate: any = []

  data1.forEach((alternatif: any) => {
    const alternatifBaru = { ...alternatif }
    alternatifBaru.data.forEach((kriteria: any) => {
      const totalKriteria = data2.find(
        (total: any) => total.id_kriteria === kriteria.id_kriteria,
      )

      if (totalKriteria) {
        kriteria.nilai = parseFloat(
          (kriteria.nilai - totalKriteria.total_nilai).toFixed(3),
        )
      }
    })

    hasilUpdate.push(alternatifBaru)
  })

  return hasilUpdate
}

export function getTotalKriteria(matrixAlternatif: any) {
  const hasilHitung: any = []

  matrixAlternatif.forEach((alternatif: any) => {
    const totalNilai = alternatif.data.reduce(
      (total: any, kriteria: any) => total + kriteria.nilai,
      0,
    )

    hasilHitung.push({
      id_alternatif: alternatif.id_alternatif,
      nama: alternatif.nama,
      total_nilai: parseFloat(totalNilai.toFixed(3)),
    })
  })

  return hasilHitung
}
