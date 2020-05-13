class FormatValueHelper{
  
  static validationErrorFormat(object) {
    let obj = {}
    for (let i = 0; i < object.length; i++) {
        obj[object[i].path] = object[i].message
    }
    return obj
  }

  static monthIntoRomawi(month){

    switch (month) {
      case 1:
        return "I"
      case 2:
        return "II"
      case 3:
        return "III"
      case 4:
        return "IV"
      case 5:
        return "V"
      case 6:
        return "VI"
      case 7:
        return "VII"
      case 8:
        return "VIII"
      case 9:
        return "IX"
      case 10:
        return "X"
      case 11:
        return "XI"
      case 12:
        return "XII"

      default:
        break;
    }
  }

  static formatYear(tanggal){
    const splitDate = tanggal.split('-');
    return Number(splitDate[0])
  }

}

module.exports = FormatValueHelper

