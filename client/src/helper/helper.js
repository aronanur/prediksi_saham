export default class Helper {
  static formatRupiah(price){
    let str = String(price)
    let result = ''

    for(let i = 0; i < str.length; i++){
        if((str.length - i) % 3 === 0 && i !== 0){
            result += ',' + str[i]
        }else{
            result += str[i]
        }
    }

    return `Rp. ${result}`
  }

  static makeIntegerFormat(number){
    let result = '';
    for(let i = 0; i < number.length; i++){
      if(number[i] !== ',') result += number[i]
    }
    return result;
  }

  static joinRelasi(relasi){
    return relasi.join(', ')
  }
}
