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
    if (imei.length === 15) {
      var imeiDigit = 0
      var imeiWeight = 0
      var bEven = true
      var checkImeiSum = 0
      var lastImeiNum = parseInt(imei.charAt(imei.length - 1))
      for (var i = 0; i < imei.length - 1; i++) {
        if (bEven) {
          // if positiin of digit in IMEI number is even keep it as per normal
          imeiDigit = parseInt(imei.charAt(i), 10)
          bEven = false
          imeiWeight += imeiDigit
        } else {
          // if position of digit in IMEI number is odd multiply by 2
          imeiDigit = parseInt(imei.charAt(i), 10) * 2
          bEven = true
          //  check if digits of the imei after multipication is two digits
          if (imeiDigit >= 10) {
            // add the sum of both the digits when the number is two digits
            imeiDigit = (imeiDigit % 10 + Math.floor(imeiDigit / 10) % 10)
          }
          imeiWeight += imeiDigit
        }
      }
      // find the nearest tenth of the current IMEI number weight
      checkImeiSum = (Math.round(imeiWeight / 10) * 10) - imeiWeight
      // check if the last number of the imei is the same as the difference between the IMEI number weight and nearest tenth
      if (lastImeiNum === checkImeiSum) {
        console.log('IMEI is valid')
        $('#entry_423883520').removeClass('error')
        $('#entry_423883520').addClass('valid')
      } else {
        console.log('IMEI is invalid')
        $('#entry_423883520').addClass('error')
        $('#entry_423883520').removeClass('valid')
      }
    }
  })
  // google maps auto fill for address
  var autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById('entry_1204299239')),
    {types: ['geocode']}
  )
  // when user chooses an address from the drop down it will fire off a place_changed service
  autocomplete.addListener('place_changed', fillInAddress)
  function fillInAddress () {
    var place = autocomplete.getPlace()
    console.log(place.address_components)
    var address1 = place.address_components[0].long_name + ' ' + place.address_components[1].long_name
    document.getElementById('entry_1204299239').value = address1
    var postalCode = place.address_components[5].long_name
    document.getElementById('entry_1305659754').value = postalCode
  }
})
