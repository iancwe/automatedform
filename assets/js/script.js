$(document).ready(function () {
  console.log('jQuery up and running')
  // NRIC number validation if its a proper number
  $('#entry_179082515').blur(function () {
    var icNum = document.getElementById('entry_179082515').value
    console.log(icNum)
    var icArray = []
    // Check length of IC number
    if (icNum.length === 9) {
      for (var i = 0; i < icNum.length; i++) {
        icArray[i] = icNum.charAt(i)
      }
      // Calculate the total of weight of NRIC
      icArray[1] = parseInt(icArray[1], 10) * 2
      icArray[2] = parseInt(icArray[2], 10) * 7
      icArray[3] = parseInt(icArray[3], 10) * 6
      icArray[4] = parseInt(icArray[4], 10) * 5
      icArray[5] = parseInt(icArray[5], 10) * 4
      icArray[6] = parseInt(icArray[6], 10) * 3
      icArray[7] = parseInt(icArray[7], 10) * 2

      var weight = 0
      for (var j = 1; j < 8; j++) {
        weight += icArray[j]
      }
      console.log(weight)

      // If user is Singaporean or Foreign worker, check remainder of the weight of NRIC
      var offset = (icArray[0] === 'T' || icArray[0] === 'G') ? 4 : 0
      var remainder = (weight + offset) % 11
      console.log(remainder)

      var st = ['J', 'Z', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A']
      var fg = ['X', 'W', 'U', 'T', 'R', 'Q', 'P', 'N', 'M', 'L', 'K']

      // Check if last value of NRIC is the same correct as algo
      var checkSum
      if (icArray[0] === 'S' || icArray[0] === 'T') { checkSum = st[remainder]
      } else if (icArray[0] === 'F' || icArray[0] === 'G') { checkSum = fg[remainder] }
      console.log(checkSum)
      if (checkSum === icArray[8]) {
        console.log('Valid NRIC Number')
        $('#entry_179082515').removeClass('error')
        $('#entry_179082515').addClass('valid')
      } else {
        console.log('Invalid NRIC Number')
        $('#entry_179082515').addClass('error')
        $('#entry_179082515').removeClass('valid')
      }
    }
  })
  // Validating of IMEI number
  $('#entry_423883520').blur(function () {
    var imei = document.getElementById('entry_423883520').value
    console.log(imei)
    if (imei.length === 5) {
      var imeiDigit = 0
      var imeiWeight = 0
      var bEven = true
      var sum = 0
      for (var i = 0; i < imei.length - 1; i++) {
        if (bEven) {
          // if positiin of digit in IMEI number is even keep it as per normal
          imeiDigit = parseInt(imei.charAt(i), 10)
          console.log('Even numbers ' + imeiDigit)
          bEven = false
          imeiWeight += imeiDigit
          console.log('Even Numbers total so far ' + imeiWeight)
        } else {
          // if position of digit in IMEI number is odd multiply by 2
          imeiDigit = parseInt(imei.charAt(i), 10) * 2
          if (imeiDigit >= 10) {
            sum += imeiDigit % 10
            console.log(sum)
            imeiDigit = Math.floor(imeiDigit / 10)
            console.log(imeiDigit)
            imeiWeight = imeiDigit + sum
            console.log(imeiWeight)
          }
        //     while (imeiDigit > 0) {
        //       sum += imeiDigit % 10
        //       imeiDigit = Math.floor(imeiDigit / 10)
        //       imeiWeight += imeiDigit
          console.log('Odd numbers ' + imeiDigit)
          bEven = true
          imeiWeight += imeiDigit
          console.log('Even Numbers total so far ' + imeiWeight)
        }
        //   } else {
        //     imeiWeight += imeiDigit
        //     bEven = true
        //   }
        // }
      }
      console.log('TOTAL VALUE of number is ' + imeiWeight)
    }
  })
})
