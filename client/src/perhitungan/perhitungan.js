export default class Perhitungan {

  static prediksiTahap2(data, d1, d2){
    const nMax = this.getNMax(data);
    const nMin = this.getNMin(data);
    const totalData = data.length;
    const absLag = this.procesAbsLag(data, totalData);
    const uMin = nMin - d1
    const uMax = nMax + d2

    return [{ 
      nmax: nMax, 
      nmin: nMin,
      d1,
      d2,
      uMin,
      uMax,
      absinterval: absLag.absinterval,
      interval: absLag.interval,
      pinterval: Number((uMax - uMin) / +absLag.absinterval).toFixed(0),
      dataSaham: data
    }];
  }

  static getNMax(data){
    let number = 0;

    data.forEach(element => {
      if(element.harga_closed >= number) number = element.harga_closed
    });

    return number;
  }

  static getNMin(data){
    let number;

    data.forEach((element, i) => {
      if(i === 0) number = element.harga_closed;
      if(i !== 0 && element.harga_closed <= number) number = element.harga_closed
    })

    return number;
  }

  static procesAbsLag(data, totalData){
    const selisihLag  = [];
    let totalLag = 0;

    for(let i = 0; i < (totalData - 1); i++){
      selisihLag.push(Math.abs(data[i + 1].harga_closed - data[i].harga_closed));
    }

    selisihLag.forEach(el => {
      totalLag += el
    })

    const interval = Math.abs(totalLag / (totalData - 1));
    const absinterval =  Number(interval / 2);

    return {
      interval,
      absinterval
    }

  }

  static prediksiTahap3(data){
    const uInterval = this.processUInterval(data);
    const fuzzyLinguistik = this.processFuzzyLinguistik(uInterval, data)
    const relasiFuzzyLinguistik = this.processFuzzyLinguistikRelasi(fuzzyLinguistik);

    //prediksi selanjutnya karena dikit di satuin
    const tahap4 = this.prediksiTahap4(uInterval, relasiFuzzyLinguistik);
    const matrixHimpunanFuzzy = this.matrixHimpunanFuzzy(uInterval, relasiFuzzyLinguistik);
    const baseMatrixNormalisasi = this.matrixHimpunanFuzzy(uInterval, relasiFuzzyLinguistik);
    const matrixNormalisasi = this.matrixNormalisasi(baseMatrixNormalisasi, tahap4);
    const defuzzyfikasi = this.defuzzyfikasi(tahap4, matrixNormalisasi);
    const baseTahap5 = this.processFuzzyLinguistik(uInterval, data);
    const tahap5 = this.prediksiTahap5(baseTahap5, defuzzyfikasi);
    const kesimpulan = this.kesimpulanMetode(tahap5);
    
    return {
      uInterval,
      fuzzyLinguistik,
      relasiFuzzyLinguistik,
      defuzzyfikasi,
      matrixHimpunanFuzzy,
      matrixNormalisasi,
      tahap5,
      kesimpulan
    };
  }

  static processUInterval(data){
    const uInterval = [];
    const pInterval = +data.pinterval
    let currentNumber = 0;
    
    for(let i = 0; i < pInterval; i++){
      if(i === 0) {
        uInterval.push({ interval: `U${i + 1}`, min: Math.round(data.uMin), max: Math.round(data.uMin + data.absinterval) })
        currentNumber = data.uMin + data.absinterval;
      }else{
        uInterval.push({ interval: `U${i + 1}`, min: Math.round(currentNumber), max: Math.round(currentNumber + data.absinterval)})
        currentNumber += data.absinterval
      }
      
    }

    return uInterval;
  }

  static processFuzzyLinguistik(uInterval, data){
    const fuzzyLinguistik = [];

    data.dataSaham.forEach((saham) => {
      uInterval.forEach((interval, i) => {
        if(i === 0){
          if(saham.harga_closed >= Number(interval.min) && saham.harga_closed <= Number(interval.max)) fuzzyLinguistik.push({ tanggal: saham.tanggal, nilai: saham.harga_closed ,linguistik: interval.interval, nilaiInterval: interval.max})
        }else{
          if(saham.harga_closed > Number(interval.min) && saham.harga_closed <= Number(interval.max)) fuzzyLinguistik.push({ tanggal: saham.tanggal, nilai: saham.harga_closed ,linguistik: interval.interval, nilaiInterval: interval.max})
        }
      })
    })

    return fuzzyLinguistik;
  }

  static processFuzzyLinguistikRelasi(fuzzyLinguistik){
    const relasiFuzzyLinguistik = [];

    for(let i = 0; i < fuzzyLinguistik.length; i++){
      if(i === 0) relasiFuzzyLinguistik.push({ a: '-', b: '-' })
      if(i !== 0) relasiFuzzyLinguistik.push({ a: fuzzyLinguistik[i-1].linguistik, b: fuzzyLinguistik[i].linguistik, nilaiRelasi: fuzzyLinguistik[i].nilaiInterval })
    }

    return relasiFuzzyLinguistik;
  }

  static matrixHimpunanFuzzy(uInterval, fuzzyLinguistik){
    const matrixBoard = this.generateMatrixBoard(uInterval);

    for(let i = 0; i < fuzzyLinguistik.length; i++){
      for(let j = 0; j < matrixBoard.length; j++){
        const key = `U${j+1}`;
        if(fuzzyLinguistik[i].a === key){
          for(let key in matrixBoard[j]){
            if(fuzzyLinguistik[i].b === key) matrixBoard[j][key]++
          }
        }
      }
    }

    return matrixBoard;

  }

  static matrixNormalisasi(matrixNormalisasi, tahap4){

    tahap4.forEach((t4, i) => {
      Object.keys(matrixNormalisasi[i]).forEach((item) => {
        if(matrixNormalisasi[i][item] !== 0) matrixNormalisasi[i][item] = matrixNormalisasi[i][item] / t4.total
      })
    })

    return matrixNormalisasi;

  }

  static defuzzyfikasi(tahap4, matrixNormalisasi){
    tahap4.forEach((t4) => {
      if(t4.total === 1){
        t4.fuzzyfikasi = t4.nilaiInterval;
        t4.nilaiRelasi.forEach((n) => {
          t4.fuzzyfikasi = (t4.fuzzyfikasi + n) / 2;
        })
      }else if(t4.total > 1) t4.fuzzyfikasi = this.defuzzyfikasiOneToMany(t4.iterasi, matrixNormalisasi, t4.nilaiRelasi);
      else t4.fuzzyfikasi = '-'
    })
    return tahap4
  }

  static defuzzyfikasiOneToMany(iterasi, matrixNormalisasi, nilaiRelasi){
    const nilaiOneToMany = [];

    matrixNormalisasi.forEach((matrix, i) => {
      const key = `U${i+1}`;
      if(iterasi === key){
        Object.keys(matrix).forEach((nilai) => {
          if(matrix[nilai] > 0){
            nilaiOneToMany.push(matrix[nilai])
          }
        })
      }
    })

    let result= 0;
    nilaiOneToMany.forEach((nilai, i) => {
      console.log(result, nilaiRelasi[i], nilai, nilaiRelasi[i] * nilai)
      result += nilaiRelasi[i] * nilai
    })

    return result;
  }

  static generateMatrixBoard(uInterval){
    const matrixBoard = [];

    for(let i= 0; i < uInterval.length; i++){
      const column = {};
      for(let j = 0; j < uInterval.length; j++){
        column[uInterval[j].interval] = 0;
      }
      matrixBoard.push(column);
    }

    return matrixBoard;
  }

  static prediksiTahap4(uInterval, fuzzyLinguistik){
    const tahap4 = [];

    uInterval.forEach((u) => {
      const uniqueInterval = [];
      const column = {
        iterasi: u.interval,
        total: 0,
        relasi: [],
        nilaiInterval: u.max,
        nilaiRelasi: []
      }

      fuzzyLinguistik.forEach((fLinguistik) => {
        if(u.interval === fLinguistik.a){
          column.total++
          column.relasi.push(fLinguistik.b)
          if(!uniqueInterval.includes(fLinguistik.b)){
            uniqueInterval.push(fLinguistik.b);
            column.nilaiRelasi.push(fLinguistik.nilaiRelasi)
          }
        }
      })

      tahap4.push(column)
    })

    return tahap4;
  }

  static prediksiTahap5(baseTahap5, defuzzyfikasi){
    const nilaiDefuzzyfikasi = this.nilaiDefuzzyfikasi(baseTahap5, defuzzyfikasi);
    const nilaiPeramalan = this.nilaiPeramalan(nilaiDefuzzyfikasi);
    const nilaiMseAndAffer = this.nilaiMseAndAffer(nilaiPeramalan);

    return nilaiMseAndAffer;
  }

  static nilaiDefuzzyfikasi(baseTahap5, defuzzyfikasi){
    baseTahap5.forEach((tahap5) => {
      tahap5.defuzzyfikasi = '';
      defuzzyfikasi.forEach((fuzzy) => {
        if(tahap5.linguistik === fuzzy.iterasi) tahap5.defuzzyfikasi = fuzzy.fuzzyfikasi
      })
    })
    return baseTahap5;
  }

  static nilaiPeramalan(nilaiDefuzzyfikasi){
    nilaiDefuzzyfikasi.forEach((nilai) => {
      nilai.nilaiPeramalan = (nilai.nilai / 2) + (nilai.defuzzyfikasi / 2);
    })
    return nilaiDefuzzyfikasi
  }

  static nilaiMseAndAffer(nilaiPeramalan){
    nilaiPeramalan.forEach((nilai) => {
      nilai.nilaiMSE = Math.pow((nilai.nilai - nilai.nilaiPeramalan), 2);
      nilai.nilaiAffer = (nilai.nilai - nilai.nilaiPeramalan) / nilai.nilai
      nilai.nilaiAbsAffer = Math.abs(nilai.nilaiAffer)
    })

    return nilaiPeramalan
  }
  
  static kesimpulanMetode(tahap5){
    const sumMse = this.sumMse(tahap5);
    const sumAffer = this.sumAbsAffer(tahap5);
    const resultMse = (sumMse / tahap5.length);
    const resultAffer = (sumAffer / tahap5.length);

    return {
      sumMse,
      sumAffer,
      resultMse,
      resultAffer
    }
  }

  static sumMse(tahap5){
    let number = 0;

    tahap5.forEach(element => {
      number += element.nilaiMSE
    });

    return number;
  }

  static sumAbsAffer(tahap5){
    let number = 0;

    tahap5.forEach(element => {
      number += element.nilaiAbsAffer
    });

    return number;
  }

}